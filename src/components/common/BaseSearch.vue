<template>
  <div :class="$style.root">
    <label :class="$style.wrapper">
      <span :class="$style.label"><slot /></span>
      <input
        type="search"
        v-bind="$attrs"
        :class="$style.input"
        :value="input"
        @input="onInput(($event.target as HTMLInputElement).value)"
        @focus="$emit('focus')"
      />
    </label>

    <ul :class="$style.list" v-show="isSearchVisible">
      <li
        v-for="elem in filteredList"
        :key="elem.name"
        @click="addToFinalList(elem.name)"
        :class="$style.item"
      >
        {{ elem.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SearchParam } from '@/types/baseSearchParams';

const props = defineProps<{
  modelValue: string[];
  fullData: SearchParam[];
  isSearchVisible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'focus'): void;
  (e: 'closeSearch'): void;
}>();

const input = ref('');
const finalList = ref(new Set<string>());

const filteredList = computed(() =>
  props.fullData.filter(item => item.name.toLowerCase().includes(input.value.toLowerCase()))
);

const onInput = (currentValue: string) => {
  input.value = currentValue;
  emit('update:modelValue', [...finalList.value]);
};

const addToFinalList = (name: string) => {
  finalList.value.add(name);
  input.value = '';
  emit('closeSearch');
  emit('update:modelValue', [...finalList.value]);
};
</script>

<style module lang="sass">
.root
  position: relative

.list
  position: absolute
  z-index: 2
  bottom: -85px
  left: 0
  right: 0
  width: 100%
  height: 100px
  background-color: $dark-color
  overflow-x: scroll

.item
  padding: 10px

  &:hover
    cursor: pointer
    background-color: $dark-neutral-color

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
