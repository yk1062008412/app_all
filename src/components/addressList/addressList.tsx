import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import './addressList.scss'

export default class AddressList extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      defaultAddress: 2
    }
  }

  componentWillMount() {
  }

  handleChange(e) {
    console.log(e)
  }

  render() {
    return (
      <View className='address-list-container'>
        <View className="address-list">
          <View className="address-item">
            <View className="address-item-content">
              <View>
                <Text className="address-name">张三</Text>
                <Text>12345678901</Text>
                <AtTag size="small" circle active className="address-tag">默认</AtTag>
              </View>
              <View>
                维亚大厦
              </View>
            </View>
            <View className="address-setting">
              <AtIcon value='edit' size='20' color='#000'></AtIcon>
            </View>
          </View>
          <View className="address-item">
            <View className="address-item-content">
              <View>
                <Text className="address-name">张三</Text>
                <Text>12345678901</Text>
              </View>
              <View>
                维亚大厦
              </View>
            </View>
            <View className="address-setting">
              <AtIcon value='edit' size='20' color='#000'></AtIcon>
            </View>
          </View>
          <View className="address-item">
            <View className="address-item-content">
              <View>
                <Text className="address-name">张三</Text>
                <Text>12345678901</Text>
              </View>
              <View>
                维亚大厦
              </View>
            </View>
            <View className="address-setting">
              <AtIcon value='edit' size='20' color='#000'></AtIcon>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
