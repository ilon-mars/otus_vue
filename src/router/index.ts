import { createRouter, createWebHistory } from 'vue-router';
import { Resources } from '@/enums/resources';
import BurgerListPage from '@/views/BurgerListPage.vue';
import { useRestaurantStore } from '@/stores/restaurants';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: Resources.BURGERS,
      component: BurgerListPage,
    },
    {
      path: `/${Resources.BURGERS}/:id`,
      name: 'BurgerPage',
      component: () => import('@/views/BurgerPage.vue'),
    },
    {
      path: `/${Resources.RESTAURANTS}`,
      name: Resources.RESTAURANTS,
      component: () => import('@/views/RestaurantListPage.vue'),
      beforeEnter: async () => {
        const restaurantsStore = useRestaurantStore();

        if (!restaurantsStore.restaurants.length) {
          await restaurantsStore.loadRestaurants();
        }
      },
    },
    { path: '/:catchAll(.*)', redirect: { name: Resources.BURGERS } },
  ],
});

export default router;
