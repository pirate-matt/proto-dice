import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // globals: true, // This is needed by @testing-library to be cleaned up after each test
    environment: 'jsdom',
  },
});