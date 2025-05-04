<script setup lang="ts">
const props = defineProps<{
  label: string
  url: string
}>()
</script>

<template>
  <span>
    <a :href="props.url" target="_blank" :title="props.label">{{ props.label }}</a>
  </span>
</template>
<style scoped lang="scss">
a{
  font-family: $font-family-league-spartan;
  color: $color-text;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  &.router-link-active{
    border-bottom: 1px solid $color-essence-orange;
  }
}
</style>
