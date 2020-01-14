import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtGrid, AtBadge } from 'taro-ui'
import './myOrder.scss'

import prepay from '@/images/prepay.png'
import presend from '@/images/presend.png'
import predelivery from '@/images/predelivery.png'

export default class MyOrder extends Component<any, any> {
  gridOrder: { image: string; value: string; status: number }[]

  constructor(props) {
    super(props)
    this.state = {
    }
    this.gridOrder = [
      {
        image: prepay,
        value: '待付款',
        status: 1
      },
      {
        image: presend,
        value: '待发货',
        status: 2
      },
      {
        image: predelivery,
        value: '待收货',
        status: 3
      }
    ]
  }

  componentWillMount() {
  }

  handleOrder (item) { // 跳转订单页
    let orderStatus = item.status ? item.status : 0;
    Taro.navigateTo({ url: `/pages/order/order?orderStatus=${orderStatus}` })
  }

  handleAllOrder () { // 查看详情
    Taro.navigateTo({ url: `/pages/order/order?orderStatus=0` })
  }

  render() {
    return (
      <View className='my-order-container'>
        <View className="my-order-card">
          <View className="card-title">
            <Text><AtIcon value='bullet-list' size='20' color='#333' className="order-icon"></AtIcon>我的订单</Text>
            <Text onClick={this.handleAllOrder.bind(this)}>查看详情<AtIcon value='chevron-right' size='20' color='#333' className="order-icon"></AtIcon></Text>
          </View>
          <View className="card-list">
            <AtGrid
              data={this.gridOrder}
              columnNum={3}
              onClick={this.handleOrder.bind(this)}
            >
            </AtGrid>
          </View>
        </View>
      </View>
    )
  }
}
