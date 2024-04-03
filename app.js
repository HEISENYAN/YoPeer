// app.js
App({
  globalData:{
    openid: null,
    isLogin:0,
    avatarUrl:"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    nickname:"游客",
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
    wx.getStorage({
      key: "userApperance",
      success:res=>{
        var result = JSON.parse(res.data);
        this.globalData.isLogin = result.isLogin;
        this.globalData.nickname = result.nickname;
        this.globalData.avatarUrl = result.avatarUrl;
      }
    })
  }
})
