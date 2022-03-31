<template>
    <div class="user-mgt">
        <div class="user-header">
            <svg-icon name="user"></svg-icon>
            <h3>&nbsp;用户管理</h3>
        </div>
        <div class="content">
            <div class="department" @click.self="clickBlank">
                <DepartmentTree></DepartmentTree>
            </div>
            <div class="main">
                <div class="main-top">
                    <el-row>
                        <el-col :span="20"> <h3>{{activedDepartment.label}}</h3> </el-col>
                        <el-col :span="4">
                            <div style="text-align: right; line-height: 60px;">
                                <el-button type="primary" @click="addShow">
                                    <svg-icon name="add" style="font-size:12px"></svg-icon> &nbsp;添加成员
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="main-list">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column prop="userName" label="姓名"></el-table-column>
                        <el-table-column prop="organizationName" label="部门"></el-table-column>
                        <el-table-column prop="position" label="职位"></el-table-column>
                        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
                        <el-table-column prop="employeeNumber" label="工号"></el-table-column>
                        <el-table-column prop="roleName" label="角色"></el-table-column>
                        <el-table-column prop="userAccount" label="账号"></el-table-column>
                        <el-table-column prop="mail" label="邮箱"></el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <svg-icon name="edit" @click="editShow(scope.row.id)"></svg-icon>&nbsp;
                                <svg-icon name="delete" @click="deleteUser(scope.row.id)"></svg-icon>&nbsp;
                                <svg-icon name="enable" @click="updateUserStatus(scope.row.id)" v-if="scope.row.userStatus"></svg-icon> 
                                <svg-icon name="forbidden" @click="updateUserStatus(scope.row.id)" v-else></svg-icon> 
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
        <!-- 新增、编辑弹窗 -->
         <el-dialog v-model="dialogFormVisible" title="个人信息" width="40%" center @close="cancel"> 
            <el-form ref="userform" :model="form.data" :rules="rules" class="demo-ruleForm" label-width="60px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="userName">
                            <el-input placeholder="请输入" v-model="form.data.userName" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账号" prop="userAccount">
                            <el-input placeholder="请输入" v-model="form.data.userAccount" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                            <el-input placeholder="请输入" v-model="form.data.password" show-password style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号" prop="employeeNumber">
                            <el-input placeholder="请输入" v-model="form.data.employeeNumber" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色" prop="roleId">
                            <el-select  v-model="form.data.roleId" placeholder="请选择" style="width:220px">
                                <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门" prop="organizationId">
                            <el-select  v-model="form.data.organizationId" placeholder="请选择" style="width:220px">
                                <el-option v-for="item in organizationList" :key="item.id" :label="item.organizationName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位" prop="position">
                            <el-input placeholder="请输入" v-model="form.data.position" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phoneNumber">
                            <el-input placeholder="请输入" v-model="form.data.phoneNumber" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="mail">
                            <el-input placeholder="请输入" v-model="form.data.mail" style="width:220px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="userStatus">
                            <el-radio  v-model="form.data.userStatus" :label="1">启用</el-radio>
                            <el-radio v-model="form.data.userStatus" :label="0">禁用</el-radio>
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
        <HandleDepartment></HandleDepartment>
    </div>
</template>
<script setup lang="ts">
import { get,post } from '@/request/http';
import { reactive,ref, onMounted } from 'vue'
import common from '@/mixins/common';
import responseMsg from '@/components/responseMsg/responseMsg';
import HandleDepartment from '@/views/basicMgt/userMgt/components/handleDepartment.vue'
import DepartmentTree from '@/views/basicMgt/userMgt/components/departmentTree.vue'
import userMgtHook from '@/views/basicMgt/userMgt/hook/userMgtHook'

const { activedDepartment, getDepartmentTree } = userMgtHook();
const { confirmHandler,getRoleList,getOrganizationList } = common();
let dataTree = reactive([]); //部门列表
let tableData = ref<any[]>([]); //用户列表
let dialogFormVisible = ref(false) //新增编辑页面
let isEdit = ref(true)  //判断打开的弹窗是新增还是编辑
let form = reactive({data:{
    userName:'',
    userAccount:'',
    password:'',
    organizationId:'',
    employeeNumber:'',
    position:'',
    phoneNumber:'',
    mail:'',
    roleId:'',
    userStatus:1
    }});
