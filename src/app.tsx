import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Home from './pages/home/home'
import { generateGetCodeUrl, getQueryVariable } from '@/utils/common'
import { request } from '@/utils/request'
import allStore from './store/allStore'
import orderStore from './store/orderStore'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  allStore,
  orderStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/home/home",
      "pages/order/order",
      "pages/mine/mine",
      "pages/address/address",
      "pages/settlement/settlement",
      "pages/addAddress/addAddress",
      "pages/orderDetail/orderDetail"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
    // tabBar: {
    //   list: [{
    //     "pagePath": "pages/home/home",
    //     "text": "首页",
    //     "iconPath": home,
    //     "selectedIconPath": homeSelect
    //   },{
    //     "pagePath": "pages/shopcar/shopcar",
    //     "text": "购物车",
    //     "iconPath": shopcar,
    //     "selectedIconPath": shopcarSelect
    //   },{
    //     "pagePath": "pages/mine/mine",
    //     "text": "我的",
    //     "iconPath": mine,
    //     "selectedIconPath": mineSelect
    //   }]
    // }
  }

  componentWillMount () {
    const openid = window.localStorage.getItem('OPENID');
    if(!openid){
      this.weChatAuth()
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  weChatAuth () {
    const currentUrl = window.location.href
    // console.log(currentUrl)
    // console.log(generateGetCodeUrl(currentUrl))
    // this.$router.params
    var queryCode = getQueryVariable('code')
    if(!queryCode){
      window.location.href = generateGetCodeUrl(currentUrl)
    }else{
      request('/mine/setMineInfo',{ authCode: queryCode }).then(({code, data}) => {
        if(code === 0){
          window.localStorage.setItem('OPENID', data.openid);
          window.localStorage.setItem('__USERHEADERURL', data.head_img_url);
          window.localStorage.setItem('__USERNICKNAME', data.nickname);
          window.localStorage.setItem('__USERSYSID', data.user_id);
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
