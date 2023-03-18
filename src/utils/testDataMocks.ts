import { SearchParam } from '@/types/baseSearchParams';
import { Burger, Restaurant } from '@/types/items';

export const OPTIONS = ['option 1', 'option 2', 'option 3'];
export const SEARCH_DATA: SearchParam[] = [{ name: 'Item 1' }, { name: 'Theme 2' }];
export const RESTAURANTS: Restaurant[] = [{ name: 'cafe', address: 'street', menu: [] }];
export const BURGERS: Burger[] = [
  { name: 'burger', image: '', ingredients: [], restaurants: [] },
  { name: 'burger', image: 'src', ingredients: [], restaurants: [] },
];

export const formElemsSlots = {
  slotValue: 'Default',
  expectedValue: '<span class="label">Default</span>',
};
