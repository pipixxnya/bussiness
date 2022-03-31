<!--
 * @Author: zfz
 * @Date: 2021-08-13 14:53:10
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 10:02:58
 * @Description: update
-->
<template>
  <div id="sider">
      <div class="logo">
        <img src="/logo.png" alt="" />
        <span>日报信息管理系统</span>
      </div>
     <el-menu
        :uniqueOpened="true"
        :default-active="activeMenu"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        @select="selectNavbar">
        <SubMenu v-for="item in navbarList" :key="item.id" :item="item"></SubMenu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive,computed,toRefs } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import SubMenu from '@/components/layout/sider/components/subMenu.vue'
import siderHook from '@/components/layout/sider/hook/siderHook'

const { activeMenu } = siderHook()
let router = useRouter()
let store = useStore()
const navbarList = store.state.navbarList;
let route = useRoute()
function handleOpen(){}
function handleClose(){}
function selectNavbar(index:any,indexPath:any,item:any){
    router.push({path:index})
}
</script>
<script lang="ts">
export default {
  name:'navbar',
}
</script>
<style scoped lang="scss">
#sider{
  background:#fff
}
.el-menu{
  height:100%;
}
.logo {
  height: 14%;
  @include flex;
  align-items: center;
  flex-direction: column;
  img {
    margin: 30px 61px 10px;
  }
  span {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: #393939;
  }
}
</style>
