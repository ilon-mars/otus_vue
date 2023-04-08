import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { BURGERS } from '@/utils/testDataMocks';

let wrapper: VueWrapper;

const burgerMock = BURGERS[1];

const push = vi.fn();
const useRouterFunc = vi.fn().mockImplementation(() => ({
  push,
}));
const useRouteFunc = vi.fn().mockImplementation(() => ({
  params: {
    id: burgerMock._id,
  },
}));

vi.mock('vue-router', () => ({
  createRouter: vi.fn().mockReturnValue({}),
  createWebHistory: vi.fn(),
  useRoute: useRouteFunc,
  useRouter: useRouterFunc,
}));

import router from '@/router';
import BurgerPage from '@/views/BurgerPage.vue';
import { useBurgerStore } from '@/stores/burgers';

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useBurgerStore(pinia);

const mountOptions = {
  plugins: [pinia, router],

  global: {
    stubs: ['router-link'],
  },
};

describe('BurgerPage', () => {
  beforeEach(() => {
    wrapper = mount(BurgerPage, mountOptions);
    store.burgers = BURGERS;
  });

  afterEach(() => {
    store.burgers = [];
  });

  it('renders burger page', () => {
    expect(wrapper.find('.title').text()).toEqual(burgerMock.name);
    expect(wrapper.find('.img').attributes().src).toEqual(burgerMock.image);
    expect(wrapper.find('.list').html()).toContain(burgerMock.ingredients[0]);
    expect(wrapper.find('.restaurants').html()).toContain(burgerMock.restaurants[0]);
  });

  it("shows link to main page, when burger doesn't exist", async () => {
    store.burgers = [];
    await flushPromises();
    expect(wrapper.html()).toContain('Кажется, произошла ошибка');
  });
});
