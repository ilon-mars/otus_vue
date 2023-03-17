import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';

let wrapper: VueWrapper;

const booleanModelValueCheck = {
  props: {
    modelValue: false,
    'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
    value: 'value',
  },
};

const stringArrModelValueCheck = {
  props: {
    modelValue: [] as string[],
    'onUpdate:modelValue': (e: string[] | boolean) => wrapper.setProps({ modelValue: e }),
    value: 'value',
  },
};

const slotCheck = {
  props: {
    modelValue: false,
    value: 'value',
  },
  slots: {
    default: 'Default',
  },
};

describe('BaseCheckbox', () => {
  it('boolean modelValue should be updated', async () => {
    wrapper = mount(BaseCheckbox, booleanModelValueCheck);

    await wrapper.find('input').setValue(true);
    expect(wrapper.props('modelValue')).toBe(true);
  });

  it('string array modelValue should be updated', async () => {
    wrapper = mount(BaseCheckbox, stringArrModelValueCheck);

    await wrapper.find('input').setValue('value');
    expect(wrapper.props('modelValue')).toContain('value');
    expect(wrapper.props('modelValue')).toBeTypeOf('object');
    expect(Array.isArray([wrapper.props('modelValue')])).toBe(true);
  });

  it('renders slot', () => {
    wrapper = mount(BaseCheckbox, slotCheck);

    expect(wrapper.html()).toContain('<span class="label">Default</span>');
  });
});
