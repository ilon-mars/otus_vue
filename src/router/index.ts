import { createRouter, createWebHistory } from 'vue-router'
import { Resources } from '@/enums/resources'
import BurgerPage from '@/views/BurgerListPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: Resources.BURGERS,
      component: BurgerPage,
    },
    {
      path: `/${Resources.RESTAURANTS}`,
      name: Resources.RESTAURANTS,
      component: () => import('@/views/RestaurantListPage.vue'),
    },
    { path: '/:catchAll(.*)', redirect: { name: Resources.BURGERS } },
  ],
})
