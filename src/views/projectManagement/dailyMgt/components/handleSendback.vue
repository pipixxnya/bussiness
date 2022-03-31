<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-28 10:33:15
 * @LastEditors: px
 * @LastEditTime: 2022-03-28 11:00:21
-->
<template>
    <div class="sendback">
        <el-dialog v-model="showSendBack" title="日报退回" width="35%" center="true">
            <el-form ref="sendbackform" :model="form" :rules="rules">
                <el-form-item label="退回原因" prop="reason">
                    <el-input v-model="form.reason"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea" 
                    autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancle">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
import dailyMgtHook from '../hook/dailyMgtHook'

let { showSendBack } = dailyMgtHook()  
let form = reactive({reason:''})
let sendbackform = ref<any>()
const rules = reactive({reason:[{ required: true, message: '请输入退回原因', trigger: 'blur' },]})
function cancle(){
    sendbackform.value.resetFields();
    form.reason = ''
    showSendBack.value = false
}
function confirm(){
    sendbackform.value.resetFields();
    console.log(form.reason)
    form.reason = ''
    showSendBack.value = false
}
</script>