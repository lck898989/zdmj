// pages/zcw/friends/friends.js
import Const from '../../../utils/Const.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyBoxHidden:true,
    hide:false,
    srcp: app.imageUrl + 'img_myfriend_BG.png',
      //头像数组
      friend: [
         
      ],
      imageHost : 'https://shopfile.ykplay.com/resources/ico_Lv'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hide: this.data.friend.length==0?false:true,
    })
  },
  addAdd1:function(){
      wx.navigateTo({
          url: '../myfriends/myfriends',
      })
  },
    addAdd:function(){
        this.setData({
            buyBoxHidden:false
        })
        
    },
    pressNull:function(){
        this.setData({
            buyBoxHidden: true
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