/*
 * @Author: yk1062008412
 * @Date: 2020-01-03 22:15:13
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-11 19:14:43
 * @Description: request
 */
import Taro from '@tarojs/taro'

const baseUrl = 'http://192.168.0.112:3001/user'

export function request (api: string, params: object) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + api,
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      mode: 'cors',
      success (res) {
        if(res.statusCode === 200){
          resolve(res.data)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}