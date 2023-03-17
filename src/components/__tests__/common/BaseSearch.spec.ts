import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseSearch from '@/components/common/BaseSearch.vue';
import { formElemsSlots, SEARCH_DATA } from '@/utils/testDataMocks';
import { TestCaseParams } from '@/types/testCaseParams';

let wrapper: VueWrapper;

const MODEL_DEFAULT_VALUE = [] as string[];

const DEFAULT_PROPS = {
  modelValue: MODEL_DEFAULT_VALUE,
  fullData: SEARCH_DATA,
  'onUpdate:modelValue': (e: string[]) => wrapper.setProps({ modelValue: e }),
} as const;

const multipleValuesCheck: TestCaseParams = {
  params: {
    props: DEFAULT_PROPS,
  },
  testValue: 'Em',
  expectedResult: [SEARCH_DATA[0].name, SEARCH_DATA[1].name],
};

const uniqueValueCheck: TestCaseParams = {
  params: {
    props: DEFAULT_PROPS,
  },
  testValue: 2,
  expectedResult: [SEARCH_DATA[1].name],
};

const slotRenderCheck: TestCaseParams = {
  params: {
    props: DEFAULT_PROPS,
    slots: {
      default: formElemsSlots.slotValue,
    },
  },
  expectedResult: formElemsSlots.expectedValue,
};

const emitCheck: TestCaseParams = {
  ...multipleValuesCheck,
  expectedResult: 'update:modelValue',
};

const visibleResultsCheck: TestCaseParams = {
  ...uniqueValueCheck,
  expectedResult: 'style="display: none;"',
};

const resultSelection: TestCaseParams = {
  params: {
    props: DEFAULT_PROPS,
  },
  testValue: 0,
  expectedResult: [SEARCH_DATA[0].name],
};

describe('BaseSearch', () => {
  it('renders slot', () => {
    wrapper = mount(BaseSearch, slotRenderCheck.params);

    expect(wrapper.html()).toContain(slotRenderCheck.expectedResult);
  });

  it('emits update:modelValue', async () => {
    wrapper = mount(BaseSearch, emitCheck.params);

    await wrapper.get('input').setValue(emitCheck.testValue);
    expect(wrapper.emitted()).toHaveProperty(emitCheck.expectedResult);
  });

  it('finds multiple results', async () => {
    wrapper = mount(BaseSearch, multipleValuesCheck.params);

    await wrapper.get('input').setValue(multipleValuesCheck.testValue);
    expect(wrapper.findAll('.item')).toHaveLength(multipleValuesCheck.expectedResult.length);
  });

  it('finds unique value', async () => {
    wrapper = mount(BaseSearch, uniqueValueCheck.params);

    await wrapper.get('input').setValue(uniqueValueCheck.testValue);
    expect(wrapper.findAll('.item')).toHaveLength(uniqueValueCheck.expectedResult.length);
  });

  it('shows search results', async () => {
    wrapper = mount(BaseSearch, visibleResultsCheck.params);

    await wrapper.get('input').trigger('focus');
    expect(wrapper.html()).not.toContain(visibleResultsCheck.expectedResult);
  });

  it('selects search result', async () => {
    wrapper = mount(BaseSearch, resultSelection.params);

    await wrapper.get('input').trigger('focus');
    wrapper.findAll('.item')[resultSelection.testValue].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(resultSelection.expectedResult);
  });
});
