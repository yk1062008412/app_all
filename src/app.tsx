import Taro, { Component, Config } from '@tarojs/taro'
import Home from './pages/home/home'
import './app.scss'

// import shopcar from '@/images/shopcar.png'
// import shopcarSelect from '@/images/shopcar_select.png'
// import home from '@/images/home.png'
// import homeSelect from '@/images/home_select.png'
// import mine from '@/images/mine.png'
// import mineSelect from '@/images/mine_select.png'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

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
      "pages/shopcar/shopcar",
      "pages/mine/mine"
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

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Home />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))