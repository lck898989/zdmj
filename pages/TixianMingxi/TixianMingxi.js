// pages/TixianMingxi/TixianMingxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money1: null,
    success: null,
    time: null,
    number: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log(parseInt(options.money));
      console.log(parseInt(options.success));
      console.log(parseInt(options.time));
      console.log(parseInt(options.number));
    this.setData({
      money1: parseFloat(options.money),
      success: parseInt(options.success),
      time: options.time,
      number: parseInt(options.number),
    })
    // console.log(this.data.money1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   *
  onShow: function() {
      console.log("333");

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})