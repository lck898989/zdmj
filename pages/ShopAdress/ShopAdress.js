// pages/ShopAdress/ShopAdress.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopJSON:{},
      shopAdressArray:[],
      orderJSON:{},
      url:""

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          shopJSON: app.shopJSON,
          shopAdressArray: app.shopJSON.data,
          orderJSON: app.orderMsg,
          url: app.urlw3
      })
      console.log(this.data.shopAdressArray);
    //   app.ShortConnect(app.urlw +"Data/InquireLogisticsByNumber",{
    //       phy_number: this.data.shopAdressArray[1].phy_number
    //   },"getShopDi");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})