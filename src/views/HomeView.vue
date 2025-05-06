<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { ArrayToString } from '@/utils/variables'
import { useRoute, useRouter } from 'vue-router'
import Autoload from '@/Autoload.ts'
import useConfig from '@/composables/config.ts'




const route = useRoute()
const config = await useConfig()

const articleContent = ref<HTMLDivElement | undefined>()
const output = ref<string>('')
const router = useRouter()

const locale = computed<string>(() => {
  return ArrayToString(route.params.locale)
})
async function getContent() {
  const currentPage =
    config.value.articles[locale.value] &&
    config.value.articles[locale.value].find((i) => i.index)
  let res = ''
  if (currentPage) {
    const file = `./html/${locale.value}/${currentPage.name}.html`
    try {
      const response = await fetch(file)
      const res = await response.text()
      output.value = res.replaceAll('../', './')
      await nextTick(() => {
        if (articleContent.value) {
          Autoload.init(articleContent.value)
          interceptInternalLinks()
        }
      })
    } catch (e) {
      console.error(`"${file}" could not be loaded.`)
      await router.push(`/${locale.value}/404`)
    }
  } else {
    await router.push(`/${locale.value}/404`)
  }
}

function interceptInternalLinks() {
  if (!articleContent.value) return

  const anchors = articleContent.value.querySelectorAll('a[href]')
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href')
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('/')
    ) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        router.push(`/${locale.value}/${href}`)
      })
    }
  })
}

onMounted(async () => {
  await getContent()
})
</script>

<template>
  <article>
    <transition name="fade">
      <div v-if="output.length" ref="articleContent" class="srl-article-root" v-html="output" />
    </transition>
  </article>
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
