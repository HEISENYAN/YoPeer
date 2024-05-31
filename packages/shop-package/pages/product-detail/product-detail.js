// packages/shop-package/pages/product-detail/product-detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      images: [
        'https://images.pexels.com/photos/4202927/pexels-photo-4202927.jpeg',
        'https://images.pexels.com/photos/3588229/pexels-photo-3588229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4045700/pexels-photo-4045700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
    },
    selectedProduct:'',
    selectedNum:1,
    selectedOptions:[],
  },
  
  // new UI kit
  onRadioChange(event) {
    const optionIndex = event.currentTarget.dataset.option;
    const selectedOption = parseInt(event.detail);
    this.setData({
      [`selectedOptions[${optionIndex}]`]: selectedOption
    });
  },

  onRadioCellClick(event) {
    const { name } = event.currentTarget.dataset;
    const optionIndex = event.currentTarget.dataset.option;
    this.setData({
      [`selectedOptions[${optionIndex}]`]: parseInt(name)
    });
  },
  
  wrapProduct:function(){
    var ypProduct = new Object();
    ypProduct.selectedNum = this.data.selectedNum;
    ypProduct.price = this.data.selectedProduct.price;
    ypProduct.selectedOptions = this.data.selectedOptions;
    ypProduct.prodName = this.data.selectedProduct.prodName;
    ypProduct.selectedItem = new Array(0);
    ypProduct.optionName = this.data.selectedProduct.optionName;
    for(let i = 0; i < this.data.selectedOptions.length;i++){
      ypProduct.selectedItem.push(this.data.selectedProduct.options[i][this.data.selectedOptions[i]])
    }
    return ypProduct
  },
  //加入购物车
  onAddCart:function(){
    const that = this
    wx.getStorage({
      key:"ypCart",
      fail: function(res){
        console.log(res)
        //判断是否创造过购物车
        if(res.errMsg == "getStorage:fail data not found"){
          const ypProduct = that.wrapProduct()
          wx.setStorage({
            key:"ypCart",
            data : {[that.data.selectedProduct.prodID + ypProduct.selectedItem.toString()]:ypProduct},
            fail:function(){
              wx.showToast({
                title:"加入购物车错误",
                icon:"error"
              })
            },
            success:function(){
              wx.showToast({
                duration:1000,
                title:"成功加入购物车",
                icon:"success",
                success:wx.navigateBack()
              })
            }
          })
        }
        //其它出错原因
        else{
          wx.showToast({
            title:"加入购物车错误",
            icon:"error"
          })
        }
      },
      //成功读取
      success:function(res){
        const ypProduct = that.wrapProduct();
        //判断是否已经存在此商品
        if(res.data.hasOwnProperty(that.data.selectedProduct.prodID + ypProduct.selectedItem.toString())){
          res.data[that.data.selectedProduct.prodID + ypProduct.selectedItem.toString()].selectedNum += that.data.selectedNum;
        }
        else{
          res.data[that.data.selectedProduct.prodID + ypProduct.selectedItem.toString()] = ypProduct;
        }
        //更新购物车
        wx.setStorage({
          key:"ypCart",
          data:res.data,
          fail:function(){
            wx.showToast({
              title:"加入购物车错误",
              icon:"error"
            })
          },
          success:function(){
            wx.showToast({
              duration:1000,
              title:"成功加入购物车",
              icon:"success",
              success: wx.navigateBack()
            })
            
          }
        })
      }
    })
  },
  //改变选项
  radioChange: function(e){
    this.setData({
      ["selectedOptions["+e.target.dataset.option+"]"] : parseInt(e.detail.value)
    },()=>{
      //console.log(this.data.selectedOptions)
    })
  },
  //增加数量
  onAdd: function(){
    const currentNum = this.data.selectedNum
    this.setData({
      selectedNum:currentNum+1
    })
  },
  //减少数量
  onSub: function(){
    const currentNum = this.data.selectedNum
    if(currentNum <= 1){
      wx.showToast({
        title: '数量不可小于一',
        icon: 'error',
        duration: 1000
      })
    }
    else{
      this.setData({
      selectedNum:currentNum-1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //初始化数据
  onLoad(options) {
    this.setData({
      selectedProduct:JSON.parse(options.selected),
      selectedOptions:new Array(JSON.parse(options.selected).optionNum).fill(0),
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

