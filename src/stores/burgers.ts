import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Burger } from '@/types/items';
import { Resources } from '@/enums/resources';
import useApi from '@/hooks/useApi';
import { generateId } from '@/utils/helpers';

const api = await useApi(Resources.BURGERS);

export const useBurgerStore = defineStore('burgers', {
  state: () => ({ burgers: useStorage('burgers', [] as Burger[]) }),

  getters: {
    burgerName: state => {
      return (burgerId: string) => state.burgers.find(item => item._id === burgerId)?.name;
    },
  },

  actions: {
    async loadBurgers() {
      this.burgers = await api.$api.query();
    },

    async addBurger(burger: Burger) {
      const newBurger = { ...burger, _id: generateId() };
      this.burgers.push(newBurger);
      await api.$api.post(newBurger);
    },

    async deleteBurger(burgerId: string) {
      const itemIndex = this.burgers.findIndex((item: Burger) => item._id === burgerId);
      this.burgers.splice(itemIndex, 1);
      await api.$api.delete(burgerId);
    },
  },
});
