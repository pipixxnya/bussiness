<!--
 * @Author: zfz
 * @Date: 2022-03-23 16:25:34
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 17:38:00
 * @Description: update
-->
<template>
    <el-dialog
      v-model="showHandleDepartment" 
      :title="computedTitle" 
      width="30%" 
      center 
      @close="closeDialog"
      @open="openDialog"
    >
      <el-form :model="userForm" ref="userSetForm" label-width="80px" :rules="rules">
        <el-form-item label="上级部门" prop="parentName" v-if="nowHanlderDepartment.level > 0">
          <el-input v-model="userForm.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="organizationName">
          <el-input v-model="userForm.organizationName"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="manager">
          <el-input v-model="userForm.manager"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button @click="closeDialog" class="search-btn">取 消</el-button>
        <el-button type="primary" @click="saveDepartment" class="search-btn">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script lang='ts' setup>
import { computed, reactive,ref,nextTick} from 'vue'
import userMgtHook from '@/views/basicMgt/userMgt/hook/userMgtHook'
import responseMsg from '@/components/responseMsg/responseMsg';
import { post } from '@/request/http';

interface active{
  value?:string | number, 
  label?:string, 
  level?:number,
  parent?:{label?:string,value?:string | number},
  manager?:string
}
const { showHandleDepartment, activedDepartment, isEdit, getDepartmentTree, editedDepartment } = userMgtHook()
const userForm = reactive({
  parentName:'',
  organizationName:'',
  manager:''
})
const userSetForm = ref<any>('');
const nowHanlderDepartment = ref<active>({})
// 规则
const rules = reactive({
  organizationName:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  parentName:[] as any
})
// 标题
const computedTitle = computed(() => {
  return isEdit.value ? '编辑部门' : '新增部门'
})
// 打开
function openDialog(){
  // 新增使用选择的部门，编辑使用点击编辑的那一个部门的信息
  nowHanlderDepartment.value = isEdit.value ? editedDepartment.value: activedDepartment.value
  // 显示上级部门与规则添加
  if(!isEdit.value){
    userForm.parentName = nowHanlderDepartment.value.label as string
  }
  rules.parentName = nowHanlderDepartment.value.level ? [
    {required:true,message:'不能为空',trigger:'blur'}
  ] : []
  // 填充编辑数据
  if(isEdit.value){
    userForm.parentName = nowHanlderDepartment.value.parent?.label as string
    userForm.organizationName = nowHanlderDepartment.value?.label as string
    userForm.manager = nowHanlderDepartment.value?.manager as string
  }
  nextTick(() => {
    userSetForm.value.clearValidate()
  })
}
// 关闭
function closeDialog(){
  showHandleDepartment.value = false;
}
// 保存
function saveDepartment() {
  userSetForm.value.validate((valid: boolean) => {
    if(valid){
      let url = isEdit.value ? '/api/organization/updateOrganization' : '/api/organization/insertOrganization'
      let params: any = {
        organizationName:userForm.organizationName,
        manager:userForm.manager,
        parentId:nowHanlderDepartment.value.value
      }
      if(isEdit.value){
        params.id = nowHanlderDepartment.value.value
      }
      post(url,params).then((res: any) => {
        responseMsg(
          res,
          isEdit.value ? '编辑成功' : '添加成功',
          [getDepartmentTree,closeDialog],
        )
      })
    }
  }).catch(() => {})
}
</script>
<script lang='ts'>
export default {
    name:'HanlderDepartment'
}
</script>
<style lang='scss' scoped>
.btn-group{
  @include btnGroup(center)
}
</style>