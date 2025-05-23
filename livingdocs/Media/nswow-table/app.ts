import ArticleLoader from 'nswow/ArticleLoader';
import useConfig from '@/composables/config';
import { computed } from 'vue'
import { ArrayToString } from '@/utils/variables.ts'

export default class extends ArticleLoader {
  async _create() {
    this.noteLinks = this.element.querySelectorAll('.note-link');

    const config = await useConfig();
    const baseUrl = import.meta.env.BASE_URL || '/';



    this.noteLinks.forEach((n) => {
      n.addEventListener('click', async (e) => {
        e.preventDefault();

        function extractLangFromPath(pathname) {
          const parts = pathname.split('/').filter(Boolean);
          const possibleLangs = ['en', 'de', 'fr', 'it'];
          return parts.find(p => possibleLangs.includes(p)) || 'en';
        }



        //const lang = window.location.pathname.substring(1).split('/').shift();
        const lang = extractLangFromPath(window.location.pathname);
        const elem = e.target;
        const uuid = elem.href.split('/').pop();
        const article = config.value.articles[lang].find(a=>a.uuid === uuid);

        try {
          const file = `./html/${lang}/${article.name}.html`;
          try {
            const res = await fetch(file, {
              redirect: 'error',
            });


            const html = await res.text();
            if (html.includes('window.baseUrl')) {
              console.error(`"${file}" could not be loaded. A`);
            } else {
              window.appInstance?.$refs?.modal?.setContent(html);
            }
          } catch (e) {
            console.error(`"${file}" could not be loaded. B`);
            console.error(e);
          }
        }catch (e){
          console.error(` could not be find article with ${uuid}.`);
        }

      });
    });
  }

}
