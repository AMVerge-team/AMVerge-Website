/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Base URL of the backend API (admin repo's counter-server.cjs) that serves
  // docs content, startup notifications, and the download counter.
  readonly VITE_ADMIN_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
