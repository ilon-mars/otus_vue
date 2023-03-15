import { createRouter, createWebHistory } from 'vue-router';
import { ResourceEnum } from '@/enums/resources';
import BurgerListPage from '@/views/BurgerListPage.vue';
import { useRestaurantStore } from '@/stores/restaurants';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: ResourceEnum.BURGERS,
      component: BurgerListPage,
    },
    {
      path: `/${ResourceEnum.BURGERS}/:id`,
      name: 'BurgerPage',
      component: () => import('@/views/BurgerPage.vue'),
    },
    {
      path: `/${ResourceEnum.RESTAURANTS}`,
      name: ResourceEnum.RESTAURANTS,
      component: () => import('@/views/RestaurantListPage.vue'),
      beforeEnter: async () => {
        const restaurantsStore = useRestaurantStore();

        if (!restaurantsStore.restaurants.length) {
          await restaurantsStore.loadRestaurants();
        }
      },
    },
    { path: '/:catchAll(.*)', redirect: { name: ResourceEnum.BURGERS } },
  ],
});

export default router;
