import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

const prodCsp =
  "default-src 'self'; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"

// Dev me HMR websocket + React Refresh inline preamble chahiye
const devCsp =
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self' ws://localhost:5173 ws://127.0.0.1:5173 http://localhost:3001 http://127.0.0.1:3001; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    headers: {
      ...baseHeaders,
      'Content-Security-Policy': devCsp,
    },
  },
  preview: {
    port: 5173,
    host: true,
    headers: {
      ...baseHeaders,
      'Content-Security-Policy': prodCsp,
      'Cache-Control': 'no-store',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
