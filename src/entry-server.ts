import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { basename } from 'node:path'

export async function render(url:string, manifest: any) {

  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
  
  //const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  //console.log('entry-server-preload -- ', preloadLinks)
  
  return [html] //preloadLinks
}

//? Неккоректно сформирован манифест с помощью plugin-vue, посмотреть с чем связано

// function renderPreloadLinks(modules: any, manifest: any) {
//   let links = ''
//   const seen = new Set()
//   console.log('seen -- ', seen)
//   modules.forEach((id:any) => {
//     const files = manifest[id]
//     console.log('files -- ', files)
//     console.log('id -- ', id)
//   })
//   return links
// }

// function renderPreloadLink(file: any) {
//   console.log('renderPreloadLink', file)
//   if (file.endsWith('.js')) {
//     return `<link rel="modulepreload" crossorigin href="${file}">`
//   } else if (file.endsWith('.css') || (file.endsWith('.scss'))) {
//     return `<link rel="stylesheet" href="${file}">`
//   } else if (file.endsWith('.woff')) {
//     return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
//   } else if (file.endsWith('.woff2')) {
//     return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
//   } else if (file.endsWith('.gif')) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
//   } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
//   } else if (file.endsWith('.png')) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/png">`
//   } else {
//     return ''
//   }
// }