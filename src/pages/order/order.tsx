import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrderHistory from '@/components/orderHistory/orderHistory'
import { inject, observer } from '@tarojs/mobx'
import './order.scss'

@inject('orderListStore')
@observer
export default class Order extends Component<any, any> {
  tabList: { title: string }[]

  constructor(props) {
    super(props)
    this.state = {
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
    const { orderListStore } = this.props;
    orderListStore.setCurrentTab(+orderStatus)
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(e) {
    const { orderListStore } = this.props;
    orderListStore.setCurrentTab(e)
  }

  render() {
    const { orderListStore: {current} } = this.props
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
            <View><OrderHistory orderStatus={5} /></View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
