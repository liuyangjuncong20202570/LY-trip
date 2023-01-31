import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    disableHostCheck: true,
    https: false
  },
  proxy: {
    '/baidu': {
      target: 'https://api.map.baidu.com/location/ip',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/baidu/, '')
    }
  }

  // 在根目录下的vite.config.ts修改server属性
})
