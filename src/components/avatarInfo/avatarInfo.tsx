import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './avatarInfo.scss'

export default class AvatarInfo extends Component {
  render() {
    return (
      <View className="avatar-info-container">
        <View className='avatar-images'>
          <AtAvatar circle image='https://jdc.jd.com/img/200' text='我的头像' size='large'></AtAvatar>
          <Text className='avatar-name'>用户昵称</Text>
        </View>
      </View>
    )
  }
}