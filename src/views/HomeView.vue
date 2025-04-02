<script setup lang="ts">
import { computed } from 'vue'
import { ArrayToString } from '@/utils/variables'
import { useRoute } from 'vue-router'

const route = useRoute()

const locale = computed<string>(() => {
  return ArrayToString(route.params.locale)
})
</script>

<template>
<div>
  <div class="srlp-pdf-cover-page page _page-no-margin" data-container-label="PDF Cover Page">
    <div class="_main_cover_and_image">
      <div class="_background" doc-image="pdf-cover-page-background-image">
        <div class="_logo-top">
          <img  doc-image="logo-top">
        </div>
        <div class="_logo">
          <img  doc-image="logo">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@use 'nswow';

.srl-main {
  padding: nswow.system-size-unit(100) 0;
  margin-left: auto;
  margin-right: auto;
  min-height: 80vh;
  @include nswow.grid-container();
}
</style>
