<!--
 * @Author: zfz
 * @Date: 2022-03-29 17:42:29
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 18:00:29
 * @Description: update
-->
<template>
    <div id='unfinishedReport'>
      <div class="header">
        <div class="title">
          <span>未完结项目人员人天使用报告</span>
        </div>
        <div class="search-form">
          <el-select v-model="user" placeholder="人员">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" class="search-btn">导出</el-button>
        </div>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="prop"
            label="label"
            width="width">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'

const user = ref<string | number>('')
</script>
<script lang='ts'>
export default {
    name:'UnfinishedReport'
}
</script>
<style lang='scss' scoped>
#unfinishedReport{
  @include overSpread;
  @include flex;
  flex-direction: column;
  justify-content: space-between;
  .header{
    height:14%;
    background:#fff;
    padding:0 20px;
    .title{
      height:50%;
      @extend .flexVerCenter;
      font-size: 18px;
      font-weight:600;
      color: #363e48;
    }
  }
  .content{
    height:85%;
    background:#fff
  }
}
</style>