<template>
  <section :class="$style.burger" v-if="burger">
    <h2 :class="$style.title" class="h2">{{ burger.name }}</h2>
    <img :src="burger.image" :alt="burger.name" :class="$style.img" />
    <div :class="$style.ingredients">
      <h3 class="h3" :class="$style.subtitle">Состав</h3>
      <ul :class="$style.list">
        <li v-for="item in burger.ingredients" :key="item" :class="$style.item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div :class="$style.restaurants">
      <h3 class="h3" :class="$style.subtitle">Рестораны, где его можно попробовать</h3>
      <ul v-if="burger.restaurants">
        <li v-for="item in burger.restaurants" :key="item" :class="$style.item">
          {{ item }}
        </li>
      </ul>
      <div v-else>Знаете ресторан, где готовят этот бургер? <button>Добавьте его</button></div>
    </div>
    <button :class="$style.deleteBtn" @click="deleteBurger(burger!._id!)">Удалить</button>
  </section>

  <div v-else>
    Кажется, произошла ошибка,
    <router-link :to="{ name: ResourceEnum.BURGERS }" :class="$style.goBack"
      >вернуться на главную</router-link
    >?
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBurgerStore } from '@/stores/burgers';
import { ResourceEnum } from '@/enums/resources';

const emit = defineEmits<{
  (e: 'openModal', modalType: string): void;
  (e: 'deleteItem'): void;
}>();

const store = useBurgerStore();

const route = useRoute();
const router = useRouter();

const { burgers } = storeToRefs(store);
const removeBurger = store.deleteBurger;

const burger = computed(() => burgers.value.find(burger => burger._id === route.params.id));

const deleteBurger = async (burgerId: string) => {
  await removeBurger(burgerId);
  emit('deleteItem');
  router.push({ name: ResourceEnum.BURGERS });
};
</script>

<style module lang="sass">
@import '@/assets/styles/_animations.sass'
@import '@/assets/styles/_functions.sass'

.burger
  display: grid
  grid-template-columns: 250px 1fr
  grid-template-rows: auto repeat(2, 1fr)
  gap: 10px
  position: relative
  color: inherit

  &:hover
    .deleteBtn
      display: block
      animation: fadeIn 0.5s

.title
  margin-bottom: 10px
  grid-area: 1 / 1 / 2 / 3

.subtitle
  margin-bottom: 10px

.img
  width: 250px
  height: 250px
  object-fit: cover
  grid-area: 2 / 1 / 3 / 2

.ingredients
  grid-area: 2 / 2 / 3 / 3

.restaurants
  grid-area: 3 / 1 / 4 / 3

.item
  margin-bottom: 5px

.deleteBtn
  background-color: $error-color
  padding: 5px
  position: absolute
  width: 125px
  height: 60px
  cursor: pointer
  transition: background-color, opacity $transition-duration ease-in-out
  bottom: 10px
  left: 0
  display: none

  &:hover
    background-color: tint($error-color, 30%)

.list
  display: flex
  flex-direction: column
  max-width: 100%

  .item
    margin-bottom: 5px

    &:not(:last-of-type)
      margin-right: 5px

.goBack
  color: inherit

  &:hover
    color: tint($light-color, 30%)
</style>
