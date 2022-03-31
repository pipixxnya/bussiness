<!--
 * @Author: zfz
 * @Date: 2022-03-21 11:13:30
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 14:02:23
 * @Description: update
-->
<template>
    <div id="modifyMgt">
      <div class="left-content">
        <h3>项目列表</h3>
        <div class="project-list">
          <span 
            v-for="item in projectList" 
            :key="item.value" 
            @click="changeProject(item)" 
            :class="['left-list-item', activedItem == item.value ? 'active' : '']"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="right-content">
        <div class="content-title">
          <h3>项目变更信息</h3>
          <el-button type="primary" class="search-btn" @click="openHandlerDialog()">
            <template #icon>
              <svg-icon name="rect-add"></svg-icon>  
            </template>
            新增
          </el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="item in tableArr"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <svg-icon name="closeAssignment" @click="openApproveDialog(scope.row)"></svg-icon>
              <svg-icon name="edit" @click="openHandlerDialog('edit')"></svg-icon>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination 
            background 
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes = "[10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total"
          />
        </div>
      </div>
      <HandleModifyDialog></HandleModifyDialog>
      <ApproveModifyDialog></ApproveModifyDialog>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'
import { valueLabel } from '@/interface/common'
import common from '@/mixins/common';
import { tableArrItem } from '@/interface/common'
import modifyMgtHook from '@/views/projectManagement/modifyMgt/hook/modifyMgtHook'
import HandleModifyDialog from '@/views/projectManagement/modifyMgt/components/handleModifyDialog.vue'
import ApproveModifyDialog from '@/views/projectManagement/modifyMgt/components/approveModifyDialog.vue'

// 全局方法
const { confirmHandler } = common();
// 公用字段方法
const {
  isEdit,
  showHandlerDialog,
  showApproveDialog,
} = modifyMgtHook()
// 项目列表
const projectList = ref<Array<valueLabel>>([
  {value:'1',label:'项目交付部门'}
])
// 选中的项目
const activedItem = ref<string | number>('')
// 表格数据
const tableData = ref<Array<any>>([
  {
   modifyName:'需求变更',
   modifyType:'开发',
   initiator:'技术经理',
   projectDayTime:'20',
   technDayTime:'20',
   modifyStatus:'通过',
  }
])
// 表格显示字段
const tableArr = ref<Array<tableArrItem>>([
  {prop:'modifyName',label:'变更名称'},
  {prop:'modifyType',label:'变更类型'},
  {prop:'initiator',label:'变更发起人'},
  {prop:'projectDayTime',label:'项目预估时间(人天)'},
  {prop:'technDayTime',label:'技术预估时间(人天)'},
  {prop:'modifyStatus',label:'变更状态'},
])
// 页码
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
const total = ref<number>(0)
// 变化项目
function changeProject(item: valueLabel){
  activedItem.value = item.value as string | number
}
// 查询
function search(){
  
}
// 打开编辑新增
function openHandlerDialog(type?: string){
  showHandlerDialog.value = true
  isEdit.value = type === 'edit'
}
// 关闭任务
function openApproveDialog(row: any){
  showApproveDialog.value = true
}

</script>
<script lang='ts'>
export default {
    name:'ModifyMgt'
}
</script>
<style lang='scss' scoped>
#modifyMgt{
  @include flex;
  @include overSpread;
  justify-content: space-between;
}
.left-content{
  width:13%;
  background:#fff;
  padding: 0 20px;
}
.right-content{
  width:86.7%;
  background:#fff;
  padding: 0 26px;
  .content-title{
    height:8%;
  }
}
.content-title{
  @extend .flexBet;
  align-items: center;
}
:deep(.svg-icon){
  margin-right: 7px;
  cursor: pointer;
}
</style>