/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PREVIEW_AI_KEY?: string;
  readonly VITE_PREVIEW_AI_BASE_URL?: string;
  readonly VITE_PREVIEW_AI_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
