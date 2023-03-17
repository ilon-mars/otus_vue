import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseSelect from '@/components/common/BaseSelect.vue';
import { selectValues, inputSlot } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const singleOptionsCheck = {
  props: {
    modelValue: selectValues.modelValue,
    'onUpdate:modelValue': (e: string[]) => wrapper.setProps({ modelValue: e }),
    options: selectValues.options,
  },
};

const multipleOptionsCheck = {
  props: {
    modelValue: selectValues.modelValue,
    'onUpdate:modelValue': (e: string[]) => wrapper.setProps({ modelValue: e }),
    options: selectValues.options,
    multiple: true,
  },
};

const slotCheck = {
  props: {
    modelValue: selectValues.modelValue,
    options: selectValues.emptyOptions,
  },
  slots: {
    default: inputSlot.slotValue,
  },
};

describe('BaseSelect', () => {
  it('renders slot', () => {
    wrapper = mount(BaseSelect, slotCheck);

    expect(wrapper.html()).toContain(inputSlot.expectedValue);
  });

  it('selects single option', async () => {
    wrapper = mount(BaseSelect, singleOptionsCheck);

    const select = wrapper.get('select');
    await select.setValue(selectValues.options[0]);
    expect(select.element.value).toBe(selectValues.expectedValue);
    expect(wrapper.props('modelValue')).toContain(selectValues.expectedValue);
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });

  it('selects multiple options', async () => {
    wrapper = mount(BaseSelect, multipleOptionsCheck);

    const select = wrapper.get('select');
    await select.setValue([selectValues.options[0], selectValues.options[2]]);

    expect(wrapper.props('modelValue')).toEqual(selectValues.expectedMultipleValue);
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });

  it('emits update:modelValue', async () => {
    wrapper = mount(BaseSelect, singleOptionsCheck);

    await wrapper.get('select').setValue(selectValues.options[0]);
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
