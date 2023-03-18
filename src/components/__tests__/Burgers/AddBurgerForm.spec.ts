import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import { useBurgerStore } from '@/stores/burgers';
import Ingredients from '@/enums/ingredients';
import { useRestaurantStore } from '@/stores/restaurants';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const burgerStore = useBurgerStore(pinia);
const restaurantStore = useRestaurantStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia],
  },
};

const renderElementsCheck = {
  title: 'Добавить бургер',
  nameInputLabel: 'Название',
  imgInputLabel: 'Ссылка на изображение',
  burgerListLabel: 'Выберите ингредиенты',
  placeSelectLabel: 'Где его готовят',
  submitBtn: 'Добавить',
};

const formSubmitCheck = [
  {
    name: 'Name',
    ingredients: [],
    placesList: [],
    restaurantList: [],
    submitEmitValue: 0,
  },
  {
    name: '',
    ingredients: [],
    placesList: [],
    restaurantList: [],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    ingredients: [Ingredients.BUN],
    placesList: [],
    restaurantList: [],
    submitEmitValue: 1,
  },
  {
    name: '',
    ingredients: [Ingredients.BUN],
    placesList: [],
    restaurantList: [],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    ingredients: [Ingredients.BUN],
    placesList: ['1 ресторан'],
    restaurantList: [{ name: '1 ресторан', address: '1й переулок', menu: [] }],
    submitEmitValue: 1,
  },
  {
    name: '',
    ingredients: [Ingredients.BUN],
    placesList: ['1 ресторан'],
    restaurantList: [{ name: '1 ресторан', address: '1й переулок', menu: [] }],
    submitEmitValue: 0,
  },
  {
    name: 'Name',
    ingredients: [],
    placesList: ['1 ресторан'],
    restaurantList: [{ name: '1 ресторан', address: '1й переулок', menu: [] }],
    submitEmitValue: 0,
  },
  {
    name: '',
    ingredients: [],
    placesList: ['1 ресторан'],
    restaurantList: [{ name: '1 ресторан', address: '1й переулок', menu: [] }],
    submitEmitValue: 0,
  },
];

describe('AddBurgerForm', () => {
  beforeEach(() => {
    wrapper = mount(AddBurgerForm, mountOptions);
  });

  afterEach(() => {
    restaurantStore.restaurants = [];
  });

  it('renders all elements', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(renderElementsCheck.title);
    expect(wrapper.html()).toContain(renderElementsCheck.nameInputLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.imgInputLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.burgerListLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.placeSelectLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.submitBtn);
  });

  it.each(formSubmitCheck)(
    `form with filled
      - name: $name,
      - ingredients: $ingredients,
      - places: $placesList,
      - restaurants: $restaurantList
      - submits: $submitEmitValue`,
    async ({ name, ingredients, placesList, restaurantList, submitEmitValue }) => {
      restaurantStore.restaurants = restaurantList;

      const nameInput = wrapper.findComponent({ name: 'BaseInput' });
      const checkbox = wrapper.findComponent({ name: 'BaseCheckbox' });
      const select = wrapper.findComponent({ name: 'BaseSelect' });

      await nameInput.setValue(name);
      await checkbox.setValue(ingredients);
      await select.setValue(placesList);
      await wrapper.find('form').trigger('submit');

      expect(Object.keys(wrapper.emitted()).length).toBe(submitEmitValue);
    }
  );

  it("calls burgerStore's addBurger action", async () => {
    const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })[0];
    const imageInput = wrapper.findAllComponents({ name: 'BaseInput' })[1];

    await nameInput.setValue('Name');
    await imageInput.setValue('imageLink');
    await wrapper.find('form').trigger('submit');

    expect(burgerStore.addBurger).toHaveBeenCalledWith({
      name: 'Name',
      image: 'imageLink',
      ingredients: [Ingredients.BUN],
      restaurants: [],
    });
  });
});
