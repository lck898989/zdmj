// pages/zcw/qianbao/tixian/tixian.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    threeJson: {},
    fiveJson: {},
    oneHundredJson: {},
    moneyColor: "red",
    //默认当前钱数的index
    indexs: 0,
    //金额数组
    moneyArray: [5, 10, 20, 50, 100],
    //初始化提现金钱
    loadMoney: "1",
    //初始化我的钱包余额
    myMoney: 0,
    money: null,
    xianzhong: 0,
    arraytu: {
      dh_dh: app.imageUrl + 'img_mine_BG.png', //最上方导航
      dh_qb: app.imageUrl + 'qiaobao_pic.png',
      xz_dj: app.imageUrl + "icon_selected_1.png",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.inter == "tixian") {
      var self = this;
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
    } else {


    }
    this.setData({
      money: parseFloat(options.money)
    })
    // this.setData({
    //   money:100
    // })
    this.changeState();
    

    console.log(JSON.stringify(this.data.threeJson));
    console.log(JSON.stringify(this.data.fiveJson));
    console.log(JSON.stringify(this.data.oneHundredJson));
  },
  //改版选择框初始状态
  changeState:function(){
    if (this.data.money>=30)
    {
      this.data.threeJson.isChoosed = true;
  
      this.data.threeJson.color="zi";
      if (this.data.money>=50)
      {
        if (this.data.money>=100)
        {
          this.data.fiveJson.isChoosed = true;
          this.data.oneHundredJson.isChoosed = true;
          this.data.fiveJson.color = "gray";
          this.data.oneHundredJson.color = "gray";
        }
        else
        {
          this.data.fiveJson.isChoosed = true;
          this.data.oneHundredJson.isChoosed = false;
          this.data.fiveJson.color = "gray";
          this.data.oneHundredJson.color = "red";
        }
      }
      else
      {
       
        this.data.fiveJson.isChoosed = false;
        this.data.oneHundredJson.isChoosed = false;
        this.data.fiveJson.color = "red";
        this.data.oneHundredJson.color = "red";
      }
    }
    else
    {
      this.setData({
        xianzhong: -1
      })
      this.data.threeJson.color = 'red';
      this.data.fiveJson.color = 'red';
      this.data.oneHundredJson.color = 'red';
      this.data.threeJson.isChoosed=false;
      this.data.fiveJson.isChoosed = false;
      this.data.oneHundredJson.isChoosed = false;
    }
    this.setData({
      threeJson: this.data.threeJson,
      fiveJson: this.data.fiveJson,
      oneHundredJson: this.data.oneHundredJson,
    })
  },
  pressSure: function() {
    console.log();
    if (parseInt(this.data.loadMoney) <= this.data.money) {
      wx.navigateTo({
        url: '../../../Advertisting/Advertisting?money=' + this.data.loadMoney,
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
  //判断选择的是多少钱
  xuanz(e) {
    switch (e.currentTarget.id) {
      case "0":
        if (this.data.threeJson.isChoosed)
        {
          if(this.data.fiveJson.color=="zi")
          {
            this.data.fiveJson.color = "gray";
          }
          if (this.data.oneHundredJson.color == "zi") {
            this.data.oneHundredJson.color = "gray";
          }
          this.data.threeJson.color='zi';
          this.setData({
            loadMoney: "30",
            xianzhong: parseInt(e.currentTarget.id),
          
          })
        }
        else
        {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: "钱包余额不足",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          
        }
        break;
      case "1":
        if (this.data.fiveJson.isChoosed)
        {
          if (this.data.threeJson.color == "zi") {
            this.data.threeJson.color = "gray";
          }
          if (this.data.oneHundredJson.color == "zi") {
            this.data.oneHundredJson.color = "gray";
          }
          this.data.fiveJson.color='zi';

          this.setData({
            loadMoney: "50",
            xianzhong: parseInt(e.currentTarget.id),
       
          })
        }
        else
        {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: "钱包余额不足",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
       
        break;
      case "2":
        if (this.data.oneHundredJson.isChoosed)
        {
          if (this.data.threeJson.color == "zi") {
            this.data.threeJson.color = "gray";
          }
          if (this.data.fiveJson.color == "zi") {
            this.data.fiveJson.color = "gray";
          }
          this.data.oneHundredJson.color='zi';
          this.setData({
            loadMoney: "100",
            xianzhong: parseInt(e.currentTarget.id),
     
          })

        }
        else
        {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: "钱包余额不足",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        break;
    }
    this.setData({
      threeJson: this.data.threeJson,
      fiveJson: this.data.fiveJson,
      oneHundredJson: this.data.oneHundredJson
    })
    console.log(e.currentTarget.id);
   
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