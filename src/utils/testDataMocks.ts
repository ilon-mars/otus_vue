const OPTIONS = ['option 1', 'option 2', 'option 3'];

export const checkboxValues = {
  booleanValue: false,
  stringArrValue: [] as string[],
  value: 'value',
};

export const inputValues = {
  modelValue: '',
  testValue: 'test',
  expectedValue: 'test',
};

export const selectValues = {
  modelValue: [] as string[],
  emptyOptions: [] as string[],
  options: OPTIONS,
  expectedValue: OPTIONS[0],
  expectedMultipleValue: [OPTIONS[0], OPTIONS[2]],
};

export const inputSlot = {
  slotValue: 'Default',
  expectedValue: '<span class="label">Default</span>',
};
