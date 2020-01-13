import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtFloatLayout, AtButton, AtInputNumber } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import './shopCar.scss'

@inject('allStore')
@observer
export default class ShopCar extends Component <any, any> {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
  }

  handleToggleCar () { // 切换购物车状态
    const { allStore } = this.props
    allStore.toggleShopCarStatus()
  }

  handleChange (item, count) { // 修改购物车商品数量
    const { allStore } = this.props
    allStore.changeShopCarCount(item, count);
  }

  handleClear () { // 清空购物车
    const { allStore } = this.props
    Taro.showModal({
      title: '清空购物车',
      content: '您确定要清空购物车吗？'
    })
    .then(res => {
      if(res.confirm){
        allStore.clearShopCar()
        Taro.showToast({
          title: '购物车已清空',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  render() {
    const { allStore: {shopcarList, shopcarOpen} } = this.props
    return (
      <View className='shop-car-container'>
        <AtFloatLayout
          isOpened={shopcarOpen}
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
              {
                shopcarList.map(item => {
                  return (
                    <View className='car-item'>
                      <Image
                        className='goods-image'
                        src={item.goods_info.goods_img_url}
                      />
                      <View className='goods-content'>
                        <View className='goods-info'>
                          <View>{item.goods_info.goods_name}</View>
                          <View className='price-info'>
                            <Text className='now-price'>¥{item.goods_info.off_price}</Text>
                            <Text className='origin-price'>¥{item.goods_info.cost_price}</Text>
                          </View>
                        </View>
                        <View className='goods-number'>
                          <AtInputNumber
                            type='number'
                            min={0}
                            max={99}
                            step={1}
                            value={item.goods_num}
                            onChange={this.handleChange.bind(this, item)}
                          />
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
