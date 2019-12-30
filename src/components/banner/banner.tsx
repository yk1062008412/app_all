import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './banner.scss'

import banner1 from '../../static/demo/banner/banner1.png'
// import banner2 from '../../static/demo/banner/banner2.png'
// import banner3 from '../../static/demo/banner/banner3.png'

export default class Banner extends Component {
  render() {
    return (
      <View className="banner-container">
        <Swiper
        className='swiper-info'
        indicatorColor='#999999'
        indicatorActiveColor='#09BB07'
        indicatorDots
        circular
        autoplay>
        <SwiperItem className="swiper-item">
          <Image
            className="swiper-image"
            src={banner1}
          />
        </SwiperItem>
        {/* <SwiperItem className="swiper-item">
          <Image
            className="swiper-image"
            src={banner2}
          />
        </SwiperItem>
        <SwiperItem className="swiper-item">
          <Image
            className="swiper-image"
            src={banner3}
          />
        </SwiperItem> */}
      </Swiper>
      </View>
    )
  }
}