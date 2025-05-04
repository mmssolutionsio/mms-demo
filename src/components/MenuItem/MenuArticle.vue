<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  label: string
  page: string
  anchor?: string
}>()
</script>

<template>
  <span>
    <router-link :to="{ path: props.page }">{{ props.label }}</router-link></span
  >
</template>
<style scoped lang="scss">
a{
  font-family: $font-family-league-spartan;
  color: $color-text;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: $space-s 0;
  text-transform: uppercase;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  &.router-link-active{
    border-bottom: 2px solid $color-essence-orange;
  }
}
</style>