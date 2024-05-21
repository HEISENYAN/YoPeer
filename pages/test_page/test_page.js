wx.cloud.init()
Page({
  data: {
  },
  testcloud:function(){
    console.log("clicked")
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
    })
    
  }
});