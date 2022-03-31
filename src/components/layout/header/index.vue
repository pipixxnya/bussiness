<template>
  <section id="iot-layout-header">
    <div class="iot-header-bread">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item 
          class="bread-style" 
          v-for="item in computedBread" 
          :key="item.url" 
          :class="item.actived ? 'actived' : ''"
        >
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <UserInfo></UserInfo>
  </section>
</template>
<script lang="ts">
export default {
  name: 'LayoutHeader',
};
</script>
<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { imgWithToken } from '@/components/carryToken/carryToken';
import { ElMessageBox, ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue'
import premission from '@/components/premission/index'
import UserInfo from '@/components/layout/header/components/userInfo.vue'

const route = useRoute();
const store = useStore();
const computedBread = computed(() => {
  const urls = route.path.split('/').slice(1);
  // 获取对应的面包屑
  const breads = urls.reduce((pre: any, item: any,index: number) => {
    const parent = pre.parent.find((val: any) => {
      return val.url === pre.path + '/' + item;
    });
    if(!parent){
      return pre
    }
    // 显示用,最后一个赋予actived:true，设置高亮
    pre.breads = [...pre.breads,index === urls.length -1 ? {name:parent.name,url:parent.url,actived:true} : {name:parent.name,url:parent.url}]
    // 当前的数据的childMenuList作为下一次循环的父级
    pre.parent = parent.childMenuList
    // 拼接每一次的path作为下一次判断的基准
    pre.path = pre.path + '/' + item
    return pre
  },{breads:[],parent:premission,path:''})
  return breads.breads
})

</script>

<style lang="scss" scoped>
#iot-layout-header {
  background-color: #fff;
  padding: 0px 20px;
  box-sizing: border-box;
  height: 68px;
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 20px;
  border-radius: 10px;
}

.iot-header-logo {
  width: 12vw;
  height: 100%;
  display: flex;
  align-items: center;
}

.iot-header-logo > img {
  width: 60%;
}

.bread-style{
  font-size: 14px;
  :deep(.el-breadcrumb__inner){
    font-weight: 600;
    color: #7d848e;
  }
  &.actived{
    :deep(.el-breadcrumb__inner){
      color: #2785ff;
    }
  }
}
.collect-middleground-web,
.iot-message{
  @extend .flexCenter;
  cursor: pointer;
  @include overSpread(16px);
  background: #e9edf3;
  border-radius: 3px;
}

.collect-middleground-web > img {
  @include overSpread(16px);
}

.collect-middleground-web > span{
  font-size: 16px;
  margin-left: 6px;
  color: #fff;
}

.iot-message {
  margin-left: 75px;
}

.iot-translation {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.iot-translation > img {
  @include overSpread(22px);
  cursor: pointer;
  margin-right: 12px;
}

.iot-message-icon{
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>
