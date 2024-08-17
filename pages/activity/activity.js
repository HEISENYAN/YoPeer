// pages/activity/activity.js
const deviceInfo = wx.getWindowInfo()
var app = getApp()
const imageCdn = 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/WeChat9e0e9fbeaa05c3c5da083cbdf52bdf6f.jpg';
const swiperList = [
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/主页-顶部滑动栏-1标语.png`,
    ariaLabel: '图片1',
  },
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/主页-顶部滑动栏-1标语 (2).png`,
    ariaLabel: '图片2',
  },
  {
    value: `cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/YoPeerDesign/主页-顶部滑动栏-1标语 (3).png`,
    ariaLabel: '图片3',
  },
];
const swiperList2 = [
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片1',
    text: '1231232132312312312313'
  },
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片2',
    text: '1233213313123'
  },
  {
    value: `https://i.postimg.cc/52xp1b3Q/We-Chat43e0e6c799d5af8fca53ce08af2c7c99.jpg`,
    ariaLabel: '图片3',
    text: '123'
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
      level: 'VIP 1',
      exp: 25, // 经验值百分比
      university: app.globalData.school
    },
    specialActivityList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSelectSpecialActivity(e){
    wx.navigateTo({
        url: '/packages/activity-package/pages/activity-detail/activity-detail?activityID='+e.currentTarget.dataset.selectedActivity,
      })
  },
  onClickSwiper(e){
    // console.log(e)
    if(e.detail.index == 1){
      wx.navigateTo({
        url: '/pages/about-us/about-us',
      })
    }
  },
  onSelectActivity(){
    wx.navigateTo({
      url: '/packages/shop-package/pages/shop/shop?isBack='+ true
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
  getUserProfile:function(e){  //进入登陆界面/个人信息
    wx.navigateTo({
      url:"../personal/login/login"
    })
  },
  onLoad(options) {
    const that = this
    if(app.globalData.userInfo){
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
    else{
      app.userInfoCallback = res =>{
        that.setData({
          userInfo:{
            name : res.result.nickName,
            university : res.result.school,
            avatar : res.result.avatarUrl,
            exp : res.result.yoPeerValue,
            level : 'VIP 0',
          }
        })
      }
    }
    wx.cloud.callFunction({
      name:"getSpecialActivityList",
      success:function(res){
        // console.log(res.result)
        that.setData({
          specialActivityList:res.result
        })
      },
      fail:function(res){
        // console.log(res)
        wx.showToast({
          icon:"error",
          title:"加载出错"
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
    this.setData({
      userInfo:{
        name : app.globalData.nickName,
        university : app.globalData.school,
        avatar : app.globalData.avatarUrl,
        exp : app.globalData.yoPeerValue,
        level : 'VIP 0'
      }
    })
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

  },
  onTouchStart(event) {
    // 记录触摸开始的X坐标
    this.setData({
      startX: event.touches[0].clientX
    });
  },

  onTouchEnd(event) {
    
    // 获取触摸结束的X坐标
    const endX = event.changedTouches[0].clientX;
    const index = event.currentTarget.dataset.index;
    var List = this.data.specialActivityList;

    // 计算滑动的距离
    const deltaX = endX - this.data.startX;

    // 判断滑动方向，假设滑动距离超过50px算作有效滑动
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // 左滑，将点击的卡片移到最后一个位置
        const selectedCard = List.splice(index, 1)[0];
        List.push(selectedCard);
      } else {
        // 右滑，将点击的卡片移到第一个位置
        const selectedCard = List.splice(index, 1)[0];
        List.unshift(selectedCard);
      }
      this.setData({
        specialActivityList: List
      });
    }
  }
  
})