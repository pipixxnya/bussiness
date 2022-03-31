<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-28 09:18:24
 * @LastEditors: px
 * @LastEditTime: 2022-03-31 09:44:31
-->
<template>
    <div class="daily-mgt">
        <div class="daily-header">
            <img src="" alt="">
            <h3>职能日报管理</h3>
        </div>
        <div class="content">
            <div class="main">
                <div class="main-top">
                    <el-row :gutter="10">
                        <el-col :span="3"><el-input placeholder="职能部门" v-model="searchForm.funDepartment"></el-input></el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="search">查询</el-button>
                            <el-button type="info" @click="clear">清除</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="main-list">
                    <el-table ref="multipleTableRef" :data="dailylist" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column property="organizationName" label="职能部门" />
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
                                <svg-icon name="edit" @click="checkHandleShow(scope.row)"></svg-icon>&nbsp;
                                <svg-icon name="sendback" @click="sendback(scope.row)"></svg-icon>
                            </template>    
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <sendBackDialog/>
        <checkDialog/>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import sendBackDialog from './components/handleSendback.vue'
import checkDialog from './components/handleCheck.vue'
import dailyMgtHook from './hook/dailyMgtHook'

let { showSendBack,showCheck,checkDate,multipleSelection,dailylist,getDailyList } = dailyMgtHook()  
// 查询列表信息
let searchForm = reactive({ funDepartment:'' })

// 查询
function search(){
    getDailyList(searchForm)
}
// 清除查询列表
function clear(){
    searchForm.funDepartment = ''
}
// 退回
function sendback(row){
    console.log(row)
    showSendBack.value = true;
}
function handleSelectionChange(val){ 
    multipleSelection = val;
}
// 编辑窗口打开
function checkHandleShow(row){
    checkDate.value = row
    showCheck.value = true;
    console.log(row)
}
onMounted(()=>{
    getDailyList(searchForm)
});
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