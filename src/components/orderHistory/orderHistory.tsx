import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtButton, AtDivider } from 'taro-ui'
import { formatDate } from '@/utils/common.ts'
import { inject, observer } from '@tarojs/mobx'
import './orderHistory.scss'

@inject('orderListStore')
@observer
export default class OrderHistory extends Component<any, any> {
  orderStatusArr: string[]

  constructor(props) {
    super(props)
    this.state = {
      orderStatus: null
    }
    this.orderStatusArr = ['', '待付款', '待发货', '待收货', '已完成', '已取消']
  }

  componentWillMount() {
    const { orderStatus } = this.props
    this.setState({
      orderStatus: orderStatus
    })
  }

  handleCancelOrder(item) { // 取消订单
    const { orderListStore } = this.props
    Taro.showModal({
      title: '取消订单',
      content: '您确定要取消订单吗？',
    })
      .then(res => {
        if (res.confirm) {
          orderListStore.cancelOrder(item.order_id)
        }
      })
  }

  handleOrderDetail(orderitem) { // 查看订单详情
    let by = 'look';
    if(+orderitem.order_status === 1){
      by = 'add'
    }
    Taro.navigateTo({
      url: `/pages/orderDetail/orderDetail?by=${by}&order_id=${orderitem.order_id}&order_number=${orderitem.order_number}`
    })
  }

  onScrolltolower() { // 下拉获取更多数据
    const { orderListStore } = this.props
    orderListStore.onScrolltolower()
  }

  handlePayment() { // 去支付
    const { orderListStore } = this.props
    orderListStore.handlePayment()
  }

  render() {
    const { orderListStore: { orderList } } = this.props
    return (
      <View className='order-history-container'>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={50}
          style="height:100vh"
          onScrollToLower={this.onScrolltolower.bind(this)}
        >
          {
            orderList.length === 0 ? <View className='no-order-data'>
                <AtDivider content='没有数据数据哦' fontColor='#2d8cf0' lineColor='#2d8cf0' />
              </View> : orderList.map(item => {
              return (
                <View className='order-card'>
                  <View className='card-header'>
                    <Text>{formatDate(item.order_add_time)}</Text>
                    <Text className='order-status'>{this.orderStatusArr[+item.order_status]}</Text>
                  </View>
                  <View className='card-body' onClick={this.handleOrderDetail.bind(this, item)}>
                    <View className='order-list'>
                      {
                        item.goodsList.map(goodsitem => {
                          return (
                            <View className='order-item'>
                              <Image
                                className='goods-image'
                                src={goodsitem.goods_img_url}
                              />
                              <View className='goods-content'>
                                <View>
                                  <View className='goods-name'>{goodsitem.goods_name}</View>
                                  <View className='goods-desc'>{goodsitem.goods_name}</View>
                                </View>
                                <View>
                                  <Text className='goods-number'>x {goodsitem.goods_num}</Text>
                                  <Text className='goods-price'>¥ {goodsitem.off_price}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                  <View className='card-footer'>
                    <View className='total-info'>共<Text>{item.goodsList.length}</Text>种商品 总计: ¥<Text className='total-price'>{item.order_amount}</Text></View>
                    {
                      item.order_status === 1 ? <View className='button-group'>
                        <AtButton size='small' type='secondary' className='button-item' onClick={this.handleCancelOrder.bind(this, item)}>取消订单</AtButton>
                        <AtButton size='small' type='primary' className='button-item' onClick={this.handlePayment.bind(this)}>去付款</AtButton>
                      </View> : null
                    }
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}
