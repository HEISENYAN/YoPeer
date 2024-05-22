Page({
  data: {
    YPproduct: [], // 用于存储从云函数获取的数据
    selectedProduct: null, // 用于存储当前选中的产品
    selectedSpec: '', // 用于存储当前选中的规格
    cart: [], // 用于存储购物车数据
    product: {
      images: [
        'https://images.pexels.com/photos/4202927/pexels-photo-4202927.jpeg',
        'https://images.pexels.com/photos/3588229/pexels-photo-3588229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4045700/pexels-photo-4045700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
    },
  },

  onLoad() {
    this.getProductData();
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
          // 默认选中第一个产品（如果有）
          if (res.result.data.length > 0 && res.result.data[0].items.length > 0) {
            that.setData({
              selectedProduct: res.result.data[0].items[0],
              selectedSpec: res.result.data[0].items[0].options[0][0]
            });
          }
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
  },

  onSpecChange(e) {
    this.setData({
      selectedSpec: this.data.selectedProduct.options[0][e.detail.value]
    });
  },

  addToCart() {
    let newCartItem = {
      prodName: this.data.selectedProduct.prodName,
      price: this.data.selectedProduct.price,
      spec: this.data.selectedSpec,
      quantity: 1 // 默认数量为1
    };

    let cart = this.data.cart;
    cart.push(newCartItem);

    this.setData({
      cart: cart
    });

    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 2000
    });
  },

  goBack() {
    wx.navigateBack();
  }
});


