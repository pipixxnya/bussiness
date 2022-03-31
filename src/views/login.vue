<!--
 * @Author: zfz
 * @Date: 2022-03-21 09:14:45
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 10:24:46
 * @Description: update
-->
<template>
  <div class="login-page" id="login-page">
    <div class="login-form">
      <div class="form-header">
        <h1>日报信息管理系统</h1>
      </div>
      <el-form label-position="right" label-width="100px" :model="loginForm">
        <el-form-item label="账号">
          <el-input v-model="loginForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { get, post } from '../request/http';
import { ref, reactive, watch } from 'vue';
import { Md5 } from 'ts-md5/dist/md5';
import { imgWithToken } from '@/components/carryToken/carryToken';
import premission from '@/components/premission/index'
import { ElMessage } from 'element-plus';

interface ResponseItem {
  code: number;
  msg: string;
  data?: any;
}
const store = useStore();
const router = useRouter();

let loginForm = ref({
  account: '',
  password: '',
});
function onSubmit() {
  // const menus = premission.map((val: any) => {
  //   const newVal = val;
  //   newVal.icon = newVal.url.replace(/\//,'')
  //   return newVal
  // })
  // const premissionList = premission.reduce((pre: any,val: any) => {
  //   pre = [...pre,val.menuCode]
  //   if(val.childMenuList){
  //     pre = [...pre,...val.childMenuList.map((val2: any) => {
  //       return val2.menuCode
  //     })]
  //   }
  //   return pre
  // },[])
  // store.commit('setPremission',premissionList)
  // store.commit('setNavbarList',menus)
  // router.push({path:'/myBoard'})
  // return
  sessionStorage.setItem('oriStore',JSON.stringify(store.state))
  post('/api/auth/webLogin', {
    userAccount: loginForm.value.account,
    // password: Md5.hashStr(loginForm.value.password)
    password: loginForm.value.password
  }).then((res: any) => {
    
    if(res.code === -1){
      ElMessage({
        message:res.msg,
        type:'warning'
      })
      return
    }
    const menus = premission.map((val: any) => {
      const newVal = val;
      newVal.icon = newVal.url.replace(/\//,'')
      return newVal
    })
    store.commit('setNavbarList',menus)
    store.commit('setPremission',res.data.permissionCodeList)
    store.commit('setToken',res.data.token)
    store.commit('setUserName',res.data.userName)
    store.commit('setOrganizationName',res.data.organizationName)
    router.push({path:'/myBoard'})
  });
}

</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/svg/bg.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}

.login-form {
  width: 45vw;
  height: 45vh;
  padding: 4vh 8vw;
  border-radius: 8px;
  box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
}

.form-header {
  width: 100%;
}
.form-header > h1 {
  font-size: 36px;
  text-align: center;
}
</style>
