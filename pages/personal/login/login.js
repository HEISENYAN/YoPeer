// pages/login/login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// const defaultAvatarUrl = "../../icons/portrait.png"
const defaultNickname = "昵称"
const defaultPhoneNum = ""
var app = getApp()
wx.cloud.init()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    style: 'border-radius: 12rpx;',
    cityText: '',
    cityValue: [],
    citys: [
      { label: '不选择', value: '不选择' },
      { label: '香港大学', value: '香港大学' },
      { label: '香港中文大学', value: '香港中文大学' },
      { label: '香港科技大学', value: '香港科技大学' },
      { label: '香港城市大学', value: '香港城市大学' },
      { label: '香港理工大学', value: '香港理工大学' },
      { label: '香港浸会大学', value: '香港浸会大学' },
      { label: '香港岭南大学', value: '香港岭南大学' },
      { label: '香港教育大学', value: '香港教育大学' },
    ],
    phoneError: false,
    avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
    nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
    phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
  },
  onColumnChange(e) {
    console.log('picker pick:', e);
  },
  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    console.log('picker change:', e.detail);
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
  },
  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },
  onCityPicker() {
    this.setData({ cityVisible: true });
  },
  onPhoneInput(e) {
    const { phoneError } = this.data;
    const isPhoneNumber = /^(852|853)\d{8}$|^86\d{11}$/.test(e.detail.value);
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
  },
  onChooseAvatar(e) {//修改头像
    console.log(e);
    this.setData({
      avatarUrl:e.detail.avatarUrl
    })
  },
  // returnPage: function(){
  //   wx.navigateBack()({
  //     // url: '../personal'
  //     delta: 2
  //   })
  // },
  handleButtonClick() {//返回
    wx.reLaunch({
      url: '../personal'
      // delta: 1
    });
  },
  formSubmit(e){
    if(e.detail.value.nickname)  app.globalData.nickname = e.detail.value.nickname;
    if(e.detail.value.phoneNum)  app.globalData.phoneNum = e.detail.value.phoneNum;
    const updatedPhoneNum = (e.detail.value.phoneNum)? e.detail.value.phoneNum : this.phoneNum;
    const updatedNickname = (e.detail.value.nickname)? e.detail.value.nickname : this.nickname;
    // app.globalData.avatarUrl = e.detail.value.avatarUrl;
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : updatedPhoneNum,
        nickName: updatedNickname,
        avatarUrl: this.data.avatarUrl
      },
      success:function(res){
        wx.showToast({
          title:"修改成功",
          icon:"success",
          duration:1500
        })
        console.log(res)
      },
      fail:function(res){
        console.log(res)
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })
    wx.reLaunch({  //提交按钮，返回个人中心
      url: '../personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
      nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
      phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
      });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// console.log("app.globalData.phoneNum!=" + app.globalData.phoneNum!="123456")