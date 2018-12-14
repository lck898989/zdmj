// pages/zcw/qianbao/qbsy.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:null,
    arraytu: {
      dh_dh: app.imageUrl + 'img_mine_BG.png',//最上方导航
      dh_qb: app.imageUrl + 'qiaobao_pic.png',
    },
    userInfo: {},
    //在我的中滚动视图中的子物体  scr 为图片地址需要填写   bindtype为此图片的点击事件的方法名称
    gundongpic: [
      { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
      { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
      { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
      { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
    ]
  },


  //提现按钮调用的方法
  wytx(){
     wx.navigateTo({
         url: 'tixian/tixian?money='+this.data.money,
     })
  },

  //明细按钮调用的方法
  cxmx() {
      app.MingXiaRRAY=null;
      app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
          uid: app.uid,
         
          page: 1
      }, "GetAllMessage2");
      wx.navigateTo({
          url: 'mingxi/mingxi?money=' + this.data.money,
      })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          money: options.money
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

  }
})