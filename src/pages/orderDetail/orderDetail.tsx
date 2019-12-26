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
    const { by } = this.$router.params
    this.setState({
      by: by
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { by } = this.state
    return (
      <View className='order-detail-container'>
        <OrderDetailList status={by} />
      </View>
    )
  }
}
