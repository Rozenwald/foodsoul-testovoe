import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer, ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p: string) => path.resolve(__dirname, p)

export async function createServer() {
  let app: express.Application = express()

  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req: express.Request, res: express.Response) => {
    const url = req.originalUrl
    try {
      let render
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )

      template = await vite.transformIndexHtml(url, template);

      ({ render } = await vite.ssrLoadModule('/src/entry-server.ts'))

      let manifest: string | null
      if (fs.existsSync('dist/client/ssr-manifest.json')) {
        manifest = JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'))
      } else {
        manifest = null
      }

      const [appHtml, preloadLinks] = await render(url, manifest)

      let html
      if (preloadLinks) {
        html = template
          .replace(`app-html`, appHtml)
          .replace(`<!--preload-links-->`, preloadLinks)
      } else {
        html = template
          .replace(`app-html`, appHtml)
      }
      
      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html)
    } catch (e: any) {
      vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })
  app.listen(5000)
}

createServer()
  .then(() => {
      console.log('server start on http://localhost:5000')
    }
  )
