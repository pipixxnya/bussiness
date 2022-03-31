<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-28 09:18:24
 * @LastEditors: px
 * @LastEditTime: 2022-03-30 13:45:42
-->
<template>
    <div class="daily-mgt">
        <div class="daily-header">
            <img src="" alt="">
            <h3>日报管理</h3>
        </div>
        <div class="content">
            <div class="main">
                <div class="main-top">
                    <el-row>
                        <el-col :span="18">
                            <el-row>
                                <el-col :span="4">
                                    <el-select placeholder="任务名称" v-model="searchForm.taskName">
                                        <el-option v-for="item in nameOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"/>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-select placeholder="任务类型" v-model="searchForm.taskType">
                                        <el-option v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"/>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-select placeholder="任务优先级" v-model="searchForm.taskPriority">
                                        <el-option v-for="item in priorityOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"/>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" @click="search">查询</el-button>
                                    <el-button type="info" @click="clear">清除</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <div style="text-align: right;">
                                <el-button type="primary" @click="concent(1)">同意</el-button>
                                <el-button type="primary" @click="sendback(1)">退回</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="main-list">
                    <el-table
                        ref="multipleTableRef"
                        :data="dailylist"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                        <el-table-column type="selection" width="55" />
                        <el-table-column property="name" label="任务名称" />
                        <el-table-column property="type" label="任务类型" />
                        <el-table-column property="date" label="日报时间" />
                        <el-table-column property="participant" label="参与人" />
                        <el-table-column property="time" label="耗时人天" />
                        <el-table-column property="schedule" label="任务进度%" />
                        <el-table-column property="remark" label="备注" />
                        <el-table-column property="state" label="状态" />
                        <el-table-column property="createTime" label="创建时间" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <svg-icon name="affirm" @click="concent(2,scope.row)"></svg-icon>&nbsp;
                                <svg-icon name="edit" @click="checkHandleShow(scope.row)"></svg-icon>&nbsp;
                                <svg-icon name="sendback" @click="sendback(2,scope.row)"></svg-icon>
                            </template>    
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <sendBackDialog/>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import sendBackDialog from './components/handleSendback.vue'
import dailyMgtHook from './hook/dailyMgtHook'

let { showSendBack,showCheck,checkDate,multipleSelection,dailylist,getDailyList } = dailyMgtHook()  
// 查询列表信息
let searchForm = reactive({
    taskName:'',
    taskType:'',
    taskPriority:''
})
let nameOptions = reactive([  //日报名称选项
    {value:0,label:'UI设计'},
    {value:1,label:'后端开发'},
])
let typeOptions = reactive([  //日报类型选项
    {value:0,label:'UI设计'},
    {value:1,label:'后端开发'},
])
let priorityOptions = reactive([  //日报优先级选项
    {value:0,label:'1级'},
    {value:1,label:'2级'},
])  //列表当前已选择的内容 type:Array
// 查询
function search(){
    getDailyList(searchForm)
}
// 清除查询列表
function clear(){
    for(let item in searchForm){
        searchForm[item] = ''
    }
}
// 同意
function concent(num,row){
    if(num == 1){
        if(multipleSelection.length == 0){
            ElMessage.error('请选择要操作的内容')
        }else{
            console.log(multipleSelection)
        }
    }else{
        console.log(row)
    }
}
// 退回
function sendback(num,row){
    if(num == 1){
        if(multipleSelection.length == 0){
            ElMessage.error('请选择要操作的内容')
        }else{
            console.log(multipleSelection)
            showSendBack.value = true;
        }
    }else{
        console.log(row)
        showSendBack.value = true;
    }
}
function handleSelectionChange(val){
    multipleSelection = val;
}
// 编辑窗口打开
function checkHandleShow(row){
    checkDate = row
    showCheck.value = true;
}
onMounted(()=>{
    getDailyList(searchForm)
})
</script>
<style lang="scss" scoped>
.daily-mgt{
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
                line-height: 60px;
            }
        }
        .main-list{
            width: 100%;
        }
    }
}
.daily-header{
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