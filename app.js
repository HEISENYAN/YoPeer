// app.js
wx.cloud.init()
App({
  globalData:{
    openID: null,
    isLogin: 0,
    // avatarUrl:"./icons/portrait.png",
    avatarUrl:"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    nickName:"游客",
    phoneNum: "",
    school: '',
    yoPeerValue: 0,
    sky_system:{},
    sky_menu:{}
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
    
  }
})