let currentId = ref('');
const userform = ref<any>()  //ref表示整个表单
let currentPage = ref(1)    
let pageSize = ref(10)
let total = ref(0) 
let roleList = ref<any>([])
let organizationList = ref<any>([])
const rules = reactive({   //表单验证规则
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
  userAccount: [{ required: true, message: '请输入账号', trigger: 'blur', }],
  password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
  departmentId:[{ required: true, message: '请选择部门', trigger: 'blur' },],
  roleId:[{ required: true, message: '请选择角色', trigger: 'blur' },]
}); 
// 点击空白处取消选中部门
function clickBlank() {
    activedDepartment.value = {}
}
// 获取用户列表
function getUserList(){
    get('/api/user/listUser',{
        pageNum: currentPage.value,
        pageSize: pageSize.value,
    }).then((res)=>{
        if(res.code == '0'){
            tableData.value = res.data
            total.value = res.data.length
        }
    })
}
// 删除
function deleteUser(id){
    confirmHandler({
        methods:'get',
        tips:'是否删除该用户',
        message:'删除成功',
        url:'/api/user/deleteUser',
        params:{id},
        callback:[getUserList]
    });
}
// 新增窗口展示
function addShow(){
    isEdit.value = false;
    dialogFormVisible.value = true
}
// 编辑窗口展示
function editShow(id){
    currentId.value = id
    get('/api/user/getUserDetail',{id}).then((res)=>{
        if(res.code == '0'){
            form.data = res.data;
        }
    })
    isEdit.value = true;
    dialogFormVisible.value = true
}
// 取消
function cancel(){
    userform.value.resetFields()
    dialogFormVisible.value = false
}
// 确定新增、编辑
function confirm(){
    userform.value.validate((valid) => {
        if (valid) {
            let url = isEdit.value ? '/api/user/updateUser' : '/api/user/insertUser'
            let parmas = form.data;
            if(isEdit.value){
                parmas["updateUserId"] = currentId.value.toString()
            }
            post(url,parmas).then((res)=>{
                responseMsg(
                    res,
                    isEdit.value ? '编辑成功' : '添加成功',
                    [getUserList],
                )
                if(res.code == '0'){
                    userform.value.resetFields()
                    dialogFormVisible.value = false
                }
            })
        } else {
            return false
        }
    })
}
// 修改用户状态
function updateUserStatus(id){
    let parmas
    get('/api/user/getUserDetail',{id}).then((res)=>{
        if(res.code == '0'){
            parmas = res.data;
            parmas["updateUserId"] = id
            parmas["password"] = parmas.password ? parmas.password : ''
            parmas.userStatus = parmas.userStatus == 1 ? 0 : 1
        }
    }).then(()=>{
        post('/api/user/updateUser',parmas).then((res)=>{
            responseMsg(
                res,
                '操作成功',
                [getUserList],
            )
        })
    })
}
onMounted(async () => {
    getDepartmentTree();
    getUserList();
    roleList.value = await getRoleList()
    organizationList.value = await getOrganizationList();
})
</script>
<script lang="ts">
export default {
    name:'UserMgt'
}
</script>
<style>
    .user-mgt .el-tree-node__content{
        height: 32px;
        padding: 10px 0;
    }
    .user-mgt .el-tree-node__content:hover,.user-mgt  .el-tree-node:focus > .el-tree-node__content{
        background: #e1edff;
        border-radius: 6px;
        color: #1283ed;
        font-size: 14px;
        font-weight: 400;
    }
</style>
<style scoped lang="scss">
.user-mgt{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.user-header{
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
.content{
    height: calc(100% - 64px);
    display: flex;
    width:100%;
    .department{
        width: 20%;
        height: 100%;
        font-size: 13px;
        color: #303133 !important;
        background-color: #fff;
        border-right: 2px solid #f7f8fc;
        // flex: 1;
        position: relative;
        padding:15px;
    }
    .main{
        width:80%;
        // flex:5;
        background-color: #fff;
        padding:0 10px;
        .main-top{
            height: 60px;
            width: 100%;
            box-sizing: border-box;
        }
        .main-page{
            height: 80px;
            margin-top: 20px;
            float: right;
        }
    }
}


</style>
