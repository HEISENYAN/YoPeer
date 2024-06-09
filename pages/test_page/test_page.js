wx.cloud.init()
Page({
  data: {
  },
  testcloud:function(){
    console.log("clicked")
    /*
    wx.cloud.callFunction({
      name: 'getProduct',
      success:function(res){
        console.log(res.result.data)
      },
      fail:function(res){
        console.log(res)
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })*/
    /*
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : '15704986695',
        nickName: 'heisen',
        avatarUrl:''
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })
    const matching = /YP\d+/
    wx.getStorage({
      key:"ypCart",
      success:function(res){
        for(let i in res.data){
          console.log(i)
          console.log(matching.exec(i)[0])
        }
      }
    })*/
    const timestamp = Date.parse(new Date())/1000;
    /*
    wx.requestPayment({
      nonceStr: 'alkdjsfijoiiwioiejrioijflaksdjflkj',
      package: 'package',
      paySign: 'paySign',
      timeStamp: timestamp,
      fail:function(e){
        console.log(e)
      }
    })*/
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
          description: "鱼饼优选-测试产品",
          // 商户订单号，业务自行生成，此处仅为示例
          out_trade_no: Math.round(Math.random() * (10 ** 13)) + Date.now(),
          amount: {
            total: 1,
            currency: "CNY"
          }
        }
      },
      success: res => {
        console.log('下单结果: ', res);
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
            console.log('唤起支付组件成功：', res);
          },
          fail(err) {
            // 支付失败回调
            console.error('唤起支付组件失败：', err);
            wx.showToast({
              title: err,
              icon: "error",
            })
          }
        });
      },
    })
  }
});