import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import AddressList from '@/components/addressList/addressList'
import { inject, observer } from '@tarojs/mobx'
import './address.scss'

@inject('orderStore')
@observer
export default class Address extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '地址'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const { orderStore } = this.props
    orderStore.getAllAddress()
  }

  componentDidHide () { }

  handleAddAddress () { // 跳转新增地址页面
    Taro.navigateTo({ url: '/pages/addAddress/addAddress?type=add' })
  }

  render () {
    return (
      <View className='address-container'>
        <AddressList />
        <View className="address-add-item">
          <AtButton type='secondary' onClick={ this.handleAddAddress.bind(this) }>新增地址</AtButton>
        </View>
      </View>
    )
  }
}
