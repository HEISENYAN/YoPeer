// packages/shop-package/pages/product-detail/product-detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pID: '',
    pName: '',
    product: {
      images: [
        'https://images.pexels.com/photos/4202927/pexels-photo-4202927.jpeg',
        'https://images.pexels.com/photos/3588229/pexels-photo-3588229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4045700/pexels-photo-4045700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
    },
    multiArray: [
      ['规格1', '规格2', '规格3'], 
      ['子规格1', '子规格2', '子规格3'], 
      ['子子规格1', '子子规格2', '子子规格3']
    ],
    multiIndex: [0, 0, 0],
    selectedProduct:'',
    YPproduct: []
  },
  
  onSpecChange(e) {
    this.setData({
      selectedSpec: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      selectedProduct:JSON.parse(options.selected)
    })
    this.getProductData();
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
  onUnload(e) {
    
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

  generateMultiArray() {
    // 这里应该生成适合你的规格数组
    return [
      ['规格1', '规格2', '规格3'],
      ['子规格1', '子规格2', '子规格3'],
      ['子子规格1', '子子规格2', '子子规格3']
    ];
  },

  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    });
  },

  bindMultiPickerColumnChange(e) {
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    // 更新列选择的数据逻辑
    this.setData(data);
  },

  getProductData() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getProduct',
      success: function(res) {
        if (res.result.data) {
          that.setData({
            YPproduct: res.result.data
          });
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: function(err) {
        wx.showModal({
          title: '错误',
          content: '获取数据失败: ' + err,
          showCancel: false
        });
      }
    });
  }
})

