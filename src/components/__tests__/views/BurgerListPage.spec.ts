import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';
import BurgerListPage from '@/views/BurgerListPage.vue';
import { useBurgerStore } from '@/stores/burgers';
import { BURGERS } from '@/utils/testDataMocks';
import { ResourceEnum } from '@/enums/resources';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useBurgerStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia, router],
  },
};

describe('BurgerListPage', () => {
  beforeEach(() => {
    wrapper = mount(BurgerListPage, mountOptions);
  });

  afterEach(() => {
    store.burgers = [];
  });

  describe('when burgers list is empty', () => {
    it('renders button to add burger', () => {
      expect(wrapper.find('.add-button').exists()).toBeTruthy();
    });

    it('opens modal, which adds burger', async () => {
      const addBtn = wrapper.find('.add-button');

      await addBtn.trigger('click');

      expect(wrapper.emitted('openModal')).toBeTruthy();
      expect(wrapper.emitted('openModal')[0]).toEqual([ResourceEnum.BURGERS]);
    });
  });

  describe('when store has burger list with values', () => {
    it('renders burgers list', async () => {
      store.burgers = BURGERS;

      await flushPromises(); // без этого не обновляется стор, объяснение: https://stackoverflow.com/a/74402234

      expect(wrapper.find('ul').exists()).toBeTruthy();
    });

    it('renders all burger non empty values', async () => {
      store.burgers = BURGERS;

      await flushPromises(); // без этого не обновляется стор, объяснение: https://stackoverflow.com/a/74402234

      const burgerElem = wrapper.findAll('li')[1];
      expect(burgerElem.find('h2').text()).toContain(BURGERS[1].name);
      expect(burgerElem.find('.img').attributes('src')).toBe(BURGERS[1].image);
      expect(burgerElem.find('.list').text()).toContain(BURGERS[1].ingredients[0]);
      expect(burgerElem.find('.restaurants').find('ul').text()).toContain(
        BURGERS[1].restaurants[0]
      );
    });

    it("doesn't render all burger empty values", async () => {
      store.burgers = BURGERS;

      await flushPromises();

      const burgerElem = wrapper.findAll('li')[0];
      expect(burgerElem.find('.img').attributes('src')).toContain(
        'assets/img/burgerTemplateImg.png'
      );
      expect(burgerElem.find('.list').text()).not.toContain('<li>');
      expect(burgerElem.find('.restaurants').find('ul').text()).not.toContain('<li>');
    });

    it('renders button to add burger', async () => {
      store.burgers = BURGERS;

      await flushPromises();

      const burgerTemplate = wrapper.find('.burgerTemplate');
      expect(burgerTemplate.find('img').exists).toBeTruthy();
      await burgerTemplate.find('button').trigger('click');

      expect(wrapper.emitted('openModal')).toBeTruthy();
      expect(wrapper.emitted('openModal')[0]).toEqual([ResourceEnum.BURGERS]);
    });
  });
});
