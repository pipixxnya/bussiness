<!--
 * @Author: zfz
 * @Date: 2022-03-25 13:39:14
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 17:50:10
 * @Description: update
-->
<template>
    <div class="iot-header-action">
      <div class="header-pic">
        <div class="pic-circle" :style="`background-image:url('${headerPic}')`"></div>
      </div>
      <div class="user-info">
        <div class="name">{{userName}}</div>
        <div class="job">{{userJob}}</div>
      </div>
      <el-dropdown @command="handleCommand" style="color: white" @mouseleave="isUp = false">
        <div class="iot-user-info" @mouseover="isUp = true" >
          <ArrowDown :class="['arrow-ani',isUp ? 'up' : '']"></ArrowDown>
        </div>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logOut">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus';
import { DELETE } from '@/request/http';

const userId = ref(0);
const store = useStore();
const router = useRouter();
const headerPic = ref<string>('/header/header_pic.png')
const userName = ref<string>(store.state.userName)
const userJob = ref<string>('产品研发部')
const isUp = ref<boolean>(false)

function handleCommand(command: string) {
  if (command == 'logOut') {
    ElMessageBox.confirm('退出登录？', '提示', {
      cancelButtonClass: 'btn-custom-cancel',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      DELETE(`/iot/user-api/common/manage-login-out/${userId.value}`, {}).then((res) => {
        if (sessionStorage.getItem('oriStore')) {
            store.replaceState(
                Object.assign(
                    {},
                    store.state,
                    JSON.parse(sessionStorage.getItem('oriStore') as string)
                )
            )
            console.log(store.state)
            sessionStorage.removeItem("oriStore")
        }
        store.commit('removeToken')
        store.commit('reLoad')
        router.push({path: "/login"});
      });
    });
  }
}
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
.iot-header-action {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-pic{
  @include overSpread(55px);
  margin-right: 10px;
  .pic-circle{
    @include overSpread;
    background-repeat: no-repeat;
    background-size:contain
  }
}
.user-info{
  width:100px;
  height:55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .name{
    font-size:16px;
    color:#35383c;
    font-weight: 600;
    margin-bottom:7px
  }
  .job{
    font-size:12px;
    color:#7D848E;
  }
}
.iot-user-info {
  @extend .flexCenter;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: #e9edf3;
  border-radius: 3px;
  & > span {
    font-size: 16px;
    margin-left: 6px;
    color: #fff;
  }
  img {
    width: 32px;
    height: 32px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 10px;
  }
}
.arrow-ani{
  transition: transform 0.3s linear;
  transform-origin: center center;
  color:#8C939B;
  width:9px;
  height:9px;
  &.up{
    transform: rotate(180deg);
  }
}
</style>