/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_AUTH_SECRET: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_BLOB_READ_WRITE_TOKEN: string;
  readonly VITE_POSTGRES_DATABASE: string;
  readonly VITE_POSTGRES_HOST: string;
  readonly VITE_POSTGRES_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
