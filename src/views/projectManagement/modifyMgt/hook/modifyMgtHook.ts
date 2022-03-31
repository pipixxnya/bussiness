/*
 * @Author: zfz
 * @Date: 2022-03-28 10:51:59
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 11:47:37
 * @Description: update
 */
import { ref } from 'vue'
const isEdit = ref<boolean>(false);
const showHandlerDialog = ref<boolean>(false)
const showApproveDialog = ref<boolean>(false)
export default function () {
  return {
    isEdit,
    showHandlerDialog,
    showApproveDialog
  }
}