<script setup lang="ts">
import type { Burger, Restaurant } from '@/types/items';
import { Resources } from '@/enums/resources';

const props = defineProps<{
  burgers: Burger[];
  restaurants: Restaurant[];
}>();

const emit = defineEmits<{
  (e: 'openModal', modalType: string): void;
}>();

const itemName = (itemId: string) => props.burgers.find((elem) => elem._id === itemId)?.name;
</script>

<template>
  <section class="wrapper">
    <ul v-if="restaurants.length">
      <li v-for="rest in restaurants" :key="rest._id" :class="$style.restaurant">
        <h2 class="h2" :class="$style.title">{{ rest.name }}</h2>
        <span :class="$style.address">{{ rest.address }}</span>

        <h3 class="h3" :class="$style.menu">Меню</h3>
        <ul>
          <li v-for="item in rest.menu" :key="item" :class="$style.item">{{ itemName(item) }}</li>
        </ul>
      </li>

      <li :class="$style.restaurantTemplate">
        <button class="h2" @click="emit('openModal', Resources.RESTAURANTS)">
          Добавить ресторан
        </button>
      </li>
    </ul>

    <h2 v-else class="h2">
      Нет доступных ресторанов, хотите
      <button class="add-button" @click="emit('openModal', Resources.RESTAURANTS)">добавить</button
      >?
    </h2>
  </section>
</template>

<style module lang="sass">
.restaurant
  margin-bottom: 35px

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
  button
    width: fit-content
    height: fit-content
    margin: auto auto
    transition: color 0.2s ease-in-out
    cursor: pointer
    color: #111

    &:hover
      color: #999
</style>
