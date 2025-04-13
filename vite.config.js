import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Add this line
      include: /\.(tsx|ts|jsx|js)$/,
    }),
  ],
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.(tsx|ts|jsx|js)$/,
  },
});

