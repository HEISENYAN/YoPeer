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
  open: function () {
      this.setData({
          show: true
      })
      console.log("clicked")
  },
  buttontap(e) {
      console.log(e.detail)
  },
  closePage(){
    wx.navigateBack({})
  }
});