<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import Ingredients from '@/enums/ingredients';
import type { Burger } from '@/types/items';
import useApi from '@/hooks/useApi';
import { Resources } from '@/enums/resources';

defineProps<{
  options: string[];
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const burgerName = ref('');
const burgerImgUrl = ref('');
const burgerIngredients = ref([Ingredients.BUN]);
const burgerPlace = ref<Array<string>>([]);

const addBurger = await useApi(Resources.BURGERS);

const onSubmit = async () => {
  const ingredients = Object.values(burgerIngredients.value);

  if (!burgerName.value || !burgerImgUrl.value || ingredients.length === 0 || !burgerPlace.value) {
    return;
  }

  const burger: Burger = {
    name: burgerName.value,
    image: burgerImgUrl.value,
    ingredients: ingredients,
    restaurants: [...burgerPlace.value],
  };

  await addBurger.$api.post(burger);

  burgerName.value = '';
  burgerImgUrl.value = '';
  burgerIngredients.value = [Ingredients.BUN];
  burgerPlace.value = [];
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

    <BaseSelect :options="options" v-model="burgerPlace" :class="$style.select" multiple
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
  background-color: rgba($primary-color, $opacity-l)
  cursor: pointer
  border: 2px solid transparent
  transition: border $transition-duration ease-in-out

  &:hover, &:active
    border-color: rgba($primary-color, $opacity-m)
</style>
