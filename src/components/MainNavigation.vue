<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useConfig from '@/composables/config'
import { MenuArticle, MenuEntry, MenuExternal } from '@/components/MenuItem'

const { locale } = useI18n()
const config = await useConfig()
const subNavigationVisible = ref<boolean>(false)
const activeSubmenu = ref<NsWowMenu[]>([])
const activeSubSubmenu = ref<NsWowMenu[]>([])

const currentMenus = computed(() => {
  return config.value.menus[locale.value] ?? {}
})

const currentMenu = computed(() => {
  const m = currentMenus.value.menuMain
  return m ?? []
})

const currentArticles = computed<NsWowArticle[]>(() => {
  return config.value.articles[locale.value] ?? []
})

function getLinkByPage(page: string): string {
  const currentPage = currentArticles.value.find((element) => element.uuid === page)
  return currentPage ? `/${locale.value}/${currentPage.slug}` : ''
}

function activateSubmenu(index: string | number): void {
  const menu = currentMenu.value[index]
  if (menu) {
    activeSubmenu.value = menu.submenuEntries ?? []

    if (!subNavigationVisible.value) {
      subNavigationVisible.value = !subNavigationVisible.value
    }
  }
}

function closeSubmenu() {
  subNavigationVisible.value = false
}

</script>

<template>
  <div class="component-holder-MainNavigation">
    <div class="mainMenu-inner">
      <ul>
        <li
          class="srl-typo-copy1"
          v-for="(level1Item, level1ItemIndex) in currentMenu"
          :class="level1Item.type"
        >
          <MenuArticle
            v-if="level1Item.type === 'Article'"
            :label="level1Item.label"
            :page="getLinkByPage(<string>level1Item.page)"
            @click="closeSubmenu()"
          />
          <MenuEntry
            v-if="level1Item.type === 'MenuEntry'"
            :label="level1Item.label"
            @click="activateSubmenu(level1ItemIndex)"
          />
          <MenuExternal
            v-if="level1Item.type === 'ExternalLink'"
            :label="level1Item.label"
            :url="level1Item.url"
          />
        </li>
        <li
          class="srl-typo-copy1"
          v-if="subNavigationVisible"
          @click="subNavigationVisible = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </li>
      </ul>
    </div>
    <div class="subMenu-inner">
      <ul v-if="activeSubmenu.length && subNavigationVisible">
        <li class="srl-typo-copy1" v-for="(level2Item, level2ItemIndex) in activeSubmenu">
          <MenuArticle
            v-if="level2Item.type === 'Article'"
            :label="level2Item.label"
            :page="getLinkByPage(<string>level2Item.page)"
            @click="closeSubmenu()"
          />
          <MenuEntry v-if="level2Item.type === 'MenuEntry'" :label="level2Item.label" />
          <MenuExternal
            v-if="level2Item.type === 'ExternalLink'"
            :label="level2Item.label"
            :url="<string>level2Item.url"
          />

          <ul>
            <li
              class="srl-typo-copy1"
              v-for="(level3Item, index) in level2Item && level2Item.submenuEntries"
            >
              <MenuArticle
                v-if="level3Item.type === 'Article'"
                :label="level3Item.label"
                :page="getLinkByPage(<string>level3Item.page)"
                @click="closeSubmenu()"
              />
              <MenuEntry v-if="level3Item.type === 'MenuEntry'" :label="level3Item.label" />
              <MenuExternal
                v-if="level3Item.type === 'ExternalLink'"
                :label="level3Item.label"
                :url="<string>level3Item.url"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'nswow';
.component-holder-MainNavigation{
  .mainMenu-inner{
    >ul{
      list-style: none;
      display: flex;
      gap: 32px;
      li{
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

      }
    }
  }
}

</style>
