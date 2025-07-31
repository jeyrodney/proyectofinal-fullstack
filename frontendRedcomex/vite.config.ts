import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permitirá que se acceda desde fuera de localhost
    port: 5173,
    allowedHosts: ['ec2-44-202-39-79.compute-1.amazonaws.com']
  },
})
