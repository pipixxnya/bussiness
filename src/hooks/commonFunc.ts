/*
 * @Author: zfz
 * @Date: 2022-02-24 10:26:08
 * @LastEditors: zfz
 * @LastEditTime: 2022-02-24 10:26:08
 * @Description: update
 */
export default function () {
  function noSpace(e: any) {
      e.returnValue = false
      return false
  }
  return {
    noSpace
  }
}