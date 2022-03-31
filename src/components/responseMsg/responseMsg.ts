/*
 * @Author: zfz
 * @Date: 2022-01-04 11:29:01
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 13:56:59
 * @Description: update
 */
import {
    ElMessage as Message,
} from "element-plus";
interface paramVoid{
    func: ((...args:any) => void), 
    param?: any
}
export default function responesMsg(res: any, msg?: string, callback?: Array<(() => void) | paramVoid> | (() => void)){
    if (res.code !== 0) {
        Message({
            type: 'warning',
            message: res.msg
        })
        return
    }
    
    Message({
        type: 'success',
        message: msg
    })
    if(!callback){
        return
    }
    if(typeof callback == 'function'){
        callback()
    }else{
        callback.forEach((val: (() => void) | paramVoid)=>{
            if(typeof val == 'function'){
                val()
            }else{
                val.func(val.param)
            }
        })
    }

}
