import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrderHistory from '@/components/orderHistory/orderHistory'
import './order.scss'

export default class Order extends Component<any, any> {
  tabList: { title: string }[]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.tabList = [
      { title: '全部' },
      { title: '待付款' },
      { title: '待发货' },
      { title: '待收货' },
      { title: '已完成' },
      { title: '已取消' }
    ]
  }

  config: Config = {
    navigationBarTitleText: '我的订单'
  }

  componentWillMount() {
    const { orderStatus } = this.$router.params;
    this.setState({
      current: +orderStatus
    })
  }

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
            <View><OrderHistory orderStatus={0} /></View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View><OrderHistory orderStatus={1} /></View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View><OrderHistory orderStatus={2} /></View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View><OrderHistory orderStatus={3} /></View>
          </AtTabsPane>
          <AtTabsPane current={current} index={4}>
            <View><OrderHistory orderStatus={4} /></View>
          </AtTabsPane>
          <AtTabsPane current={current} index={5}>
            <View><OrderHistory orderStatus={5}/></View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
