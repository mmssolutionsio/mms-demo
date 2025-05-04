<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  url: string
  usedIn?: string
}>(), {
  usedIn: 'use-in-header'
})
</script>

<template>
  <span>
    <a :href="props.url" target="_blank" :title="props.label" :class="`${props.usedIn}`">{{ props.label }}</a>
  </span>
</template>
<style scoped lang="scss">
a{
  &.use-in-header{
    font-family: $font-family-league-spartan;
    color: $color-text;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: $space-s;
    text-transform: uppercase;
    display: block;
    @media(min-width: $break-point-master){
      border-bottom: 2px solid transparent;
    }
    &.router-link-active{
      color: $color-essence-orange;;
      @media(min-width: $break-point-master){
        color: $color-text;
        border-bottom: 2px solid $color-essence-orange;
      }
    }
  }
  &.footer-menu-1{

  }

  //$break-point-tablets-landscape

}
</style>