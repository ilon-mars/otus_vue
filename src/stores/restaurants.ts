import { defineStore } from 'pinia';
import type { Restaurant } from '@/types/items';
import { Resources } from '@/enums/resources';
import useApi from '@/hooks/useApi';
import { generateId } from '@/utils/helpers';

export type RestaurantsState = {
  restaurants: Restaurant[];
};

const api = await useApi(Resources.RESTAURANTS);

export const useRestaurantStore = defineStore('restaurants', {
  state: () => ({ restaurants: [] } as RestaurantsState),

  getters: {
    restaurantName: state => {
      return (restaurantId: string) =>
        state.restaurants.find(item => item._id === restaurantId)?.name;
    },
  },

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
