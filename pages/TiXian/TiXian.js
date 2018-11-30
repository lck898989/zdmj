// pages/TiXian/TiXian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyColor: "red",
    //默认当前钱数的index
    indexs: 0,
    //金额数组
    moneyArray: [5, 10, 20, 50, 100],
    //初始化提现金钱
    loadMoney: "5",
    //初始化我的钱包余额
    myMoney: 0,
    money: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.inter == "tixian") {
        var self=this;
        this.setData({
            money: parseFloat(options.money)
        })
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: options.msg,
        success: function(res) {
          if (res.confirm) {
              wx.navigateTo({
                  url: '../MyMoney/MyMoney?money=' + self.data.money.toString(),
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else
    {
       
    }
    this.setData({

        money: parseFloat(options.money)
    })
   
    console.log(this.data.money);
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
  tixian: function() {
      console.log(this.data.loadMoney);
    if (parseInt(this.data.loadMoney) <= this.data.money) {
      wx.navigateTo({
        url: '../Advertisting/Advertisting?money=' + this.data.loadMoney,
      })
    } else {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: "钱包余额不足",
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
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
  chooseMoney: function(event) {

    switch (event.currentTarget.id) {
      case "0":
        this.setData({
          loadMoney: "1",
          indexs: parseInt(event.currentTarget.id)
        })

        break;
      case "1":
        this.setData({
          loadMoney: "10",
          indexs: parseInt(event.currentTarget.id)
        })
        break;
      case "2":
        this.setData({
          loadMoney: "20",
          indexs: parseInt(event.currentTarget.id)
        })
        break;
      case "3":
        this.setData({
          loadMoney: "50",
          indexs: parseInt(event.currentTarget.id)
        })
        break;
      case "4":
        this.setData({
          loadMoney: "100",
          indexs: parseInt(event.currentTarget.id)
        })
        break;
    }
    console.log(event.currentTarget.id);
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