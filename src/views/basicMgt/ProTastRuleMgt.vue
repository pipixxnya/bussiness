<template>
    <div class="pro-tast-rule-mgt">
        <div class="pro-tast-rule-header">
            <img src="" alt="">
            <h3>项目任务角色管理</h3>
        </div>
        <div class="content">
            <div class="main">
                <div class="main-top">
                    <el-row>
                        <el-col :span="20">
                            <h3>任务角色列表</h3>
                        </el-col>
                        <el-col :span="4">
                            <div style="text-align: right; line-height: 60px;"><el-button type="primary" @click="addShow">新增</el-button></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="main-list">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="missionRoleName" label="任务角色名称"></el-table-column>
                        <el-table-column prop="price" label="角色标准价(人天/元)"> </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-icon @click="editShow(scope.row)" color="#1283ed" :size="16"><i-edit /></el-icon>
                                <el-icon @click="deleteRule(scope.row.id)" color="#1283ed" :size="16"><i-delete /></el-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </div>
        </div>
        <!-- 新增、编辑窗口 -->
        <el-dialog v-model="dialogShow" :title="dialogShow?'编辑':'新增'" width="40%" center @close="cancel"> 
            <el-form ref="formRule" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="任务角色" prop="missionRoleName">
                            <el-input placeholder="请输入" v-model="form.missionRoleName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="角色标准价" prop="price">
                            <el-input placeholder="请输入" v-model="form.price"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button size="medium" @click="cancel">取消</el-button>
                <el-button size="medium" type="primary" @click="confirm">确定</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive, onMounted} from 'vue'
import { post,get } from '@/request/http';
import responseMsg from '@/components/responseMsg/responseMsg';
import common from '@/mixins/common';
const { confirmHandler } = common();

let tableData = reactive<any[]>([])
let formRule = ref<any>();
let form = reactive({missionRoleName:'',price:'',id:''});
const rules = reactive({
    missionRoleName: [{ required: true, message: '请输入任务角色', trigger: 'blur' },],
    price: [{ required: true, message: '请输入角色标准价', trigger: 'blur' },],
})
let isEdit = ref(false);
let dialogShow = ref(false)
function getMissionRolesList() {
    post('/api/mission-role/select',{}).then((res)=>{
        if(res.code == '0'){
            tableData.length = 0
            res.data.forEach(item => {
                tableData.push(item)
            });
        }
    })
}
// 新增窗口展示
function addShow(){
    isEdit.value = false;
    dialogShow.value = true
}
// 取消新增、编辑
function cancel(){
    dialogShow.value = false
    formRule.value.resetFields();
    form.missionRoleName = '';
    form.id = '';
    form.price = ''
}
// 确定新增 || 编辑
function confirm(){
    let parmas = isEdit.value ? form : {missionRoleName:form.missionRoleName,price:form.price}
    formRule.value.validate((valid) => {
        if (valid) {
            let url = isEdit.value ? '/api/mission-role/update' : '/api/mission-role/insert'
            post(url,parmas).then((res)=>{
                responseMsg(
                    res,
                    isEdit.value ? '编辑成功' : '添加成功',
                    [getMissionRolesList],
                )
                if(res.code == '0'){
                    formRule.value.resetFields();
                    dialogShow.value = false;
                }
            })
        }else{
            return false
        }
    })
}
// 编辑窗口展示
function editShow(row){
    isEdit.value = true;
    dialogShow.value = true;
    form.missionRoleName = row.missionRoleName
    form.price = row.price
    form.id = row.id
}
// 删除
function deleteRule(id){
     confirmHandler({
        methods:'get',
        tips:'是否删除该任务角色',
        message:'删除成功',
        url:`/api/mission-role/delete/${id}`,
        callback:[getMissionRolesList]
    });
}
onMounted(()=>{
    getMissionRolesList()
})
</script>
<style lang="scss" scoped>
.pro-tast-rule-mgt{
    width: 100%;
    height: calc(100% - 52px);
    overflow: hidden;
    .content{
        height: 100%;
        display: flex;
        .main{
            flex:5;
            background-color: #fff;
            padding: 0 20px;
            .main-top{
                height: 60px;
                width: 100%;
                
            }
        }
        .main-list{
            width: 100%;
        }
    }
}
.pro-tast-rule-header{
    height: 64px;
    line-height: 64px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: left;
    border-bottom: 2px solid #f7f8fc;
    background-color: #fff;
    
}
</style>