import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import './tabBottom.scss'

import HomeSelect from '@/images/home_select.png'
import Mine from '@/images/mine.png'
import ShopCar from '@/images/shopcar.png'

@inject('allStore')
@observer
export default class TabBottom extends Component <any, any> {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleMine () { // 进入个人中心页面
    Taro.navigateTo({ url: '/pages/mine/mine' })
  }

  handleOpenCar () { // 点击打开购物车
    const { allStore } = this.props
    allStore.toggleShopCarStatus()
  }

  handleOpenOrder () { // 点击进入订单详情页
    const { allStore } = this.props
    allStore.saveOrder().then(res => {
      console.log(res)
      // Taro.navigateTo({ url: '/pages/orderDetail/orderDetail?by=add' })
    })
  }

  render () {
    const { allStore: {shopcarList, allPrice} } = this.props
    return (
      <View className='tab-bottom-container'>
        <View className='tab-list'>
          <View className="tab-info">
            <View className="tab-item active">
              <Image src={HomeSelect} className="tab-icon"/>
              <Text>首页</Text>
            </View>
            <View className="tab-item" onClick={ this.handleMine.bind(this) }>
              <Image src={Mine} className="tab-icon"/>
              <Text>个人中心</Text>
            </View>
          </View>
          {
            shopcarList.length ? <View className="tab-shopcar">
            <View className="shopcar-image" onClick={this.handleOpenCar.bind(this)}>
              <Image src={ShopCar} className="shopcar-icon" />
            </View>
            <View className="shopcar-info">
            <View className="shopcar-goods" onClick={this.handleOpenCar.bind(this)}><text className="shopcar-currency">¥</text>{allPrice}</View>
              <View className="shopcar-button" onClick={this.handleOpenOrder.bind(this)}>选好了</View>
            </View>
          </View> : <View className="tab-shopcar empty">
            <View className="shopcar-image">
              <Image src={ShopCar} className="shopcar-icon" />
            </View>
            <View className="shopcar-info">
              <View className="shopcar-goods">购物车</View>
              <View className="shopcar-button">请选择</View>
            </View>
          </View>
          }
          
        </View>
      </View>
    )
  }
}
