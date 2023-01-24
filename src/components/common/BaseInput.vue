<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

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

<style module lang="sass">
.wrapper
  display: flex
  flex-direction: column

.input
  background-color: #333
  border: none
  padding: 10px
  color: #ededed

  &:focus, &:active
    outline: 1px solid rgba(limegreen, 0.5)

.label
  display: inline-block
  margin-bottom: 10px
</style>
