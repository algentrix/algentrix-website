import type { Connect } from 'vite'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

function serveTigerFitnessCaseStudy(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const raw = req.url ?? ''
    const pathOnly = raw.split('?')[0]
    if (pathOnly === '/case-studies/tiger-fitness' || pathOnly === '/case-studies/tiger-fitness/') {
      const query = raw.includes('?') ? raw.slice(raw.indexOf('?')) : ''
      req.url = `/case-studies/tiger-fitness/index.html${query}`
    }
    next()
  }

  return {
    name: 'serve-tiger-fitness-case-study',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [serveTigerFitnessCaseStudy(), react()],
})
