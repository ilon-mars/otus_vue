import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;

const push = vi.fn();
const useRouterFunc = vi.fn().mockImplementation(() => ({
  push,
}));
const useRouteFunc = vi.fn().mockImplementationOnce(() => ({
  params: {
    id: '1',
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
import { BURGERS } from '@/utils/testDataMocks';

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

  it("shows link to main page, when burger doesn't exist", () => {
    expect(wrapper.html()).toContain('Кажется, произошла ошибка');
  });

  // ! не работает
  // it.only('renders page, when burger exist', async () => {
  //   useRouteFunc.withImplementation(
  //     () => ({
  //       params: {
  //         id: 'b1',
  //       },
  //     }),
  //     () => {
  //       useRouteFunc();
  //     }
  //   );

  //   await flushPromises();

  //   console.log(wrapper.html());
  // });

  // ! не работает
  // it.only('renders page, when burger exist', async () => {
  //   useRouteFunc.mockImplementationOnce(() => ({
  //     params: {
  //       id: 'b1',
  //     },
  //   }));
  //   await flushPromises();

  //   console.log(wrapper.html());
  // });
});

// console.log(useRouteFunc.mock.results[0].value);
