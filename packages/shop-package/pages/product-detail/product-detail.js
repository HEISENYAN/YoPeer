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
      name: '商品名称',
      price: '999.00',
      description: '这是商品的简介。',
      specs: ['规格1', '规格2', '规格3']
    },
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
      pID: options.productID,
      pName: options.productName
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

  }
})

Page({
  data: {
    product: {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ],
      name: '商品名称',
      price: '999.00',
      description: '这是商品的简介。',
      specs: ['规格1', '规格2', '规格3']
    },
    selectedSpec: '规格1'
  },

  onSpecChange(e) {
    this.setData({
      selectedSpec: e.detail.value
    });
  },

  addToCart() {
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 2000
    });
    // 此处可以添加将商品添加到购物车的逻辑
  }
});
