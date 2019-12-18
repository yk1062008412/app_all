import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RagionPicker from '@/components/ragionPicker/index'
import { AtInput, AtForm, AtTextarea, AtSwitch, AtButton } from 'taro-ui'
import './addAddress.scss'

export default class AddAddress extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      receiveUserName: '',
      telPhone: '',
      detailAdd: '',
      isDefaultAddress: false
    }
  }

  componentWillMount() {
  }

  handleChange (key, val) { // 输入值
    this.setState({
      [key]: val
    })
  }

  handleChangeTextarea (key, e) {
    const val = e.target.value
    this.setState({
      [key]: val
    })
  }

  onGetRegion (region) {
    console.log(region)
  }

  handleChangeDefault() {
    this.setState({
      isDefaultAddress: !this.state.isDefaultAddress
    })
  }

  render() {
    const { receiveUserName, telPhone, detailAdd, isDefaultAddress } = this.state
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
          <RagionPicker onGetRegion={this.onGetRegion.bind(this)} />
          <View className='address-detail-title'>详细收获地址</View>
          <AtTextarea
            value={detailAdd}
            onChange={this.handleChangeTextarea.bind(this, 'detailAdd')}
            maxLength={100}
            placeholder='请输入详细地址'
            className='address-detail-text'
          />
          <AtSwitch title='设置为默认地址' checked={isDefaultAddress} onChange={this.handleChangeDefault.bind(this)} />
          <View className='button-group'>
            <View className='button-group-item'>
              <AtButton type='primary'>保存地址</AtButton>
            </View>
            <View className='button-group-item'>
              <AtButton type='secondary'>删除</AtButton>
            </View>
          </View>
        </AtForm>
      </View>
    )
  }
}
