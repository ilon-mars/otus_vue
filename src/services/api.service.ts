import type { AxiosRequestConfig } from 'axios';
import type { Burger, Restaurant } from '@/types/items';
import { query, addItem, updateItem, removeItem } from '@/store';

export type AllData = Burger[] | Restaurant[];
export type Item = Burger | Restaurant;

class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource: string;

  constructor(resource: string) {
    super();
    this.#resource = resource;
  }

  async query(config: AxiosRequestConfig | {} = {}) {
    return query(this.#resource, config);
  }

  // async get(id: string, config: AxiosRequestConfig | {} = {}) {
  // const { data } = await axios.get(`${this.#resource}/${id}`, config);
  // return data;
  // }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource: string;

  constructor(resource: string) {
    super(resource);
    this.#resource = resource;
  }

  async post(item: Item) {
    return await addItem(item, this.#resource);
  }

  async put(editedItem: Item) {
    return updateItem(editedItem, this.#resource);
  }

  async delete(id: string) {
    return removeItem(id, this.#resource);
  }
}
