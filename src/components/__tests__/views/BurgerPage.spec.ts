import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';
import BurgerPage from '@/views/BurgerPage.vue';
import { useBurgerStore } from '@/stores/burgers';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useBurgerStore(pinia);

const push = vi.fn();
const useRouterFunc = vi.fn().mockImplementation(() => ({
  push,
}));
const useRouteFunc = vi.fn().mockImplementation(() => ({
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

describe('BurgerPage', () => {
  beforeEach(() => {
    wrapper = mount(BurgerPage, {
      plugins: [pinia, router],
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    store.burgers = [];
  });

  it("shows link to main page, when burger doesn't exist", () => {
    console.log(wrapper.html());
  });
});
