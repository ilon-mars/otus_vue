import axios from '@/plugins/axios';
import type { AxiosRequestConfig } from 'axios';
import type { Item } from '@/types/responseData';

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
    const { data } = await axios.post(this.#resource, item);
    return data;
  }

  async put(editedItem: Item) {
    const { data } = await axios.put(`${this.#resource}/${editedItem._id}`, editedItem);
    return data;
  }

  async delete(id: string) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}
