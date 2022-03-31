/*
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-24 15:36:24
 * @LastEditors: px
 * @LastEditTime: 2022-03-29 17:27:29
 */
import { ref,reactive } from 'vue'
import {get,post} from '@/request/http'
// 显示新增编辑客户
const showHandleClient = ref<boolean>(false)
// 是否为编辑
const isEdit = ref<boolean>(false)
// 编辑打开的客户
let editedClient = reactive({id:'',customerName:''})
let tableData = reactive<any[]>([])
let total = ref(0);
export default function () {
  function getCustomerList(){
    post('/api/customer/select',{}).then((res)=>{
      if(res.code == '0'){
          tableData.length = 0;
          total.value = res.data.length
          res.data.forEach(item => {
              tableData.push(item)
          });
      }
    })
  }
  return{
    showHandleClient,
    isEdit,
    editedClient,
    getCustomerList,
    tableData,
    total,
  }
}