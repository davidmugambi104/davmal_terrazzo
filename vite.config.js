import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: /\.(tsx|ts|jsx|js)$/,
    })
  ],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth']
        }
      }
    }
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.(tsx|ts|jsx|js)$/,
  }
});