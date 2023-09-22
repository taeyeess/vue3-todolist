// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const isTest = process.env.VITEST

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
      )
    : {}
  
  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  // 동적으로 받아온 vite에 createServer()를 호출하고 vite 개발 서버를 생성 하여 vite변수에 할당
  let vite
  if (!isProd) {
    vite = await ( await import('vite') ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    })

    // 위에서 생성한 vite개발서버를 express앱에 미들웨어로 사용
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    )
  }
  
  
  /**
   * - 요청 url에 따라 서버렌더링, 또는 클라이언트 렌더링을 수행
   * - 개발 환경에서는 동적으로 HTML템플릿을 읽어오고, vite를 사용하여 템플릿을 변환한다. 
   * - vite를 사용하여 서버 사이드 렌더링(SSR) 모듈을 동적으로 가져온다.
   * - 템플릿에는 preloadLinks, appHtml, state가 주입되고, 이들을 사용해 HTML을 생성한다.
  */
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/entry-server.ts')).render
      }

      const [appHtml, preloadLinks, state] = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace('<!--pinia-state-->', state);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(6173, () => {
      console.log('http://localhost:6173')
    }),
  )
}