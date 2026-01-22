import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env vars from .env, .env.local, etc.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // IMPORTANT for GitHub Pages project site:
    // https://woliwia.github.io/alveos-sm-report/
    base: '/alveos-sm-report/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // Only keep this if your app code uses process.env.*
    // NOTE: This bakes the key into the frontend bundle (public!)
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
    },

    resolve: {
      alias: {
        // If you use imports like "@/components/..."
        '@': path.resolve(__dirname, 'src'),
        // If your project expects @ to be the repo root instead, use:
        // '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
