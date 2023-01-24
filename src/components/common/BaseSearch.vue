<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string[];
  fullData: any[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const input = ref('');
const menu = ref(new Set<string>());

const filteredList = computed(() =>
  props.fullData.filter((item) => item.name.toLowerCase().includes(input.value.toLowerCase()))
);

const onInput = (currentValue: string) => {
  input.value = currentValue;
  emit('update:modelValue', [...menu.value]);
};

const addToMenu = (name: string) => {
  menu.value.add(name);
  isSearchVisible.value = false;
  input.value = '';
  emit('update:modelValue', [...menu.value]);
};

const isSearchVisible = ref(false);
</script>

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
        @focus="isSearchVisible = true"
      />
    </label>

    <ul :class="$style.list" v-show="isSearchVisible">
      <li
        v-for="elem in filteredList"
        :key="elem"
        @click="addToMenu(elem.name)"
        :class="$style.item"
      >
        {{ elem.name }}
      </li>
    </ul>
  </div>
</template>

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
  background-color: #333
  overflow-x: scroll

.item
  padding: 10px

  &:hover
    cursor: pointer
    background-color: #555

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
