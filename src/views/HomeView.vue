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
    <div
      class="srlp-image-container srlp-grid _height-45 srlp-grid__full"
      style="
        background-image: url(./images/1912f45f-4a69-4e1c-9d74-9e9cd4f63744_width-1240.jpeg);
        --xlarge-url: url(./images/1912f45f-4a69-4e1c-9d74-9e9cd4f63744_width-2048.jpeg);
        --large-url: url(./images/1912f45f-4a69-4e1c-9d74-9e9cd4f63744_width-1280.jpeg);
        --medium-url: url(./images/1912f45f-4a69-4e1c-9d74-9e9cd4f63744_width-768.jpeg);
        --small-url: url(./images/1912f45f-4a69-4e1c-9d74-9e9cd4f63744_width-400.jpeg);
      "
    >
      <div class="srlp-grid-child">
        <div class="srlp-image-container-holder">
          <div class="srlp-image-container__headline-container"></div>
          <div class="srlp-image-container__subheadline-container">
            <p class="srl-paragraph srlp-grid _text-color-cream _text-typo-title-3">
              <span class="srlp-grid-child">PEOPLE</span>
            </p>
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
