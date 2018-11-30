// pages/IntroductionRebate/IntroductionRebate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imageUrl:"",
    isPull: false,
    //热门商品数组
    hotShop: [],
    url: "http://shop.ykplay.com",
    //存储页面分享这的openid
    shareParentUid: "",
    shareHidden: true,
    rebate: true,
    //判断数据是否触底
    iscollisionBottom: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  pressBuy: function(event) {
    var shopmsg1 = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.shopmsg));
    console.log(typeof event.currentTarget.dataset.shopmsg);
    wx.navigateTo({
      url: '../lck/cartGoodsDetail/cartGoodsDetail?interSource=0&inter=0' + "&goods=" + shopmsg1,
    })

  },
  onLoad: function(options) {
    this.setData({
        imageUrl: app.imageUrl
    })
 
    for (var i = 0; i <= app.hotShop.length-1;i++)
    {
      app.hotShop[i].head = app.hotShop[i].head.split(",");
    }
    console.log(JSON.stringify(app.hotShop));
    this.setData({
      hotShop: app.hotShop
    })

      app.setHotArray = res => {
          var orderArray1 = this.data.hotShop;
          for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
            res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
              orderArray1.push(res.data.hotProducts[i]);
          }
          this.setData({
              hotShop: orderArray1,
              isPull: false
          })
          wx.hideLoading();
      }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(app.rumenPage);
    if (this.data.isPull == false && app.rumenPage < app.orderPage) {
      app.rumenPage += 1;
      this.setData({
        isPull: true
      })
      wx.showLoading({
        title: '加载中',
      });
      app.ShortConnect(app.urlw + "Data/GetHotProducts", {
        page: app.rumenPage
      }, "loadRemen");
    } else {
      wx.showToast({
        title: '已经到底了',
      })
      this.setData({
        iscollisionBottom: true
      })
    }
  },
  interShopView:function(){
    wx.switchTab({
      url:"../lck/hotShopping/hotShopping"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})