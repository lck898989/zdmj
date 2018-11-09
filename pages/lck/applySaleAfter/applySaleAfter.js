// pages/lck/applySaleAfter/applySaleAfter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //退换货的商品
      goods: {
        headImg: '../../resources/example.jpg',
        pname: '商品商品商品商品商品商品商品商品商品商品',
        size: {
            size: 'M',
            color: 'red'
        },
        count: 2,
        price: 800,
      },
      textA : `font-size:30rpx;padding:28rpx 18rpx;color:#bdbdbd;`,
      //问题描述
      questionDescription : '',
      //缩略图数组
      screenshotArray : [],
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
  //联系客服
  contactServer : function(e){
      console.log("e is ",e);
      console.log("联系客服");
      console.log("e.path is ",e.path);
      console.log("e.path is ",e.query);
  },
  //多行输入框输入响应
  textAreaInput : function(e){
      let inputString = e.detail.value;
      console.log("inputString is ",inputString);
      this.setData({
          questionDescription : inputString
      })
  },
  //上传相册图片到微信小程序
  uploadImage : function(e){
      let self = this;
      console.log("e is ",e);
      wx.chooseImage({
          count : 6,
          sourceType : 'album',
          success : function(res){
              console.log("tempFilePaths is ",res.tempFilePaths);
              console.log("tempFiles is ",res.tempFiles);
              let screenShotLen = res.tempFiles.length;
              for(let i = 0;i < screenShotLen;i++){
                  self.data.screenshotArray.push(res.tempFiles[i].path);
              }
              console.log("缩略图数组是：",self.data.screenshotArray);
              //压缩完图片之后进行显示
              self.setData({
                  screenshotArray : self.data.screenshotArray
              })
          }
      });
  }
})