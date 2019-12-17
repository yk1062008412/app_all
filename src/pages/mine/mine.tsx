import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem} from 'taro-ui'
import MyOrder from '@/components/myOrder/myOrder'
import './mine.scss'

export default class Mine extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleAddress () { // 进入地址管理页面
    Taro.navigateTo({ url: '/pages/address/address' })
  }

  render () {
    return (
      <View className='mine-container'>
        <View className='my-order-item'>
          <MyOrder />
        </View>
        <AtList>
          <AtListItem title="地址管理" arrow="right" extraText='进入地址管理' onClick={this.handleAddress.bind(this)} />
        </AtList>
      </View>
    )
  }
}
