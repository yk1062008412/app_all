import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInputNumber } from 'taro-ui'
import './tabList.scss'

export default class TabList extends Component<any, any> {
  tabList: { title: string; }[]

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      count: 1
    }
  }

  componentWillMount() {
  }

  handleClick (e: number) {
    this.setState({
      current: e
    })
  }

  handleChange (e: number) {
    this.setState({
      count: e
    })
  }

  render() {
    const { tabList } = this.props
    const { current, count } = this.state
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
                  {/* <View style='font-size:18px;text-align:center;height:500px;'>内容{item.id}</View> */}
                  <View className='goods-list'>
                    <View className='goods-item'>
                      <Image
                        className='goods-image'
                        src='https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3533778697,2586993014&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=1dbed90be2871a78074bf731b6872ed0'
                      />
                      <View className='goods-box'>
                        <View className='goods-info'>
                          <View>商品名称</View>
                          <View className='price-info'>
                            <Text className='now-price'>¥10.00</Text>
                            <Text className='origin-price'>¥15.00</Text>
                          </View>
                        </View>
                        <View className='goods-number'>
                          <AtInputNumber
                            type='number'
                            min={0}
                            max={99}
                            step={1}
                            value={count}
                            onChange={this.handleChange.bind(this)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </AtTabsPane>
              )
            })
          }
        </AtTabs>
      </View>
    )
  }
}
