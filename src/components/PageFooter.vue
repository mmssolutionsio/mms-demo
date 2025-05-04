<script lang="ts" setup>
import { MenuArticle, MenuExternal, MenuEntry } from '@/components/MenuItem'
import { computed, ref } from 'vue'
import useConfig from '@/composables/config'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import MainNavigation from '@/components/MainNavigation.vue'
import GapComponent from '@/components/GapComponent.vue'

const { locale } = useI18n()
const config = await useConfig()
const navigation = ref<NsWowMenu[]>([])
const footer = ref<NsWowMenu[]>([])
const legalTextNavigation = ref<NsWowMenu[]>([])
const contactMenu = ref<NsWowMenu[]>([])

const currentMenus = computed<NsWowMenus>(() => {
  return config.value.menus[locale.value] ?? {}
})

function getLinkByPage(page: string): string {
  return `/${locale.value}/${page}`
}


</script>

<template>
  <div class="component-holder-PageFooter">
    <GapComponent responsiveConfig="0-15" />
    <div class="component-inside-PageFooter">
      <div class="container is-huge">
        <div class="row">
          <div class="col col-12 col-lg-7">
          </div>
          <div class="col col-12 col-lg-5">
            <div class="row">
              <div class="col col-12 col-lg-6 ">
                <h3>Kontakt</h3>
                <p>Philippe Kaufmann</p>
                <p>Senior Technical Consultant</p>
                <GapComponent responsiveConfig="0-30" />
                <ul class="footerMenuV">
                  <li v-for="(item, index) in currentMenus.contactMenu" :key="index">
                    <MenuArticle
                      v-if="item.type === 'Article'"
                      usedIn="use-in-footer"
                      :label="item.label"
                      :page="getLinkByPage(<string>item.page)"
                    />
<!--                    <MenuEntry v-if="item.type === 'MenuEntry'" :label="item.label" usedIn="use-in-footer" />-->
                    <MenuExternal
                      v-if="item.type === 'ExternalLink'"
                      usedIn="use-in-footer"
                      :label="item.label"
                      :url="<string>item.url"
                    />
                  </li>
                </ul></div>
              <div class="col col-12 col-lg-5 ">
                <h3>Menu</h3>
                <ul class="footerMenuV">
                <li v-for="(item, index) in currentMenus.footer" :key="index">
                  <MenuArticle
                    v-if="item.type === 'Article'"
                    :label="item.label"
                    :page="getLinkByPage(<string>item.page)"
                  />
                  <MenuEntry v-if="item.type === 'MenuEntry'" :label="item.label" />
                  <MenuExternal
                    v-if="item.type === 'ExternalLink'"
                    :label="item.label"
                    :url="<string>item.url"
                  />
                </li>
              </ul>
              </div>
              <div class="col col-12 col-lg-1 ">
                <h3>Services</h3>
                <ul class="footerMenuSvg">
                  <li>
                    <a href="#">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group">
                          <path id="Vector" d="M17 13.5234V14.9125C17 16.0616 16.0618 16.9998 14.9127 16.9998H3.08727C1.93818 16.9998 1 16.0616 1 14.9125V13.5234" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path id="Vector_2" d="M9 13V1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path id="Vector_3" d="M14 8L9 13L4 8" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M6 0.5H1V15.5H17V3.5H9L6 0.5Z" stroke="black"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group">
                          <path id="Vector" d="M6.23364 11.9673C9.40025 11.9673 11.9673 9.40025 11.9673 6.23364C11.9673 3.06704 9.40025 0.5 6.23364 0.5C3.06704 0.5 0.5 3.06704 0.5 6.23364C0.5 9.40025 3.06704 11.9673 6.23364 11.9673Z" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
                          <path id="Vector_2" d="M10.4199 10.4209L16.9994 17.0003" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                      </svg>

                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group 5">
                          <path id="Vector 1" d="M5 7L11 4" stroke="black"/>
                          <circle id="Ellipse 2" cx="3" cy="8" r="2.5" stroke="black"/>
                          <circle id="Ellipse 3" cx="13" cy="3" r="2.5" stroke="black"/>
                          <circle id="Ellipse 4" cx="13" cy="13" r="2.5" stroke="black"/>
                          <path id="Vector 2" d="M5 9L11 12" stroke="black"/>
                        </g>
                      </svg>

                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <GapComponent responsiveConfig="0-70" />
        <div class="row">
          <div class="col col-12 col-lg-9 order-lg-2">
            <ul class="footerMenuH">
              <li v-for="(item, index) in currentMenus.legalTextNavigation" :key="index">
                <MenuArticle
                  v-if="item.type === 'Article'"
                  :label="item.label"
                  usedIn="footer-menu-1"
                  :page="getLinkByPage(<string>item.page)"
                />
                <MenuEntry v-if="item.type === 'MenuEntry'" :label="item.label" />
                <MenuExternal
                  v-if="item.type === 'ExternalLink'"
                  :label="item.label"
                  usedIn="footer-menu-1"
                  :url="<string>item.url"
                />
              </li>
            </ul>
          </div>
          <div class="col col-12 col-lg-3 order-lg-1">
            © ns.wow
          </div>
        </div>
      </div>
    </div>
    <GapComponent responsiveConfig="0-15" />
  </div>
</template>

<style scoped lang="scss">
@use 'nswow';
.component-holder-PageFooter{
  background: $color-6;
  .component-inside-PageFooter{
    max-width: 1920px;
    margin: auto;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: $space-m;
    @media(min-width: $break-point-master){
      padding: $space-l;
    }
    h3{
      color: $color-text;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    p{
      color: $color-text;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
    .footerMenuV{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 0;
      padding: 0;
      li{
        display: block;
        a{
          display: block;
        }
      }
    }
    .footerMenuSvg{
      list-style: none;
      display: flex;
      flex-direction: row;
      gap: 5px;
      margin: 0;
      padding: 0;
      @media(min-width: $break-point-master){
        flex-direction: column;
      }
      li{
        display: block;
        a{
          display: flex;
          width: 36px;
          height: 36px;
          padding: 10px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-radius: 24px;
          border: 1px solid $border-color;
          background: $color-white;
        }
      }
    }
    .footerMenuH{
      list-style: none;
      display: flex;
      justify-content: flex-start;
      padding: 0;
      flex-direction: column;
      gap: $space-s;
      @media (min-width: $break-point-tablets-landscape) {
        justify-content: flex-end;
        gap: $space-l;
        flex-direction: row;
      }
      li{
        display: block;
        a{
          display: block;
        }
      }
    }
  }


}


</style>
