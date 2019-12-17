import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './order.scss'

export default class Order extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '我的订单'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='order-container'>
        order page!
      </View>
    )
  }
}
