/*
 * @Author: zfz
 * @Date: 2022-02-17 10:26:41
 * @LastEditors: zfz
 * @LastEditTime: 2022-02-28 14:18:14
 * @Description: update
 */
import store from '@/store';
export function imgWithToken(ref: any,imgName: string,callback: any){
  let token = store.state.token;
  Object.defineProperty(Image.prototype, 'authsrc', {
    writable: true,
    enumerable: true,
    configurable: true
  })
  let img = ref
  let request = new XMLHttpRequest();
  request.responseType = 'blob';
  request.open('get', `/iot/device-api/common/download-file/1/${imgName}`, true);
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  request.onreadystatechange = e => {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      // img.src = URL.createObjectURL(request.response);
      callback(URL.createObjectURL(request.response))
      // img.onload = () => {
      //   URL.revokeObjectURL(img.src);
        
      // }
    }
  };
  request.send(null);
}
export function hrefToken({type, fileName, url = '/iot/device-api/common/download-file'}:{type?: Number, fileName: string,url?: string}){
  let token = store.state.token;
  let request = new XMLHttpRequest();
  request.responseType = 'blob';
  const path = type ? `${url}/${type}/${fileName}` : `${url}/${fileName}`;
  request.open('get', path, true);
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  request.onload = function() {
    if (request.status == 200) {
      let blob = request.response;
      let name = request.getResponseHeader('content-disposition')?.split('filename=')[1];
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      (a.download as any) = decodeURI(name as any);  // 文件名
      a.click();
    }
  } 
  request.send(null);
}