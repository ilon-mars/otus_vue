import { SearchParam } from '@/types/baseSearchParams';
import { Restaurant } from '@/types/items';

export const OPTIONS = ['option 1', 'option 2', 'option 3'];
export const SEARCH_DATA: SearchParam[] = [{ name: 'Item 1' }, { name: 'Theme 2' }];
export const RESTAURANTS: Restaurant[] = [{ name: 'cafe', address: 'street', menu: [] }];

export const formElemsSlots = {
  slotValue: 'Default',
  expectedValue: '<span class="label">Default</span>',
};
