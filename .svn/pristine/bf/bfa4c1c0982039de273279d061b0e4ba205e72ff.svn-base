// pages/MingXi/MingXi.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arrayTixian:[],
      arrayType: ["提现记录","文章收益", "分享收益", "好友分享","好友文章"],
      nullMsg:true,
      hasMsg:false,
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   app.ShortConnect("http://192.168.1.49:3150/Data/AddAgency", {
    //       parent: this.data.shareParentUid,
    //       child: app.uid
    //   }, "agree");
      app.setmingxiFalse = res => {
          this.setData({
              nullMsg: false,
              hasMsg: true,
          })
      }
      this.setData({
          arrayTixian: app.arrayTixian
      })
      console.log(this.data.arrayTixian);

      
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
  //点击提现
  pressTixian: function (event){
      console.log( event.currentTarget.dataset.money);
      console.log(event.currentTarget.dataset.money);
      console.log( event.currentTarget.dataset.money);
      console.log( event.currentTarget.dataset.money);
     
    //   wx.navigateTo({
    //       url: '../TixianMingxi/TixianMingxi?money=' + event.currentTarget.dataset.money.toString() + "&success=" + event.currentTarget.dataset.success.toString() + "&time=" + event.currentTarget.dataset.time.toString() + "&number=" + event.currentTarget.dataset.number.toString(),
    //   })

      wx.navigateTo({
          url: '../TixianMingxi/TixianMingxi?money=' + event.currentTarget.dataset.money.toString() + "&success=1" + "&time=" + event.currentTarget.dataset.time.toString()+ "&number=" + event.currentTarget.dataset.number.toString(),
      })

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