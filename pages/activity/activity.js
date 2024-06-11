// pages/activity/activity.js
const deviceInfo = wx.getWindowInfo()
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  {
    value: `https://i.postimg.cc/fTpmYxxC/We-Chatd249c89681a46aa4eafcf08746fff827.jpg`,
    ariaLabel: '图片1',
  },
  {
    value: `https://i.postimg.cc/WpKhyshb/We-Chat13fe8fec90b8f0dce54e3419fa50529a.jpg`,
    ariaLabel: '图片2',
  },
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight : deviceInfo.statusBarHeight,
    loadingProps: {
      size: '50rpx'
    },
    enableRefresh : false,
    scrollTop: 0,
    swiperList:swiperList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSelectActivity(){
    wx.navigateTo({
      url: '/packages/shop-package/pages/shop/shop'
    })
  },
  onRefresh() {
    this.setData({ enableRefresh: true });
    setTimeout(() => {
      this.setData({ enableRefresh: false });
    }, 1500);
  },
  onScroll(e) {
    const { scrollTop } = e.detail;
    this.setData({ scrollTop });
  },
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

