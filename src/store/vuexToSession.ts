/*
 * @Author: zfz
 * @Date: 2021-12-27 11:14:25
 * @LastEditors: zfz
 * @LastEditTime: 2021-12-27 11:16:31
 * @Description: 刷新不丢失vuex
 */
import { Store } from "vuex";

export default <T>(store: Store<T>): void => {
    if (sessionStorage.getItem('store')) {
        store.replaceState(
            Object.assign(
                {},
                store.state,
                JSON.parse(sessionStorage.getItem('store') as string)
            )
        )
        sessionStorage.removeItem("store")
    }
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem("store", JSON.stringify(store.state));
    })
}