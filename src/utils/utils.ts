
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}
export const getMyTimes=(stime:number, etime:number,types:string='s'):string=>{
let timgs = etime - stime // 两个时间戳相差的秒数
if(timgs<=0){
  return '你来地球的任务已经完成，不要管有什么遗憾，继续要其他的星球吧'
}
 switch(types){
   case 'y':
    let sy = new Date(stime*1000)
    let ey = new Date(etime*1000)
    return ey.getFullYear() - sy.getFullYear() + '年'
   case 'M':
    return Math.floor(timgs / (60 * 60*24*30)) +'月'
   case 'd':
    return Math.floor(timgs / (60 * 60*24)) +'天'
   case 'h':
    return Math.floor(timgs / (60 * 60)) +'时'
   case 'm':
    return Math.floor(timgs / (60 )) +'分'
   case 's':
    return Math.floor(timgs) +'秒'
 }
}
// 时间差值，传入的是秒，毫秒*1000,返回值 hour minute secend
export  const completeTime = (stime:number, etime:number):object => {
  if (stime >= etime) {
    return {
      strShow: '00:00:00',
      h: '00',
      m: '00',
      s: '00'
    }
  }
  var usedTime = etime - stime // 两个时间戳相差的秒数
  let hours = getTwo(Math.floor(usedTime / (60 * 60)))
  let minutes = getTwo(Math.floor(usedTime / 60) % 60)
  let secends = getTwo(Math.floor(usedTime) % 60)
  var time = {
    strShow: hours + ':' + minutes + ':' + secends,
    h: hours,
    m: minutes,
    s: secends
  }
  return time
}
function getTwo (str) {
  return str >= 10 ? str : '0' + str
}
  
/**
 * 存储cookie
 */
export const setCookie = (objName:string, objValue:string, objHours:number=30):void =>{
  var str = objName + "=" + escape(objValue);
  if (objHours != null) {
      var date = new Date();
      var ms = objHours * 3600 * 1000 * 24;
      date.setTime(date.getTime() + ms);
      str += "; expires=" + date.toUTCString();
  }
  document.cookie = str;
}

/**
 * 获取cookie
 */
export const getCookie = (name:string):string => {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
}
/**
 * 删除cookie
 */
export const delCookie = (name:string):void => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if(cval!=null){
    document.cookie= name + "="+cval+";expires="+exp.toUTCString();
  }
}