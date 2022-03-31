<!--
 * @Author: zfz
 * @Date: 2021-08-19 09:41:15
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 10:07:19
 * @Description: update
-->
<template>
    <!-- 有下级 -->
    <el-sub-menu :index="menuItem.url" v-if="premissionList.includes(menuItem.menuCode) && menuItem?.childMenuList && menuItem.childMenuList[0]">
    <template #title>
        <svg-icon :name="activeMenu === item.url ? 'select-' + menuItem.icon : menuItem.icon" v-if="item.icon"></svg-icon>
        <span>{{menuItem.name}}</span>
      </template>
      <subMenu 
        v-for="child in menuItem.childMenuList" 
        :key="child.id" 
        :item="child"
      />
    </el-sub-menu>
    <!-- 无下级 -->
    <el-menu-item :index="menuItem.url" v-if="premissionList.includes(menuItem.menuCode) && (!menuItem.childMenuList || !menuItem.childMenuList[0])" :route="item.name">
      <svg-icon :name="activeMenu === item.url ? 'select-' + menuItem.icon : menuItem.icon" v-if="item.icon"></svg-icon>
      <template #title>{{menuItem.name}}</template>
    </el-menu-item>
</template>
<script lang="ts" setup>
import { reactive,inject,toRefs } from 'vue'
import siderHook from '@/components/layout/sider/hook/siderHook'
import { useStore } from 'vuex'

const store = useStore();
const premissionList = store.state.premission
const { activeMenu } = siderHook()
const props = defineProps({
  item:{
        type:Object,
        default:()=>{}
    }
})
const menuItem = reactive(props.item)
</script>
<script lang="ts">
export default {
  name:'subMenu',
}
</script>
<style lang='scss' scoped>
@mixin menu{
  width: 73%;
  height: 40px;
  background: rgba(240,241,243,0.51);
  border-radius: 6px;
  transform: translateX(24%);
  color:#55595D;
  font-weight:bold;
}
.el-menu-vertical{
  &>.el-menu-item{
      @include menu;
      @extend .flexHorCenter;
      padding-left: 10px !important;
      &.is-active{
        background: #2785ff;
        color:#fff
      }
  }
}
:deep(.svg-icon){
  margin-right:7px
}
.el-sub-menu{
  margin-top:10px;
  :deep(.el-sub-menu__title){
    @include menu;
    transform: translateX(24%);
    .el-sub-menu__icon-arrow{
      position:static;
      right:0;
      top:0;
      width:auto;
      margin-top:0;
      margin-left:7px
    }
  }
  .el-menu-item{
    color:#7D848E;
    transform: translateX(26%);
    padding:0 !important;
    width: 73%;
    height: 30px;
    margin-top:10px;
    min-width: 73%;
    border-radius:6px;
    @extend .flexHorCenter;
    &.is-active{
      background: #2785ff;
      color:#fff
    }
  }
}
</style>