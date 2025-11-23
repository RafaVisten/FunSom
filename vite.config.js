import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import path from 'path';


export default defineConfig({
  server: {
    port: 8081,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
