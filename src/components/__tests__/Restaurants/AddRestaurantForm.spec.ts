import { mount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import { useRestaurantStore } from '@/stores/restaurants';
import { useBurgerStore } from '@/stores/burgers';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const restaurantStore = useRestaurantStore(pinia);
const burgerStore = useBurgerStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia],
  },
};

const renderElementsCheck = {
  title: 'Добавить ресторан',
  nameInputLabel: 'Название',
  addressLabel: 'Адрес заведения',
  searchLabel: 'Добавьте бургеры, которые здесь готовят',
  submitBtn: 'Добавить',
};

const formSubmitCheck = [
  {
    name: 'Name',
    address: '',
    menu: [],
    burgerList: [],
    submitEmitValue: 0,
  },
  {
    name: '',
    address: '',
    menu: [],
    burgerList: [],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    address: 'Address',
    menu: [],
    burgerList: [],
    submitEmitValue: 1,
  },
  {
    name: '',
    address: 'Address',
    menu: [],
    burgerList: [],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    address: 'Address',
    menu: ['burger'],
    burgerList: [{ name: 'burger', image: '', ingredients: [], restaurants: [] }],
    submitEmitValue: 1,
  },
  {
    name: '',
    address: 'Address',
    menu: ['burger'],
    burgerList: [{ name: 'burger', image: '', ingredients: [], restaurants: [] }],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    address: '',
    menu: ['burger'],
    burgerList: [{ name: 'burger', image: '', ingredients: [], restaurants: [] }],
    submitEmitValue: 0,
  },
  {
    name: '',
    address: '',
    menu: ['burger'],
    burgerList: [{ name: 'burger', image: '', ingredients: [], restaurants: [] }],
    submitEmitValue: 0,
  },
];

describe('AddRestaurantForm', () => {
  beforeEach(() => {
    wrapper = mount(AddRestaurantForm, mountOptions);
  });

  afterEach(() => {
    burgerStore.burgers = [];
  });

  it('renders all elements', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(renderElementsCheck.title);
    expect(wrapper.html()).toContain(renderElementsCheck.nameInputLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.addressLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.searchLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.submitBtn);
  });

  it.each(formSubmitCheck)(
    `form with filled
      - name: $name,
      - address: $address,
      - menu: $menu,
      - burgers: $burgerList
      - submits: $submitEmitValue`,
    async ({ name, address, menu, burgerList, submitEmitValue }) => {
      burgerStore.burgers = burgerList;

      const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })[0];
      const addressInput = wrapper.findAllComponents({ name: 'BaseInput' })[1];
      const menuSearch = wrapper.findComponent({ name: 'BaseSearch' });

      await nameInput.setValue(name);
      await addressInput.setValue(address);
      await menuSearch.setValue(menu);
      await wrapper.find('form').trigger('submit');

      expect(Object.keys(wrapper.emitted()).length).toBe(submitEmitValue);
    }
  );

  it('calls store addBurger action', async () => {
    const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })[0];
    const addressInput = wrapper.findAllComponents({ name: 'BaseInput' })[1];

    await nameInput.setValue('Name');
    await addressInput.setValue('address');
    await wrapper.find('form').trigger('submit');

    expect(restaurantStore.addRestaurant).toHaveBeenCalledWith({
      name: 'Name',
      address: 'address',
      menu: [],
    });
  });
});
