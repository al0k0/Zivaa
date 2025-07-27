import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //   server: {
  //   host: '0.0.0.0', // This allows access from external devices
  //   port: 5174,      // Ensure the port matches your desired port
  // },
})
