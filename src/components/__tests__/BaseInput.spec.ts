import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import BaseInput from '@/components/common/BaseInput.vue';
import { inputValues, inputSlot } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const mountOptions = {
  props: {
    modelValue: inputValues.modelValue,
    'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
  },

  slots: {
    default: inputSlot.slotValue,
  },
};

describe('BaseInput', () => {
  beforeEach(() => {
    wrapper = mount(BaseInput, mountOptions);
  });

  it('modelValue should be updated', async () => {
    await wrapper.find('input').setValue(inputValues.testValue);
    expect(wrapper.props('modelValue')).toBe(inputValues.expectedValue);
  });

  it('renders slot', () => {
    expect(wrapper.html()).toContain(inputSlot.expectedValue);
  });
});
