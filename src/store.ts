import { reactive } from 'vue';
import type { Burger, Restaurant } from '@/types/items';

interface Data<T, U> {
  burgers: Array<T>;
  restaurants: Array<U>;
}

const data: Data<Burger, Restaurant> = reactive({
  burgers: [],
  restaurants: [],
});

export default data;
