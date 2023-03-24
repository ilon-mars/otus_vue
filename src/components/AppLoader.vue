<template>
  <div :class="$style.iconWrapper">
    <BurgerIcon :class="$style.icon" />
  </div>
</template>

<script setup lang="ts">
import BurgerIcon from '@/components/icons/BurgerIcon.vue';
</script>

<style lang="sass" module>
.iconWrapper
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center

.icon
  width: 124px
  height: 112px
</style>
