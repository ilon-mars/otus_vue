import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import AppHeader from '@/components/AppHeader.vue';
import { ResourceEnum } from '@/enums/resources';
import { useBurgerStore } from '@/stores/burgers';

let wrapper: VueWrapper;

const pinia = createTestingPinia({ createSpy: vi.fn });
const burgerStore = useBurgerStore(pinia);

const mountOptions = {
  global: {
    plugins: [pinia, router],
  },
};

describe('AppHeader', () => {
  beforeEach(() => {
    wrapper = mount(AppHeader, mountOptions);
  });

  it('renders links', () => {
    expect(wrapper.findAll('.link')[0].text()).toBe(ResourceEnum.linkNames[ResourceEnum.BURGERS]);
    expect(wrapper.findAll('.link')[1].text()).toBe(
      ResourceEnum.linkNames[ResourceEnum.RESTAURANTS]
    );
  });

  it(`navigates to ${ResourceEnum.RESTAURANTS} page`, async () => {
    const push = vi.spyOn(router, 'push');

    await wrapper.findAll('.link')[1].trigger('click');

    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith({
      name: ResourceEnum.RESTAURANTS,
    });
  });

  it.only(`navigates to ${ResourceEnum.BURGERS} page`, async () => {
    const push = vi.spyOn(router, 'push');
    vi.mocked(burgerStore.loadBurgers).mockResolvedValue();

    await wrapper.findAll('.link')[0].trigger('click');

    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith({
      name: ResourceEnum.BURGERS,
    });
  });
});
