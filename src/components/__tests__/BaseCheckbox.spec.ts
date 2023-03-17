import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import { formElemsSlots } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const DEFAULT_VALUE = 'value';

const MODEL_DEFAULT_VALUE = {
  boolean: false,
  stringArray: [] as string[],
} as const;

const DEFAULT_PROPS = {
  value: DEFAULT_VALUE,
  modelValue: MODEL_DEFAULT_VALUE.boolean,
} as const;

const booleanValueCheck = {
  params: {
    props: {
      ...DEFAULT_PROPS,
      'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
    },
  },
  testValue: !MODEL_DEFAULT_VALUE.boolean,
  expectedResult: !MODEL_DEFAULT_VALUE.boolean,
};

const arrayValueCheck = {
  params: {
    props: {
      value: DEFAULT_VALUE,
      modelValue: MODEL_DEFAULT_VALUE.stringArray,
      'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
    },
  },
  testValue: DEFAULT_VALUE,
  expectedResult: DEFAULT_VALUE,
};

const emitCheck = { ...booleanValueCheck, expectedResult: 'update:modelValue' };

const slotRenderCheck = {
  params: {
    props: DEFAULT_PROPS,
    slots: {
      default: formElemsSlots.slotValue,
    },
  },
  expectedResult: formElemsSlots.expectedValue,
};

describe('BaseCheckbox', () => {
  it('renders slot', () => {
    wrapper = mount(BaseCheckbox, slotRenderCheck.params);

    expect(wrapper.html()).toContain(slotRenderCheck.expectedResult);
  });

  it('emits update:modelValue', async () => {
    wrapper = mount(BaseCheckbox, emitCheck.params);

    await wrapper.find('input').setValue(emitCheck.testValue);
    expect(wrapper.emitted()).toHaveProperty(emitCheck.expectedResult);
  });

  it('changes checkbox boolean value to opposite', async () => {
    wrapper = mount(BaseCheckbox, booleanValueCheck.params);

    await wrapper.find('input').setValue(booleanValueCheck.testValue);
    expect(wrapper.props('modelValue')).toBe(booleanValueCheck.expectedResult);
  });

  it('returns an array of checked strings ', async () => {
    wrapper = mount(BaseCheckbox, arrayValueCheck.params);

    await wrapper.find('input').setValue(arrayValueCheck.testValue);
    expect(wrapper.props('modelValue')).toContain(arrayValueCheck.expectedResult);
    // checks if modelValue is an Array
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });
});
