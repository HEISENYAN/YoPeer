wx.cloud.init()
Page({
  data: {
      show: false,
      buttons: [
          {
              type: 'default',
              className: '',
              text: '辅助操作',
              value: 0
          },
          {
              type: 'primary',
              className: '',
              text: '主操作',
              value: 1
          }
      ]
  },
  testcloud:function(){
    
    wx.cloud.callFunction({
      name: 'test2',
      success:function(res){
        console.log(res)
      }
      
    })
  }
});