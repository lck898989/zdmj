      // pages/userInfo/userInfo.js
      var app = getApp()
      Page({

          /**
           * 页面的初始数据
           */
          data: {
              //初始化钱包
              money: 0,
              userInfo: {},
              //初始化信息总数
              messageAllNumber: 0,
              //初始化计时器对象
              interval6: null,
              //用户地址aid
              aid: null,
              //获取信息数组
              messageArray: [],
              username: "",
              //初始化购物车商品数量
              shopNumber: 0,
          },
          onPullDownRefresh: function() {
              // Do something when pull down.
          },
          //微信支付
          WechatPay: function() {
              //wudashen 所有订单
              app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                  "page": 1,
                  "uid": 0,
              }, "wechatpay");
          },
          turnShare: function() {
              wx.navigateTo({
                  url: '../myshop/myshop',
              })
          },
          tiaot: function() {
            // wx.navigateTo({
            //     url: '../ShopActicle/ShopActicle',
            // })
            //   "pages/SreachResult/SreachResult"
            //   wx.navigateTo({
            //       url: '../SreachResult/SreachResult',
            //   })
              app.nearsreachArray =null;
              app.hotsreachArray = null;
              app.goodShop = null;
              app.ShortConnect(app.urlw+"Data/GetSearch",{
                  uid:app.uid,
              },"InterSreach");
              app.ShortConnect(app.urlw + "Data/GetRecommendProduct", {
                 page:1,
              }, "InterSreach1");
               wx.navigateTo({
                   url: '../search/search',
               })
          },
          //点击消息通知
          PressMessageMess: function() {
              wx.navigateTo({
                  url: '../Message/Message?msg=' + this.data.messageArray
              })
          },
          //获取消息通知
          GetMessageMess: function() {
              this.setData({
                  interval6: setInterval(function()  {
                      app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                          uid: app.uid
                      }, "GetAllMessage");
                  }, 1000),
              })
          },
          //点击我的钱包
          MyMoney: function() {
              wx.navigateTo({
                  url: '../MyMoney/MyMoney?money=' + this.data.money
              })
          },
          //点击我的优惠券
          PressMy: function() {
              wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: "暂无优惠劵",
                  success: function(res) {
                      if (res.confirm) {
                          console.log('用户点击确定')
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                      }
                  }
              })
          },
          //点击收货地址
          PressPosition: function() {
              wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: "此功能暂未开放",
                  success: function(res) {
                      if (res.confirm) {
                          console.log('用户点击确定')
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                      }
                  }
              })
          },

          /**
           * 生命周期函数--监听页面加载
           */
          onLoad: function(options) {
              app.setUserInfo11 = res => {
                  this.setData({
                      money: res.data.user.wallet,
                      shopNumber: res.data.cartCounts
                  })
              }
              app.setMessageNumber = res => {
                  this.setData({
                      messageAllNumber: res.data.counts,
                      messageArray: res.data.informs,
                  })
              }
              this.setData({
                  userInfo: app.userInfo
              })
              console.log(this.data.userInfo);
              // this.setData({
              //     userInfo: app.userInfo.familyAddress.
              // })
          },
          //进入订单管理界面  
          orderButton: function() {
              app.orderLoadPage = 1;
              console.log(app.orderLoadPage);
              app.orderIndexType = 0;
              app.myorderArray = null;
              app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                  uid: app.uid,
                  page: app.orderLoadPage
              }, "interorder1");
              wx.navigateTo({
                  url: '../MyOrder/MyOrder',
              })
          },
          PressMyShop: function() {
              wx.navigateTo({
                  url: '../lck/cart/cart',
              })
          },
          /**
           * 生命周期函数--监听页面初次渲染完成
           */
          onReady: function() {},

          /**
           * 生命周期函数--监听页面显示
           */
          onShow: function() {
              app.ShortConnect(app.urlw + "Data/GetPersonCenter", {
                  uid: app.uid
              }, "getuserInfo");
              app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
                  uid: app.uid
              }, "");
              // this.GetMessageMess();
          },
          shouhou: function() {
              wx.navigateTo({
                  url: '../lck/saleService/saleService',
              })
          },
          /**
           * 生命周期函数--监听页面隐藏
           */
          onHide: function() {},

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