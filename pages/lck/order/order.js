// pages/lck/order/order.js
var app = getApp();
import Request from '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
// import userInfo from '../../userInfo/userInfo.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      shopname: null,
      pcount: 0,
      essayuid: 0,
      shoppid: 0,
      shopeid: 0,
      shopid: 0,
      transpondUid: "",
      interSource: "0",
      host : app.host,
      imageHost : Host.productionHost,
      loadButton:true,
      sceneView:false,
      goods : null,
      add : null,
      headImage : '',
      interView : null,
      oid :null,
      orderArray : [],
      //真实订单信息
      realOrder : [],
      //数据加载完成
      loadDataOk : false,
      //总价
      totalPrice : 0,
      essayuid:0,
      //取地址完成
      getAdd : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
        title: '数据加载中...',
    })
    console.log(this.data.add);
    console.log("getAdd is ",this.data.getAdd);
    if(this.data.add === null) {
        console.log("开始请求地址信息。。。。");
        let url = app.host + 'Data/GetAddressByUidAndState0';
        console.log("in onLoad uid is ", app.uid);
        let data = {
            uid  : app.uid,
        }
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("res is ", res.data.address);
        let address = res.data.address;
        this.setData({
            add : address
        });    
    }
    let self = this;

    switch (options.inter) {
        case "myOrder":
            this.setData({
                interView: options.inter,
                oid: options.oid
            });
            break;
        case "wenzhang":
            console.log(options.interSource + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            this.setData({
                interView: options.inter,
                essayuid: options.essayuid,
                shoppid: options.shoppid,
                shopeid: options.shopeid,
                shopid: options.shopid,
                pcount: options.pcount,
                shopname: options.shopname
            })
            console.log(this.data.interView +"!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            break;
        case "shopCar":
            let self = this;
            wx.getStorage({
                key: 'orderArray',
                success: async function(res){
                    //获取缓存成功
                    console.log("res is ",res);
                    self.data.orderArray = res.data;
                    //隐藏数据加载中
                    wx.hideLoading();
                    self.setData({
                        orderArray : self.data.orderArray,
                        interView  : 'shopCar',
                        loadDataOk : true
                    });
                    self.computeTotalPrice();
                },
                fail: function() {
                    // fail
                },
            })
            // this.setData({
            //     orderArray: self.data.orderArray,
            //     interView: "shopCar",
            //     loadDataOk : true
            // })
            break;
    }
    console.log("options is ",options);
    switch (options.interSource) {
          case "0":

              break;
          case "1":

              break;
          case "2":
              console.log("2" + options.transpondUid);
              this.setData({
                  interSource: options.interSource,
                  transpondUid: options.transpondUid,
                  essayuid: options.essayuid
              })
              break;
    }
    app.setLoad = res => {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        loadButton: false,
        sceneView: true
      })
    }
    console.log("options is ",options);
    //从缓存中取数据
    let promise = new Promise(function(resolve,reject){
        wx.getStorage({
            key: 'orderArray',
            success: function(res){
                console.log("res is ",res);
                resolve(res);
            },
        })
    })
    promise.then(async function(res){
        wx.hideLoading();
        console.log("#########################");
        console.log("res's data is ",res.data);
        self.setData({
            orderArray  : res.data,
            loadDataOk  : true,
        })
        console.log("orderArray is ",self.data.orderArray);
        self.computeTotalPrice();
        console.log("#########################");
    });
    
  },
  computeTotalPrice : function(){
    let self = this;
    let sum = 0;
    let count = 0;
    console.log("orderArray is ",self.data.orderArray);
    for(let j = 0;j < self.data.orderArray.length;j++){
        console.log("当前的商品项是总价是：", Host.MUL(self.data.orderArray[j].price, self.data.orderArray[j].count));
        sum += Host.MUL(self.data.orderArray[j].price,self.data.orderArray[j].count);
    }
    console.log("sum is ",sum);
    console.log("count is ",count);
    sum = sum.toFixed(2);
    self.setData({
        totalPrice : sum,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (event) {
      let self = this;
      console.log("*********************");
      console.log(event);
      console.log("订单页面重新显示");
      console.log("orderArray is ",this.data.orderArray);
      let choosedAdd = wx.getStorageSync('choosedAdd');
      console.log("选择的地址是：",choosedAdd);
      if(choosedAdd){
        this.setData({
            add : choosedAdd
        })
        wx.removeStorageSync('choosedAdd');
        console.log("add is ",this.data.add);
      }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载,卸载缓存
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
  enterAddress: function(event) {
    console.log("event si ", event);
    wx.navigateTo({
        url: '../orderAddress/orderAddress',
    })
    // wx.redirectTo({
    //   url: '../orderAddress/orderAddress',
    // })
  },
  //获取商家留言
  getNote : function(event){
      console.log("给商家的留言是：",event.detail.value);
  },
  //给商家发送留言
  sendNote : function(event){
      console.log("发送前留言是：",event);
      let toSellerNote = event.detail.value;
      console.log("给商家的留言是：",toSellerNote);
  },
    //支付接口
    pay: function() {
        console.log(this.data.add);
        console.log(this.data.oid);
        var self = this;
        if (this.data.interView == "myOrder") {
            if (self.data.add == null) {
                wx.showModal({
                    showCancel: false,
                    title: '提示',
                    content: "请添加收货地址",
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
            else {
                app.ShortConnect(app.urlw + "Data/GetOrderByOid", {
                    oid: this.data.oid
                }, "pay");
            }

        } else if (this.data.interView == "shopCar") {
            if (self.data.add == null) {
                wx.showModal({
                    showCancel: false,
                    title: '提示',
                    content: "请添加收货地址",
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
          
            else {
                console.log("orderArray is ",self.data.orderArray);
                for(let i = 0;i < self.data.orderArray.length;i++){
                    let tempOrderItem = {
                        // self.data.orderAr
                        cid       : self.data.orderArray[i].cid,
                        count     : self.data.orderArray[i].count,
                        pid       : self.data.orderArray[i].pid,
                        size      : self.data.orderArray[i].size,
                        buysource : self.data.orderArray[i].source,
                        state     : self.data.orderArray[i].state,
                    }
                    self.data.realOrder.push(tempOrderItem)
                }
                console.log("realOrder is ",self.data.realOrder);
                console.log("uid is ",app.uid);
                app.ShortConnect(app.urlw + "Data/AddOrderFromCart", {
                    aid: self.data.add.aid,
                    uid: app.uid,
                    orderitems: self.data.realOrder,
                }, "pay");
            }
        } 
        else if (this.data.interView == "wenzhang") {
            console.log("wodeadasdasd");
            app.ShortConnect(app.urlw + "Data/AddShopOrder", {
                shopid: this.data.shopid,
                shoppid: this.data.shoppid,
                pcount: this.data.pcount,
                uid: app.uid,
                buysource: this.data.interSource,
                fromuid: 0,
                shopessayuid: this.data.essayuid,
                shopeid: this.data.shopeid
            }, "AddShopOrder");
        }
        else {
            console.log(app.userInfo1.familyAddress);
            var self = this;
            if (self.data.add == null) {
                wx.showModal({
                    showCancel: false,
                    title: '提示',
                    content: "请添加收货地址",
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                console.log("商品来源是：",self.data.orderArray[0].source);
                //查看商品的来源
                switch (self.data.orderArray[0].source) {
                    case 0:
                        app.ShortConnect(app.urlw + "Data/AddOrder", {
                            aid: self.data.add.aid,
                            pcount: self.data.orderArray[0].count,
                            pid: self.data.orderArray[0].pid,
                            buysource: 0,
                            uid: app.uid,
                            fromuid: 0,
                            essayuid: this.data.essayuid,
                            standard: self.data.orderArray[0].size
                        }, "pay");
                        break;
                    case 1:
                        app.ShortConnect(app.urlw + "Data/AddOrder", {
                            aid: self.data.add.aid,
                            pcount: self.data.orderArray[0].count,
                            pid: self.data.orderArray[0].pid,
                            buysource: 1,
                            uid: app.uid,
                            fromuid: 0,
                            essayuid: this.data.essayuid,
                            standard: self.data.orderArray[0].size
                        }, "pay");
                        break;
                    case 2:
                        console.log(this.data.interSource);
                        app.ShortConnect(app.urlw + "Data/AddOrder", {
                            aid: self.data.add.aid,
                            pcount: self.data.goods.count,
                            pid: self.data.goods.pid,
                            buysource: 2,
                            uid: app.uid,
                            essayuid: this.data.essayuid,
                            fromuid: this.data.transpondUid,
                            standard: {
                                "颜色": "颜色1",
                                "体重": "体重1"
                            }
                        }, "pay");
                        break;
                }

            }
        }
    }
})