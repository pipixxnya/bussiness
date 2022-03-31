<!--
 * @Author: zfz
 * @Date: 2022-03-25 14:22:32
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 14:49:27
 * @Description: update
-->
<template>
    <div class="add-btn">
      <el-button type="primary" @click="addReport">
        <template #icon>
          <svg-icon name="rect-add"></svg-icon>  
        </template>
        添加日报
      </el-button>
    </div>
    <div class="write-report-list" v-show="showAddReport">
      <el-form ref="reportForm" :model="reportSetForm" label-width="80px" :rules="rules">
          <el-form-item label-width="0px" prop="isProject">
            <el-select v-model="reportSetForm.isProject" placeholder="职能部门">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="0px" prop="assignment">
            <el-select v-model="reportSetForm.assignment" placeholder="任务事项">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="0px" class="short-form-item" prop="timeRange">
            <el-select v-model="reportSetForm.timeRange" placeholder="时间段">
              <el-option
                v-for="item in timeRangeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人天" label-width="50px" class="short-form-item" prop="dayTime">
            <numberInput v-model="reportSetForm.dayTime" :max="1" :min="0.1" :step="0.1"></numberInput>
          </el-form-item>
          <el-form-item label="任务进度" class="short-form-item-icon" prop="progress">
            <numberInput v-model="reportSetForm.progress" :max="100" :min="1" :step="1">
              <template #append>
                %
              </template>
            </numberInput>
          </el-form-item>
          <el-form-item label="加班时间" class="short-form-item-icon" prop="workOverTime">
            <numberInput v-model="reportSetForm.workOverTime" :max="24" :min="0">
              <template #append>
                h
              </template>
            </numberInput>
          </el-form-item>
          <el-form-item label="内容描述" class="long-form-item" prop="content">
            <el-input v-model="reportSetForm.content" :maxlength="20" :show-word-limit="true"></el-input>
          </el-form-item>
      </el-form>
      <div class="svg-group">
          <svg-icon name="check-circle" @click="saveReport()"></svg-icon>
          <svg-icon name="delete" @click="deleteReport()"></svg-icon>
      </div>
    </div>
    <div class="writed-report-list">
      <el-table
        :data="writedReportsTableData"
        stripe
        style="width: 100%;margin-top:10px"
        height="100%"
        :scrollbar-always-on="true"
      >
        <el-table-column
          v-for="item in writedReportsArr"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :show-overflow-tooltip="item.needTooltip"
          >
          <template #default="scope">
            <div v-if="item.prop === 'timeRange'">
              <colorfulRect :value="scope.row.timeRange" :dictionary="timeRangeDict"></colorfulRect>
            </div>
            <span :class="item.prop === 'time' ? 'flexCenter' : ''" v-else>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <div class="table-svg-group">
              <svg-icon name="edit" @click="editReport(scope.row)"></svg-icon>
              <svg-icon name="delete" @click="deleteReport(scope.row)"></svg-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'
import { tableArrItem } from '@/interface/common';
import colorfulRect from '@/components/colorfulRect/index.vue'
import common from '@/mixins/common'
import myBoardHook from '@/views/myBoard/hook/myBoardHook'
import numberInput from '@/components/numberInput/index.vue'
import { ElMessage } from 'element-plus';
import { post } from '@/request/http'

