import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Docs are now fetched from the API and rendered with react-markdown at runtime,
// so the build no longer compiles MDX.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
