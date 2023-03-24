<template>
  <section>
    <ul v-if="burgers.length">
      <li v-for="burger in burgers" :key="burger._id">
        <router-link
          :to="{ name: 'BurgerPage', params: { id: burger._id } }"
          :class="$style.burger"
        >
          <h2 :class="$style.title" class="h2">{{ burger.name }}</h2>
          <img
            :src="burger.image ? burger.image : burgerTemplateImg"
            :alt="burger.name"
            :class="$style.img"
          />
          <div :class="$style.ingredients">
            <h3 class="h3" :class="$style.subtitle">Состав</h3>
            <ul :class="$style.list">
              <li v-for="item in burger.ingredients" :key="item" :class="$style.item">
                {{ item }}
              </li>
            </ul>
          </div>
          <div :class="$style.restaurants">
            <h3 class="h3" :class="$style.subtitle">Рестораны, где можно попробовать</h3>
            <ul>
              <li v-for="item in burger.restaurants" :key="item" :class="$style.item">
                {{ item }}
              </li>
            </ul>
          </div>
        </router-link>
      </li>

      <li :class="$style.burgerTemplate">
        <img
          src="https://media.istockphoto.com/id/1175023475/photo/blank-black-opened-burger-box-mockup-isolated-on-dark-background.jpg?s=170667a&w=0&k=20&c=SKlX6GTprVigPGjWNOHUsVrjk4k4VqdGqZR1amAOLIs="
          alt="empty box"
        />
        <button class="h2" @click="emit('openModal', ResourceEnum.BURGERS)">Добавить бургер</button>
      </li>
    </ul>

    <h2 v-else class="h2">
      Список бургеров пуст. Хотите
      <button class="add-button" @click="emit('openModal', ResourceEnum.BURGERS)">добавить</button>?
    </h2>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBurgerStore } from '@/stores/burgers';
import { ResourceEnum } from '@/enums/resources';
import burgerTemplateImg from '@/assets/img/burgerTemplateImg.png';

const burgersStore = useBurgerStore();

const { burgers } = storeToRefs(burgersStore);

const emit = defineEmits<{
  (e: 'openModal', modalType: string): void;
}>();
</script>

<style module lang="sass">
@import '@/assets/styles/_animations.sass'
@import '@/assets/styles/_functions.sass'

.burger
  display: grid
  grid-template-columns: 250px 1fr
  grid-template-rows: 1fr repeat(2, minmax(125px, auto))
  gap: 10px
  margin-bottom: 30px
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
  grid-area: 2 / 1 / 4 / 2

.ingredients
  grid-area: 2 / 2 / 3 / 3

.restaurants
  grid-area: 3 / 2 / 4 / 3

.item
  margin-bottom: 5px

.burgerTemplate
  display: grid
  grid-template-columns: 250px 1fr
  margin-bottom: 30px
  gap: 10px

  img
    width: 250px
    height: 250px
    object-fit: cover

  button
    width: fit-content
    height: fit-content
    margin: auto auto
    transition: color $transition-duration ease-in-out
    cursor: pointer
    color: $darkest-color

    &:hover
      color: $light-neutral-color

.deleteBtn
  background-color: $error-color
  padding: 5px
  position: absolute
  width: 125px
  height: 60px
  cursor: pointer
  transition: background-color, opacity $transition-duration ease-in-out
  bottom: 10px
  left: 250px
  display: none

  &:hover
    background-color: tint($error-color, 30%)

.list
  display: flex
  flex-wrap: wrap
  max-width: 100%

  .item
    margin-bottom: 5px

    &:not(:last-of-type)
      margin-right: 5px
</style>
