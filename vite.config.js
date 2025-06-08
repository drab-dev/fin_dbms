// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // This is the CRUCIAL part for Single Page Applications (SPAs)
    // It tells Vite's development server to serve 'index.html'
    // for any requested path that doesn't correspond to a static file.
    historyApiFallback: true, 
  },
  // You might also need to explicitly set the base path if your app isn't served from the root
  // For most development setups, this isn't needed, but good to know:
  // base: '/', 
});