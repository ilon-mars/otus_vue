import { CrudApiService } from '@/services/api.service';

export default function useApi(resourceUrl: string = '') {
  const $api = new CrudApiService(resourceUrl);
  return { $api };
}
