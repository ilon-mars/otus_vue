import Ingredients from '@/enums/ingredients';
import { SearchParam } from '@/types/baseSearchParams';
import { Burger, Restaurant } from '@/types/items';

export const OPTIONS = ['option 1', 'option 2', 'option 3'];
export const SEARCH_DATA: SearchParam[] = [{ name: 'Item 1' }, { name: 'Theme 2' }];
export const RESTAURANTS: Restaurant[] = [{ _id: 'r1', name: 'cafe', address: 'street', menu: [] }];
export const BURGERS: Burger[] = [
  { _id: 'b1', name: 'burger with empty fields', image: '', ingredients: [], restaurants: [] },
  {
    _id: 'b2',
    name: 'burger with filled fields',
    image: 'src',
    ingredients: [Ingredients.BUN],
    restaurants: [RESTAURANTS[0].name],
  },
];

export const formElemsSlots = {
  slotValue: 'Default',
  expectedValue: '<span class="label">Default</span>',
};
