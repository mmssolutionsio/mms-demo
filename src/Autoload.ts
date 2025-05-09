import ArticleAutoloader from 'nswow/ArticleAutoloader'
import anchor from "../livingdocs/Misc/anchor/app.ts"
import animatingDiagrams from "../livingdocs/Projekt/animating-diagrams/app.ts"
import animatingNumber from "../livingdocs/Projekt/animating-number/app.ts"
import accordion from "../livingdocs/Misc/accordion/app.ts"
import nswowTable from "../livingdocs/Media/nswow-table/app.ts"
const ClassAutoLoader = new ArticleAutoloader()
ClassAutoLoader.register(anchor, "anchor")
ClassAutoLoader.register(animatingDiagrams, "animatingDiagrams")
ClassAutoLoader.register(animatingNumber, "animatingNumber")
ClassAutoLoader.register(accordion, "accordion")
ClassAutoLoader.register(nswowTable, "nswowTable")
export default ClassAutoLoader
export { ClassAutoLoader }