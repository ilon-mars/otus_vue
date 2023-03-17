import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseInput from '@/components/common/BaseInput.vue';
import { formElemsSlots } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const DEFAULT_VALUE = 'test value';
const MODEL_DEFAULT_VALUE = '';

const slotRenderCheck = {
  params: {
    props: {
      modelValue: MODEL_DEFAULT_VALUE,
    },
    slots: {
      default: formElemsSlots.slotValue,
    },
  },
  expectedResult: formElemsSlots.expectedValue,
};

const inputValueCheck = {
  params: {
    props: {
      modelValue: MODEL_DEFAULT_VALUE,
      'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
    },
  },
  testValue: DEFAULT_VALUE,
  expectedResult: DEFAULT_VALUE,
};

const emitCheck = { ...inputValueCheck, expectedResult: 'update:modelValue' };

describe('BaseInput', () => {
  it('renders slot', () => {
    wrapper = mount(BaseInput, slotRenderCheck.params);

    expect(wrapper.html()).toContain(slotRenderCheck.expectedResult);
  });

  it('emits update:modelValue', async () => {
    wrapper = mount(BaseInput, emitCheck.params);

    await wrapper.find('input').setValue(emitCheck.testValue);
    expect(wrapper.emitted()).toHaveProperty(emitCheck.expectedResult);
  });

  it('modelValue should be updated', async () => {
    wrapper = mount(BaseInput, inputValueCheck.params);

    await wrapper.find('input').setValue(inputValueCheck.testValue);
    expect(wrapper.props('modelValue')).toBe(inputValueCheck.expectedResult);
  });
});
