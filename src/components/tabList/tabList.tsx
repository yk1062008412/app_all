import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import './tabList.scss'

@inject('allStore')
@observer
export default class TabList extends Component<any, any> {
  
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentWillMount() {
    const { allStore } = this.props
    allStore.getAllGoods();
  }

  handleClick (e: number) {
    this.setState({
      current: e
    })
  }

  handleEditGoodsCount (status, item) {
    const { allStore } = this.props
    allStore.operateShopCarSet(status, item);
  }

  render() {
    const { allStore: { tabList, shopcarList } } = this.props
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
                <AtTabsPane tabDirection='vertical' current={current} index={index} key={item.category_id}>
                  <View className='goods-list'>
                    {
                      item.goodsList.map(gooditems => {
                        return (
                          <View className='goods-item' key={gooditems.goods_id}>
                            <Image
                              className='goods-image'
                              src={gooditems.goods_img_url}
                            />
                            <View className='goods-box'>
                              <View>{gooditems.goods_name}</View>
                              <View className='goods-des'>{gooditems.goods_desc}</View>
                              <View className='price-info'>
                                  <View className='price-rate'>
                                    {
                                      gooditems.off_price == 0 ?
                                      <Text className='now-price'>¥{gooditems.cost_price}</Text>
                                      : <View>
                                        <Text className='now-price'>¥{gooditems.off_price}</Text>
                                        <Text className='origin-price'>¥{gooditems.cost_price}</Text>
                                      </View>
                                    }
                                  </View>
                                  <View className='goods-number'>
                                    {
                                      shopcarList.map(caritem => {
                                        if(caritem.goods_id === gooditems.goods_id){
                                          return (
                                            <Text>
                                              <AtIcon value='subtract-circle' color='#6190E8' onClick={this.handleEditGoodsCount.bind(this, 'sub', gooditems)}></AtIcon>
                                              <Text className='count-number'>{caritem.goods_num}</Text>
                                            </Text>
                                          )
                                        }else{
                                          return null;
                                        }
                                      })
                                    }
                                    <AtIcon value='add-circle' color='#6190E8' onClick={this.handleEditGoodsCount.bind(this, 'add', gooditems)}></AtIcon>
                                  </View>
                                </View>
                            </View>
                          </View>
                        )
                      })
                    }
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
