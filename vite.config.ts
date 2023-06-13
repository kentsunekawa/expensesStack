import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted(), macrosPlugin()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
})
