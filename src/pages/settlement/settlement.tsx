import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './settlement.scss'

export default class Settlement extends Component <any, any> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  config: Config = {
    navigationBarTitleText: '结算页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='settlement-container'>
        settlement page!
      </View>
    )
  }
}
