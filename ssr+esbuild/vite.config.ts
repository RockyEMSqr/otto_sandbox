import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    ssrManifest: true,
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: ['./wui/main.tsx', './wui/pages/login.tsx', './wui/style.scss']
    }
  }

  //  build:{
  //   rollupOptions: {
  //     // overwrite default .html entry
  //     input: 'wui/index.html'
  //   }
  //  }
  // build: {
  //   rollupOptions: {
  //       input: {
  //           main: resolve(__dirname, 'wui/index.html'),
  //           // nested: resolve(__dirname, 'wui/login.html')
  //       }
  //   }
  // }
})
