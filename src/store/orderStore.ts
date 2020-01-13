/*
 * @Author: yk1062008412
 * @Date: 2020-01-12 11:03:11
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-14 00:23:39
 * @Description: 订单store
 */
import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'
import { request } from '@/utils/request'

class OrderStore {
  @observable orderId = '' // 订单id
  @observable orderNumber = '' // 订单号
  @observable orderDetail: any = {} // 订单详情
  @observable addressList = [] // 所有地址列表
  @observable defaultAddress = null // 默认地址或最新一条地址

  __USERSYSID = window.localStorage.getItem('__USERSYSID') // 用户ID
  __USEROPENID = window.localStorage.getItem('OPENID') // 用户openID

  @action.bound
  setOrderInfo(orderId, orderNumber) { // 设置订单信息
    this.orderId = orderId
    this.orderNumber = orderNumber
    this.getOrderDetail()
  }

  @action.bound
  setOrderAddress(addressItem) { // 设置订单地址
    Object.assign(this.orderDetail, {
      address_id: addressItem.address_id,
      address_info: `${addressItem.province} ${addressItem.city} ${addressItem.district} ${addressItem.detail_add}`,
      receive_user_name: addressItem.receive_user_name,
      tel_phone: addressItem.tel_phone
    })
  }

  @action.bound
  getOrderDetail() { // 获取订单详情
    request('/order/orderDetail', {orderId: this.orderId}).then(({code, data}) => {
      if(code === 0){
        this.orderDetail = data
        // 如果是待付款状态，并且没有地址信息，则获取默认地址
        if(+data.order_status === 1 && !data.address_id){
          this.getDefaultAddress()
        }
      }
    })
  }

  @action.bound
  getDefaultAddress() { // 获取默认地址(如果没有默认地址，则获取最新一条更新的地址)
    request('/address/getDefaultAddress',{userId: this.__USERSYSID}).then(({code, data}) => {
      if(code === 0){
        this.defaultAddress = data.length ? data : null
        Object.assign(this.orderDetail, {
          address_id: data.address_id,
          address_info: `${data.province} ${data.city} ${data.district} ${data.detail_add}`,
          receive_user_name: data.receive_user_name,
          tel_phone: data.tel_phone
        })
      }
    })
  }

  @action.bound
  getAllAddress() { // 获取所有的地址列表
    request('/address/getAddressList',{userId: this.__USERSYSID}).then(({code, data}) => {
      if(code === 0){
        this.addressList = data.length ? data : []
      }
    })
  }

  @action.bound
  submitOrder(extendparam) { // 去下单
    if(this.orderDetail && !this.orderDetail.address_id){
      Taro.showToast({
        title: '请您先选择收获地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    Object.assign(this.orderDetail, {...extendparam})
    request('/order/submitOrder', this.orderDetail).then(({code, data}) => {
      if(code === 0){
        console.log(data)
      }
    })
  }
}

export default new OrderStore();