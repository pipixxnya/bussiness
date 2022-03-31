/*
 * @Author: zfz
 * @Date: 2022-02-10 11:06:47
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-11 17:51:38
 * @Description: update
 */
import { ElLoading } from 'element-plus';
import type { LoadingOptionsResolved } from 'element-plus';
let loading: any;
function openLoading(options?: Partial<Omit<LoadingOptionsResolved, 'target' | 'parent'> & { target: string | HTMLElement; body: boolean }>) {
  // 默认在全屏生成，传入的为class名或id名，需要加上.或#，也可直接传入HTMLElement
  let target = options?.target || document.body;
  // 当传入的为string，即class名或id名，找不到则在默认区域生成
  if(options && typeof options?.target === 'string'){
    target = document.querySelector(options.target) ? document.querySelector(options.target) as HTMLElement : target
  }
  loading = ElLoading.service({
    ...{
      target,
    },
    ...options,
  });
}
function closeLoading() {
  loading && loading.close();
}
export { openLoading, closeLoading };
