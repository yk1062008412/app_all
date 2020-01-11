import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './banner.scss'

export default class Banner extends Component<any, any> {

  static defaultProps = {
    bannerData: []
  }

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    const { bannerData } = this.props;
    return (
      <View className="banner-container">
        <Swiper
        className='swiper-info'
        indicatorColor='#999999'
        indicatorActiveColor='#09BB07'
        indicatorDots
        circular
        autoplay>
          {
            bannerData.map(item => {
              return (
                <SwiperItem className="swiper-item" key={item.banner_id}>
                  <Image
                    className="swiper-image"
                    src={item.banner_img_url}
                  />
                </SwiperItem>
              )
            })
          }
      </Swiper>
      </View>
    )
  }
}