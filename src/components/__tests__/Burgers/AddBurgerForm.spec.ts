import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import AddBurgerForm from '@/components/Burgers/AddBurgerForm.vue';
import { useBurgerStore } from '@/stores/burgers';
import Ingredients from '@/enums/ingredients';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const burgerStore = useBurgerStore(pinia);

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

describe('AddBurgerForm', () => {
  beforeEach(() => {
    wrapper = mount(AddBurgerForm, mountOptions);
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

  it('submits form only with filled name', async () => {
    const nameInput = wrapper.findComponent({ name: 'BaseInput' }).get('input');

    await nameInput.setValue('Name');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('calls store addBurger action', async () => {
    const nameInput = wrapper.findComponent({ name: 'BaseInput' }).get('input');

    await nameInput.setValue('Name');
    await wrapper.find('form').trigger('submit');

    expect(burgerStore.addBurger).toHaveBeenCalledWith({
      name: 'Name',
      image: '',
      ingredients: [Ingredients.BUN],
      restaurants: [],
    });
  });
});
