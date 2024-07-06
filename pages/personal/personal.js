// pages/personal/personal.js
var app = getApp()
wx.cloud.init()
var activityHostDate = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showCalendar:false,
    specialActivityList:[],
    showActivityList:[],
    formatter:function(day){
      if(activityHostDate.includes(day.date.getTime())){
        day.bottomInfo = "活动"
      }
      return day
    },
    iconList:[
      {
        name:"团购订单",
        iconUrl:"https://796f-yopeer-0g9zeq1439bcebc2-1326224258.tcb.qcloud.la/YoPeerDesign/dingdan.jpg?sign=3c9e782fea74f9cc1ce420573c5900ca&t=1720028837",
        targetUrl:"/packages/shop-package/pages/order-management/order-management"
      },
      {
        name:"我的活动",
        iconUrl:"https://796f-yopeer-0g9zeq1439bcebc2-1326224258.tcb.qcloud.la/YoPeerDesign/huodong.jpg?sign=a15a9b45448ad3ae5f6a4247091e2f69&t=1720028886",
        targetUrl:"/packages/activity-package/pages/activity-order-management/activity-order-management"
      },
      {
        name:"个人资料",
        iconUrl:"https://796f-yopeer-0g9zeq1439bcebc2-1326224258.tcb.qcloud.la/YoPeerDesign/geren.jpg?sign=8b42bf3cd3715a012a8e7eabf355ea0f&t=1720028900",
        targetUrl:"/pages/personal/login/login"
      },
      {
        name:"收货地址",
        iconUrl:"https://796f-yopeer-0g9zeq1439bcebc2-1326224258.tcb.qcloud.la/YoPeerDesign/dizhi.jpg?sign=e14014045d26006957e3d1064e9d767e&t=1720028910",
        targetUrl:"/packages/shop-package/pages/receive-info-edit/receive-info-edit"
      }
    ],
   isLogin : '',
   nickname: app.globalData.nickname,
   avatarUrl: app.globalData.avatarUrl,
   yoPeerValue: 360,
  // pickerOptions: ['PolyU', 'HKU', 'HKUST', 'CUHK', 'CITYU', 'HKBU', 'LINGU'],
  userInfo: {
    name: app.globalData.nickName,
    avatar: app.globalData.avatarUrl, // 用户头像的URL
    level: 'VIP 1',
    exp: 25, // 经验值百分比
    university: app.globalData.school
  },
  },
// 点击日历时弹出框
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  closePopup(){
    this.setData({
      visible: false,
    });
  },
  onClose() {
    this.setData({visible: false,});
  },
  onSelectDate:function(e){
    /*
    this.setData({
      visible: true,
    })*/
    var list = []
    for(let i in this.data.specialActivityList){
      if(this.data.specialActivityList[i].activityDate == e.detail.getTime()){
        list.push(this.data.specialActivityList[i])
      }
      this.setData({
        showActivityList:list
      },this.setData({
        visible:true
      }))
    }
  },
  selectActivity:function(e){
    wx.navigateTo({
      url: '/packages/activity-package/pages/activity-detail/activity-detail?activityID=' + e.currentTarget.dataset.selected,
    })
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
    wx.cloud.callFunction({
      name:"getSpecialActivityList",
      success:function(res){
        for(let i in res.result){
          activityHostDate.push(res.result[i].activityDate)
        }
        that.setData({
          specialActivityList:res.result
        },that.setData({showCalendar:true}))
      }
    })
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
        active: 1
    })

}
  }
})