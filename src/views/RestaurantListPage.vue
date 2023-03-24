<template>
  <section class="wrapper">
    <ul v-if="restaurants.length" :class="$style.list">
      <li v-for="rest in restaurants" :key="rest._id" :class="$style.restaurant">
        <h2 class="h2" :class="$style.title">{{ rest.name }}</h2>
        <span :class="$style.address">{{ rest.address }}</span>

        <div v-if="rest.menu.length">
          <h3 class="h3" :class="$style.menu">Меню</h3>
          <ul>
            <li v-for="item in rest.menu" :key="item" :class="$style.item">{{ item }}</li>
          </ul>
        </div>

        <div v-else>
          Знаете, что тут готовят?
          <button @click="emit('openModal', ResourceEnum.BURGERS)" class="add-button">
            Добавьте бургер
          </button>
        </div>
      </li>

      <li :class="$style.restaurantTemplate">
        <button class="h2" @click="emit('openModal', ResourceEnum.RESTAURANTS)">
          Добавить ресторан
        </button>
      </li>
    </ul>

    <h2 v-else class="h2">
      Нет доступных ресторанов, хотите
      <button class="add-button" @click="emit('openModal', ResourceEnum.RESTAURANTS)">
        добавить</button
      >?
    </h2>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ResourceEnum } from '@/enums/resources';
import { useRestaurantStore } from '@/stores/restaurants';

const restaurantsStore = useRestaurantStore();
const { restaurants } = storeToRefs(restaurantsStore);

const emit = defineEmits<{
  (e: 'openModal', modalType: string): void;
}>();
</script>

<style module lang="sass">
.list
  display: flex
  flex-wrap: wrap
  gap: 35px

.restaurant
  min-width: 300px
  max-width: 32%
  flex-grow: 1

.title
  margin-bottom: 10px

.address
  display: inline-block
  margin-bottom: 20px

.menu
  margin-bottom: 10px

.item
  margin-bottom: 5px

.restaurantTemplate
  display: flex
  align-items: center
  justify-content: center

  button
    width: fit-content
    height: fit-content
    margin: auto auto
    transition: color $transition-duration ease-in-out
    cursor: pointer
    color: $darkest-color

    &:hover
      color: $light-neutral-color
</style>
