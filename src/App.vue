<template>
  <Suspense>
    <template #default>
      <DefaultLayout />
    </template>
    <template #fallback>
      <AppLoader />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AppLoader from '@/components/AppLoader.vue';
</script>
