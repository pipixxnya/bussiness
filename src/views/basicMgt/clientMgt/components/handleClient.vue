<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-24 15:33:52
 * @LastEditors: px
 * @LastEditTime: 2022-03-29 17:46:27
-->
<template>
    <el-dialog
        :title="isEdit? '编辑' : '新增' " v-model="showHandleClient" width="30%" :close-on-click-modal="false">
        <el-form ref="clientform" :model="editedClient" :rules="rules">
            <el-form-item label="客户名称" prop="customerName">
                <el-input v-model="editedClient.customerName" placeholder="请输入内容" maxlength="16"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
            </template>
    </el-dialog>
</template>
<script lang='ts' setup>
import { computed, reactive,ref,toRefs} from 'vue'
import clientMgtHook from '@/views/basicMgt/clientMgt/hook/clientMgtHook'
import responseMsg from '@/components/responseMsg/responseMsg';
import { post } from '@/request/http';

const { showHandleClient, isEdit, editedClient,getCustomerList } = clientMgtHook();
let form = reactive({customerName:''})
const clientform = ref<any>()
const rules = reactive({customerName:[{ required: true, message: '客户名称不能为空', trigger: 'blur' },]})

function cancel(){
    clientform.value.resetFields();
    showHandleClient.value = false;
}
// 新增||编辑
function confirm(){
    let parmas = isEdit.value ? editedClient : {customerName:editedClient.customerName}
    clientform.value.validate((valid) => {
        if (valid) {
            let url = isEdit.value ? '/api/customer/update' : '/api/customer/insert'
            post(url,parmas).then((res)=>{
                responseMsg(
                    res,
                    isEdit.value ? '编辑成功' : '添加成功',
                    [getCustomerList],
                )
                if(res.code == '0'){
                    clientform.value.resetFields();
                    showHandleClient.value = false;
                }
            })
        }else{
            return false
        }
    })
}
</script>