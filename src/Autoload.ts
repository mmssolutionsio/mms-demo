import ArticleAutoloader from 'nswow/ArticleAutoloader'
import accordion from "../livingdocs/Misc/accordion/app.ts"
import anchor from "../livingdocs/Misc/anchor/app.ts"
import animatingNumber from "../livingdocs/Projekt/animating-number/app.ts"
import animatingDiagrams from "../livingdocs/Projekt/animating-diagrams/app.ts"
import nswowTable from "../livingdocs/Media/nswow-table/app.ts"
const ClassAutoLoader = new ArticleAutoloader()
ClassAutoLoader.register(accordion, "accordion")
ClassAutoLoader.register(anchor, "anchor")
ClassAutoLoader.register(animatingNumber, "animatingNumber")
ClassAutoLoader.register(animatingDiagrams, "animatingDiagrams")
ClassAutoLoader.register(nswowTable, "nswowTable")
export default ClassAutoLoader
export { ClassAutoLoader }