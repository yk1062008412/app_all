import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import OrderDetailList from '@/components/orderDetailList/orderDetailList'
import './orderDetail.scss'

export default class OrderDetail extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
      by: 'add'
    }
  }

  config: Config = {
    navigationBarTitleText: '订单详情'
  }

  componentWillMount () {
    const { by, order_id, order_number } = this.$router.params
    this.setState({
      by: by,
      orderId: order_id,
      orderNumber: order_number
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { by, orderId, orderNumber } = this.state
    return (
      <View className='order-detail-container'>
        <OrderDetailList status={by} orderId={orderId} orderNumber={orderNumber} />
      </View>
    )
  }
}
