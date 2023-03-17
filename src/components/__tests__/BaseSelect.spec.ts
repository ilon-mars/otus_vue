import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseSelect from '@/components/common/BaseSelect.vue';
import { formElemsSlots, OPTIONS } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const MODEL_DEFAULT_VALUE = [] as string[];

const DEFAULT_PROPS = {
  options: OPTIONS,
  modelValue: MODEL_DEFAULT_VALUE,
  'onUpdate:modelValue': (e: string[]) => wrapper.setProps({ modelValue: e }),
} as const;

const singleOptionCheck = {
  params: {
    props: DEFAULT_PROPS,
  },
  testValue: OPTIONS[0],
  expectedResult: OPTIONS[0],
};

const multipleOptionsCheck = {
  params: {
    props: {
      ...DEFAULT_PROPS,
      multiple: true,
    },
  },
  testValue: [OPTIONS[0], OPTIONS[2]],
  expectedResult: [OPTIONS[0], OPTIONS[2]],
};

const slotRenderCheck = {
  params: {
    props: DEFAULT_PROPS,
    slots: {
      default: formElemsSlots.slotValue,
    },
  },
  expectedResult: formElemsSlots.expectedValue,
};

const emitCheck = { ...singleOptionCheck, expectedResult: 'update:modelValue' };

describe('BaseSelect', () => {
  it('renders slot', () => {
    wrapper = mount(BaseSelect, slotRenderCheck.params);

    expect(wrapper.html()).toContain(slotRenderCheck.expectedResult);
  });

  it('emits update:modelValue', async () => {
    wrapper = mount(BaseSelect, emitCheck.params);

    await wrapper.get('select').setValue(emitCheck.testValue);
    expect(wrapper.emitted()).toHaveProperty(emitCheck.expectedResult);
  });

  it('selects single option', async () => {
    wrapper = mount(BaseSelect, singleOptionCheck.params);

    const select = wrapper.get('select');
    await select.setValue(singleOptionCheck.testValue);
    expect(select.element.value).toBe(singleOptionCheck.expectedResult);
    expect(wrapper.props('modelValue')).toContain(singleOptionCheck.expectedResult);
    // checks if modelValue is an Array
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });

  it('selects multiple options', async () => {
    wrapper = mount(BaseSelect, multipleOptionsCheck.params);

    const select = wrapper.get('select');
    await select.setValue(multipleOptionsCheck.testValue);

    expect(wrapper.props('modelValue')).toEqual(multipleOptionsCheck.expectedResult);
    // checks if modelValue is an Array
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });
});
