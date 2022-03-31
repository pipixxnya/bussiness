/*
 * @Author: zfz
 * @Date: 2022-01-12 10:04:37
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-25 14:34:48
 * @Description: update
 */
interface valueLabel{
    value?:string | number,
    label?:string | number
}
interface tableArrItem{
    prop:string,
    label:string,
    width?:number,
    needTooltip?:boolean
}
export{
    valueLabel,
    tableArrItem
}