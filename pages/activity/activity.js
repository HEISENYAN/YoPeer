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
      level: 'VIP 0',
      exp: 0, // 经验值百分比
      university: app.globalData.school
    },

    //
    cardList: [
      {
        // ！！注意这里的详情字数需要控制不然会出现bug
        image: 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/activity-image/682ff74017e6381166455199902b853.jpg',
        title: '深圳·云台寺精心禅修之旅',
        date: '2024-07-31/南山区金地购物中心',
        description: '“云台寺精心禅修之旅”是一场宁静而深邃的心灵之旅，带您走进历史悠久的云台寺，在大师的指导下，通过禅修、冥想与自然融合，寻觅内心的平和与智慧，体验身心灵的全方位升华。',
        participants: [
          { avatar: 'path/to/avatar1.jpg' },
          { avatar: 'path/to/avatar2.jpg' },
          { avatar: 'path/to/avatar3.jpg' }
        ],
        keywords:["静心探寺","深度交流"]
      },
      {
        image: 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/activity-image/f8748c3296e2eaa905767b43fe06e59.jpg',
        title: '泰国·普吉岛浪漫三天两夜',
        date: '2024-07-18/泰国普吉岛',
        description: '“欢迎加入“普吉岛浪漫三天两夜”之旅！在这次浪漫之行中，您将入住豪华度假村，享受无边泳池和私密沙滩的宁静。每日的精致晚餐和热带美景将为您和您的爱人打造难忘的回忆。',
        participants: [
          { avatar: 'path/to/avatar1.jpg' },
          { avatar: 'path/to/avatar2.jpg' },
          { avatar: 'path/to/avatar3.jpg' },
        ],
        keywords:["热带风情","户外探索"]
      },
      {
        // ！！注意这里的详情字数需要控制不然会出现bug
        image: 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/activity-image/682ff74017e6381166455199902b853.jpg',
        title: '深圳·云台寺精心禅修之旅',
        date: '2024-07-31/南山区金地购物中心',
        description: '“云台寺精心禅修之旅”是一场宁静而深邃的心灵之旅，带您走进历史悠久的云台寺，在大师的指导下，通过禅修、冥想与自然融合，寻觅内心的平和与智慧，体验身心灵的全方位升华。',
        participants: [
          { avatar: 'path/to/avatar1.jpg' },
          { avatar: 'path/to/avatar2.jpg' },
          { avatar: 'path/to/avatar3.jpg' }
        ],
        keywords:["静心探寺","深度交流"]
      },
      {
        image: 'cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/activity-image/f8748c3296e2eaa905767b43fe06e59.jpg',
        title: '泰国·普吉岛浪漫三天两夜',
        date: '2024-07-18/泰国普吉岛',
        description: '“欢迎加入“普吉岛浪漫三天两夜”之旅！在这次浪漫之行中，您将入住豪华度假村，享受无边泳池和私密沙滩的宁静。每日的精致晚餐和热带美景将为您和您的爱人打造难忘的回忆。',
        participants: [
          { avatar: 'path/to/avatar1.jpg' },
          { avatar: 'path/to/avatar2.jpg' },
          { avatar: 'path/to/avatar3.jpg' },
        ],
        keywords:["热带风情","户外探索"]
      }
    ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSelectSpecialActivity(e){
    console.log(e)
    var activityID = ''
    if(e.currentTarget.dataset.selectedActivity == 1){
      activityID = 'e2764d2d667a5062038faf7d6f91b7bb'
    }
    else{
      activityID = 'c45ba8cc667a42d803885c89344ee65c'
    }
    wx.navigateTo({
        url: '/packages/activity-package/pages/activity-detail/activity-detail?activityID='+activityID,
      })
    
  },
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
  getUserProfile:function(e){  //进入登陆界面/个人信息
    wx.navigateTo({
      url:"../personal/login/login"
    })
  },
  onLoad(options) {
    const that = this
    wx.cloud.callFunction({
      name:"getUserInfo",
      success:function(res){
        const phoneString = res.result.phoneNumber.split(" ")
        console.log(res.result)
        app.globalData.nickName = res.result.nickName
        app.globalData.isRegistered = res.result.isRegistered
        app.globalData.school = res.result.school
        app.globalData.avatarUrl = res.result.avatarUrl
        app.globalData.phoneAreaValue = phoneString[0]
        app.globalData.phoneNum = phoneString[1]
        app.globalData.wechatID = res.result.wechatID
        app.globalData._openid = res.result._openid
        that.setData({
          userInfo:{
            name : app.globalData.nickName,
            university : app.globalData.school,
            avatar : app.globalData.avatarUrl,
            exp : app.globalData.yoPeerValue,
            level : 'VIP 0',
          }
        })
        // console.log()
      },
      
    });
    
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
        level : 'VIP 0',
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
    const cardList = this.data.cardList;

    // 计算滑动的距离
    const deltaX = endX - this.data.startX;

    // 判断滑动方向，假设滑动距离超过50px算作有效滑动
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // 左滑，将点击的卡片移到最后一个位置
        const selectedCard = cardList.splice(index, 1)[0];
        cardList.push(selectedCard);
      } else {
        // 右滑，将点击的卡片移到第一个位置
        const selectedCard = cardList.splice(index, 1)[0];
        cardList.unshift(selectedCard);
      }
      this.setData({
        cardList: cardList
      });
    }
  }
  
})

