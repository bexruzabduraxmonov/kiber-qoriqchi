import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      '/apk-proxy': {
        target: 'https://project.cybercontrol.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apk-proxy/, ''),
        headers: {
          'Origin': 'https://project.cybercontrol.uz',
          'Referer': 'https://project.cybercontrol.uz/'
        },
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
          });
        }
      }
    }
  }
});