const { getWriteReportList } = myBoardHook()
const { confirmHandler } = common();
// 已填写日报表格的显示字段
const writedReportsArr = ref<Array<tableArrItem>>([
  {prop:'isProject',label:'项目/职能部门'},
  {prop:'projectName',label:'项目名称'},
  {prop:'assignment',label:'任务'},
  {prop:'timeRange',label:'时间段'},
  {prop:'dayTime',label:'消耗人天'},
  {prop:'progress',label:'项目任务进度%'},
  {prop:'workOverTime',label:'加班时间(H)'},
  {prop:'content',label:'内容描述'},
  {prop:'result',label:'审批结果'},
])
// 时间段下拉数据
const timeRangeList = [
  {label:'上午',value:0},
  {label:'下午',value:1},
  {label:'整天',value:2},
]
// 时间段显示用
const timeRangeDict = {
  0:{label:'上午',color:'cray',style:'width:50px;height:25px'},
  1:{label:'下午',color:'orange',style:'width:50px;height:25px'},
  2:{label:'全天',color:'blue',style:'width:50px;height:25px'},
}
// 写好的日报的表格数据
const writedReportsTableData = ref<Array<any>>([
  {isProject:'项目',projectName:'AOS史密斯',assignment:'运维优化',timeRange:'2',dayTime:'1',progress:'50%',workOverTime:'0',content:'运维优化',result:'同意'},
  {isProject:'项目',projectName:'日报信息维护系统',assignment:'开发',timeRange:'1',dayTime:'1',progress:'50%',workOverTime:'0',content:'开发',result:'同意'},
])
const showAddReport = ref<boolean>(false)
const reportForm = ref<any>('')
// 规则
const rules = reactive({
  isProject:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  projectName:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  timeRange:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  dayTime:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  progress:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  content:[
    {required:true,message:'不能为空',trigger:'blur'},
    {validator:(value: any,rule: any, callback: any) => {
      if(value.length > 20){
        callback(new Error('长度不能超过20位'))
      }
      callback()
    },trigger:'blur'}
  ],
})
// 填写日报用
const reportSetForm = ref<any>({
  isProject:'',
  projectName:'',
  assignment:'',
  timeRange:'',
  dayTime:'',
  progress:'',
  workOverTime:'',
  content:''
})
// 添加日报
function addReport() {
  showAddReport.value = true
}
// 计算当天所有人天总和,不能大于1
function sumDayTime(){
  const writeDayTime = reportSetForm.value.dayTime;
  if(writedReportsTableData.value.length === 0){
    return true
  }
  const writedDayTime = writedReportsTableData.value.reduce((pre: any,item: any) => {
    return pre + Number(item.dayTime)
  },0)
  return writeDayTime + writedDayTime > 1 ? false : true
}
// 保存日报
function saveReport() {
  const dayTimeIsRight = sumDayTime()
  if(!dayTimeIsRight){
    ElMessage({
      message:'当日人天总和不可大于1',
      type:'warning'
    })
    return
  }
  reportForm.value.validate((valid: boolean) => {
    if(valid){
      post('/api/kanban/insertDaily',{}).then(() => {

      })
    }
  }).catch(() => {})
  deleteReport()
}
// 修改日报
function editReport(row: any) {

}
// 删除日报
function deleteReport(row?: any) {
  // 新增时删除
  if(!row){
    reportForm.value.resetFields()
    showAddReport.value = false
  }else{
    // 表格中删除
    confirmHandler({
      url:'',
      methods:'post',
      tips:'确定删除该日报?',
      message:'删除成功',
      callback:[getWriteReportList]
    })
  }
 
}
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
.add-btn{
  .el-button{
    height:40px;
    width:120px;
    background: #2785ff;
  }
}
.write-report-list{
  height:20%;
  overflow-y: scroll;
  margin-top: 10px;
  border-bottom: 2px solid #ccc;
  @include flex;
  .el-form{
    width:95%;
    @extend .flexBet;
    align-items: flex-start;
    :deep(.el-form-item--default){
      margin-bottom:0 !important
    }
    :deep(.el-input-group__append){
      padding:0 5px;
      background-color:transparent
    }
  }
  .svg-group{
    width:5%;
    @extend .flexVerCenter;
    height: 32px;
    justify-content: space-around;
    :deep(.svg-icon){
      cursor:pointer;
    }
  }
}
.writed-report-list{
  height:60%;
  .table-svg-group{
    :deep(.svg-icon){
      margin-right:15px;
      cursor:pointer;
    }
  }
}
.short-form-item{
  width:8%
}
.short-form-item-icon{
  width:10%
}
.long-form-item{
  width:33%
}
</style>