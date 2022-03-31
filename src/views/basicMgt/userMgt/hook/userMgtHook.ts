/*
 * @Author: zfz
 * @Date: 2022-03-23 16:14:57
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 17:34:53
 * @Description: update
 */
import { ref } from 'vue'
interface active{
  value?:string | number, 
  label?:string, 
  level?:number,
  parent?:{label?:string,value?:string | number},
  manager?:string
}
// 选中的部门
const activedDepartment = ref<active>({})
// 显示新增编辑部门
const showHandleDepartment = ref<boolean>(false)
// 是否为编辑
const isEdit = ref<boolean>(false)
// 编辑打开的部门
const editedDepartment = ref<active>({})
// 部门列表
const departmentList = ref<any>([])
export default function () {
  // 获取部门数据
  function getDepartmentTree(){}
  return{
    activedDepartment,
    showHandleDepartment,
    isEdit,
    editedDepartment,
    getDepartmentTree,
    departmentList
  }
}