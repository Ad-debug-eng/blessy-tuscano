import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/blessy-tuscano/',
  server: {
    port: 3000,
    host: true
  }
});
