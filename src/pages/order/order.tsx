import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './order.scss'

export default class Order extends Component<any, any> {
  tabList: { title: string }[]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.tabList = [
      { title: '待付款' },
      { title: '待发货' },
      { title: '待收货' },
      { title: '已完成' },
      { title: '已取消' },
      { title: '全部' }
    ]
  }

  config: Config = {
    navigationBarTitleText: '我的订单'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(e) {
    this.setState({
      current: e
    })
  }

  render() {
    const { current } = this.state
    return (
      <View className='order-container'>
        <AtTabs
          current={current}
          tabList={this.tabList}
          onClick={this.handleClick.bind(this)}
          scroll
        >
          <AtTabsPane current={current} index={0} >
            <View>待付款</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View>待发货</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View>待收货</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View>已完成</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={4}>
            <View>已取消</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={5}>
            <View>全部</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
