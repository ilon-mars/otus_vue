<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BurgerIcon from '@/components/icons/BurgerIcon.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <DefaultLayout />
    </template>
    <template #fallback>
      <div :class="$style.iconWrapper">
        <BurgerIcon :class="$style.icon" />
      </div>
    </template>
  </Suspense>
</template>

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
