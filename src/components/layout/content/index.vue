<template>
  <div class="iot-layout-content">
    <!-- <el-tabs v-model="activeMenuPath" class="iot-tab" @tab-click="tabClick" type="border-card" @tab-remove="removeTab" closable>
      <el-tab-pane v-for="menu in menuList" :name="menu.url" :key="menu.index" :label="menu.menuCode"></el-tab-pane>
    </el-tabs> -->
    <div class="iot-content-wrap">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <!-- <keep-alive> -->
            <component :is="Component" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LayoutContent',
};
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import _ from 'lodash';
// import { flattenMenu } from '@cpt/globalMenu';
const router = useRouter();
const store = useStore();
const menu = store.state.navbarList
let copyMenu = _.cloneDeep(menu);
const activeMenuPath = ref<string>(store.state.activeMenu ? store.state.activeMenu.url : '/');
const menuList = computed(() => store.state.menuList);
function tabClick(tab) {
  let currentMenu = _.find(menu, { url: tab.props.name });
  store.commit('setActivePath', currentMenu);
  // router.push({ path: tab.props.name, params: {} });
}

function removeTab(tab) {
  let currentMenu = _.find(menu, { url: tab });
  store.commit('removePathList', currentMenu);
}
watch(() => store.state.activeMenu,(newVal: any) => {
  activeMenuPath.value = newVal?.url;
  if(!activeMenuPath.value) return
  router.push({ path: activeMenuPath.value, params: {} });
},{deep:true})
</script>

<style scoped>
.iot-layout-content {
  height: calc(100% - 133px);
}

.iot-tab {
  background: #f7f8fc;
  border: none;
  box-shadow: 0 0px 0px 0 rgb(0 0 0 / 12%), 0 0 0px 0 rgb(0 0 0 / 4%);
  padding-top: 12px;
  box-sizing: border-box;
}
.iot-content-wrap {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
<style>
.iot-tab .el-tabs__content {
  display: none;
}

.iot-tab .el-tabs__nav {
  margin-left: 20px;
  height: 40px;
  display: flex;
  align-items: center;
}

.iot-tab .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border: none;
}

.iot-tab .el-tabs__item {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px #e1e3ec;
  height: 32px;
  line-height: 32px;
  margin: 0px 6px;
  padding: 0 10px;
  border: none !important;
}

.iot-tab .el-tabs--border-card {
  border: none;
  box-shadow: none;
}

.iot-tab .el-tabs__item .el-icon-close {
  margin-left: 40px;
}

.iot-tab .el-tabs--border-card > .el-tabs__header {
  background-color: rgba(0, 0, 0, 0);
  border-bottom: none;
}

 .iot-tab .el-tabs__header {
  border-bottom: none;
}

.table-action > .el-icon {
  margin-left: 6px;
  cursor: pointer;
}

.table-pagination {
  display: flex;
  margin: 18px 0px;
  justify-content: flex-end;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>