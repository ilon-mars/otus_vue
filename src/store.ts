import { reactive } from 'vue';
import type { Burger, Restaurant } from '@/types/items';
import type { Item } from '@/services/api.service';

interface Data<T, U> {
  burgers: Array<T>;
  restaurants: Array<U>;
}

const data: Data<Burger, Restaurant> = reactive({
  burgers: [],
  restaurants: [],
});

export const addItem = (item: Item, key: string) => {
  (data as any)[key].push(item);
};

export const updateItem = (editedItem: Item, key: string) => {
  const itemIndex = (data as any)[key].findIndex((item: Item) => item._id === editedItem._id);
  (data as any)[key].splice(itemIndex, 1, editedItem);
};

export const removeItem = (id: string, key: string) => {
  const itemIndex = (data as any)[key].findIndex((item: Item) => item._id === id);
  (data as any)[key].splice(itemIndex, 1);
};

export default data;
