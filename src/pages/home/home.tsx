import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Banner from '@/components/banner/banner'
import TabBottom from '@/components/tabBottom/tabBottom'
import TabList from '@/components/tabList/tabList'
import ShopCar from '@/components/shoppCar/shopCar'
import './home.scss'

export default class Home extends Component <any, any> {

  constructor (props) {
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

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      tabList: [
        { title: '标签页1', id: '1'},
        { title: '标签页2', id: '2'},
        { title: '标签页3', id: '3'},
        { title: '标签页4', id: '4'},
        { title: '标签页5', id: '5'},
        { title: '标签页6', id: '6'},
      ]
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toggleCar () { // 打开购物车
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
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
