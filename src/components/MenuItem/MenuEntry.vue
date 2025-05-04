<script setup lang="ts">
const props = defineProps<{
  label: string
  page?: string
  anchor?: string
}>()
</script>

<template>
  <span
    >{{ props.label }}
<!--    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>-->
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
