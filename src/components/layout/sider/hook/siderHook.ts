/*
 * @Author: zfz
 * @Date: 2022-03-29 09:58:27
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 09:59:36
 * @Description: update
 */
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
export default function () {
  const route = useRoute()
  const activeMenu = computed(()=>{
    return route.path
  })
  return {
    activeMenu
  }
}