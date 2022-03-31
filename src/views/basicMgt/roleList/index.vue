<!--
 * @Author: zfz
 * @Date: 2022-03-21 11:13:30
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 14:33:26
 * @Description: update
-->
<template>
    <div id="roleList">
      <div class="left-content">
        <h3>角色列表</h3>
        <span class="role-addBtn" @click="openHandlerDialog()">
          <img src="/icon/character.png" alt="" />
          添加角色
        </span>
        <div class="project-list">
          <div 
            v-for="item in roleList" 
            :key="item.value" 
            @click="changeRole(item)" 
            :class="['left-list-item', activedItem == item.value ? 'active' : '']"
          >
            <span>{{ item.label }}</span>
            <span>
              <svg-icon name="edit" @click.stop="openHandlerDialog(item)"></svg-icon>
              <svg-icon name="delete" @click.stop="deleteRole(item)"></svg-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="content-title">
          <h3>角色权限信息</h3>
          <div class="content-title-action">
            <el-checkbox v-model="isSelectAll" @change="changeSelectAll" label="全选" :indeterminate="isIndeterminate"></el-checkbox>
            <el-button size="small" @click="saveChange" type="primary" class="search-btn">确定</el-button>
          </div>
        </div>
        <div class="content-wrap">
            <el-tree 
              empty-text="无数据" 
              ref="authorityTree" 
              :data="authorityTreeData" 
              show-checkbox 
              default-expand-all 
              node-key="menuCode" 
              highlight-current 
              :props="menuProps" 
              :default-checked-keys="defaultCheckedKeys"
            />
        </div>
      </div>
      <!-- 新增编辑 -->
      <HandlerRoleList></HandlerRoleList>
    </div>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, onMounted} from 'vue'
import { valueLabel } from '@/interface/common'
import roleListHook from '@/views/basicMgt/roleList/hook/roleListHook'
import HandlerRoleList from '@/views/basicMgt/roleList/components/handlerRoleList.vue'
import common from '@/mixins/common';
import premission from '@/components/premission/index'
import responseMsg from '@/components/responseMsg/responseMsg'
import { post, get } from '@/request/http'

const { confirmHandler } = common();
const {
  showHandlerDialog,
  isEdit,
  getRoleList,
  editedRole,
  roleList,
}  = roleListHook()
// 角色列表

const isSelectAll = ref<boolean>(false)
const authorityTree = ref<any>('')
// 树状图用
const authorityTreeData = ref<any>([])
const defaultCheckedKeys = ref<any>([])
const activedItem = ref<string | number>('')
const premissionSum = ref<number>(0)
// disabled用
const isOverview = computed(()=>{
  return (data:any,node:any) => {
      return data.menuCode == 'MYBOARD'
  }
})
const menuProps = {
  children: 'children',
  label: 'name',
  value:'menuCode',
  disabled:isOverview
};
// 获取选中的节点
const checkdNodes = computed(() => {
  if(!authorityTree.value){
    return []
  }
  return authorityTree.value?.getCheckedNodes(false,true) || []
})
// 半选状态判断
const isIndeterminate = computed(() => {
  const len = checkdNodes.value.filter((val : any) => !val.children)?.length || 0
  // 判断当前状态
  isSelectAll.value = premissionSum.value !== 0 && len === premissionSum.value
  return len === premissionSum.value ? false : true
})
// 处理树状图，获取已选的数据
function transferMenuList(menu:any,obj:any){
  return menu.reduce((pre:any,item:any) => {
    if (item.childMenuList) {
      const childMenu = transferMenuList(item.childMenuList, { menu: [], active: pre.active,sum:0 })
      item.children = childMenu.menu
      pre.sum = pre.sum + childMenu.sum
    }
    const code = item.menuCode
    if(item.isSelect || code === 'MYBOARD'){
      pre.active.push(code)
    }
    // 记录权限条数，只记录没有子元素的条
    if(!item.childMenuList) {
      pre.sum ++
    }
    pre.menu = [...pre.menu, item]
    return pre
  },obj)
}
// 全选
function changeSelectAll(value: any) {
  value && authorityTree.value.setCheckedNodes(authorityTreeData.value)
  !value && authorityTree.value.setCheckedNodes([premission[0]])
}
// 变化角色
function changeRole(item: valueLabel){
  activedItem.value = item.value as string | number
  getRoleTree()
}
// 查询权限
function getRoleTree(){
  get('/api/permission/listPermission',{
    roleId:activedItem.value,
  }).then((res: any) => {
      const list = res.data.reduce((pre: any, item: any) => {
        if(!pre[item.parentId]){
          pre[item.parentId] = []
        }
        pre[item.parentId].push({
          name:item.permissionName,
          menuCode:item.permissionCode,
          isSelect:item.isSelect,
          children:[],
          id:item.id,
        })
        return pre
      },{})
      const permissionList = list[1].map((val: any) => {
        const newVal = val;
        newVal.children = list[newVal.id]
        return newVal
      })
      const newMenu = transferMenuList(permissionList,{menu:[],active:[],sum:0} as any)
      defaultCheckedKeys.value = newMenu.active
      authorityTreeData.value = newMenu.menu
      premissionSum.value = newMenu.sum
  })
}
// 打开编辑新增
function openHandlerDialog(row?: any){
  showHandlerDialog.value = true
  isEdit.value = row
  if(row){
    editedRole.value = row
  }
}
// 删除角色
function deleteRole(row: any){
  console.log(row)
  confirmHandler({
    methods:'DELETE',
    tips:'是否删除该角色',
    message:'删除成功',
    url:'/api/role/deleteRole',
    params:{id:row.value},
    callback:[getRoleList]
  })
}
// 保存
function saveChange() {
  console.log(checkdNodes.value)
  post('/api/permission/insertPermission',{
    permissionList:checkdNodes.value.map((val: any) => {
      return val.id
    }),
    roleId:activedItem.value
  }).then((res: any) => {
    responseMsg(
      res,
      '更新权限成功',
      [getRoleTree]
    )
  })
}
onMounted(() => {
  getRoleList()
})
</script>
<script lang='ts'>
export default {
    name:'RoleList'
}
</script>
<style lang='scss' scoped>
#roleList{
  @include flex;
  @include overSpread;
  justify-content: space-between;
}
.content-title{
  @extend .flexBet;
  .content-title-action{
    @extend .flexVerCenter;
  }
}
.role-addBtn {
  width: 100%;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  border: 1px solid #1283ed;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  color: #1283ed;
  cursor: pointer;
  margin-bottom:10px;
}
.search-btn{
  margin-left:15px
}
:deep(.svg-icon){
  margin-right: 7px;
  cursor: pointer;
}
.content-title{
  height:8%;
}
.content-wrap{
  height:92%;
  overflow-y: scroll;
  :deep(.el-tree){
    .el-tree-node__content {
      padding-left: 0px !important;
      height: 32px;
    }
    &>.el-tree-node {
      border-bottom: 1px solid #e9ecf3;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }
    .el-tree-node__expand-icon.is-leaf {
      display: none;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree-node:after {
      content: '';
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
      border-top: 1px dashed #abaeb2;
      height: 20px;
      top: 12px;
      width: 24px;
    }
    &>.el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: '';
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
      border-left: 1px dashed #abaeb2;
      bottom: 0px;
      height: 100%;
      top: -20px;
      width: 1px;
    }
    &>.el-tree-node:before {
      border-left: none;
    }
  }
}
</style>