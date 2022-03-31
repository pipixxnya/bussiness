<!--
 * @Author: zfz
 * @Date: 2022-03-18 18:24:22
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-25 17:28:00
 * @Description: update
-->
<template>
  <div id="iot-home">
    <Layout-Sider class="left" />
    <div class="right">
      <Layout-Header v-show="nowPath !== '/myBoard'" />
      <LayoutContent :class="nowPath === '/myBoard' ? 'no-header' : ''"></LayoutContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutHeader from '@cpt/layout/header/index.vue';
import LayoutSider from '@cpt/layout/sider/index.vue'
import LayoutContent from '@cpt/layout/content/index.vue';
import { provide, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const nowPath = ref<string>(route.path)
console.log('path',nowPath)
// 获取按钮权限
function getButtonPremissions(list: any,arr: Array<string| null>){
  let newArr = arr;
  console.log('list',list)
  return list.reduce((pre: Array<string>,val: any) => {
    if(val.buttonList){
      pre = getButtonPremissions(val.buttonList,pre)
    }
    if(val.childMenuList){
      pre = getButtonPremissions(val.childMenuList,pre)
    }
    return val.btnCode ? [...pre,val.btnCode] : pre
  },newArr)
}
let buttonPremissions = []
console.log('home',buttonPremissions)
if(buttonPremissions.length === 0){
  buttonPremissions = getButtonPremissions(store.state.navbarList,[])
  console.log('homeset',buttonPremissions)
  provide('buttonPremissions',buttonPremissions)
}
watch(
  () => route.path,
  (to, from) => {
    let time = setTimeout(() => {
      nowPath.value = to
      clearTimeout(time)
    }, 300)
    if(to === '/login'){
      router.go(0);
    }
    console.log('to:', to);
  }
);
</script>

<style lang="scss" scoped>
#iot-home{
  height: 100%;
  @include flex;
  background: #F7F8FC;
  .right{
    width:calc(100% - 10vw);
    @include flex;
    flex-direction: column;
    margin:0 20px;
  }
  .left{
    width:10vw;
  }
  .no-header{
    &.iot-layout-content{
      height:100%;
    }
  }
}
</style>