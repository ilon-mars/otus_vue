import axios from '@/plugins/axios';
import type { AxiosRequestConfig } from 'axios';
import type { Item } from '@/types/responseData';
import data from '@/store';
import { generateId } from '@/utils/helpers';

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
    (data as any)[this.#resource].push({ ...item, _id: generateId() });
    return data;
  }

  async put(editedItem: Item) {
    const itemIndex = (data as any)[this.#resource].findIndex(
      (item: Item) => item._id === editedItem._id
    );
    (data as any)[this.#resource].splice(itemIndex, 1, editedItem);
    return data;
  }

  async delete(id: string) {
    const itemIndex = (data as any)[this.#resource].findIndex((item: Item) => item._id === id);
    (data as any)[this.#resource].splice(itemIndex, 1);
    return data;
  }
}
