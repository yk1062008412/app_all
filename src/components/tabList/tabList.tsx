import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './tabList.scss'

export default class TabList extends Component<any, any> {
  tabList: { title: string; }[]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentWillMount() {
  }

  handleClick(e: Number) {
    this.setState({
      current: e
    })
  }

  render() {
    const { tabList } = this.props
    const { current } = this.state
    return (
      <View className='tabs-container'>
        <AtTabs
          current={current}
          scroll
          height='500px'
          tabDirection='vertical'
          tabList={tabList}
          onClick={this.handleClick.bind(this)}>
          {
            tabList.map((item, index) => {
              return (
                <AtTabsPane tabDirection='vertical' current={current} index={index}>
                  <View style='font-size:18px;text-align:center;height:500px;'>内容{item.id}</View>
                </AtTabsPane>
              )
            })
          }
        </AtTabs>
      </View>
    )
  }
}
