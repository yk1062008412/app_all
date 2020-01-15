import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import './addressList.scss'

@inject('orderStore')
@observer
export default class AddressList extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      defaultAddress: 2,
      by: 'look' //add: 从订单详情页面进来的。。look:地址管理进来的
    }
  }

  componentWillMount() {
    const { by } = this.$router.params
    this.setState({
      by: by || 'look'
    })
  }

  handleEdit (addressId, e) {
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/addAddress/addAddress?type=edit&addressId=${addressId}` })
  }

  addressItemAdd(item) { // 添加地址
    const { by } = this.state;
    const { orderStore } = this.props
    if(by === 'add'){
      orderStore.setOrderAddress(item)
      Taro.navigateBack()
    }else{
      return;
    }
  }

  render() {
    const { orderStore: { addressList } } = this.props
    return (
      <View className='address-list-container'>
        <View className="address-list">
          {
            addressList.map(item => {
              return (
                <View className="address-item" key={item.address_id} onClick={this.addressItemAdd.bind(this, item)}>
                  <View className="address-item-content">
                    <View>
                      <Text className="address-name">{item.receive_user_name}</Text>
                      <Text className="address-phone">{item.tel_phone}</Text>
                      {
                        item.is_default_address ? <AtTag size="small" circle active className="address-tag">默认</AtTag> : null
                      }
                    </View>
                    <View>
                      {`${item.province} ${item.city} ${item.district} ${item.detail_add}`}
                    </View>
                  </View>
                  <View className="address-setting" onClick={this.handleEdit.bind(this, item.address_id)}>
                    <AtIcon value='edit' size='20' color='#000'></AtIcon>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
