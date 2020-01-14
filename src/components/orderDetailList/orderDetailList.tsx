import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Picker } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { getNextDate, formatDate } from '@/utils/common.ts'
import { inject, observer } from '@tarojs/mobx'
import './orderDetailList.scss'

@inject('orderStore')
@observer
export default class OrderDetailList extends Component<any, any> {
  statusArr: string[]

  static defaultProps = {
    state: 'add'
  }

  constructor (props) {
    super(props)
    this.state = {
      deliveryTimeArr: [],
      deliveryTime: [null, null],
      status: 'add',
      orderId: '',
      orderNumber: '',
      comments: ''
    }
    this.statusArr = ['未知', '待付款', '待发货', '已发货', '已完成', '已取消']
  }

  componentWillMount () {
    let dateList:any[] = []
    const timeList = ['上午9:00-12:00', '下午12:00-16:00', '傍晚16:00-20:00']
    dateList.push(getNextDate(1))
    dateList.push(getNextDate(2))
    dateList.push(getNextDate(3))
    const { status, orderId, orderNumber, orderStore } = this.props;
    this.setState({
      deliveryTimeArr: [dateList, timeList],
      status: status,
      orderId: orderId,
      orderNumber: orderNumber
    })
    // 设置订单信息 并 获取订单详情
    orderStore.setOrderInfo(orderId, orderNumber);
  }

  onTimeChange (e) {
    const { value } = e.detail
    this.setState({
      deliveryTime: value
    })
  }

  handleCommentChange (e) {
    this.setState({
      comments: e.target.value
    })
  }

  handleChangeAddress () { // 修改地址信息
    const { status } = this.props // 1: add, 2look
    if (status === 'look') {
      return;
    } else {
      Taro.navigateTo({ url: '/pages/address/address?by=add' })
    }
  }

  handlePayOrder () { // 支付订单
    const { orderStore } = this.props;
    const { deliveryTime , comments, deliveryTimeArr } = this.state;
    const extendParam = {
      book_time: `${deliveryTimeArr[0][deliveryTime[0]] || ''} ${deliveryTimeArr[1][deliveryTime[1]] || ''}`,
      comments: comments
    }
    orderStore.submitOrder(extendParam);
  }

  render() {
    const { status, orderStore: {orderDetail} } = this.props // 1: add, 2look
    const { deliveryTime, deliveryTimeArr, comments } = this.state
    return (
      <View className='order-detail-list-container'>
        <View className='address-box' onClick={this.handleChangeAddress.bind(this)}>
          <View className='at-icon at-icon-map-pin address-icon'></View>
          {
            orderDetail.address_id ? <View className='address-info'>
              <View>{orderDetail.receive_user_name} {orderDetail.tel_phone}</View>
              <View>{orderDetail.address_info}</View>
            </View> : <View className='address-add'>还没有地址，请您添加地址哦</View>
          }
          {
            status === 'add' ? <View className='at-icon at-icon-chevron-right address-icon'></View> : null
          }
        </View>
        <View className='shop-box'>
          {
            status === 'look' ? <View className='shop-box-header'>
              <View className='shop-order-id'>
                <Text>订单号: {orderDetail.order_number}</Text>
                <Text className='shop-order-status'>{this.statusArr[+orderDetail.order_status]}</Text>
              </View>
            </View> : null
          }
          {
            orderDetail.goodsList ? orderDetail.goodsList.map(item => {
              return (
                <View className='shop-item' key={item.order_info_id}>
                  <Image
                    className='shop-image'
                    src={item.goods_img_url}
                  />
                  <View className='shop-content'>
                    <View className='shop-name'>{item.goods_name}</View>
                    <View className='shop-info'>
                      <View className='shop-num'>×{item.goods_num}</View>
                      <View className='shop-price'>¥{item.off_price}</View>
                    </View>
                  </View>
                </View>
              )
            }) : null
          }
        </View>
        <View className='extend-info'>
          {
            status === 'add' ? <View className='add-extend'>
              <Picker
                mode='multiSelector'
                range={deliveryTimeArr}
                onChange={this.onTimeChange.bind(this)}
                value={deliveryTime}
              >
                <View className='picker picker-value'>
                  <Text>配送时间</Text>
                  <Text className='current-pick-value'>
                    {deliveryTimeArr[0][deliveryTime[0]] || ''} {deliveryTimeArr[1][deliveryTime[1]] || '>'}
                  </Text>
                </View>
              </Picker>
              <View className='order-comment-title'>备注</View>
              <View className='order-comment-area'>
                <AtTextarea
                  value={comments}
                  onChange={this.handleCommentChange.bind(this)}
                  maxLength={100}
                  placeholder='请输入备注'
                  className='comment-detail-text'
                />
              </View>
            </View> : <View className='look-extend'>
              <View className='extend-title'>下单日期</View>
                  <View className='extend-content'>{orderDetail.order_pay_time ? formatDate(orderDetail.order_pay_time) : ''}</View>
              <View className='extend-title'>配送时间</View>
                  <View className='extend-content'>{orderDetail.book_time || ''}</View>
              <View className='extend-title'>备注</View>
                  <View className='extend-content'>{orderDetail.comments || ''}</View>
            </View>
          }
        </View>
        <View className='shop-count'>
          <Text>总计:</Text><Text className='shop-all-price'>¥{orderDetail.goods_amount}</Text>
        </View>
        {
          status === 'add' ? <View className='order-topay'>
            <View className='order-amount'>总计: <Text className='order-number'>¥{orderDetail.order_amount}</Text></View>
            <View className='order-pay-button' onClick={this.handlePayOrder.bind(this)}>去结算</View>
          </View> : null
        }
      </View>
    )
  }
}
