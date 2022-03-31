/*
 * @Author: zfz
 * @Date: 2022-03-22 15:14:21
 * @LastEditors: px
 * @LastEditTime: 2022-03-30 10:22:51
 * @Description: update
 */
import { reactive, ref, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import {DELETE,post,get,put} from '@/request/http'
import responseMsg from '@/components/responseMsg/responseMsg'
const http = {
  get,
  post,
  put,
  DELETE,
}
interface paramVoid{
    func: ((...args:any) => void), 
    param?: any
}
interface confirmParam{
  methods:string,
  tips:string,
  message:string,
  url:string,
  params?:{[propsName:string] : any},
  callback: Array<(() => void) | paramVoid> | (() => void)
}
export default function () {
    const levelOptions = [
      {value:1,label:1},
      {value:2,label:2},
      {value:3,label:3},
      {value:4,label:4},
    ]
    const modifyTypeList = [
      {value:1,label:'实施'},
      {value:2,label:'开发'},
    ]
    const modifyStatusList = [
      {value:1,label:'审核中'},
      {value:2,label:'同意'},
      {value:3,label:'不同意'},
    ]
    function getRoleList(){
        return get('/api/select/listRole',{}).then((res)=>{
          if(res.code == '0'){
            return res.data
          }
        })
    };
    function getOrganizationList(){
      return get('/api/select/listOrganization',{}).then((res)=>{
        if(res.code == '0'){
          return res.data
        }
      })
    };
    /**
     * confirm公用方法
     * @param {*String} -- methods 请求方法  
     * @param {*String} -- tips  提示语
     * @param {*String} -- message  成功后的提示语
     * @param {*String} -- url  地址
     * @param {*Object} -- params  参数，默认为{}
     * @param {*Array} -- callback  操作后要执行的函数，可以直接为函数名，携带参数可为{func:函数名,param:参数}形式
     */
    function confirmHandler({
      methods,
      tips,
      message,
      url,
      params = {},
      callback,
    }:confirmParam){
      ElMessageBox.confirm(tips, '提示', {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal:false,
          type: "warning"
      }).then(() => {
        http[methods](url,params).then((res:any)=>{
            responseMsg(res,message,callback)
        })
      }).catch(() => {})
    }
    return{
        levelOptions,
        confirmHandler,
        modifyTypeList,
        modifyStatusList,
        getRoleList,
        getOrganizationList
    }
}