<template>
  <label :class="$style.wrapper">
    <span :class="$style.label"><slot /></span>
    <input
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="$style.input"
    />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style module lang="sass">
.wrapper
  display: flex
  flex-direction: column

.input
  background-color: $dark-color
  border: none
  padding: 10px
  color: $light-color

  &:focus, &:active
    outline: 1px solid rgba($primary-color, $opacity-m)

.label
  display: inline-block
  margin-bottom: 10px
</style>
