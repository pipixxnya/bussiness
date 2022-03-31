/*
 * @Author: zfz
 * @Date: 2022-03-21 09:14:46
 * @LastEditors: px
 * @LastEditTime: 2022-03-29 16:02:59
 * @Description: update
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import { svgBuilder } from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/components/icons/svgs/')],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.90.166:9123/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
    },
  },
  resolve: {
    // 目录别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@page': path.resolve(__dirname, './src/views'),
      '@cpt': path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/global.scss";`,
        charset: false,
      },
    },
  },
  //   css: {
  //     preprocessorOptions: {
  //       less: {
  //         modifyVars: {},
  //         javascriptEnabled: true,
  //       },
  //     },
  //   },
});
