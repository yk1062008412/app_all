/*
 * @Author: yk1062008412
 * @Date: 2020-01-14 22:54:48
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-16 00:02:47
 * @Description: 我的订单列表
 */
import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'
import { request } from '@/utils/request'

class OrderListStore {
  @observable current = 0 // 0. 全部, 1. 待付款, 2. 待发货, 3. 待收货, 4. 已完成, 5. 已取消
  @observable orderStatus = 0
  @observable orderList = []
  @observable count = 0
  @observable currentPage = 1
  @observable pageSize = 4

  @action.bound
  setCurrentTab (current) { // 点击切换Tab
    if(this.current === +current) return;
    this.current = +current;
    this.orderStatus = +current;
    // 重置数据
    this.count = 0;
    this.currentPage = 1;
    this.fetchData();
  }

  @action.bound
  fetchData() { // 获取数据
    const openId = window.localStorage.getItem('OPENID')
    request('/order/orderAllDetail', {
      openId: openId,
      orderStatus: this.orderStatus,
      currentPage: +this.currentPage,
      pageSize: +this.pageSize
    }).then(({ code, data, pageInfo }) => {
      if (code === 0) {
        // 如果是第一页，则orderList直接赋值data
        if(+pageInfo.currentPage === 1){
          this.orderList = data
        }else{ // 如果不是第一页，则orderList数组pushdata
          this.orderList = this.orderList.concat(data)
        }
        this.count = pageInfo.count
        this.currentPage = pageInfo.currentPage
        this.pageSize = pageInfo.pageSize
      }
    })
  }

  @action.bound
  reFetchData() { // 重新获取数据
    // 重置数据
    this.count = 0;
    this.currentPage = 1;
    this.fetchData();
  }

  @action.bound
  cancelOrder(orderId) { // 取消订单
    request('/order/cancelOrder', {orderId: orderId}).then(({code}) => {
      if(code === 0){
        Taro.showToast({
          title: '订单已取消',
          icon: 'none',
          duration: 2000
        })
        // 重新获取数据
        this.reFetchData()
      }else{
        Taro.showToast({
          title: '取消失败,请退出重试！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  @action.bound
  handlePayment() { // 去支付
    Taro.showToast({
      title: '这里是去支付订单按钮',
      icon: 'none',
      duration: 2000
    })
    // const params = {
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: ''
    // }
    // Taro.requestPayment(params).then(res => {
    //   console.log(res)
    // })
  }

  @action.bound
  onScrolltolower() { // 获取更多数据
    const { count, currentPage, pageSize } = this;
    // 如果当前页已经是最后一页，则不获取了
    if((currentPage * pageSize >= count) && ((currentPage - 1) * pageSize < count)){
      Taro.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.currentPage++;
      this.fetchData()
    }
  }

}

export default new OrderListStore();