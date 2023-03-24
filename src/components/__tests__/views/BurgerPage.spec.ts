import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';
import BurgerPage from '@/views/BurgerPage.vue';
import { useBurgerStore } from '@/stores/burgers';

let wrapper: VueWrapper;

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useBurgerStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia, router],
    stubs: ['router-link'],
  },
};

describe('BurgerPage', () => {
  beforeEach(() => {
    wrapper = mount(BurgerPage, mountOptions);
  });

  afterEach(() => {
    store.burgers = [];
  });

  // Property 'mockImplementationOnce' does not exist on type '() => RouteLocationNormalizedLoaded'.ts(2339)
  it("shows link to main page, when burger doesn't exist", () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: '1',
      },
    }));
    // Property 'mockImplementationOnce' does not exist on type '() => Router'.ts(2339)
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    console.log(wrapper.html());
  });
});

/*
Error: [vitest] No "createRouter" export is defined on the "vue-router" mock. Did you forget to return it from "vi.mock"?
If you need to partially mock a module, you can use "vi.importActual" inside:

vi.mock("vue-router", async () => {
  const actual = await vi.importActual("vue-router")
  return {
    ...actual,
    // your mocked methods
  },
})

❯ src/router/index.ts:6:16
      4| import { useRestaurantStore } from '@/stores/restaurants';
      5|
      6| const router = createRouter({
       |                ^
      7|   history: createWebHistory(),
      8|   routes: [
*/
