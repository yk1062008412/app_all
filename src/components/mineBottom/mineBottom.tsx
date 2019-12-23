import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import './mineBottom.scss'

import Home from '@/images/home.png'
import MineSelect from '@/images/mine_select.png'

export default class MineBottom extends Component<any, any> {
  tabList: { title: string; image: any }[]

  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
    this.tabList = [
      { title: '首页', image: Home },
      { title: '个人中心', image: MineSelect }
    ]
  }

  componentWillMount() {
  }

  handleClick (e) { // 跳转页面
    if(e === 0){
      Taro.navigateTo({ url: '/pages/home/home' })
    }
  }

  render() {
    const { current } = this.state
    return (
      <View className='mine-bottom-container'>
        <AtTabBar
          tabList={this.tabList}
          onClick={this.handleClick.bind(this)}
          current={current}
          fixed
          selectedColor='#09BB07'
        />
      </View>
    )
  }
}
