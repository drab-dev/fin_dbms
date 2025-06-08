// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // This is the CRUCIAL part for Single Page Applications (SPAs)
    // It tells Vite's development server to serve 'index.html'
    // for any requested path that doesn't correspond to a static file.
    historyApiFallback: true, // Ensure SPA routing works in development
  },
  build: {
    outDir: 'dist', // Ensure the build output directory is correct
  },
  base: '/', // Set the base path for deployment
});