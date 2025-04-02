<script lang="ts" setup>
import ScrollToTop from '@/components/ScrollToTop.vue'
import { computed, ref } from 'vue'
import useConfig from '@/composables/config'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'


const { locale } = useI18n()
const config = await useConfig()
const navigation = ref<NsWowMenu[]>([])
const route = useRoute()

const currentMenus = computed<NsWowMenus[]>(() => {
  return config.value.menus[locale.value].menuMain ?? [];
});

const flattenMenus = (menus: NsWowMenus[]): NsWowMenus[] => {
  return menus.reduce<NsWowMenus[]>((acc, menu) => {
    if('Article' === menu.type){
      acc.push({
        label: menu.label,
        type: menu.type,
        page: menu.page,
        anchor: menu.anchor
      });


    }
    if (menu.submenuEntries) {
      acc.push(...flattenMenus(menu.submenuEntries));
    }


    return acc;
  }, []);
};

const flatMenus = computed<NsWowMenus[]>(() => {
  return flattenMenus(currentMenus.value);
});

const routeSlug = computed(() => Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug);
const activeMenuIndex = computed<number>(() => {
  return flatMenus.value.findIndex(menu => menu.page === routeSlug.value);
});

const activeMenuItem = computed<NsWowMenus | null>(() => {
  const index = activeMenuIndex.value;
  return index !== -1 ? flatMenus.value[index] : null;
});

</script>
<template>
  <hr>
  <p>Aktive Route: {{ route.params.slug }}</p>
  <p>Index im Menü: {{ activeMenuIndex }}</p>
  <p>activeMenuItem: {{ activeMenuItem }}</p>
  <hr>
  <pre>
    {{ flatMenus }}
  </pre>
  <hr>
  <pre>
    {{ currentMenus }}
  </pre>
  <hr>
  <div class="srl-nav-holder">
    <router-link
      v-if="prevRoute"
      :to="prevRoute"
      class="srl-nav-holder__nav-btn srl-bg-primary srl-color-light srl-typo-headline3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
      {{ $t('page.prev') }}
    </router-link>
    <ScrollToTop />
    <router-link
      v-if="nextRoute"
      :to="nextRoute"
      class="srl-nav-holder__nav-btn srl-bg-primary srl-color-light srl-typo-headline3"
    >
      {{ $t('page.next') }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@use 'nswow';

.srl-nav-holder {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
  margin-bottom: nswow.system-size-unit(10);

  &__nav-btn {
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: nswow.system-size-unit(10) nswow.system-size-unit(15);

    svg {
      transition: all 200ms ease;

      &.left {
        margin-right: nswow.system-size-unit(10);
      }

      &.right {
        margin-left: nswow.system-size-unit(10);
      }
    }
  }

  @include nswow.grid-media(print) {
    display: none;
  }
}
</style>
