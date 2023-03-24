<template>
  <header :class="$style.header">
    <nav :class="$style.nav" class="wrapper">
      <router-link
        v-for="link of ResourceEnum.values"
        :key="link"
        :class="$style.link"
        :to="{ name: link }"
        >{{ ResourceEnum.linkNames[link] }}</router-link
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ResourceEnum } from '@/enums/resources';
</script>

<style lang="sass" module>
@import '@/assets/styles/_functions.sass'

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
