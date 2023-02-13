<script setup lang="ts">
import { ref } from 'vue';
import type { Item } from '@/types/responseData';

interface Props {
  modelValue: string[];
  options: string[];
  multiple?: boolean;
}

withDefaults(defineProps<Props>(), {
  multiple: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const optionValues = ref<Array<string>>([]);

const onChange = (elem: HTMLSelectElement) => {
  const selectedOptionList = Array.from(elem.options).filter(option => option.selected && option.value);
  optionValues.value = selectedOptionList.map(item => item.value)
  emit('update:modelValue', optionValues.value);
  console.log('emit', optionValues.value)
}
</script>

<template>
  <label :class="$style.wrapper">
    <span :class="$style.label"><slot /></span>
    <select
      :value="modelValue"
      @change="onChange(($event.target as HTMLSelectElement))"
      :class="$style.select"
      :multiple="multiple"
    >
      <option disabled :value="null">Выберите ресторан из списка</option>
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="optionValues.includes(option)"
        :class="[optionValues.includes(option) && $style.option]">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<style module lang="sass">
.wrapper
  width: 100%

.select
  background-color: $dark-color
  border: none
  padding: 10px
  color: $light-color
  width: 100%

  &:focus, &:active
    outline: 1px solid rgba($primary-color, $opacity-m)

    .option
      background-color: rgba($primary-color, $opacity-m)
      color: $light-color

.label
  display: inline-block
  margin-bottom: 10px

.option
  background-color: rgba($primary-color, $opacity-m)
  color: $light-color
</style>
