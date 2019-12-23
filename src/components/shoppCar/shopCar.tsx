import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout, AtButton } from 'taro-ui'
import './shopCar.scss'

export default class ShopCar extends Component <any, any> {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
  }

  handleToggleCar () {
    this.props.handleToggleCar()
  }

  render() {
    const { carOpen } = this.props
    return (
      <View className='shop-car-container'>
        {/* <AtButton onClick={this.handleToggleCar.bind(this)}>弹窗</AtButton> */}
        <AtFloatLayout
          isOpened={carOpen}
          title='购物车'
          onClose={this.handleToggleCar.bind(this)}
          className='container-layout'
        >
          <View>
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区.随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
