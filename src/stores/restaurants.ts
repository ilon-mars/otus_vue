import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Restaurant } from '@/types/items';
import { Resources } from '@/enums/resources';
import useApi from '@/hooks/useApi';
import { generateId } from '@/utils/helpers';

const api = await useApi(Resources.RESTAURANTS);

export const useRestaurantStore = defineStore('restaurants', {
  state: () => ({ restaurants: useStorage('restaurants', [] as Restaurant[]) }),

  actions: {
    async loadRestaurants() {
      this.restaurants = await api.$api.query();
    },

    async addRestaurant(restaurant: Restaurant) {
      const newRestaurant = { ...restaurant, _id: generateId() };
      this.restaurants.push(newRestaurant);
      await api.$api.post(restaurant);
    },
  },
});