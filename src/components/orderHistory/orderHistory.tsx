import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtModal, AtToast } from 'taro-ui'
import './orderHistory.scss'

export default class OrderHistory extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
  }

  handleCancelOrder () { // 取消订单
    Taro.showModal({
      title: '取消订单',
      content: '您确定要取消订单吗？',
    })
    .then(res => {
      if(res.confirm){
        Taro.showToast({
          title: '订单已取消',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  handlePayment () { // 去支付
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

  handleOrderDetail () {
    Taro.navigateTo({ url: '/pages/orderDetail/orderDetail?by=look' })
  }

  render() {
    return (
      <View className='order-history-container'>
        <View className='order-card'>
          <View className='card-header'>
            <Text>2019-12-23 15:45:31</Text>
            <Text className='order-status'>待支付</Text>
          </View>
          <View className='card-body' onClick={this.handleOrderDetail.bind(this)}>
            <View className='order-list'>
              <View className='order-item'>
                <Image
                  className='goods-image'
                  src='https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3533778697,2586993014&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=1dbed90be2871a78074bf731b6872ed0'
                />
                <View className='goods-content'>
                  <View>
                    <View className='goods-name'>商品名称</View>
                    <View className='goods-desc'>商品描述</View>
                  </View>
                  <View>
                    <Text className='goods-number'>x 2</Text>
                    <Text className='goods-price'>¥ 10.00</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='card-footer'>
            <View className='total-info'>共<Text>2</Text>件商品 总计: ¥<Text className='total-price'>10.00</Text></View>
            <View className='button-group'>
              <AtButton size='small' type='secondary' className='button-item' onClick={this.handleCancelOrder.bind(this)}>取消订单</AtButton>
              <AtButton size='small' type='primary' className='button-item' onClick={this.handlePayment.bind(this)}>去付款</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
