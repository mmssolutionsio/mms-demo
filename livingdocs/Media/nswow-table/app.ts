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

        console.log(window.location.origin)
        console.log(window.location.href)
        console.log(window.location.pathname)
        console.log('+++++++++++++++++')
        console.log(baseUrl)
        console.log(lang)
        console.log(elem)
        console.log(uuid)
        console.log(article)

        try {
          const file = `./html/${lang}/${article.name}.html`;
          console.log(file)
          try {
            const res = await fetch(file, {
              redirect: 'error',
            });
            const html = await res.text();
            if (html.includes('window.baseUrl')) {
              console.error(`"${file}" could not be loaded.`);
            } else {
              window.app._instance.root.refs.modal.setContent(html);
            }
          } catch (e) {
            console.error(`"${file}" could not be loaded.`);
          }
        }catch (e){
          console.error(` could not be find article with ${uuid}.`);
        }

      });
    });
  }

}
