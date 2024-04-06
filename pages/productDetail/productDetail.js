// pages/productDetail/productDetail.js
const {screenHeight, statusBarHeight, safeArea, windowHeight} = wx.getSystemInfoSync()
const capsule = wx.getMenuButtonBoundingClientRect()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topHeight:statusBarHeight,
    capTop: capsule.top,
    capWidth: capsule.width,
    capHeight: capsule.height,
    screenHeight:screenHeight
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
    console.log(capsule.top)
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