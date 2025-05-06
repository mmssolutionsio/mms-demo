<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useConfig from '@/composables/config'
import { ArrayToString } from '@/utils/variables'

type searchDataType = {
  title: string
  content: string
  link: string
  translatedTitle: string
  firstParagraph: string
}

const config = await useConfig()
const route = useRoute()
const isLoading = ref<boolean>(true)
const searchData = ref<searchDataType[]>([])

const locale = computed<string>(() => {
  return ArrayToString(route.params.locale)
})

const searchValue = computed<string>(() => {
  return route.query.searchValue ? ArrayToString(route.query.searchValue, ' ') : ''
})

const articles = computed<NsWowArticle[]>(() => {
  return config.value.articles[locale.value] ?? []
})

async function getSearchResult() {
  isLoading.value = true
  searchData.value = []
  const routesArray: {
    uuid: string
    slug: string
    name: string
    translatedTitle: string
  }[] = []

  articles.value
    .filter((item) => {
      return !item.ignoreInSearch
    })
    .map((value) => {
      routesArray.push({
        uuid: value.uuid,
        slug: value.slug,
        name: value.name,
        translatedTitle: value.translatedTitle
      })
    })

  if (routesArray.length) {
    routesArray.map(async (value) => {
      const file = `./html/${locale.value}/${value.name}.html`
      try {
        const response = await fetch(file)
        const data = await response.text()
        if (data.toLowerCase().includes(searchValue.value.toLowerCase())) {
          const item: searchDataType = {
            title: `${locale.value}/${value.slug}`,
            content: data,
            link: `/${locale.value}/${value.slug}`,
            translatedTitle: value.translatedTitle,
            firstParagraph: ''
          }
          const doc = new DOMParser().parseFromString(data, 'text/html')
          const paragraph = doc.querySelector('p')
          if (paragraph) {
            item.firstParagraph = paragraph.textContent ?? ''
          }
          searchData.value.push(item)
        }

        searchData.value.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })

        isLoading.value = false
      } catch (e) {
        console.error(`"${file}" could not be loaded.`)
      }
    })
  }
}

watch(route, () => getSearchResult())
getSearchResult()
</script>

<template>
  <article class="srl-article">
    <div class="srl-article-container">
      <h1>{{ $t('search.title') }}</h1>

      <h2 v-if="isLoading">Loading...</h2>
      <transition name="fade">
        <h2 v-if="!isLoading">
          {{ $t('search.for', { search: searchValue, count: searchData.length }) }}
        </h2>
      </transition>

      <transition name="fade">
        <div v-if="!isLoading && searchValue" class="search-result">
          <div v-for="(dataItem, index) in searchData" :key="index" class="search-item">
            <h5>{{ dataItem.translatedTitle }}</h5>
            <p>{{ dataItem.firstParagraph }}</p>
            <router-link :to="{ path: dataItem.link }">read more ...</router-link>
          </div>
        </div>
      </transition>
    </div>
  </article>
</template>

<style scoped lang="scss">
.srl-article {
  @include srlp-grid-width(large); // 1920px
  color:$color-text ;
  h1{
    @include font-style-web(h1);
  }
  h2{
    @include font-style-web(h2);
  }
  .search-result{
    @include srlp-grid-width(standard);
    .search-item{
      margin:$space-l 0 ;
      h5{
        @include font-style-web(letter);
        color:$color-essence-orange ;
      }
      p{@include font-style-web(text);
        color:$color-text ;
        padding:$space-s 0 ;
      }
      a{
        padding:$space-s $space-m ;
        background: $color-essence-orange;
        border-radius: 50px;
        color:$color-cream ;

      }
    }
  }
}
</style>
