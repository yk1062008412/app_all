import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Banner from '@/components/banner/banner'
import TabBottom from '@/components/tabBottom/tabBottom'
import TabList from '@/components/tabList/tabList'
import ShopCar from '@/components/shoppCar/shopCar'
import './home.scss'
import { request } from '@/utils/request'

export default class Home extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      bannerList: []
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

  componentWillMount() {
    this.getBannerList()
  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 获取Banner数据
  getBannerList() {
    request('/home/getBannerList', {}).then(({code, data}) => {
      if (code === 0) {
        this.setState({
          bannerList: data
        })
      }
    })
  }

  render() {
    const { bannerList } = this.state
    return (
      <View className='home-container'>
        {
          bannerList.length ? <Banner bannerData={bannerList} /> : null
        }
        <TabList />
        <ShopCar />
        <TabBottom />
      </View>
    )
  }
}
