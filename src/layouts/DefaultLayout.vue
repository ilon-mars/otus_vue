<template>
  <AppHeader />

  <main class="wrapper">
    <router-view v-slot="{ Component, route }">
      <Transition name="slide">
        <component
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
      @submit="submitForm"
    />
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import AppModal from '@/components/AppModal.vue';
import { useBurgerStore } from '@/stores/burgers';
import { useRestaurantStore } from '@/stores/restaurants';
import { Resources } from '@/enums/resources';

const restaurantsStore = useRestaurantStore();
const burgersStore = useBurgerStore();

await restaurantsStore.loadRestaurants();
await burgersStore.loadBurgers();

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
  transition: all 0.6s ease

.slide-enter-from
  left: -100%

.slide-enter-to
  left: 0%

.slide-leave-from
  transform: scale(1)

.slide-leave-to
  transform: scale(0.8)
  opacity: 0
</style>
