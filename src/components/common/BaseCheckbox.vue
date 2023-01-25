<script setup lang="ts">
import { computed } from 'vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';

const props = defineProps<{
  modelValue: string[] | boolean;
  value: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[] | boolean): void;
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <label :class="$style.wrapper">
    <span :class="$style.label"><slot /></span>
    <input type="checkbox" :value="value" v-model="model" :class="$style.input" />
    <CheckIcon :class="$style.checkmark" />
  </label>
</template>

<style module lang="sass">
.wrapper
  display: flex
  align-items: center
  justify-content: space-between
  position: relative
  padding: 5px
  cursor: pointer
  border: 2px solid transparent
  transition: all $transition-duration ease-in-out
  overflow: hidden

  &:hover
    background-color: $dark-neutral-color

  &:has(.input:checked)
    background-color: rgba($primary-color, $opacity-l)
    border-color: rgba($primary-color, $opacity-m)

.label
  margin-right: 5px

.checkmark
  width: 20px
  height: 20px
  opacity: 0
  fill: $primary-color

.input
  position: absolute
  opacity: 0
  cursor: pointer
  height: 0
  width: 0

  &:checked
    & ~ .checkmark
      opacity: 1
</style>
