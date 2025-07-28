import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Esta linha é a mais importante para o deploy
  base: '/sistema-escala-trabalho/', 
  plugins: [react()],
})
