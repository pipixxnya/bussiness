export function transElIconName(iconName) {
  return 'i' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}
export function dataFormat(Time){//时间格式化
  let time = new Date(Time)
  return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()} ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
  //return `${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()}`
}
export function HMFormat(time){//时间格式化
  //return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()} ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
  return `${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()}`
}
export function toRGBA(color: string){
  if(/rgba|RGBA/.test(color)){
    return color
  }
  if(/rgb|RGB/.test(color)){
    const match = color.match(/[^rgb|RGB\(\)]+(?=\))/)
    const num = match ? match[0] : null
    if(num === null){
      return color
    }
    return `rgba(${num},0.3)`
  }
  if(color.indexOf('#') > -1){
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
              colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
      }
      let newColor = color,alpha = 0
      //当有透明度的时候取出透明度单独操作
      if(color.length === 9){
          newColor = color.substring(0,7)
          alpha = Number(color.substring(7)) / 100
      }else{
        alpha = 0.3
      }
      // 处理六位的颜色值，转为RGB
      var colorChange: any = [];
      for (var i = 1; i < newColor.length; i += 2) {
          colorChange.push(parseInt("0x" + newColor.slice(i, i + 2)));
      }
      let lastColor = "rgba(" + colorChange.join(",") + ',' + alpha + ")"
      return lastColor;
  }
}
//获取字符串长度，中文算2个长度
export function placeholderLength(str: string) {
  let byteValLen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[^\x00-\xff]/ig) != null) {
      byteValLen += 2;
    } else {
      byteValLen += 1;
    }
  }
  return byteValLen;
}