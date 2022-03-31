/*
 * @Author: zfz
 * @Date: 2022-03-23 11:00:15
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 13:51:07
 * @Description: update
 */
import { reactive, ref, toRefs, nextTick } from 'vue'
import { valueLabel } from '@/interface/common'
import { get, post } from '@/request/http'
const showHandlerDialog = ref<boolean>(false)
const isEdit = ref<any>({})
const roleList = ref<Array<valueLabel>>([
  
])
// 编辑的角色
const editedRole = ref<valueLabel>({})
export default function () {
    function getRoleList(){
        get('/api/role/listRole',{}).then((res: any) => {
            roleList.value = res.data.map((val: any) => {
                return {value:val.id,label:val.roleName}
            })
        })
    }
    return{
        showHandlerDialog,
        isEdit,
        editedRole,
        getRoleList,
        roleList
    }
}