import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RagionPicker from '@/components/ragionPicker/index'
import { AtInput, AtForm, AtTextarea, AtSwitch, AtButton } from 'taro-ui'
import { request } from '@/utils/request'
import './addAddress.scss'

export default class AddAddress extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      addressId: null,
      receiveUserName: '',
      telPhone: '',
      province: '',
      city: '',
      district: '',
      detailAdd: '',
      isDefaultAddress: 0 // 0非默认地址，1默认地址
    }
  }

  componentWillMount() {
    const { type } = this.$router.params
    // 如果是新增，则正常流程，如果是编辑，则先获取地址详情
    if(type === 'edit'){
      const { addressId } = this.$router.params
      request('/address/getAddressInfo', {addressId: addressId}).then(({code, data}) => {
        if(code === 0){
          this.setState({
            addressId: data.address_id,
            receiveUserName: data.receive_user_name,
            telPhone: data.tel_phone,
            province: data.province,
            city: data.city,
            district: data.district,
            detailAdd: data.detail_add,
            isDefaultAddress: data.is_default_address
          })
        }
      })
    }
  }

  handleChange (key, val) { // 输入值
    this.setState({
      [key]: val
    })
  }

  handleChangeTextarea (key, e) { // 输入地址详情
    const val = e.target.value
    this.setState({
      [key]: val
    })
  }

  onGetRegion (region) { // 地址信息
    let regionArr = region.split('-')
    this.setState({
      province: regionArr[0].trim(),
      city: regionArr[1].trim(),
      district: regionArr[2].trim()
    })
  }

  handleChangeDefault () { // 修改默认地址
    const { isDefaultAddress } = this.state
    this.setState({
      isDefaultAddress: +isDefaultAddress === 1 ? 0 : 1
    })
  }

  handleSaveAddress () { // 保存地址
    const { addressId, receiveUserName, telPhone, province, city, district, detailAdd, isDefaultAddress } = this.state
    if(!receiveUserName){
      Taro.showToast({title: '请输入收货人姓名', icon: 'none', duration: 2000})
      return;
    }
    if(!telPhone){
      Taro.showToast({title: '请输入收货人手机号码', icon: 'none', duration: 2000})
      return;
    }
    if(!province || !city || !district){
      Taro.showToast({title: '请选择地区', icon: 'none', duration: 2000})
      return;
    }
    if(!detailAdd){
      Taro.showToast({title: '请输入详细地址', icon: 'none', duration: 2000})
      return;
    }
    // 保存地址
    const params = {
      addressId: addressId,
      receiveUserName: receiveUserName,
      telPhone: telPhone,
      province: province,
      city: city,
      district: district,
      detailAdd: detailAdd,
      isDefaultAddress: isDefaultAddress,
      userId: window.localStorage.getItem('__USERSYSID')
    }
    const { type } = this.$router.params
    let url = type === 'add' ? '/address/addressAdd' : '/address/addressUpdate';
    request(url, params).then(({code}) => {
      if (code === 0) {
        Taro.showToast({
          title: type === 'add' ? '保存成功' : '修改成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          // Taro.navigateTo({ url: '/pages/address/address' })
          Taro.navigateBack()
        }, 2500);
      }
    })
  }

  handleDeleteAddress () { // 删除地址
    Taro.showModal({
      title: '删除地址',
      content: '您确定要删除地址吗？',
    })
    .then(res => {
      if(res.confirm){
        Taro.showToast({
          title: '已删除',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          Taro.navigateBack()
        }, 2500);
      }
    })
  }

  handleCancelAddress () { // 取消编辑地址
    Taro.showModal({
      title: '取消',
      content: '您确定要取消新增地址吗？',
    })
    .then(res => {
      if(res.confirm){
        Taro.navigateBack()
      }
    })
  }

  render() {
    const { addressId, receiveUserName, telPhone, province, city, district,  detailAdd, isDefaultAddress } = this.state
    return (
      <View className='add-address-container'>
        <AtForm>
          <AtInput
            name='receiveUserName'
            title='姓名'
            type='text'
            placeholder='请输入收货人姓名'
            value={receiveUserName}
            onChange={this.handleChange.bind(this, 'receiveUserName')}
          />
          <AtInput
            name='telPhone'
            title='手机号码'
            type='phone'
            placeholder='请输入收货人手机号码'
            value={telPhone}
            onChange={this.handleChange.bind(this, 'telPhone')}
          />
          {
            addressId ? <RagionPicker onGetRegion={this.onGetRegion.bind(this)} defaultRagion={`${province} - ${city} - ${district}`} />
            : <RagionPicker onGetRegion={this.onGetRegion.bind(this)} />
          }
          <View className='address-detail-title'>详细收货地址</View>
          <AtTextarea
            value={detailAdd}
            onChange={this.handleChangeTextarea.bind(this, 'detailAdd')}
            maxLength={100}
            placeholder='请输入详细地址'
            className='address-detail-text'
          />
          <AtSwitch title='设置为默认地址' checked={isDefaultAddress === 1 ? true : false} onChange={this.handleChangeDefault.bind(this)} />
          <View className='button-group'>
            <View className='button-group-item'>
              <AtButton type='primary' onClick={this.handleSaveAddress.bind(this)}>保存地址</AtButton>
            </View>
            {
              addressId ? <View className='button-group-item'>
                <AtButton type='secondary' onClick={this.handleDeleteAddress.bind(this)}>删除</AtButton>
              </View> : <View className='button-group-item'>
                <AtButton type='secondary' onClick={this.handleCancelAddress.bind(this)}>取消</AtButton>
              </View>
            }
          </View>
        </AtForm>
      </View>
    )
  }
}
