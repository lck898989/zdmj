// pages/Advertisting/Advertisting.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //url地址
      url: ""
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
      console.log("??????????????");
      wx.showLoading({
          title: '提现中',
      })
      var a = escape('https://pay.ykplay.com/wechat/getOpenId?from=zhidianmijin&openid=' + app.serverOpenid);
      console.log(a);
      this.setData({
          url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd53d8ea8fc7e67cb&redirect_uri=" + a + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
      })
    //    this.setData({
    //        url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd53d8ea8fc7e67cb&redirect_uri=https%3a%2f%2fpay.ykplay.com%2fwechat%2fgetOpenId%3ffrom%3dzhidianmijin%26openid%3db05NZ2Y1WGR1VkRjZzZPVy15c2IwVTFNUGdtdw%3d%3d&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
    //   })
      console.log(app.serverOpenid);
    //   wx.request({
    //       url: "https://pay.ykplay.com/wechat/getOpenidVerify?from=zhidianmijin&openid=" + app.serverOpenid,

    //       header: {
    //           'content-type': 'application/json' // 默认值
    //       },
    //       method: "GET",
    //       success: function (res) {
    //           console.log(res);       
    //       }
    //   })

    //   wx.navigateBack({
    //       delta: 1
    //   })
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