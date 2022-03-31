/*
 * @Author: zfz
 * @Date: 2022-03-18 16:10:29
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 11:12:30
 * @Description: update
 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons';

import store from '@/store';
import router from '@/router';
import App from './App.vue';
import { transElIconName } from './util/CommonUtils';
// import { get, post } from "./request/http";

import 'normalize.css';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style/index.css';
// import "@/router/permission";
// import './mock';
import vuexToSession from './store/vuexToSession'
import svgIcon from './components/icons/index.vue';
let app = createApp(App);

// 注册ElIcon
for (let iconName in ElIconModules) {
  app.component(transElIconName(iconName), ElIconModules[iconName]);
}
// 注册自定义svgIcon
app.component('svg-icon', svgIcon);
// 防止刷新丢失vuex中的数据
vuexToSession(store)
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(store).use(router).mount('#app');
