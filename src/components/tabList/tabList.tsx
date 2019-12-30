import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInputNumber, AtButton, AtIcon } from 'taro-ui'
import './tabList.scss'

export default class TabList extends Component<any, any> {
  tabList: { title: string; }[]

  static defaultProps = {
    tabList: []
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      count: 0
    }
  }

  componentWillMount() {
  }

  handleClick (e: number) {
    this.setState({
      current: e
    })
  }

  handleEditGoodsCount (status) {
    const {count} = this.state
    this.setState({
      count: status === 'add' ? count + 1 : count - 1
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
                <AtTabsPane tabDirection='vertical' current={current} index={index} key={item.id}>
                  <View className='goods-list'>
                    {
                      item.goods.map(gooditems => {
                        return (
                          <View className='goods-item' key={gooditems.id}>
                            <Image
                              className='goods-image'
                              src={gooditems.imgUrl}
                            />
                            <View className='goods-box'>
                              <View>{gooditems.name}</View>
                              <View className='goods-des'>{gooditems.des}</View>
                              <View className='price-info'>
                                  <View className='price-rate'>
                                    <Text className='now-price'>¥{gooditems.newPrice}</Text>
                                    <Text className='origin-price'>¥{gooditems.originPrice}</Text>
                                  </View>
                                  <View className='goods-number'>
                                    {
                                      count === 0 ? null : <Text>
                                        <AtIcon value='subtract-circle' color='#6190E8' onClick={this.handleEditGoodsCount.bind(this, 'sub')}></AtIcon>
                                          <Text className='count-number'>{count}</Text>
                                        </Text>
                                    }
                                    <AtIcon value='add-circle' color='#6190E8' onClick={this.handleEditGoodsCount.bind(this, 'add')}></AtIcon>
                                  </View>
                                </View>
                            </View>
                          </View>
                        )
                      })
                    }
                    {/* <View className='goods-item'>
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
                    </View> */}
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
