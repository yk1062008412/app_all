import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtFloatLayout, AtButton, AtInputNumber } from 'taro-ui'
import './shopCar.scss'

export default class ShopCar extends Component <any, any> {

  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  componentWillMount() {
  }

  handleToggleCar () {
    this.props.handleToggleCar()
  }

  handleChange (e) {
    this.setState({
      count: e
    })
  }

  handleClear () {
    Taro.showModal({
      title: '清空购物车',
      content: '您确定要清空购物车吗？'
    })
    .then(res => {
      if(res.confirm){
        Taro.showToast({
          title: '购物车已清空',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  render() {
    const { carOpen } = this.props
    const { count } = this.state
    return (
      <View className='shop-car-container'>
        {/* <AtButton onClick={this.handleToggleCar.bind(this)}>弹窗</AtButton> */}
        <AtFloatLayout
          isOpened={carOpen}
          title='购物车'
          onClose={this.handleToggleCar.bind(this)}
          className='container-layout'
        >
          <View className='car-container'>
            <View className='car-header'>
              <AtButton
                circle
                size='small'
                className='car-header-button'
                onClick={this.handleClear.bind(this)}>
                清空
              </AtButton>
            </View>
            <View className='car-body'>
              <View className='car-item'>
                <Image
                  className='goods-image'
                  src='https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3533778697,2586993014&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=1dbed90be2871a78074bf731b6872ed0'
                />
                <View className='goods-content'>
                  <View className='goods-info'>
                    <View>商品名称</View>
                    <View className='price-info'>
                      <Text className='now-price'>¥10.00</Text>
                      <Text className='origin-price'>¥15.00</Text>
                    </View>
                  </View>
                  <View className='goods-number'>
                    <AtInputNumber
                      type='number'
                      min={0}
                      max={99}
                      step={1}
                      value={count}
                      onChange={this.handleChange.bind(this)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
