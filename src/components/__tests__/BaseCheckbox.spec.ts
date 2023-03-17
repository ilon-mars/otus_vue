import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import { checkboxValues, inputSlot } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const booleanModelValueCheck = {
  props: {
    value: checkboxValues.value,
    modelValue: checkboxValues.booleanValue,
    'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
  },
};

const stringArrModelValueCheck = {
  props: {
    value: checkboxValues.value,
    modelValue: checkboxValues.stringArrValue,
    'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
  },
};

const slotCheck = {
  props: {
    value: checkboxValues.value,
    modelValue: checkboxValues.booleanValue,
  },
  slots: {
    default: inputSlot.slotValue,
  },
};

describe('BaseCheckbox', () => {
  it('boolean modelValue should be updated', async () => {
    wrapper = mount(BaseCheckbox, booleanModelValueCheck);

    await wrapper.find('input').setValue(!checkboxValues.booleanValue);
    expect(wrapper.props('modelValue')).toBe(!checkboxValues.booleanValue);
  });

  it('string array modelValue should be updated', async () => {
    wrapper = mount(BaseCheckbox, stringArrModelValueCheck);

    await wrapper.find('input').setValue(checkboxValues.value);
    expect(wrapper.props('modelValue')).toContain(checkboxValues.value);
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });

  it('renders slot', () => {
    wrapper = mount(BaseCheckbox, slotCheck);

    expect(wrapper.html()).toContain(inputSlot.expectedValue);
  });
});
