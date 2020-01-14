import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './avatarInfo.scss'

export default class AvatarInfo extends Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      userImgUrl: '',
      userNickName: ''
    }
  }

  componentWillMount() {
    this.setState({
      userImgUrl: window.localStorage.getItem('__USERHEADERURL'),
      userNickName: window.localStorage.getItem('__USERNICKNAME')
    })
  }

  render() {
    const { userImgUrl, userNickName } = this.state
    return (
      <View className="avatar-info-container">
        <View className='avatar-images'>
          <AtAvatar circle image={userImgUrl} text='我的头像' size='large'></AtAvatar>
          <Text className='avatar-name'>{userNickName}</Text>
        </View>
      </View>
    )
  }
}