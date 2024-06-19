wx.cloud.init()
Page({
  data: {
  },
  testcloud:function(){
    wx.cloud.callFunction({
      name:"getReceiveInfo",
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
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
  }
});