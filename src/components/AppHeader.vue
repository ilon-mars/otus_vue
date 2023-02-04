<template>
  <header :class="$style.header">
    <nav :class="$style.nav" class="wrapper">
      <router-link :class="$style.link" :to="{ name: Resources.BURGERS }">Бургеры</router-link>
      <router-link :class="$style.link" :to="{ name: Resources.RESTAURANTS }"
        >Рестораны</router-link
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Resources } from '@/enums/resources';
</script>

<style lang="sass" module>
@import '@/assets/_functions.sass'

.header
  padding: 20px 0
  border-bottom: 1px solid $light-neutral-color
  margin-bottom: 35px

.nav
  display: flex
  align-items: center

.link
  color: $light-color
  transition: color $transition-duration ease-in-out

  &[aria-current="page"]
    color: $primary-color
    cursor: default

  &:not(:last-of-type)
    margin-right: 15px

  &:not([aria-current="page"]):hover
    color: shade($light-color, 30%)
</style>
