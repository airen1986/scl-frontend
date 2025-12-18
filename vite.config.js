import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        landing: resolve(__dirname, 'src/landing.html'),
        login: resolve(__dirname, 'src/login.html'),
        signup: resolve(__dirname, 'src/signup.html'),
        forgotPassword: resolve(__dirname, 'src/forgot-password.html'),
        resetPassword: resolve(__dirname, 'src/reset-password.html'),
        homePage: resolve(__dirname, 'src/home-page.html')
      }
    }
  },
  server: {
    port: 3000
  }
});
