<!--
 * @Author: zfz
 * @Date: 2022-03-22 16:40:52
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-22 17:10:51
 * @Description: update
-->
<template>
    <el-dialog
      v-model="showRateOfProgress"
      title="设置任务进度"
      width="20%"
      :before-close="handleClose"
    >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="gmtCreate"
          label="输入时间"
          min-width="130px"
        >
        </el-table-column>
        <el-table-column
          prop="progress"
          label="任务进度%"
        >
        </el-table-column>
      </el-table>
      <el-form ref="rateForm" :model="setForm" label-width="80px" :rules="rules">
        <el-form-item label="任务进度%">
          <el-input v-model="setForm.progress"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type="primary" plain class="search-btn" @click="handleClose">取消</el-button>
        <el-button type="primary" class="search-btn" @click="clickSure">确认</el-button>
    </div>
    </el-dialog>
</template>
<script lang='ts' setup>
import { reactive,ref,watch} from 'vue'
import assignmentHook from '@/views/projectManagement/assignment/hook/assignmentHook'

const {showRateOfProgress} = assignmentHook()
const setForm = reactive({
  progress:''
})
const rules = {
  progress:[
    {required:true,message:'不能为空',trigger:'blur'}
  ]
}
const rateForm = ref<any>('')
const tableData = ref<Array<any>>([
  {gmtCreate:'2022-12-12 12:23:23',progress:'12%'}
])
function handleClose(){
  showRateOfProgress.value = false
}
function clickSure(){
  rateForm.value.validate((valid: boolean) => {
    
  })
}
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
.el-form{
  margin-top: 15px;
  display: flex;
  justify-content: center;
  :deep(.el-form-item){
    width: 195px;
  }
}
.btn-group{
  @include btnGroup(center)
}
</style>