<!--
 * @Author: zfz
 * @Date: 2022-03-21 11:13:30
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 17:48:38
 * @Description: update
-->
<template>
    <div id="assignment">
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
        <h3>项目任务信息</h3>
        <div class="search-form">
          <div class="search-form-item">
            <el-select v-model="searchForm.name" placeholder="任务名称" class="search-item">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="searchForm.type" placeholder="任务类型" class="search-item">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="searchForm.level" placeholder="任务优先级" class="search-item">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="search-item">
              <el-button type="primary" class="search-btn" @click="search">查询</el-button>
              <el-button type="primary" class="search-btn" plain @click="clearSearch">清除</el-button>
            </div>
          </div>
          <div class="other-btn">
            <el-button type="primary" @click="openHandlerDialog">
              <template #icon>
                <svg-icon name="rect-add"></svg-icon>  
              </template>
              新增
            </el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="item in tableArr"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label">
            <template #default="scope">
              <!-- 优先级 -->
              <LevelCircle v-if="item.prop === 'level'" :level="scope.row.level"></LevelCircle>
              <!-- 状态 -->
              <ColorfulRect v-else-if="item.prop === 'status'" :value="scope.row.status"></ColorfulRect>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <svg-icon name="closeAssignment" @click="closeAssignment(scope.row)"></svg-icon>
              <svg-icon name="operation" @click="openRateOfProgress"></svg-icon>
              <svg-icon name="edit" @click="openHandlerDialog('edit')"></svg-icon>
              <svg-icon name="delete" @click="deleteAssignment(scope.row)"></svg-icon>
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
        <!-- 新增编辑 -->
        <HandlerAssignment></HandlerAssignment>
        <!-- 进度管理 -->
        <RateOfProgress></RateOfProgress>
      </div>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'
import { valueLabel } from '@/interface/common'
import LevelCircle from '@/components/levelCircle/index.vue'
import ColorfulRect from '@/components/colorfulRect/index.vue'
import HandlerAssignment from '@/views/projectManagement/assignment/components/handlerAssignment.vue'
import RateOfProgress from '@/views/projectManagement/assignment/components/rateOfProgress.vue'
import assignmentHook from '@/views/projectManagement/assignment/hook/assignmentHook'
import common from '@/mixins/common';
import { tableArrItem } from '@/interface/common'

// 全局方法
const { confirmHandler } = common();
// 任务页面公用字段方法
const {
  showHandlerDialog,
  showRateOfProgress,
  isEdit,
} = assignmentHook()
// 项目列表
const projectList = ref<Array<valueLabel>>([
  {value:'1',label:'项目交付部门'}
])
// 选中的项目
const activedItem = ref<string | number>('')
// 表格数据
const tableData = ref<Array<any>>([
  {
    name:'日报管理系统',
    member:'',
    level:4,
    type:3,
    time:200,
    process:'50%',
    status:3,
    planTime:'2022-04-15',
    inFactTime:'2022-04-25'
  }
])
// 查询条件
const searchForm = reactive({
  name:'',
  level:'',
  type:''
})
// 页码
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
const total = ref<number>(0)
// 表格显示字段
const tableArr = ref<Array<tableArrItem>>([
  {prop:'name',label:'任务名称'},
  {prop:'member',label:'参与人员'},
  {prop:'level',label:'优先级'},
  {prop:'type',label:'任务类型'},
  {prop:'time',label:'任务所需时间(h)'},
  {prop:'process',label:'任务进度%'},
  {prop:'status',label:'状态'},
  {prop:'planTime',label:'任务计划时间'},
  {prop:'inFactTime',label:'任务实际时间'},
])
// 变化项目
function changeProject(item: valueLabel){
  activedItem.value = item.value as string | number
}
// 查询
function search(){
  
}
// 清除查询条件
function clearSearch(){
  searchForm.name = ''
  searchForm.type = ''
  searchForm.level = ''
}
// 打开编辑新增
function openHandlerDialog(type?: string){
  showHandlerDialog.value = true
  isEdit.value = type === 'edit'
}
// 打开进度管理
function openRateOfProgress(){
  showRateOfProgress.value = true
}
// 关闭任务
function closeAssignment(row: any){
  confirmHandler({
    methods:'post',
    tips:'是否关闭该任务',
    message:'关闭成功',
    url:'',
    callback:[search]
  })
}
// 删除任务
function deleteAssignment(row: any){
  confirmHandler({
    methods:'DELETE',
    tips:'是否删除该任务',
    message:'删除成功',
    url:'',
    callback:[search]
  })
}

</script>
<script lang='ts'>
export default {
    name:'Assignment'
}
</script>
<style lang='scss' scoped>
#assignment{
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
  width:85.7%;
  background:#fff;
  padding: 0 26px;
}
.search-form{
  @extend .flexBet;
  margin-bottom: 16px;
}
.search-form-item{
  @extend .flexBet;
}
.search-item{
  margin-right:10px;
}
:deep(.svg-icon){
  margin-right: 7px;
  cursor: pointer;
}
</style>