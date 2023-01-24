import { CrudApiService } from '@/services/api.service';

export default async function useApi(resourceUrl: string = '') {
  const $api = new CrudApiService(resourceUrl);
  return { $api };
}
