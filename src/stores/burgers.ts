import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Burger } from '@/types/items';
import { ResourceEnum } from '@/enums/resources';
import useApi from '@/hooks/useApi';
import { generateId } from '@/utils/helpers';

const api = useApi(ResourceEnum.BURGERS);

export const useBurgerStore = defineStore('burgers', {
  state: () => ({ burgers: useStorage('burgers', [] as Burger[]) }),

  actions: {
    async loadBurgers() {
      this.burgers = await api.$api.query();
    },

    async addBurger(burger: Burger) {
      const newBurger = { ...burger, _id: generateId() };

      try {
        this.burgers = (await api.$api.post(newBurger)) as Burger[];
      } catch (error) {
        console.log('🥲', error);
      }
    },

    async deleteBurger(burgerId: string) {
      try {
        const itemIndex = this.burgers.findIndex((item: Burger) => item._id === burgerId);
        this.burgers.splice(itemIndex, 1);
        await api.$api.delete(burgerId);
      } catch (error) {
        console.log('🥲', error);
      }
    },
  },
});
