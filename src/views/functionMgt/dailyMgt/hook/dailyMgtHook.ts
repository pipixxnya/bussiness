/*
 * @Descripttion: 
 * @Author: px
 * @Date: 2022-03-28 10:34:21
 * @LastEditors: px
 * @LastEditTime: 2022-03-31 09:41:05
 */
import { ref,reactive } from 'vue'
import { get,post } from '@/request/http';
// 显示退回日报
const showSendBack = ref<boolean>(false)
// 显示审核日报
const showCheck = ref<boolean>(false)
const multipleSelection = reactive<any[]>([])
let dailylist = ref<any>([{organizationName:'前端部门',name:'test',type:'1',date:'2022-03-31',participant:'panxin',time:0.5,schedule:'50%',remark:'无',state:'同意',createTime:'2022-03-31'}])
let checkDate = ref({})
export default function () {
  function getDailyList(parmas){
    parmas["pageNum"]= 1,
    parmas["pageSize"]=10,
    post('/api/daily/listDaily',parmas).then((res)=>{
      // dailylist = res.data
    })
  }
  return{
    showSendBack,
    showCheck,
    checkDate,
    multipleSelection,
    dailylist,
    getDailyList
  }
}