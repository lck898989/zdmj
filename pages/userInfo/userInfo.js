      // pages/userInfo/userInfo.js
     var app = getApp()
     Page({

         /**
          * 页面的初始数据
          */
         data: {
             //初始化钱包
             money:0,
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
             shopNumber:0,
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
             //  app.ShortConnect("http://192.168.1.121:3150/API", {
             //      "query":`{
             //          products(page: 1) {
             //              pid
             //              pname
             //              price
             //              unit
             //              size
             //              info
             //              counts
             //              sales
             //              tname
             //              t2name
             //              image
             //              head
             //              sname
             //              rebate
             //          }
             //      }`
             // }, "wechatpay");
             // console.log();

             // app.shortConnect1();

             // app.ShortConnect("http://pay.ykplay.com/wechat/pay", {
             // }, "wechatpay");
             // console.log();
             // app.ShortConnect("http://pay.ykplay.com/miniWx/miniPay", {
             //     orderNumber:1111,
             //     appid: app.appid,
             //     mch_id: app.payPhone,
             //     body :"ceshi",
             //     total_fee :1000,
             //     wxMsg: "3c174b4992442fe02adc19889b0acc48c1ee2d4e9558ddf2311d440bb752e3e4fd269eedd3c184b34c52a3a64aedcb6b3e03bc7b28a114d207c5abe9bc9cb8f2e38b121502ae23ce7486eba5f112afe0bd7dbed79f1edfa75b503aac6191f9f8eee7cc6aa68d072bbdda7dd75cb16a54486169e023a52fc2bac0d5920934f449993fe0aa9af00c9b1f838e317b1d8b7d814cf5df4e91fc441f5d44d8122f72b2e71277bc20fadc7bf6ef47598e7d8191d6833ea9e4463e24a844738532a7ba1d74840ae7033a49fe902f92ac8e9cd9d3f0296645997dec98ec136ecdd855973992362cab564fcdd700b9bbd352e46586be23023003139ee8563f8fa225a681bbe117018b3dfa3a3afd74a4b7d5840e93fb41f93d3104667504835161155c74f8d3fd1fb1b009ef9e9449b6f7f31b1ec9c2d7510c91666ad7df498bfb2e6a170ff27125265f60362dbd805626e3cec1715de6f8ba18a592d43b389abca41dd7c6f9f07f876ed6679796762ee5f9dcb2ee9cb30cb925cc08c4c62c37d00534f88150c5837b8a2f648aa753b21fa124598c5f30652de9d8637555d20fbecd5bd753840bc7b02fff83fdbe6a21607f7fd0d67cb0355263ff9bd85eddda5f1f6a7c1897dcea4d3f2675fcf70b86cc3ddb20611506ac7a49813c59d94100d5e48e37e9",
             //     attach:"指点迷津"
             // }, "wechatpay");
             // app.ShortConnect("http://192.168.1.187:10086/wxpay/WXPay", {
             //     body: "ceshi",
             //     total_fee: "80",
             // }, "wechatpay");
         },
         turnShare: function() {
             wx.navigateTo({
                 url: '../myshop/myshop',
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
                 interval6: setInterval(function() {
                     app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                         uid: app.uid
                     }, "GetAllMessage");
                 }, 1000),
             })
             // self.interval6 = setInterval(function () {
             //     app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
             //         uid: app.uid
             //     }, "GetAllMessage");
             // }, 1000);
         },
         aa:function(){
             
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
         //点击我的二维码
         MtCode: function() {
             //   app.ShortConnect(app.url +"/users/GetUserQrCode",{
             //       username: app.openid
             //   },"mycode");
             //   wx.reLaunch({
             //       url: '../MyCode/MyCode'
             //   })
         },
         //点击联系客服
         PersonTalk: function() {
             app.ShortConnect(app.url + "/users/GetQrCode", {}, "persontalk");
             wx.navigateTo({
                 url: '../Person/Person'
             })
         },
         /**
          * 生命周期函数--监听页面加载
          */
         onLoad: function(options) {
             app.setUserInfo11 = res => {
                 this.setData({
                     money:res.data.user.wallet,
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
             app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                 uid: app.uid,
                 page: app.orderLoadPage
             }, "interorder");


             // wx.navigateTo({
             //     url: '../MyOrder/MyOrder',
             // })
         },
         PressMyShop: function() {
             wx.navigateTo({
                 url: '../lck/cart/cart',
             })
             // app.orderLoadPage=1;
             // app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
             //     uid: app.uid,
             //     page: app.orderLoadPage
             // }, "myorder");
             // wx.navigateTo({
             //     url: '../MyOrder/MyOrder',
             // })
         },
         /**
          * 生命周期函数--监听页面初次渲染完成
          */
         onReady: function() {},

         /**
          * 生命周期函数--监听页面显示
          */
         onShow: function() {
             app.ShortConnect(app.urlw+"Data/GetPersonCenter",{
                 uid:app.uid

             },"getuserInfo");
             // this.GetMessageMess();

         },

         /**
          * 生命周期函数--监听页面隐藏
          */
         onHide: function() {
             // clearInterval(this.data.interval6);

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