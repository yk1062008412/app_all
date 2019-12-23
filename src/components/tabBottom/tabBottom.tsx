import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './tabBottom.scss'

import HomeSelect from '@/images/home_select.png'
import Mine from '@/images/mine.png'
import ShopCar from '@/images/shopcar.png'

export default class TabBottom extends Component <any, any> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  constructor(props){
    super(props)
    this.state = {
      container: ['11']
      // container: []
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
    this.props.handleToggleCar()
  }

  render () {
    const { container } = this.state
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
            container.length ? <View className="tab-shopcar" onClick={this.handleOpenCar.bind(this)}>
            <View className="shopcar-image">
              <Image src={ShopCar} className="shopcar-icon" />
            </View>
            <View className="shopcar-info">
              <View className="shopcar-goods"><text className="shopcar-currency">¥</text>55.35</View>
              <View className="shopcar-button">选好了</View>
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
