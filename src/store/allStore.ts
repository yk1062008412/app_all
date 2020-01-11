/*
 * @Author: yk1062008412
 * @Date: 2020-01-11 16:37:30
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-11 21:47:41
 * @Description: file content
 */
import { observable, computed, action } from 'mobx'
import { request } from '@/utils/request'

class AllStore {
  @observable tabList = [] //所有商品列表
  @observable shopcarOpen = false //购物车状态(true打开false关闭)
  @observable shopcarList: any = [] // 购物车里的商品列表

  @computed get allPrice () { // 计算商品价格
    if(this.shopcarList.length === 0) return 0.00
    let priceCount = 0;
    this.shopcarList.map(item => { // 遍历购物车的商品，计算总价
      const { cost_price, off_price } = item.goods_info
      if(off_price == 0){ // 如果没有设置折扣价,则以原价为准
        priceCount += cost_price * 100 * item.goods_num
      }else{ // 设置了折扣价，则以折扣价为准
        priceCount += off_price * 100 * item.goods_num
      }
    })
    return priceCount / 100
  }

  @action.bound
  getAllGoods() { // 获取所有的商品
    request('/home/getCategoryAndGoodsList', {}).then(({code, data}) => {
      if (code === 0) {
        data.map((item: any) => {
          Object.assign(item, {title: item.category_name})
        })
        this.tabList = data;
      }
    })
  }

  @action.bound
  operateShopCarSet(operate, item) { // 添加或减少商品数量(商品列表)
    const { goods_id } = item;
    if(operate === 'add'){ //添加商品
      let have_current_goods = false
      this.shopcarList.map(item => {
        if(item.goods_id === goods_id){ // 如果有相等id的，说明已经有了，直接加
          have_current_goods = true
          item.goods_num++
        }
      })
      // 如果没有相等id的，则需要push
      if(!have_current_goods){
        this.shopcarList.push({
          goods_id: goods_id,
          goods_num: 1,
          goods_info: {
            ...item
          }
        })
      }
    }else{ // 减少商品
      this.shopcarList.map((item, index) => {
        if(item.goods_id === goods_id){
          if((item.goods_num - 1) === 0){ // 如果再减少一个数量就等于0,则直接移除
            this.shopcarList.splice(index, 1)
          }else{ // 减少1
            item.goods_num--
          }
        }
      })
    }
  }

  @action.bound
  changeShopCarCount(goodsinfo, count) { // 修改商品数量(购物车)
    this.shopcarList.map((item, index) => {
      if(item.goods_id === goodsinfo.goods_id){
        if(+count === 0){ // 如果再减少一个数量就等于0,则直接移除
          this.shopcarList.splice(index, 1)
        }else{ // 减少1
          item.goods_num = +count
        }
      }
    })
    // 如果购物车里面什么都没有，则关闭购物车
    if(this.shopcarList.length === 0){
      this.shopcarOpen = false;
    }
  }

  @action.bound
  toggleShopCarStatus() { // 购物车开关
    this.shopcarOpen = !this.shopcarOpen
  }

  @action.bound
  clearShopCar() { // 清空购物车
    this.shopcarList.length = 0
    this.shopcarOpen = false
  }

  @action.bound
  saveOrder() { // 下单
    const userId = window.localStorage.getItem('__USERSYSID');
    const openid = window.localStorage.getItem('OPENID');
    const nickname = window.localStorage.getItem('__USERNICKNAME');
    const params = {
      shopcarList: this.shopcarList,
      userId,
      openid,
      nickname
    }
    return new Promise(resolve => {
      request('/order/saveOrder', params).then(res => {
        console.log(res)
        resolve(res)
      })
    })
  }
}

export default new AllStore();