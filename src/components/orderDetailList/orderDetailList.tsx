import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Picker } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { getNextDate } from '@/utils/common.ts'
import './orderDetailList.scss'

export default class OrderDetailList extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      deliveryTimeArr: [],
      deliveryTime: [null, null],
      comment: ''
    }
  }

  componentWillMount () {
    let dateList:any[] = []
    const timeList = ['上午9:00-12:00', '下午12:00-16:00', '傍晚16:00-20:00']
    dateList.push(getNextDate(1))
    dateList.push(getNextDate(2))
    dateList.push(getNextDate(3))
    this.setState({
      deliveryTimeArr: [dateList, timeList]
    })
  }

  onTimeChange (e) {
    const { value } = e.detail
    this.setState({
      deliveryTime: value
    })
  }

  handleCommentChange (e) {
    this.setState({
      comment: e.target.value
    })
  }

  handleChangeAddress () { // 修改地址信息
    const { status } = this.props // 1: add, 2look
    if (status === 'look') {
      return;
    } else {
      Taro.navigateTo({ url: '/pages/address/address' })
    }
  }

  handlePayOrder () { // 支付订单
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

  render() {
    const { status } = this.props // 1: add, 2look
    const { deliveryTime, comment, deliveryTimeArr } = this.state
    return (
      <View className='order-detail-list-container'>
        <View className='address-box' onClick={this.handleChangeAddress.bind(this)}>
          <View className='at-icon at-icon-map-pin address-icon'></View>
          <View className='address-info'>
            <View>姓名 电话号码</View>
            <View>地址地址地址地址地址地址</View>
          </View>
          {
            status === 'add' ? <View className='at-icon at-icon-chevron-right address-icon'></View> : null
          }
        </View>
        <View className='shop-box'>
          {
            status === 'look' ? <View className='shop-box-header'>
              <View className='shop-order-id'>
                <Text>订单号: 201912261809430001</Text>
                <Text className='shop-order-status'>已完成</Text>
              </View>
            </View> : null
          }
          <View className='shop-item'>
            <Image
              className='shop-image'
              src='https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3533778697,2586993014&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=1dbed90be2871a78074bf731b6872ed0'
            />
            <View className='shop-content'>
              <View className='shop-name'>商品名称</View>
              <View className='shop-info'>
                <View className='shop-num'>×1</View>
                <View className='shop-price'>¥30.00</View>
              </View>
            </View>
          </View>
          <View className='shop-item'>
            <Image
              className='shop-image'
              src='https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3533778697,2586993014&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=1dbed90be2871a78074bf731b6872ed0'
            />
            <View className='shop-content'>
              <View className='shop-name'>商品名称</View>
              <View className='shop-info'>
                <View className='shop-num'>×1</View>
                <View className='shop-price'>¥30.00</View>
              </View>
            </View>
          </View>
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
                    {`${deliveryTimeArr[0][deliveryTime[0]] || ''} ${deliveryTimeArr[1][deliveryTime[1]] || '>'}`}
                  </Text>
                </View>
              </Picker>
              <View className='order-comment-title'>备注</View>
              <View className='order-comment-area'>
                <AtTextarea
                  value={comment}
                  onChange={this.handleCommentChange.bind(this)}
                  maxLength={100}
                  placeholder='请输入备注'
                  className='comment-detail-text'
                />
              </View>
            </View> : <View className='look-extend'>
              <View className='extend-title'>下单日期</View>
              <View className='extend-content'>2019-12-26 18:10:05</View>
              <View className='extend-title'>配送时间</View>
              <View className='extend-content'>2019-12-26 下午2:00-4:00</View>
              <View className='extend-title'>备注</View>
              <View className='extend-content'>加双筷子</View>
            </View>
          }
        </View>
        <View className='shop-count'>
          <Text>总计:</Text><Text className='shop-all-price'>¥35.00</Text>
        </View>
        {
          status === 'add' ? <View className='order-topay'>
            <View className='order-amount'>总计: <Text className='order-number'>¥35.00</Text></View>
            <View className='order-pay-button' onClick={this.handlePayOrder.bind(this)}>去结算</View>
          </View> : null
        }
      </View>
    )
  }
}
