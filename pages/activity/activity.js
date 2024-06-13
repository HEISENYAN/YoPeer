// pages/activity/activity.js
const deviceInfo = wx.getWindowInfo()
const imageCdn = 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/WeChat9e0e9fbeaa05c3c5da083cbdf52bdf6f.jpg';
const swiperList = [
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/lunbotu2.jpg`,
    ariaLabel: '图片1',
  },
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/lunbotu3.jpg`,
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
    swiperList:swiperList,

    //user demo
    userInfo: {
      name: '张三',
      avatar: 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/WeChat9e0e9fbeaa05c3c5da083cbdf52bdf6f.jpg', // 用户头像的URL
      level: 'VIP 3',
      exp: 20, // 经验值百分比
      university: '香港中文大学'
    }

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

