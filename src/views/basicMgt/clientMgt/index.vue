<!--
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-24 10:34:47
 * @LastEditors: px
 * @LastEditTime: 2022-03-29 17:46:58
-->
<template>
    <div class="client-mgt">
        <div class="client-header">
            <svg-icon name="user"></svg-icon>
            <h3>&nbsp;客户管理</h3>
        </div>
        <div class="content">
            <div class="main">
                <div class="main-top">
                    <el-row>
                        <el-col :span="20"> <h4>客户列表</h4> </el-col>
                        <el-col :span="4">
                            <div style="text-align: right; line-height: 60px;"><el-button type="primary" @click="addShow">新增</el-button></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="main-list">
                    <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" style="width: 100%">
                        <el-table-column prop="customerName" label="客户名称"></el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-icon @click="editShow(scope.row)" color="#1283ed" :size="16"><i-edit /></el-icon>
                                <el-icon @click="deleteClient(scope.row.id)" color="#1283ed" :size="16"><i-delete /></el-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="main-page">
                    <el-pagination background 
                        v-model:currentPage="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes = "[10]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total"/>
                </div>
            </div>
        </div>
        <handleClient></handleClient>
    </div>
</template>
<script setup lang="ts">
import {ref,reactive, onMounted} from 'vue'
import common from '@/mixins/common';
import clientMgtHook from '@/views/basicMgt/clientMgt/hook/clientMgtHook'
import handleClient from '@/views/basicMgt/clientMgt/components/handleClient.vue'
import { post,get } from '@/request/http';


const { confirmHandler } = common();
const { showHandleClient, isEdit, getCustomerList, tableData, total,editedClient } = clientMgtHook()

let currentPage = ref(1);
let pageSize = ref(10);
// 新增窗口打开
function addShow(){
    isEdit.value = false
    showHandleClient.value = true
}
// 编辑窗口打开
function editShow(row){
    isEdit.value = true
    showHandleClient.value = true
    editedClient.id = row.id;
    editedClient.customerName = row.customerName;
}
// 删除
function deleteClient(id){
     confirmHandler({
        methods:'get',
        tips:'是否删除该客户',
        message:'删除成功',
        url:`/api/customer/delete/${id}`,
        callback:[getCustomerList]
    });
}
onMounted(()=>{
    getCustomerList();
})
</script>
<style lang="scss" scoped>
.client-mgt{
    width: 100%;
    height: calc(100% - 52px);
    overflow: hidden;
    .content{
        height: 100%;
        display: flex;
        .main{
            flex:5;
            background-color: #fff;
            padding:0 20px;
            .main-top{
                height: 60px;
                width: 100%;
                padding: 0 20px;
            }
            .main-page{
                height: 80px;
                margin-top: 20px;
                float: right;
            }
        }
        .main-list{
            width: 100%;
        }
    }
}
.client-header{
    height: 64px;
    line-height: 64px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #fff;
}
</style>