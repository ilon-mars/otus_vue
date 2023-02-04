<script setup lang="ts">
import { ref, reactive } from 'vue';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import AppModal from '@/components/AppModal.vue';
import useApi from '@/hooks/useApi';
import { Resources } from '@/enums/resources';
import AppHeader from '@/components/AppHeader.vue';

const getBurgers = await useApi(Resources.BURGERS);
const getRestaurants = await useApi(Resources.RESTAURANTS);

const data = reactive({
  burgers: [],
  restaurants: [],
});

data.burgers = await getBurgers.$api.query();
data.restaurants = await getRestaurants.$api.query();

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
  data.burgers = await getBurgers.$api.query();
  data.restaurants = await getRestaurants.$api.query();
};

const submitForm = async () => {
  closeModal();
  await updateData();
};
</script>

<template>
  <AppHeader />

  <main class="wrapper">
    <router-view v-slot="{ Component, route }">
      <component
        :burgers="data.burgers"
        :restaurants="data.restaurants"
        :is="Component"
        :key="route.fullPath"
        @openModal="openModal($event)"
        @deleteItem="updateData" />
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
