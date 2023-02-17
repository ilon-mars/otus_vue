<template>
  <Teleport to="#app">
    <Transition name="fade">
      <div v-if="props.isOpen" :class="$style.modal">
        <div :class="$style.slot">
          <slot />
        </div>
        <button @click="emit('close')" :class="$style.closeBtn">
          <CloseIcon />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

watch(
  () => props.isOpen,
  async () => {
    if (props.isOpen) {
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }
  },
  { immediate: true }
);
</script>

<style module lang="sass">
.modal
  padding: 20px
  position: fixed
  z-index: 10
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba($darkest-color, $opacity-s)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  backdrop-filter: blur(10px)

.closeBtn
    position: absolute
    top: 20px
    right: 20px
    width: 24px
    height: 24px
    cursor: pointer

.slot
  max-width: 600px
  min-height: 400px
</style>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity .4s linear

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
