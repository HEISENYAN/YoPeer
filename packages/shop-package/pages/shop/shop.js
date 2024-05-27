// pages/shop/shop.js
const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}
const { shared, timing } = wx.worklet
wx.cloud.init()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    indexSize: 0, // 当前点击
    indicatorDots: false, // 是否显示面板指示点
    autoplay: false,  // 是否自动切换
    duration: 0,  // 滑动动画时长
    scrollIntoView: "",
    headerTop:0,
    selectedTotalPrice:0, // 已经选择物品的总价
    ifMaskOn: false,
    YPproduct:{},
    cartPrice:0,
    ypCart:[]
  },
  methods:{
    returnPage: function(){
      wx.reLaunch({
        url: '/pages/activity/activity'
      })
 
    },
    chooseTypes: function(e) {
      this.setData({
        scrollIntoView:"#menuIndex" + e.target.dataset.nowindex,
        indexSize:e.target.dataset.nowindex
      })
    },
    closeCart: function(){
      const cart = this.selectComponent("#shoppingCart");
      cart.closeitem();
      this.setData({
        ifMaskOn: false
      })
    },
    openCart: function(){
      this.setData({
        ifMaskOn: true
      })
    },
    moveCart: function(){
      const cart = this.selectComponent("#shoppingCart");
      this.setData({
        ifMaskOn: cart.ifMaskOn.value
      })
    },
    scrollDetection: function(e) {
      for (var i = 0;i<this.data.YPproduct.length;i++) {
        const query = wx.createSelectorQuery();
        query.select("#menuIndex" + i).boundingClientRect();
        let that = this;
        query.selectViewport().scrollOffset();
        query.exec(function(index, res) {
          if (parseInt(res[0].top) === that.data.headerTop) {
            that.setData({
              indexSize: index
            });
          }
        }.bind(null, i));
      }
    },
    chooseSecondMenu: function(e){
      wx.navigateTo({
        url: '/packages/shop-package/pages/product-detail/product-detail?selected='+JSON.stringify(e.target.dataset.selected),
      })
    },
    checkOut: function(e){
      if(this.data.cartPrice == 0){
        wx.showToast({
          title: '请先加入物品',
          icon:"error"
        })
      }
      else{
        wx.navigateTo({
          url: '/packages/shop-package/pages/check-out-page/check-out-page?cartinfo='+ JSON.stringify(this.data.ypCart) + "&totalprice="+this.data.cartPrice,
        })
      }
      
    },
    onClearCart: function(){
      const that = this
      wx.removeStorage({
        key: "ypCart",
        success:function(){
          wx.showToast({
            title: '已清除购物车',
            icon: 'success',
            duration: 1000,
            success:function(){
              that.setData({
                cartPrice:0,
                ypCart:[]
              },()=>that.closeCart())
            }
          })
        },
        fail:function(){
          wx.showToast({
            title: '无法清除，请重试',
            icon: 'error',
            duration: 1000
          })
        }
      })
    }
    

  },
  lifetimes:{
    created(){
      
    },
    ready(options){
      let that = this
      wx.cloud.callFunction({
        name: 'getProduct',
        success:function(res){
        //console.log(res.result.data.length)
        that.setData({
          YPproduct:res.result.data,
        },function(){
          const query = wx.createSelectorQuery();
          query.select("#menuIndex0").boundingClientRect();
          query.selectViewport().scrollOffset();
          query.exec(function(res){
 
          that.setData({
            headerTop:parseInt(res[0].top)
          })
        })
      })
      },
        fail:function(res){
          //console.log(res)
          wx.showModal({
          title:"错误",
          content:"" + res
          })
        }
      });
    },
  },
  pageLifetimes:{
    show:function(){
      const that = this
      wx.getStorage({
        key:'ypCart',
        success:function(res){
          var totalPrice = 0
          var tempCart = []
          const matching = /YP\d+/
          console.log(that.data.YPproduct)
          for(let i in res.data){
            totalPrice += res.data[i].price * res.data[i].selectedNum
            tempCart.push({
              selectedNum:res.data[i].selectedNum,
              price:res.data[i].price,
              prodName:res.data[i].prodName,
              selectedItem:res.data[i].selectedItem,
              optionName:res.data[i].optionName
            })
          }
          that.setData({
            cartPrice:totalPrice,
            ypCart:tempCart
          },()=>console.log(that.data.ypCart))
        },
        fail:function(){
          that.setData({
            cartPrice:0
          })
        }
      })
    }
  }
})