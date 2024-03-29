<template>
  <div @click="closeSearch" @touchend="closeSearch">
    <h2 class="h2" :class="$style.title">Добавить ресторан</h2>
    <span :class="$style.tip">Все поля являются обязательными к заполнению</span>
    <form @submit.prevent="onSubmit" :class="$style.form">
      <BaseInput v-model="restaurantName" :class="$style.input">Название</BaseInput>
      <BaseInput v-model="restaurantAddress" :class="$style.input">Адрес заведения</BaseInput>
      <BaseSearch
        v-model="menu"
        :class="$style.search"
        :fullData="burgers"
        :isSearchVisible="isSearchVisible"
        @focus="isSearchVisible = true"
        @closeSearch="isSearchVisible = false"
        >Добавьте бургеры, которые здесь готовят</BaseSearch
      >
      <ul :class="$style.menu" v-if="menu.length">
        <li v-for="item in menu" :key="item" :class="$style.item">{{ item }}</li>
      </ul>
      <button type="submit" :class="$style.addBtn">Добавить</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddRestaurantForm',
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRestaurantStore } from '@/stores/restaurants';
import { useBurgerStore } from '@/stores/burgers';
import BaseInput from '@/components/common/BaseInput.vue';
import type { Restaurant } from '@/types/items';
import BaseSearch from '@/components/common/BaseSearch.vue';

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const restaurantsStore = useRestaurantStore();
const burgers = useBurgerStore().burgers;

const restaurantName = ref('');
const restaurantAddress = ref('');
const menu = ref([] as string[]);

const onSubmit = async () => {
  if (
    !restaurantName.value ||
    !restaurantAddress.value ||
    (menu.value.length === 0 && burgers.length)
  ) {
    return;
  }
  const restaurant: Restaurant = {
    name: restaurantName.value,
    address: restaurantAddress.value,
    menu: menu.value,
  };

  await restaurantsStore.addRestaurant(restaurant);

  restaurantName.value = '';
  restaurantAddress.value = '';
  menu.value = [];
  emit('submit');
};

const isSearchVisible = ref(false);

const closeSearch = (e: TouchEvent | MouseEvent) => {
  if (e.target && e.target instanceof HTMLElement) {
    if (!(e.target.closest('ul') || e.target.closest('input[type="search"]')))
      isSearchVisible.value = false;
  }
};
</script>

<style module lang="sass">
.form
  display: flex
  flex-direction: column
  width: 100%

.title
  margin-bottom: 15px

.tip
  display: inline-block
  font-size: 0.75rem
  margin-bottom: 25px

.input
  margin-bottom: 20px

.menu
  display: flex
  flex-wrap: wrap
  margin-bottom: 20px
  max-width: 100%

.item
  padding: 5px
  background-color: rgba($primary-color, $opacity-l)
  border: 2px solid rgba($primary-color, $opacity-m)
  margin-bottom: 5px

  &:not(:last-of-type)
    margin-right: 5px

.addBtn
  padding: 10px 15px
  background-color: rgba($primary-color, $opacity-l)
  cursor: pointer
  border: 2px solid transparent
  transition: border $transition-duration ease-in-out

  &:hover, &:active
    border-color: rgba($primary-color, $opacity-m)

.search
  margin-bottom: 5px
</style>
