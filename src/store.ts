import { reactive } from 'vue';
import type { AxiosRequestConfig } from 'axios';
import axios from '@/plugins/axios';
import type { Burger, Restaurant } from '@/types/items';
import type { Item } from '@/services/api.service';

interface Data<T, U> {
  burgers: Array<T>;
  restaurants: Array<U>;
}

type PromiseResponse = Burger[] | Restaurant[] | string;
type Handler = () => Burger[] | Restaurant[];

const CHANCE_COEF = 0.9;

const appData: Data<Burger, Restaurant> = reactive({
  burgers: [],
  restaurants: [],
});

const promiseWrapper = (handler: Handler) => {
  return new Promise<PromiseResponse>((resolve, reject) => {
    const chance = Math.random();

    if (chance <= CHANCE_COEF) {
      resolve(handler());
    } else {
      reject('ooops, adding item went wrong...');
    }
  });
};

export const query = async (resource: string, config: AxiosRequestConfig | {} = {}) => {
  try {
    const { data } = await axios.get(resource, config);
    (appData as any)[resource] = data;
    return (appData as any)[resource];
  } catch (e) {
    return e;
  }
};

export const addItem = (item: Item, key: string) => {
  return promiseWrapper(() => {
    (appData as any)[key].push(item);
    return (appData as any)[key];
  });
};

export const updateItem = (editedItem: Item, key: string) => {
  return promiseWrapper(() => {
    const itemIndex = (appData as any)[key].findIndex((item: Item) => item._id === editedItem._id);
    (appData as any)[key].splice(itemIndex, 1, editedItem);
    return (appData as any)[key];
  });
};

export const removeItem = (id: string, key: string) => {
  return promiseWrapper(() => {
    const itemIndex = (appData as any)[key].findIndex((item: Item) => item._id === id);
    (appData as any)[key].splice(itemIndex, 1);
    return (appData as any)[key];
  });
};

export default appData;
