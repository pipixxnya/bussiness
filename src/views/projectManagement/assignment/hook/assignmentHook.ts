/*
 * @Author: zfz
 * @Date: 2022-03-22 17:07:05
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-22 17:08:13
 * @Description: update
 */
import { reactive, ref, toRefs, nextTick } from 'vue'
const showHandlerDialog = ref<boolean>(false)
const showRateOfProgress = ref<boolean>(false)
const isEdit = ref<boolean>(false)
export default function () {

    return{
        showHandlerDialog,
        showRateOfProgress,
        isEdit,
    }
}