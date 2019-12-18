# taro-region-picker

Taro省市区选择器

* H5、微信小程序、百度小程序、字节跳动小程序  
使用多列选择器实现
* 支付宝小程序  
使用支付宝小程序API：my.multiLevelSelect 实现

## 例子

```javascript
// src/pages/index/index.js
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import TaroRegionPicker from '../../components/taro-region-picker'

export default class Index extends Component {
  onGetRegion (region) {
    // 参数region为选择的省市区
    console.log(region);
  }

  render () {
    return (
      <View>
        <TaroRegionPicker onGetRegion={this.onGetRegion.bind(this)} />
      </View>
    )
  }
}
```


## 原代码(不需要支付宝，所以删除支付宝的内容)

```
<View>
  {
    // 支付宝不支持多列选择器，借助支付宝小程序API：my.multiLevelSelect实现省市区选择器
    process.env.TARO_ENV === 'alipay'
      ?
      <View className={this.state.region == '请选择省市区'
        ? 'taro-region-picker taro-region-picker-gray'
        : 'taro-region-picker taro-region-picker-black'}
        onClick={this.state.onClick}
      >
        <View>
          <Text>{this.state.region}</Text>
        </View>
      </View>
      :
      // 使用多列选择器实现省市区选择器，支持H5、微信小程序、百度小程序、字节跳动小程序
      // PS：微信小程序、百度小程序、字节跳动小程序支持设置Picker的属性mode='region'实现省市区选择器，但本组件均采用多列选择器方式实现
      <View className={this.state.region == '请选择省市区'
        ? 'taro-region-picker taro-region-picker-gray'
        : 'taro-region-picker taro-region-picker-black'}
      >
        <Picker
          mode='multiSelector'
          onChange={this.onChange}
          onColumnChange={this.onColumnChange}
          range={this.state.range}
          value={this.state.value}
        >
          <View>
            <Text>{this.state.region}</Text>
          </View>
        </Picker>
      </View>
  }
</View>
```
