import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        transform: resolve(__dirname, 'transform.html'),
        flashcards: resolve(__dirname, 'flashcards.html'),
        match: resolve(__dirname, 'match.html'),
      }
    }
  }
})
