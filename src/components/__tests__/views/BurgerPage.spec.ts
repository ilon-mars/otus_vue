import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';
import BurgerPage from '@/views/BurgerPage.vue';
import { useBurgerStore } from '@/stores/burgers';
import { BURGERS } from '@/utils/testDataMocks';
import { ResourceEnum } from '@/enums/resources';

let wrapper: VueWrapper;

vi.mock('vue-router');

const pinia = createTestingPinia({ createSpy: vi.fn });
const store = useBurgerStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia, router],
  },
};

describe('BurgerPage', () => {
  useRouter.mockReturnValue({
    push: vi.fn(),
  });

  // Property 'mockReturnValue' does not exist on type '() => RouteLocationNormalizedLoaded'.ts(2339)
  useRoute.mockReturnValue({
    params: {
      id: 'b1',
    },
  });

  // Property 'mockReset' does not exist on type '(to: RouteLocationRaw) => Promise<void | NavigationFailure>'.ts(2339)
  beforeEach(() => {
    wrapper = mount(BurgerPage, mountOptions);
    useRouter().push.mockReset();
  });

  afterEach(() => {
    store.burgers = [];
  });

  it("shows link to main page, when burger doesn't exist", () => {
    console.log(wrapper.html());
  });
});


/*
[Vue warn]: A plugin must either be a function or an object with an "install" function.
[Vue warn]: Failed to resolve component: router-link
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
  at <BurgerPage ref="VTU_COMPONENT" >
  at <VTUROOT>
[Vue warn]: Failed to resolve component: router-link
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
  at <BurgerPage ref="VTU_COMPONENT" >
  at <VTUROOT>
*/
