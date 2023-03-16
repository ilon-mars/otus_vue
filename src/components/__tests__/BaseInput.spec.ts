import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import BaseInput from '@/components/common/BaseInput.vue';

let wrapper: VueWrapper;

const mountOptions = {
  props: {
    modelValue: '',
    'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
  },

  slots: {
    default: 'Default',
  },
};

describe('BaseInput', () => {
  beforeEach(() => {
    wrapper = mount(BaseInput, mountOptions);
  });

  it('modelValue should be updated', async () => {
    await wrapper.find('input').setValue('test');
    expect(wrapper.props('modelValue')).toBe('test');
  });

  it('renders slot', () => {
    expect(wrapper.html()).toContain('Default');
  });
});
