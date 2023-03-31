import { mount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';
import AppModal from '@/components/AppModal.vue';

let wrapper: VueWrapper;
let destination: HTMLDivElement;

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
          closeModal: () => (isOpen.value = false),
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
});
