<script setup lang="ts">
import type { Restaurant } from '@/types/items';

defineProps<{
  modelValue: string;
  options: Restaurant[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <label :class="$style.wrapper">
    <span :class="$style.label"><slot /></span>
    <select
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="$style.input"
    >
      <option disabled :value="null">Выберите ресторан из списка</option>
      <option v-for="option in options" :value="option._id" :key="option._id">
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<style module lang="sass">
.wrapper
  width: 100%

.input
  background-color: #333
  border: none
  padding: 10px
  color: #ededed
  width: 100%

  &:focus, &:active
    outline: 1px solid rgba(limegreen, 0.5)

.label
  display: inline-block
  margin-bottom: 10px
</style>
