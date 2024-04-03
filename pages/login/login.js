// pages/login/login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl
  },
  onChooseAvatar(e) {
    console.log(e);
    this.setData({
      avatarUrl:e.detail.avatarUrl
    })
    app.globalData.avatarUrl=e.detail.avatarUrl;
  },
  formSubmit(e){
    console.log(e);
    app.globalData.nickname = e.detail.value.nickname;
    app.globalData.isLogin = 1;
    wx.setStorage({
      key:"userApperance",
      data: JSON.stringify({
        isLogin:app.globalData.isLogin,
        nickname:app.globalData.nickname,
        avatarUrl:app.globalData.avatarUrl
      })
    })
    wx.reLaunch({
      url: '../personal/personal',
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