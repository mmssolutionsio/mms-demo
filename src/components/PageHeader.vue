<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MainNavigation from '@/components/MainNavigation.vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const { locale } = useI18n()
const srlSearch = ref()
let searchValue = ref('')
const baseUrl = ref(window.baseUrl ?? '')

console.log(baseUrl)

function toggleSearchVisible() {
  srlSearch.value.classList.toggle('visible')
}

function search() {
  $router.push(`/${locale}/search?searchValue=${searchValue.value}`)
  toggleSearchVisible()
}
</script>

<template>
  <div class="component-holder-PageHeader">
    <div class="component-inside-PageHeader">
      <div class="container is-huge">
        <div class="row">
          <div class="col col-6 col-lg-3">
            <div class="logo-holder">
              <router-link class="srl-header__inner-logo" :to="{ path: `/${locale}` }">
                <img src="@/assets/images/demo-logo.png" alt="logo" />
              </router-link>
            </div>
          </div>
          <div class="col col-6 col-lg-9">
            <div class="header-right">
              <div class="navigation-holder">
                <suspense>
                  <MainNavigation />
                </suspense>
              </div>
              <div class="tools-holder">
                <div class="downloads-holder">
                  <router-link :to="{ path: `/${locale}/downloads` }">
                    <button class="srl-color-light">
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
                    </button>
                  </router-link>
                </div>
                <div class="search-holder">
                  <button class="srl-color-light" @click="toggleSearchVisible">
                    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="DE">
                        <rect x="1" y="0.5" width="47" height="47" rx="23.5" fill="white"/>
                        <rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#D6D6D6"/>
                        <g id="Group">
                          <path id="Vector" d="M23.2543 29.5071C27.3524 29.5071 30.6746 26.1849 30.6746 22.0868C30.6746 17.9887 27.3524 14.6665 23.2543 14.6665C19.1562 14.6665 15.834 17.9887 15.834 22.0868C15.834 26.1849 19.1562 29.5071 23.2543 29.5071Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                          <path id="Vector_2" d="M28.5039 27.3369L37.1671 36.0001" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                      </g>
                    </svg>

                  </button>
                </div>
                <div class="language-switch-holder">
                  <suspense>
                    <LanguageSwitch />
                  </suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'nswow';
.component-holder-PageHeader{
  .component-inside-PageHeader{
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: $space-m;
    max-width: 1920px;
    margin: auto;
    @media(min-width: $break-point-master){
      padding: $space-l;
    }
    .logo-holder{
      img{
        max-width: 110px;
        display: block;
        width: auto;
        height: auto;
        @media(min-width: $break-point-master){
          max-width: 232px;
        }
      }
    }
    .header-right{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .navigation-holder{


      }
      .tools-holder{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: nswow.system-size-unit(5);
        .downloads-holder{
          display: none;
        }
        button{
          background: transparent;
          border: none;
        }

      }
    }

  }

}
</style>
