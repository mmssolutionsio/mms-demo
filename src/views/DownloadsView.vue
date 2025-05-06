<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrayToString } from '@/utils/variables'
import GapComponent from '@/components/GapComponent.vue'

const route = useRoute()
const locale = computed(() => {
  return ArrayToString(route.params.locale)
})
const downloadData = ref<NsWowDownloads>({ structure: [] })

async function getDownloads() {
  const file = `./downloads/downloads_${locale.value}.json`
  try {
    const response = await fetch(file)
    downloadData.value = await response.json()
  } catch (e) {
    console.error(`"${file}" could not be loaded.`)
  }
}

watch(route, () => getDownloads())
getDownloads()
</script>

<template>
  <article class="srl-download">
    <h1>Downloads</h1>
    <GapComponent responsiveConfig="0-15" />
    <h2>Annual Report</h2>
    <GapComponent responsiveConfig="0-15" />
    <div v-if="downloadData.annualReport">
      <a target="_blank">{{ downloadData.annualReport?.title }}</a>
    </div>
    <transition name="fade">
      <ul v-if="downloadData.structure.length" class="srl-download__list">
<!--        //TODO Link to Download File-->
        <li v-for="(item, index) in downloadData?.structure" :key="index">
          <a href="" target="_blank">
            <div class="svg-holder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
              />
              <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
              />
            </svg>
            </div>
            <div>
              <span class="title">{{ item.title }}</span>
              <span>({{ item.size }})</span>
            </div>
          </a>
        </li>
      </ul>
    </transition>
  </article>
</template>

<style scoped lang="scss">
.srl-download {
  @include srlp-grid-width(large); // 1920px
  h1{
    @include font-style-web(h1);
  }
  h2{
    @include font-style-web(h2);
  }
  ul.srl-download__list{
    list-style: none;
    margin: 0;
    padding: 0;
    @include srlp-grid-width(standard);
    li{
      display: block;
      background: $color-cream;
      margin:$space-m 0 ;
      a{
        display: flex;
        flex-direction: row;
        gap: $space-s;
        align-items: center;
        .svg-holder{
          background: $color-essence-orange;
          padding: $space-m;
          svg{
            color: $color-cream;
            fill: $color-cream;
            width: 1.5rem;
            height: 1.5rem;
          }
        }

        div{
          display: flex;
          flex-direction: row;
          gap: $space-s;
          align-items: center;
          span{
            @include font-style-web(small-text);
            color:$color-essence-orange ;
            &.title{
              @include font-style-web(letter);
            }

          }
        }
      }
    }
  }
}
</style>
