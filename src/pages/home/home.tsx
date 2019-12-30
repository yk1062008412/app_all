import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Banner from '@/components/banner/banner'
import TabBottom from '@/components/tabBottom/tabBottom'
import TabList from '@/components/tabList/tabList'
import ShopCar from '@/components/shoppCar/shopCar'
import './home.scss'

export default class Home extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      tabList: [],
      isOpen: false
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() {
    this.setState({
      tabList: [
        {
          title: '限时特惠', id: '6', goods: [
            { name: '一次性家用纸杯*20', des: '这里是描述区域', id: '12345', originPrice: '20.00', newPrice: '9.90', imgUrl: 'http://j.mp/2Q8GqmG' },
            { name: '一次性家用纸杯*20', des: '这里是描述区域', id: '12346', originPrice: '20.00', newPrice: '9.90', imgUrl: 'http://j.mp/2Q8GqmG' }
          ]
        },
        { title: '超值套餐', id: '7', goods: [] },
        { title: '叉子', id: '1', goods: [] },
        { title: '刀具', id: '2', goods: [] },
        { title: '纸杯', id: '3', goods: [] },
        { title: '碗筷', id: '4', goods: [] },
        { title: '牙签', id: '5', goods: [] }
      ]
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toggleCar() { // 打开购物车
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { tabList, isOpen } = this.state
    return (
      <View className='home-container'>
        <Banner />
        <TabList tabList={tabList} />
        <ShopCar carOpen={isOpen} handleToggleCar={this.toggleCar.bind(this)} />
        <TabBottom handleToggleCar={this.toggleCar.bind(this)} />
      </View>
    )
  }
}
