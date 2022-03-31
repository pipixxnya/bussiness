<!--
 * @Author: zfz
 * @Date: 2022-03-24 15:28:40
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 13:57:55
 * @Description: update
-->
<template>
    <el-dialog
      :title="computedTitle"
      v-model="showHandlerDialog"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @open="openDialog"
      width="20%"
    >
      <el-form ref="roleForm" :model="roleSetForm" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleSetForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type="primary" plain @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
      </div>
    </el-dialog>
</template>
<script lang='ts' setup>
import { reactive,ref,computed} from 'vue'
import roleListHook from '@/views/basicMgt/roleList/hook/roleListHook'
import responseMsg from '@/components/responseMsg/responseMsg'
import { post } from '@/request/http'

const { showHandlerDialog, isEdit, editedRole, getRoleList } = roleListHook();
// 新增编辑角色名称
const roleSetForm = reactive({
  roleName:''
})
const roleForm = ref<any>('')
const computedTitle = computed(() => {
  return isEdit.value ? '编辑角色' : '新增角色'
})
const rules = {
  roleName:[
    {required:true,message:'不能为空',trigger:'blur'}
  ]
}
// 打开编辑框
function openDialog(){
  roleSetForm.roleName = isEdit.value ? editedRole.value.label as string : ''
}
// 关闭
function handleClose(){
  showHandlerDialog.value = false
}
// 保存
function saveRole(){
  roleForm.value.validate((valid: boolean) => {
    if(valid){
      let url = isEdit.value ? '/api/role/updateRole' : '/api/role/insertRole';
      let params: any = {
        ...roleSetForm
      };
      if(isEdit.value){
        params.id = isEdit.value.value
      }
      post(url,params).then((res: any) => {
        responseMsg(
          res,
          isEdit.value ? '编辑成功' : '新增成功',
          [getRoleList,handleClose]
        )
      })
    }
  })
}
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
.btn-group{
  @include btnGroup(center)
}
</style>