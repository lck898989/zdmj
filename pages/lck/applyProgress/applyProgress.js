// pages/lck/applyProgress/applyProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      testGoods : {
          pname : '七匹狼裤子',
          price : 152,
          count : 1,
          headImg : '/upload/head/154158366967739.jpeg'
      },
      //正在经办的字体颜色
      onDeal : 'color:#404040',
      dealed : 'color:#9a9a9a',
      applyRouter : [
          {
              id:0,
              text : '接受申请',
              time : '2018-12-15 12:25:25',
              name : 'lll'
          },
          {
              id:1,
              text : '开始接受申请',
              time : '2018-12-14 12:25:25',
              name : 'lll'
          },
          {
              id:1,
              text : '开始接受申请',
              time : '2018-12-14 12:25:25',
              name : '系统'
          },
      ],
      serverpageInfo : {
          '服务类型':'换货',
          '申请原因':'质量问题',
          '商品退回':'快递至第三方卖家',
          '联系人'  :'lck',
          '联系电话':'18522463796',
          '收货地址': '上海市徐汇区滨江大道'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //删除申请
  deleteApply :function(event){
      
  }
})