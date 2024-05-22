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
    wx.cloud.callFunction({
      name: 'addCart',
      data:{
        prodNum : 10,
        prodID: "YP1"
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
    
  }
});