import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './orderDetail.scss'

export default class OrderDetail extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '订单详情'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='order-detail-container'>
        order-detail page!
      </View>
    )
  }
}
