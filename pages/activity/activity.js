// pages/activity/activity.js
const deviceInfo = wx.getWindowInfo()
var app = getApp()
const imageCdn = 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/WeChat9e0e9fbeaa05c3c5da083cbdf52bdf6f.jpg';
const swiperList = [
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/小程序插画设计-1/主页-顶部滑动栏-1标语.jpg`,
    ariaLabel: '图片1',
  },
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/小程序插画设计-1/主页-顶部滑动栏-2社区简介入口.jpg`,
    ariaLabel: '图片2',
  },
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/小程序插画设计-1/主页-顶部滑动栏-3.jpg`,
    ariaLabel: '图片3',
  },
];
const swiperList2 = [
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片1',
  },
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片2',
  },
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片3',
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
    swiperList2:swiperList2,

    //user demo
    userInfo: {
      name: app.globalData.nickName,
      avatar: app.globalData.avatarUrl, // 用户头像的URL
      level: 'VIP 0',
      exp: 0, // 经验值百分比
      university: app.globalData.school
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onClickSwiper(e){
    console.log(e)
    if(e.detail.index == 1){
      wx.navigateTo({
        url: '/pages/about-us/about-us',
      })
    }
  },
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
    const that = this
    wx.cloud.callFunction({
      name:"getUserInfo",
      success:function(res){
        console.log(res.result)
        app.globalData.nickName = res.result.nickName
        app.globalData.isRegistered = res.result.isRegistered
        app.globalData.school = res.result.school
        app.globalData.avatarUrl = res.result.avatarUrl
        app.globalData.phoneNumber = res.result.phoneNumber
        that.setData({
          userInfo:{
            name : app.globalData.nickName,
            university : app.globalData.school,
            avatar : app.globalData.avatarUrl,
            exp : app.globalData.yoPeerValue,
            level : 'VIP 0',
          }
        })
      }
    })
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

