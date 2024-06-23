// packages/activity-package/pages/activity-detail/activity-detail.js
wx.cloud.init()
var activityID = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo:null,
    nowTime:0
  },
  onRegisterActivity(e){
    console.log(e.currentTarget.dataset.isExpiry)
    const that = this
    if(!e.currentTarget.dataset.isExpiry){//活动未截止
      wx.cloud.callFunction({//登录获取用户信息
        name:"getUserInfo",
        success:function(personalInfo){
          if(personalInfo.result.isRegistered){//检查用户是否注册
            //检查信息 微信号 手机号等
            const tradeNumber = Math.round(Math.random() * (10 ** 13)) + Date.now()//生成随机订单号
            wx.cloud.callFunction({
              name: 'cloudbase_module',
              data: {
                // 工作流ID, 需从工作流属性中获取
                name: 'sywxzfapifqzf_9cfe90e',
                data: {
                  /**
                   * 注：appid 和 mchid 工作流已自动注入，无需传递
                   * 本示例只传递了必要的参数，其他详细参数可参考微信支付文档：
                   * https://pay.weixin.qq.com/docs/merchant/apis/mini-program-payment/mini-prepay.html
                   */
                  description: "参加活动"+that.data.activityInfo.activityName,
                  // 商户订单号，业务自行生成，此处仅为示例
                  out_trade_no: tradeNumber,
                  amount: {
                    total: that.data.activityInfo.price,
                    currency: "CNY"
                  }
                }
              },
              success: res => {
                // 获取到预付单信息
                const paymentData = res.result?.data;
                // 唤起微信支付组件，完成支付
                wx.requestPayment({
                  timeStamp: paymentData?.timeStamp,
                  nonceStr: paymentData?.nonceStr,
                  package: paymentData?.packageVal,
                  paySign: paymentData?.paySign,
                  signType: "RSA", // 
                  success(res) {
                    wx.cloud.callFunction({
                      name:"activityOrderSettlement",
                      data:{
                        activityID:activityID,
                        phoneNumber:personalInfo.result.phoneNumber,
                        avatarUrl:personalInfo.result.avatarUrl,
                        nickName:personalInfo.result.nickName,
                        tradeNumber:tradeNumber,
                        timeStamp: paymentData?.timeStamp,
                        paidPrice:that.data.activityInfo.price
                      },
                      success:function(res){
                        console.log(res)
                      },
                      fail:function(res){
                        console.log(res)
                      }
                    })
                  },
                  fail(err) {
                    // 支付失败回调
                    console.error('唤起支付组件失败：', err);
                    wx.showToast({
                      title: '支付失败请重试',
                      icon: "error",
                    })
                  }
                });
              },
              fail: err =>{
                wx.showToast({
                  title: '支付失败请重试',
                  icon:"error"
                })
              }
            })

          }
          else{
            console.log("未注册")
          }
        }
      })
    }
    else{

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    const now = new Date().getTime()
    activityID = '9fe3c0fd66781b250371751a4163eebd'
    wx.cloud.callFunction({
      name:"getActivityDetail",
      data:{
        activityID:'9fe3c0fd66781b250371751a4163eebd'
      },
      success:function(res){
        that.setData({
          activityInfo:res.result,
          nowTime:now
        },()=>console.log(that.data.activityInfo))
        console.log(now)
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