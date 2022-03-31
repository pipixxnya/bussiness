/*
 * @Author: xing.huang
 * @Date: 2021-08-11 10:01:13
 * @LastEditTime: 2021-08-11 10:05:01
 * @LastEditors: xing.huang
 * @Description: 
 * @FilePath: \collect-middleground-web\src\type.d.ts
 * 
 */
export {}
// interface Client{
//  a: ()=>string
// }
declare global {
    interface Window { 
        // client: Client; 
        log:(...data: any[]) => void
    }
}