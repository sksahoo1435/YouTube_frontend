import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set base path
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000 // Optional: Specify local development port
  }
});
