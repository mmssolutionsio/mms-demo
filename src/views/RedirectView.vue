<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import useConfig from '@/composables/config'

const router = useRouter()

onBeforeMount(async () => {
  const config = await useConfig()
  const defaultLang = config.value.settings.defaultLanguage
  const indexPage = config.value.articles[defaultLang]?.find(p => p.index)
  const indexSlug = indexPage?.slug || '404'
  router.replace(`/${defaultLang}/${indexSlug}`)
})
</script>

<template>
  <div>Redirecting...</div>
</template>
