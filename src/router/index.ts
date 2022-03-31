/*
 * @Author: zfz
 * @Date: 2022-03-23 11:11:47
 * @LastEditors: px
 * @LastEditTime: 2022-03-30 14:26:28
 * @Description: update
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import _ from 'lodash';
import store from '../store'
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { title: 'Home'},
    component: () => import('@/views/home.vue'),
    redirect: '/login',
    children: [
      {
        path: '/myBoard',
        name: 'MyBoard',
        meta: { title: 'MyBoard'},
        component: () => import('@/views/myBoard/index.vue'),
      },
      {
        path: '/basic/roleList',
        name: 'RoleList',
        meta: { title: 'roleList'},
        component: () => import('@/views/basicMgt/roleList/index.vue'),
      },
      {
        path: '/basic/userMgt',
        name: 'UserMgt',
        meta: { title: 'UserMgt'},
        component: () => import('@/views/basicMgt/userMgt/UserMgt.vue'),
      },
      {
        path: '/basic/proTastRuleMgt',
        name: 'ProTastRuleMgt',
        meta: { title: 'UserMgt'},
        component: () => import('@/views/basicMgt/ProTastRuleMgt.vue'),
      },
      {
        path: '/basic/projectTaskList',
        name: 'ProjectTaskList',
        meta: { title: 'projectTaskList'},
        component: () => import('@/views/basicMgt/base/projectTaskList.vue'),
      },
      {
        path: '/basic/projectManagement',
        name: 'ProjectManagement',
        meta: { title: 'projectManagement'},
        component: () => import('@/views/basicMgt/base/projectManagement.vue'),
      },
      {
        path: '/basic/clientMgt',
        name: 'ClientMgt',
        meta: { title: 'clientMgt'},
        component: () => import('@/views/basicMgt/clientMgt/index.vue'),
      },
      {
        path: '/project/assignment',
        name: 'Assignment',
        meta: { title: 'assignment'},
        component: () => import('@/views/projectManagement/assignment/index.vue'),
      },
      {
        path: '/project/modifyMgt',
        name: 'ModifyMgt',
        meta: { title: 'modifyMgt'},
        component: () => import('@/views/projectManagement/modifyMgt/index.vue'),
      },
      {
        path: '/project/daily',
        name: 'DailyMgt',
        meta: { title: 'dailyMgt'},
        component: () => import('@/views/projectManagement/dailyMgt/index.vue'),
      },
      {
        path: '/report/summaryBoard',
        name: 'SummaryBoard',
        meta: { title: 'summaryBoard'},
        component: () => import('@/views/reportMgt/summaryBoard/index.vue'),
      },
      {
        path: '/report/unfinishedReport',
        name: 'UnfinishedReport',
        meta: { title: 'unfinishedReport'},
        component: () => import('@/views/reportMgt/unfinishedReport/index.vue'),
      },
      {
        path: '/function/daily',
        name: 'FunDailyMgt',
        meta: { title: 'funDailyMgt'},
        component: () => import('@/views/functionMgt/dailyMgt/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'login'},
    component: () => import('@/views/login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});
// router.beforeEach((to, from, next) => {
//   if(to.path == '/login'){
//     next()
//     return
//   }
//   let currentMenu:any = {};
//   currentMenu = _.find(store.state.flattenMenu, {url:to.path});
//   store.commit('setPathList', currentMenu);
//   next()
// });

export default router;
