import { renderToString, SSRContext } from 'vue/server-renderer'
import { createApp } from './main'
import { basename } from 'node:path'

export async function render(url:string, manifest: any) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const ctx = {} as SSRContext
  const html = await renderToString(app, ctx)
  let arr = [html]
  if (manifest != null) {
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    arr.push(preloadLinks)
  }
  return arr
}

function renderPreloadLinks(modules: any, manifest: any) {
  let links = ''
  const seen = new Set()
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          links += renderPreloadLink(filename)
        }
      });
    }
  })
  return links
}

function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}