import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtGrid } from 'taro-ui'
import './myOrder.scss'

export default class MyOrder extends Component<any, any> {
  gridOrder: { image: string; value: string }[]

  constructor(props) {
    super(props)
    this.state = {
    }
    this.gridOrder = [
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '领取中心'
      },
      {
        image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        value: '找折扣'
      },
      {
        image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '领会员'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '新品'
      }
    ]
  }

  componentWillMount() {
  }

  handleOrder () { // 跳转订单页
    Taro.navigateTo({ url: '/pages/order/order' })
  }

  render() {
    return (
      <View className='my-order-container'>
        <View className="my-order-card">
          <View className="card-title">
            <Text><AtIcon value='bullet-list' size='20' color='#000' className="order-icon"></AtIcon>我的订单</Text>
            <Text onClick={ this.handleOrder.bind(this) }>查看详情<AtIcon value='chevron-right' size='20' color='#000' className="order-icon"></AtIcon></Text>
          </View>
          <View className="card-list">
            <AtGrid
              data={this.gridOrder}
              columnNum={4}
            >
            </AtGrid>
          </View>
        </View>
      </View>
    )
  }
}
