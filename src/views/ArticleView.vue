<script setup lang="ts">
import { ref, nextTick, computed, watch, onMounted, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import useConfig from '@/composables/config'
import Autoload from '@/Autoload'
import PrevNext from '@/components/PrevNext.vue'
import { useRouter } from 'vue-router'
import { ArrayToString } from '@/utils/variables'

const config = await useConfig()
const router = useRouter()
const route = useRoute()
const articleContent = ref<HTMLDivElement | undefined>()
const output = ref<string>('')
const locale = computed<string>(() => {
  return ArrayToString(route.params.locale)
})
const slug = computed<string>(() => {
  return ArrayToString(route.params.slug)
})




async function getContent() {
  const currentPage =
    config.value.articles[locale.value] &&
    config.value.articles[locale.value].find((i) => {
      return i.slug === slug.value
    })
  let res = ''
  if (currentPage) {
    const file = `./html/${locale.value}/${currentPage.name}.html`
    try {
      const response = await fetch(file)
      res = await response.text()

      const parser = new DOMParser()
      const parsed = parser.parseFromString(res, 'text/html')

      parsed.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href')
        // Nur relative Pfade anpassen, keine absoluten URLs
        if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
          a.setAttribute('href', `/${locale.value}/${href}`)
        }
      })

      output.value = parsed.body.innerHTML.replaceAll('../','./');

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

watch(route, async () => await getContent())
onMounted(async () => {
  await getContent()
})
</script>

<template>
  <article>
    <transition name="fade">
      <div v-if="output.length" ref="articleContent" class="srl-article-root" v-html="output" />
    </transition>
<!--    <PrevNext />-->
  </article>
</template>

<style scoped lang="scss">
@use 'nswow';

article {
  padding-bottom: nswow.system-size-unit(50);
}
</style>

<style scoped lang="scss">
@use 'nswow';

.srl-article-root {
  margin-bottom: nswow.system-size-unit(50);
}
</style>
