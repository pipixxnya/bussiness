<!--
 * @Author: zfz
 * @Date: 2022-03-23 16:13:19
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 17:34:58
 * @Description: update
-->
<template>
    <div class="dpt-bottom-btn">
      <el-button type="primary" style="width:230px" @click="openHanlderDepartment()">添加部门</el-button>
    </div>
    <div class="tree-div">
        <el-tree
            :data="departmentList"
            @node-click="changeDepartment"
            :expand-on-click-node="false"
            :props="{class:customClass}"
        >
            <template #default="{ node, data }">
                <svg-icon :name="activedDepartment.value === data.value ? 'department-blue' : 'department'" class="department-icon"></svg-icon>
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span>
                        <span class="svg-group" v-show="node.level !== 1">
                            <svg-icon name="edit" @click.stop="openHanlderDepartment(node)" title="修改"></svg-icon>
                            <svg-icon name="delete" @click.stop="deleteDepartment(node)" title="删除"></svg-icon>
                        </span>
                        <el-popover
                            placement="bottom"
                            popper-class="department-poppover"
                            width='113px'
                            trigger="hover"
                        >
                            <template #reference>
                                <svg-icon name="department-arrow" v-show="node.level === 1"></svg-icon>
                            </template>
                            <div class="menu-list">
                                <div class="menu-list-item" @click="openHanlderDepartment(node)">
                                    <span>编辑部门</span>
                                </div>
                                <div class="menu-list-item" @click="deleteDepartment(node)">
                                    <span>删除部门</span>
                                </div>
                            </div>
                        </el-popover>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>
<script lang='ts' setup>
import { reactive, ref, computed} from 'vue'
import userMgtHook from '@/views/basicMgt/userMgt/hook/userMgtHook'
import type Node from 'element-plus/es/components/tree/src/model/node'
import common from '@/mixins/common'

const { confirmHandler } = common()
const { activedDepartment, showHandleDepartment, editedDepartment, isEdit, getDepartmentTree, departmentList } = userMgtHook();

const customClass = (data: any, node: Node) => {
  if (activedDepartment.value.value == data.value) {
    return 'is-actived'
  }
  return null
}
function changeDepartment(node: any,tree: any,event: any){
  activedDepartment.value = {
      value:node.value,
      label:node.label,
      level:node.level
  }
}
// 添加部门
function openHanlderDepartment(row?: any) {
  showHandleDepartment.value = true
  isEdit.value = row ? true : false;
  if (row) {
      editedDepartment.value = {
          value:row.value,
          label:row.label,
          level:row.level,
          parent:row.level === 1 ? {} : {label:row.parent.label,value:row.parent.value},
          manager:row.manager,
      }
  }
}
// 删除
function deleteDepartment(row: any){
    confirmHandler({
      methods:'get',
      tips:'是否删除该部门',
      message:'删除成功',
      url:'/api/organization/deleteOrganization',
      params:{id:row.id},
      callback:[getDepartmentTree],
    })
}
</script>
<script lang='ts'>
export default {
    name:'DepartmentTree',
}
</script>
<style lang='scss' scoped>
.dpt-bottom-btn{
    width: 100%;
    @extend .flexHorCenter;
    margin-bottom: 15px;
}
:deep(.svg-icon){
    margin-left: 10px;
    font-size: 16px;
    &.department-icon{
        margin-right:5px
    }
}
.menu-list{
    .menu-list-item{
        text-align: center;
        width:100%;
        height:30px;
        @extend .flexCenter;
        cursor:pointer;
        &:hover{
            background:#ecf5ff;
            font-weight: 600;
            padding-left:10px
        }
    }
}
.svg-group{
    margin-left: 8%;
}
</style>
<style lang="scss">
.department-poppover{
    &.el-popover.el-popper{
        min-width:113px;
        padding:5px 0
    }
}
.user-mgt .is-actived > .el-tree-node__content {
    border-radius: 6px;
    background:#E1EDFF;
    color: #2785ff;
}
</style>