import { mount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
// import { createTestingPinia } from '@pinia/testing';
import { defineComponent, ref } from 'vue';
import AppModal from '@/components/AppModal.vue';
// import DefaultLayout from '@/layouts/DefaultLayout.vue';

let wrapper: VueWrapper;
let destination: HTMLDivElement;

// const mountOptions = {
//   global: {
//     stubs: {
//       DefaultLayout: {
//         components: { AppModal },
//         template: `<div><AppModal :isOpen="true" /></div>`,
//         props: {
//           isOpen: true,
//         },
//       },
//     },
//   },
//   plugins: [createTestingPinia({ createSpy: vi.fn })],
// };

// вариант такого тестирования взят отсюда: https://github.com/vuejs/test-utils/issues/798#issuecomment-902335440
beforeEach(() => {
  // @ts-ignore
  window.IntersectionObserver = class {
    // @ts-ignore
    observe() {}
  };

  destination = document.createElement('div');
  destination.id = 'app';
  document.body.appendChild(destination);
});

afterEach(() => {
  document.body.outerHTML = '';
});

describe('AppModal', () => {
  it('renders only after click', async () => {
    const modalComponent = defineComponent({
      components: { AppModal },
      template: `
        <button id="openBtn" @click="isOpen = true">Open</button>
        <AppModal :isOpen="isOpen" @close="closeModal" />
        `,
      setup() {
        const isOpen = ref(false);
        return {
          isOpen,
          close: () => (isOpen.value = false),
        };
      },
    });

    wrapper = mount(modalComponent, {
      attachTo: destination,
    });

    expect(document.body.outerHTML).not.toContain('<div class="modal">');

    await wrapper.find('#openBtn').trigger('click');

    expect(document.body.outerHTML).toContain('<div class="modal">');
  });

  // не работает по документации: https://test-utils.vuejs.org/guide/advanced/teleport.html#interacting-with-the-teleported-component
  // it.only('closes after click', async () => {
  //   const TestComponent = defineComponent({
  //     components: { DefaultLayout, AppModal },
  //     template: '<Suspense><DefaultLayout><AppModal /></DefaultLayout></Suspense>',
  //     setup() {
  //       const isOpen = ref(false);
  //       return {
  //         isOpen,
  //         close: () => (isOpen.value = false),
  //       };
  //     },
  //   });

  //   const wrapper = mount(TestComponent, mountOptions);
  //   // const wrapper = await mountSuspense(DefaultLayout, mountOptions);

  //   const modal = wrapper.getComponent(AppModal);
  //   await modal.get('button')
  // });
});
