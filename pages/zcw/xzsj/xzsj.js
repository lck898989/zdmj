// pages/zcw/xzsj/xzsj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chu:false,
    chu2:false,
    kaishishijian:'开始时间',
    jieshushijian: '结束时间',
    shuzi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mk=[]
    for(var i = 0;i<20;i++){
      mk.push(i+2018)
    }
    this.setData({
      shuzi:mk,
    })
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

  },


  dianjisj1(){
    this.setData({
      chu:true,
      chu2:false,
    })
  },
  dianjisj2() {
    this.setData({
      chu: false,
      chu2: true,
    })
  },
})