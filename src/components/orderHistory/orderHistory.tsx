import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtButton, AtModal, AtToast } from 'taro-ui'
import { formatDate } from '@/utils/common.ts'
import { request } from '@/utils/request'
import './orderHistory.scss'

export default class OrderHistory extends Component<any, any> {
  orderStatusArr: string[]

  constructor(props) {
    super(props)
    this.state = {
      orderStatus: null,
      orderList: [],
      count: 0,
      currentPage: 1,
      pageSize: 10
    }
    this.orderStatusArr = ['', '待付款', '待发货', '待收货', '已完成', '已取消']
  }

  componentWillMount() {
    const { orderStatus } = this.props
    this.setState({
      orderStatus: orderStatus
    })
    this.handleGetData(orderStatus);
  }

  handleGetData(orderStatus) { // 获取数据
    const openId = window.localStorage.getItem('OPENID')
    const { currentPage, pageSize } = this.state
    request('/order/orderAllDetail', {
      openId: openId,
      orderStatus: orderStatus,
      currentPage: currentPage,
      pageSize: pageSize
    }).then(({ code, data }) => {
      if (code === 0) {
        this.setState({
          orderList: data
        })
      }
    })
  }

  handleCancelOrder() { // 取消订单
    Taro.showModal({
      title: '取消订单',
      content: '您确定要取消订单吗？',
    })
      .then(res => {
        if (res.confirm) {
          Taro.showToast({
            title: '订单已取消',
            icon: 'none',
            duration: 2000
          })
        }
      })
  }

  handlePayment() { // 去支付
    Taro.showToast({
      title: '这里是去支付订单按钮',
      icon: 'none',
      duration: 2000
    })
    // const params = {
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: ''
    // }
    // Taro.requestPayment(params).then(res => {
    //   console.log(res)
    // })
  }

  handleOrderDetail() {
    Taro.navigateTo({ url: '/pages/orderDetail/orderDetail?by=look' })
  }

  onScrolltolower() {
    const { orderStatus } = this.props
    console.log(orderStatus)
  }

  render() {
    const { orderList } = this.state
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
            orderList.length === 0 ? null : orderList.map(item => {
              return (
                <View className='order-card'>
                  <View className='card-header'>
                    <Text>{formatDate(item.order_add_time)}</Text>
                    <Text className='order-status'>{this.orderStatusArr[+item.order_status]}</Text>
                  </View>
                  <View className='card-body' onClick={this.handleOrderDetail.bind(this)}>
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
                        <AtButton size='small' type='secondary' className='button-item' onClick={this.handleCancelOrder.bind(this)}>取消订单</AtButton>
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
