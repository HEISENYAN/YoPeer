// pages/personal/personal.js
var app = getApp()
wx.cloud.init()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconList:[
      {
        name:"团购订单",
        iconUrl:"https://tdesign.gtimg.com/mobile/demos/icon1.png",
        targetUrl:"/packages/shop-package/pages/order-management/order-management"
      },
      {
        name:"我的活动",
        iconUrl:"https://tdesign.gtimg.com/mobile/demos/icon1.png",
        targetUrl:"/packages/activity-package/pages/activity-order-management/activity-order-management"
      },
      {
        name:"个人资料",
        iconUrl:"https://tdesign.gtimg.com/mobile/demos/icon1.png",
        targetUrl:"/pages/personal/login/login"
      },
      {
        name:"收货地址",
        iconUrl:"https://tdesign.gtimg.com/mobile/demos/icon1.png",
        targetUrl:"/packages/shop-package/pages/receive-info-edit/receive-info-edit"
      }
    ],
   isLogin : '',
   nickname: app.globalData.nickname,
   avatarUrl: app.globalData.avatarUrl,
   yoPeerValue: 360,
  // pickerOptions: ['PolyU', 'HKU', 'HKUST', 'CUHK', 'CITYU', 'HKBU', 'LINGU'],

  },
  onSelectDate:function(e){
    console.log(e.detail.getTime())
  },
  getUserProfile:function(e){  //进入登陆界面/个人信息
    wx.navigateTo({
      url:"./login/login"
    })
  },
  getAddressList:function(e){
    wx.navigateTo({
      url:"../../packages/shop-package/pages/receive-info-edit/receive-info-edit"
    })
  },
  getOrder:function(e){
    wx.navigateTo({
      url:"/packages/shop-package/pages/order-management/order-management"
    })
  },
  onTapIcon(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.targetUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      isLogin : app.globalData.isLogin, 
      nickname: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl,
      yoPeerValue: app.globalData.yoPeerValue,
    })
    const that = this
    /*
    wx.cloud.callFunction({
      name:'getUserInfo',
      success:function(res){
        that.setData({
          // nickname: res.result.nickName,
          // avatarUrl: res.result.avatarUrl,
          // yoPeerValue:res.result.yoPeerValue
        })
      },
      fail:function(res){
        wx.showModal({
          title:"错误",
          content:"" + res
          })
      }
    })*/
    if(this.data.isLogin !== app.globalData.isLogin){
      // this.setData({
      //   isLogin : app.globalData.isLogin, 
      //   nickname: app.globalData.nickname,
      //   avatarUrl: app.globalData.avatarUrl,
      // })
    }
  },
  getActivityOrder(){
    wx.navigateTo({
      url: '/packages/activity-package/pages/activity-order-management/activity-order-management',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
    isLogin : app.globalData.isLogin,
    nickname: app.globalData.nickName,
    avatarUrl: app.globalData.avatarUrl,
    yoPeerValue: app.globalData.yoPeerValue,
    });
    
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
    })

}
    // console.log("app.globalData.nickname: " + app.globalData.nickname)
    // console.log("app.globalData.avatarUrl: " + app.globalData.avatarUrl)
    // console.log("avatarUrl: " + this.data.avatarUrl)
    // console.log("nickname: " + this.data.nickname)
  }
})