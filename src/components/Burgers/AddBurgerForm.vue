<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import Ingredients from '@/enums/ingredients';
import type { Restaurant } from '@/types/items';
import useApi from '@/hooks/useApi';
import { Resources } from '@/enums/resources';
import type { Item } from '@/types/responseData';

defineProps<{
  restaurants: Restaurant[];
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const burgerName = ref('');
const burgerImgUrl = ref('');
const burgerIngredients = ref([Ingredients.BUN]);
const burgerPlace = ref('');

const addBurger = await useApi(Resources.BURGERS);

const onSubmit = async () => {
  const ingredients = Object.values(burgerIngredients.value);
  const restaurants: string[] = [burgerPlace.value];

  if (!burgerName.value || !burgerImgUrl.value || ingredients.length === 0 || !burgerPlace.value) {
    return;
  }

  const burger: Item = {
    name: burgerName.value,
    image: burgerImgUrl.value,
    ingredients: ingredients,
    restaurants: restaurants,
  };

  await addBurger.$api.post(burger);

  burgerName.value = '';
  burgerImgUrl.value = '';
  burgerIngredients.value = [Ingredients.BUN];
  burgerPlace.value = '';
  emit('submit');
};
</script>

<template>
  <h2 class="h2" :class="$style.title">Добавить бургер</h2>
  <span :class="$style.tip">Все поля являются обязательными к заполнению</span>
  <form @submit.prevent="onSubmit" :class="$style.form">
    <BaseInput v-model="burgerName" :class="$style.input">Название</BaseInput>

    <BaseInput v-model="burgerImgUrl" :class="$style.input">Ссылка на изображение</BaseInput>

    <span :class="$style.label">Выберите ингредиенты</span>
    <ul :class="$style.list">
      <li v-for="item in Ingredients" :key="item">
        <BaseCheckbox v-model="burgerIngredients" :value="item">{{ item }}</BaseCheckbox>
      </li>
    </ul>

    <BaseSelect :options="restaurants" v-model="burgerPlace" :class="$style.select"
      >Где его готовят</BaseSelect
    >

    <button type="submit" :class="$style.addBtn">Добавить</button>
  </form>
</template>

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
  background-color: rgba(limegreen, 0.2)
  cursor: pointer
  border: 2px solid transparent
  transition: border 0.2s ease-in-out

  &:hover, &:active
    border-color: rgba(limegreen, 0.5)
</style>
