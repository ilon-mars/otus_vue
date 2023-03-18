<template>
  <h2 class="h2" :class="$style.title">Добавить бургер</h2>
  <form @submit.prevent="onSubmit" :class="$style.form">
    <BaseInput v-model="burgerName" :class="$style.input">Название</BaseInput>

    <BaseInput v-model="burgerImgUrl" :class="$style.input">Ссылка на изображение</BaseInput>

    <span :class="$style.label">Выберите ингредиенты</span>
    <ul :class="$style.list">
      <li v-for="item in Ingredients" :key="item">
        <BaseCheckbox v-model="burgerIngredients" :value="item">{{ item }}</BaseCheckbox>
      </li>
    </ul>

    <BaseSelect :options="restaurantList" v-model="burgerPlace" :class="$style.select" multiple
      >Где его готовят</BaseSelect
    >

    <button type="submit" :class="$style.addBtn">Добавить</button>
  </form>
</template>

<script lang="ts">
export default {
  name: 'AddBurgerForm',
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRestaurantStore } from '@/stores/restaurants';
import { useBurgerStore } from '@/stores/burgers';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import Ingredients from '@/enums/ingredients';
import type { Burger } from '@/types/items';

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const restaurants = useRestaurantStore().restaurants;
const burgersStore = useBurgerStore();

const burgerName = ref('');
const burgerImgUrl = ref('');
const burgerIngredients = ref([Ingredients.BUN]);
const burgerPlace = ref<Array<string>>([]);

const restaurantList = computed(() => restaurants.map(item => item.name));

const onSubmit = async () => {
  const ingredients = Object.values(burgerIngredients.value);

  if (
    !burgerName.value ||
    ingredients.length === 0 ||
    (!burgerPlace.value.length && restaurants.length)
  ) {
    return;
  }

  const burger: Burger = {
    name: burgerName.value,
    image: burgerImgUrl.value,
    ingredients: ingredients,
    restaurants: [...burgerPlace.value],
  };

  await burgersStore.addBurger(burger);

  burgerName.value = '';
  burgerImgUrl.value = '';
  burgerIngredients.value = [Ingredients.BUN];
  burgerPlace.value = [];
  emit('submit');
};
</script>

<style module lang="sass">
.form
  display: flex
  flex-direction: column
  width: 100%

.title
  margin-bottom: 15px

.input
  margin-bottom: 20px

.label
  display: inline-block
  margin-bottom: 10px

.list
  display: grid
  grid-template-columns: repeat(4, 1fr)
  margin-bottom: 20px

.select
  margin-bottom: 20px

.addBtn
  padding: 10px 15px
  background-color: rgba($primary-color, $opacity-l)
  cursor: pointer
  border: 2px solid transparent
  transition: border $transition-duration ease-in-out

  &:hover, &:active
    border-color: rgba($primary-color, $opacity-m)
</style>
