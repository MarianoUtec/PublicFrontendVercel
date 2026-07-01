import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || '';

  // The proxy is ONLY used by `vite dev` (local development).
  // In production (Amplify), the built static files are served without any proxy —
  // Axios uses the full VITE_API_URL directly as baseURL instead.
  const isLocalDev = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
      ...(isLocalDev && {
        proxy: {
          '/api': {
            target: apiUrl,
            changeOrigin: true,
          },
        },
      }),
    },
  };
});
