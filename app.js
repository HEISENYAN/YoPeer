// app.js
wx.cloud.init()
App({
  globalData:{
    openID: null,
    isLogin: 0,
    nickName:"游客",
    phoneNum: "",
    wechatID: "",
    phoneAreaValue: '+852',
    school: '',
    yoPeerValue: 0,
    // 收货信息
    consigneeName: '请填写收货人姓名',
    consigneePhoneNum: '请填写收货人手机号码',
    sky_system:{},
    sky_menu:{},
    tabbarActive:0,
    isVoucher:false
  },
  onLaunch(options){
    ;(async ()=>{
      // 全局注册工具类SkyUtils
      // 这里默认npm引用，地址为'./components/utils/skyUtils'，如果是直接引用组件，地址可能是'./components/utils/skyUtils',后面不再说明
      const SkyUtils = await import('/miniprogram_npm/jieyue-ui-com/utils/skyUtils');
      wx.SkyUtils = SkyUtils.default;
      // 初始化设备与系统数据
      wx.SkyUtils.skyInit()
      // 小程序自动更新方法
      wx.SkyUtils.versionUpdate()
    })()
    const that = this
    wx.cloud.callFunction({
      name:"getUserInfo",
      success:function(res){
        const phoneString = res.result.phoneNumber.split(" ")
        // console.log(res.result)
        that.globalData.nickName = res.result.nickName
        that.globalData.isRegistered = res.result.isRegistered
        that.globalData.school = res.result.school
        that.globalData.avatarUrl = res.result.avatarUrl
        that.globalData.phoneAreaValue = phoneString[0]
        that.globalData.phoneNum = phoneString[1]
        that.globalData.wechatID = res.result.wechatID
        that.globalData._openid = res.result._openid
        that.globalData.isVoucher = res.result.isVoucher
        that.globalData.userInfo = true
        if(that.userInfoCallback){
          that.userInfoCallback(res)
        }
      },
    });


  }
})
