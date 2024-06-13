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
    ypCart:[],
    isPopupVisible: false,
    cartFresh:true
  },

  methods:{
    onChangeStepper(e){
      //console.log(e.detail.value)
      const operatedItem = e.target.dataset.operatedItem
      const currentIndex =  e.target.dataset.currentIndex
      const that = this
      wx.getStorage({
        key: "ypCart",
        success:function(res){
          if(e.detail.value == 0){
            delete res.data[operatedItem.itemKey]
          }
          else{
            res.data[operatedItem.itemKey].selectedNum = e.detail.value
          }
          that.setData({
            cartPrice:that.data.cartPrice + (e.detail.value - operatedItem.selectedNum) * operatedItem.price,
            ["ypCart["+currentIndex+"].selectedNum"]: e.detail.value
          })
          console.log(that.data.ypCart)
          //that.setData({cartFresh:false},()=>{that.setData({cartFresh:true})})
          wx.setStorage({
            key:"ypCart",
            data:res.data
          })
        },
        fail:function(res){
          wx.showToast({
            title: '操作失败',
            icon: "error",
            duration: 15000
          })
        }
      })
    },
    showPopup: function() {
      this.setData({
        isPopupVisible: true
      });
    },
  
    closePopup: function() {
      this.setData({
        isPopupVisible: false
      });
    },
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
      if(this.data.cartPrice < 5){
        wx.showToast({
          title: '最低消费额5分',
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
          for(let i in res.data){
            totalPrice += res.data[i].price * res.data[i].selectedNum
            tempCart.push({
              itemKey:i,
              selectedNum:res.data[i].selectedNum,
              price:res.data[i].price,
              prodName:res.data[i].prodName,
              selectedItem:res.data[i].selectedItem,
              optionName:res.data[i].optionName,
              thumbnailUrl:res.data[i].thumbnailUrl
            })
          }
          that.setData({
            cartPrice:totalPrice,
            ypCart:tempCart
          },()=>{console.log(that.data.ypCart)
            that.setData({cartFresh:false},()=>{that.setData({cartFresh:true})})})
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