import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './addAddress.scss'

export default class AddAddress extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '新增地址'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='add-address-container'>
        add-address page!
      </View>
    )
  }
}
