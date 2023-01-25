<script setup lang="ts">
import { ref, reactive } from 'vue';
import BurgersList from '@/components/Burgers/BurgersList.vue';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import RestaurantsList from '@/components/Restaurants/RestaurantsList.vue';
import AppModal from '@/components/AppModal.vue';
import useApi from '@/hooks/useApi';
import { Resources } from '@/enums/resources';

const getBurgers = await useApi(Resources.BURGERS);
const getRestaurants = await useApi(Resources.RESTAURANTS);

const data = reactive({
  burgers: [],
  restaurants: [],
});

data.burgers = await getBurgers.$api.query();
data.restaurants = await getRestaurants.$api.query();

const toggle = ref(false);

const isModalOpen = ref(false);
const modalType = ref(Resources.BURGERS as string);

const openModal = (type: string) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const componentKey = ref(0);

const forceRerender = async () => {
  componentKey.value += 1;
  data.burgers = await getBurgers.$api.query();
  data.restaurants = await getRestaurants.$api.query();
};

const submitForm = async () => {
  closeModal();
  await forceRerender();
};
</script>

<template>
  <header :class="$style.header" class="wrapper">
    <span :class="$style.label">Показать бургеры</span>
    <label :class="$style.switch">
      <input type="checkbox" :class="$style.checkbox" v-model="toggle" />
      <span :class="$style.slider" />
    </label>
    <span :class="$style.label">Показать рестораны</span>
  </header>

  <component
    @openModal="openModal($event)"
    :is="toggle ? RestaurantsList : BurgersList"
    :burgers="data.burgers"
    :restaurants="data.restaurants"
    :key="componentKey"
    @deleteItem="forceRerender"
  />

  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <component
      :is="modalType === Resources.BURGERS ? AddBurgerForm : AddRestaurantForm"
      :restaurants="data.restaurants"
      :burgers="data.burgers"
      @submit="submitForm"
    />
  </AppModal>
</template>

<style module lang="sass">
.header
  height: 60px
  padding: 20px 0

.label:first-of-type
  margin-right: 5px

.label:last-of-type
  margin-left: 5px

.switch
  display: inline-block
  width: 60px
  height: 30px
  margin: 4px
  transform: translateY(50%)
  position: relative

  input
    display: none


.slider
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  border-radius: 30px
  box-shadow: 0 0 0 2px $neutral-color, 0 0 4px $neutral-color
  cursor: pointer
  border: 4px solid transparent
  overflow: hidden
  transition: $transition-duration

  &:before
    position: absolute
    content: ''
    width: 100%
    height: 100%
    background-color: $neutral-color
    border-radius: 30px
    transform: translateX(-30px) /*translateX(-(w-h))*/
    transition: $transition-duration


.checkbox:checked + .slider:before
  transform: translateX(30px) /*translateX(w-h)*/
  background-color: $primary-color


.checkbox:checked + .slider
  box-shadow: 0 0 0 2px $primary-color, 0 0 8px $primary-color
</style>
