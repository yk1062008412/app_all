/*
 * @Author: yk1062008412
 * @Date: 2019-12-26 19:16:52
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-12 17:32:26
 * @Description: common file
 */
const moment = require('moment');

export function getNextDate(day: number, date?: string) {
  var dd = date ? new Date(date) : new Date();
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
}

export function formatDate(date: any){
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function test() {
  return true
}

const appId = 'wx574472ef1e2aaebb';
export function generateGetCodeUrl(redirectURL: any) {
  const scope = 'snsapi_userinfo'
  // const scope = 'snsapi_base'
  const resUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
    `appid=${appId}&redirect_uri=${encodeURIComponent(redirectURL)}` +
    `&response_type=code&scope=${scope}&state=20200102#wechat_redirect`;
  return resUrl
};

export function getQueryVariable(variable: string) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}