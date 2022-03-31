/*
 * @Description: 加载插件文件
 * @Author: ZY
 * @Date: 2020-12-19 11:53:00
 * @LastEditors: xing.huang
 * @LastEditTime: 2021-08-19 09:45:49
 */
import { createApp } from 'vue'

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
// export function loadAllPlugins(app: ReturnType<typeof createApp>) {
//   const files = require.context('.', true, /\.ts$/)
//   files.keys().forEach(key => {
//     if (typeof files(key).default === 'function') {
//       if (key !== './index.ts') files(key).default(app)
//     }
//   })
// }
