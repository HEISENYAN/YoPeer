wx.cloud.init()
const SHA256 = require('../../utils/sha256')
Page({
  data: {
  },
  testcloud:function(){
    const k = Math.round(Date.now() + Math.random() * 1000)
    console.log(SHA256(k.toString()))
    /*
    wx.cloud.uploadFile({
      cloudPath: 'yopeer-user-avatar/testing', // 上传至云端的路径
      filePath: "http://tmp/tuy50tn7eshZ1cfa8824fc281a6cca9e962c9938a64a.jpeg", // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
      },
      fail: console.error
    })*/
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