import axios from '@/plugins/axios';
import type { AxiosRequestConfig } from 'axios';
import type { Burger, Restaurant } from '@/types/items';
import data, { addItem, updateItem, removeItem } from '@/store';

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
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id: string, config: AxiosRequestConfig | {} = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource: string;

  constructor(resource: string) {
    super(resource);
    this.#resource = resource;
  }

  async post(item: Item) {
    addItem(item, this.#resource);
    return data;
  }

  async put(editedItem: Item) {
    updateItem(editedItem, this.#resource);
    return data;
  }

  async delete(id: string) {
    removeItem(id, this.#resource);
    return data;
  }
}
