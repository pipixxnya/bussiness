<!--
 * @Author: zfz
 * @Date: 2022-03-22 11:19:22
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 13:53:23
 * @Description: 变更新增编辑
-->
<template>
    <el-drawer
      v-model="showHandlerDialog"
      direction="rtl"
      :before-close="handleClose"
      :modal="false"
      custom-class="handler-drawer"
    >
    <template #title>
     <span class="drawer-title">{{computedTitle}}</span>
    </template>
    <el-form ref="modifySetForm" :model="modifyForm" label-width="120px" :rules="rules">
      <el-form-item label="变更名称" prop="modifyName">
        <el-input v-model="modifyForm.modifyName" placeholder="请输入变更名称" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="项目预估人天" prop="projectDayTime">
       <el-input v-model="modifyForm.projectDayTime" placeholder="请输入项目预估人天" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="技术预估人天" prop="technDayTime">
        <el-input v-model="modifyForm.technDayTime" placeholder="请输入技术预估人天" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="审批人" prop="initiator">
        <el-select v-model="modifyForm.initiator" placeholder="请选择审批人" class="width100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变更类型" prop="modifyType">
        <el-select v-model="modifyForm.modifyType" placeholder="请选择变更类型" class="width100">
          <el-option
            v-for="item in modifyTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变更原因及内容" prop="modifyContent">
        <el-input v-model="modifyForm.modifyContent" type="textarea" placeholder="" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" plain class="search-btn" @click="handleClose">取消</el-button>
      <el-button type="primary" class="search-btn" @click="saveModify">确认</el-button>
    </div>
  </el-drawer>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, watch} from 'vue'
import common from '@/mixins/common';
import modifyMgtHook from '@/views/projectManagement/modifyMgt/hook/modifyMgtHook'

const {
  isEdit,
  showHandlerDialog,
} = modifyMgtHook()
const { modifyTypeList } = common();
const modifySetForm = ref<any>('')
const modifyForm = ref({
  modifyName:'',
  modifyType:'',
  initiator:'',
  projectDayTime:'',
  technDayTime:'',
  modifyContent:'',
})
const rules = reactive({
  modifyName:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  modifyType:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  initiator:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  projectDayTime:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  modifyContent:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
})
const computedTitle = computed(() => {
  return isEdit.value ? '项目变更编辑' : '项目变更新增'
})
// 关闭
function handleClose(){
  modifyForm.value = {
    modifyName:'',
    modifyType:'',
    initiator:'',
    projectDayTime:'',
    technDayTime:'',
    modifyContent:'',
  }
  showHandlerDialog.value = false
}
// 保存
function saveModify(){
  modifySetForm.value.validate((valid: boolean)=>{
    if(valid){
      
    }
  }).catch(() => {})
}
</script>
<script lang='ts'>
export default {
    name:'HandlerModify'
}
</script>
<style lang='scss' scoped>
.drawer-title{
  color: #23272a;
  font-size:21px;
  font-weight: 600;
}
.btn-group{
  @include btnGroup
}
</style>