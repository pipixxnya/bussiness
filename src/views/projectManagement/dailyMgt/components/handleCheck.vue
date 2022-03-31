<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-28 11:02:07
 * @LastEditors: px
 * @LastEditTime: 2022-03-31 09:50:48
-->
<template>
    <div class="check">
        <el-dialog v-model="showCheck" title="日报审核" width="28%" center="true">
            <el-form ref="showcheckform" :model="checkDate" :rules="rules" label-width="120px" >
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="checkDate.name" disabled="true" style="width:280px;" />
                </el-form-item>
                <el-form-item label="任务名称" prop="name">
                    <el-input v-model="checkDate.name" style="width:280px;" />
                </el-form-item>
                <el-form-item label="时间段" prop="date">
                    <el-select v-model="checkDate.date" style="width:280px;" placeholder="请选择">
                        <el-option value="0" label="上午"></el-option>
                        <el-option value="1" label="下午"></el-option>
                        <el-option value="2" label="全天"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务消耗人天" prop="time">
                    <el-input v-model="checkDate.time" style="width:280px;" />
                </el-form-item>
                <el-form-item label="审核状态" prop="state">
                    <el-select v-model="checkDate.state" style="width:280px;" placeholder="请选择">
                        <el-option value="1" label="同意"></el-option>
                        <el-option value="0" label="退回"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核备注" prop="checkRemark">
                    <el-input v-model="checkRemark" type="textarea" style="width:280px;" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancle">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
import dailyMgtHook from '../hook/dailyMgtHook'

let { showCheck,checkDate } = dailyMgtHook()  
let showcheckform = ref<any>()
let checkRemark = ref('')
const rules = reactive({
    date:[{ required: true, message: '请选择时间段', trigger: 'blur'}],
    state:[{ required: true, message: '请选择审核状态', trigger: 'blur'}],
    time:[{ required: true, message: '请输入任务消耗人天', trigger: 'blur' }],
    checkRemark:[{ required: true, message: '请输入审核备注', trigger: 'blur' }],
})
function cancle(){
    showcheckform.value.resetFields();
    showCheck.value = false
}
function confirm(){
    showcheckform.value.resetFields();
    showCheck.value = false
}
</script>