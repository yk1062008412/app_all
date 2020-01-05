/*
 * @Author: yk1062008412
 * @Date: 2020-01-03 22:15:13
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-04 16:47:05
 * @Description: request
 */
import Taro from '@tarojs/taro'

const baseUrl = 'http://127.0.0.1:3001/user'

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