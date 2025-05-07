import ArticleAutoloader from 'nswow/ArticleAutoloader'
import anchor from "../livingdocs/Misc/anchor/app.ts"
import accordion from "../livingdocs/Misc/accordion/app.ts"
import animatingNumber from "../livingdocs/Projekt/animating-number/app.ts"
import nswowTable from "../livingdocs/Media/nswow-table/app.ts"
import animatingDiagrams from "../livingdocs/Projekt/animating-diagrams/app.ts"
const ClassAutoLoader = new ArticleAutoloader()
ClassAutoLoader.register(anchor, "anchor")
ClassAutoLoader.register(accordion, "accordion")
ClassAutoLoader.register(animatingNumber, "animatingNumber")
ClassAutoLoader.register(nswowTable, "nswowTable")
ClassAutoLoader.register(animatingDiagrams, "animatingDiagrams")
export default ClassAutoLoader
export { ClassAutoLoader }