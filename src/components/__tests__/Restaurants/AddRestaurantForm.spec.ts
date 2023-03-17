import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import AddRestaurantForm from '@/components/Restaurants/AddRestaurantForm.vue';
import { useRestaurantStore } from '@/stores/restaurants';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useRestaurantStore(pinia);

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

describe('AddRestaurantForm', () => {
  beforeEach(() => {
    wrapper = mount(AddRestaurantForm, mountOptions);
  });

  it('renders all elements', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(renderElementsCheck.title);
    expect(wrapper.html()).toContain(renderElementsCheck.nameInputLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.addressLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.searchLabel);
    expect(wrapper.html()).toContain(renderElementsCheck.submitBtn);
  });

  it('submits form only with filled name and address', async () => {
    const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })[0].get('input');
    const addressInput = wrapper.findAllComponents({ name: 'BaseInput' })[1].get('input');

    await nameInput.setValue('Name');
    await addressInput.setValue('address');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('calls store addBurger action', async () => {
    const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })[0].get('input');
    const addressInput = wrapper.findAllComponents({ name: 'BaseInput' })[1].get('input');

    await nameInput.setValue('Name');
    await addressInput.setValue('address');
    await wrapper.find('form').trigger('submit');

    expect(store.addRestaurant).toHaveBeenCalledWith({
      name: 'Name',
      address: 'address',
      menu: [],
    });
  });
});
