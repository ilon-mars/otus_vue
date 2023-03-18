import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import RestaurantListPage from '@/views/RestaurantListPage.vue';
import { useRestaurantStore } from '@/stores/restaurants';
import { RESTAURANTS } from '@/utils/testDataMocks';
import { ResourceEnum } from '@/enums/resources';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useRestaurantStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia],
  },
};

describe('RestaurantListPage', () => {
  beforeEach(() => {
    wrapper = mount(RestaurantListPage, mountOptions);
    store.restaurants = RESTAURANTS;
  });

  afterEach(() => {
    store.restaurants = [];
  });

  describe('when restaurant list is empty', () => {
    it('renders button to add restaurant', async () => {
      store.restaurants = [];

      await flushPromises();

      expect(wrapper.find('.add-button').exists()).toBeTruthy();
    });

    it('opens modal, which adds restaurant', async () => {
      store.restaurants = [];

      await flushPromises();

      const addBtn = wrapper.find('.add-button');

      await addBtn.trigger('click');

      expect(wrapper.emitted('openModal')).toBeTruthy();
      expect(wrapper.emitted('openModal')[0]).toEqual([ResourceEnum.RESTAURANTS]);
    });
  });

  describe('when store has restaurants', () => {
    it('renders restaurant list ', async () => {
      expect(wrapper.find('ul').exists()).toBeTruthy();
    });

    it('renders restaurant card with menu', async () => {
      const restaurantElem = wrapper.findAll('.restaurant')[1];

      expect(restaurantElem.find('h2').text()).toContain(RESTAURANTS[1].name);
      expect(restaurantElem.find('.address').text()).toContain(RESTAURANTS[1].address);
      expect(restaurantElem.find('.menu').text()).toContain('Меню');
      expect(restaurantElem.find('.item').text()).toContain(RESTAURANTS[1].menu[0]);
    });

    it('renders button, which adds burger, when menu is empty', async () => {
      const restaurantElem = wrapper.findAll('.restaurant')[0];

      expect(restaurantElem.find('.menu').exists()).toBeFalsy();
      expect(restaurantElem.find('.add-button').text()).toContain('Добавьте бургер');
    });

    it('opens modal to add burger, when menu is empty', async () => {
      const addBtn = wrapper.findAll('.restaurant')[0].find('.add-button');

      await addBtn.trigger('click');

      expect(wrapper.emitted('openModal')).toBeTruthy();
      expect(wrapper.emitted('openModal')[0]).toEqual([ResourceEnum.BURGERS]);
    });

    it('renders button to add restaurant', async () => {
      const restaurantTemplate = wrapper.find('.restaurantTemplate');

      expect(restaurantTemplate.find('button').exists()).toBeTruthy();

      await restaurantTemplate.find('button').trigger('click');

      expect(wrapper.emitted('openModal')).toBeTruthy();
      expect(wrapper.emitted('openModal')[0]).toEqual([ResourceEnum.RESTAURANTS]);
    });
  });
});
