<template>
  <AppHeader />

  <main class="wrapper">
    <router-view v-slot="{ Component, route }">
      <Transition name="slide">
        <component
          :burgers="data.burgers"
          :restaurants="data.restaurants"
          :is="Component"
          :key="route.fullPath"
          @openModal="openModal($event)"
          @deleteItem="updateData"
        />
      </Transition>
    </router-view>
  </main>

  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <component
      :is="modalType === Resources.BURGERS ? AddBurgerForm : AddRestaurantForm"
      :restaurants="data.restaurants"
      :burgers="data.burgers"
      @submit="submitForm"
    />
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import AppModal from '@/components/AppModal.vue';
import useApi from '@/hooks/useApi';
import { Resources } from '@/enums/resources';
import AppHeader from '@/components/AppHeader.vue';
import data from '@/store';
import { RouterView } from 'vue-router';

const burgersApi = await useApi(Resources.BURGERS);
const restaurantsApi = await useApi(Resources.RESTAURANTS);

data.burgers = await burgersApi.$api.query();
data.restaurants = await restaurantsApi.$api.query();

const isModalOpen = ref(false);
const modalType = ref(Resources.BURGERS as string);

const openModal = (type: string) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const updateData = async () => {
  console.log('updated');
};

const submitForm = async () => {
  closeModal();
  await updateData();
};
</script>

<style lang="sass">
.slide-enter-active,
.slide-leave-active
  position: absolute
  transition: all 0.7s ease-in

.slide-enter-from
  left: -100%

.slide-enter-to
  left: 0

.slide-leave-from
  transform: scale(1)

.slide-leave-to
  transform: scale(0.8)
  opacity: 0
</style>
