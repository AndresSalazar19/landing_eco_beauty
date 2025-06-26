import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    historyApiFallback: true, // para rutas tipo SPA
  },
});
