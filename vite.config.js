import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { existsSync, statSync } from 'fs'
import { resolve } from 'path'
import { pathToFileURL } from 'url'

// Serves the Vercel functions in /api during `vite dev`, so the chat works locally.
function apiDevServer() {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const file = resolve('api', `.${req.url.split('?')[0]}.js`)
        if (!existsSync(file)) return next()

        let raw = ''
        for await (const chunk of req) raw += chunk
        req.body = raw ? JSON.parse(raw) : {}

        // Minimal Vercel-style response helpers
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }

        try {
          const mtime = statSync(file).mtimeMs
          const { default: handler } = await import(`${pathToFileURL(file).href}?t=${mtime}`)
          await handler(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expose .env (incl. ANTHROPIC_API_KEY) to the API handlers via process.env
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) process.env[key] ??= value

  return {
    plugins: [
      react(),
      imagetools(),
      apiDevServer(),
    ],
  }
})
