import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Restaurant } from '@/types/items';
import { ResourceEnum } from '@/enums/resources';
import useApi from '@/hooks/useApi';
import { generateId } from '@/utils/helpers';

const api = useApi(ResourceEnum.RESTAURANTS);

export const useRestaurantStore = defineStore('restaurants', {
  state: () => ({
    restaurants: useStorage('restaurants', [] as Restaurant[]),
    isLoading: false,
  }),

  actions: {
    async loadRestaurants() {
      this.restaurants = await api.$api.query();
    },

    async addRestaurant(restaurant: Restaurant) {
      const newRestaurant = { ...restaurant, _id: generateId() };

      try {
        this.restaurants = (await api.$api.post(newRestaurant)) as Restaurant[];
      } catch (error) {
        console.log('🥲', error);
      }
    },
  },
});
