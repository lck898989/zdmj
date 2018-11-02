// pages/lck/order/order.js
var app=getApp();
import Request from '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
// import userInfo from '../../userInfo/userInfo.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      transpondUid: "",
      interSource: "0",
      host : app.host,
      imageHost : Host.productionHost,
      loadButton:true,
      sceneView:false,
      goods : null,
      add : null,
      headImage : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
        title: '数据加载中...',
    })
    let self = this;
    switch (options.interSource) {
            case "0":

                break;
            case "1":

                break;
            case "2":
                this.setData({
                    interSource: options.interSource,
                    transpondUid: options.transpondUid
                })
                break;
    }
    app.setLoad = res => {
          wx.showLoading({
              title: '加载中',
          })
          this.setData({
              loadButton: false,
              sceneView:true
          })
      }
    
    //从缓存中取数据
    let promise = new Promise(function(resolve,reject){
        wx.getStorage({
            key: 'buyGoodsItem',
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
        let headArr = res.data.head.split(',');
        console.log("headArr is ",headArr);
        self.data.headImage = headArr[0];
        self.setData({
            goods : res.data,
            headImage :self.data.headImage
        })
        if (self.data.add === null) {
            let url = app.host + 'Data/getAddressByUid';
            let data = {
                uid: app.uid || 1
            }
            let req = new Request(url, data, "POST", 'text');
            let res = await req.sendRequest();
            console.log("res is ", res.data.address);
            let addressArr = res.data.address;
            if (addressArr !== null) {
                let len = addressArr.length;
                for (let i = 0; i < len; i++) {
                    console.log("地址项是： ", addressArr[i]);
                    if (addressArr[i].state === 0) {
                        console.log("找到默认地址： ", addressArr[i]);
                        //将该地址取出来显示
                        self.setData({
                            add: addressArr[i]
                        });
                        app.userInfo1.familyAddress = self.data.add;
                        console.log("add is ", self.data.add);
                    }
                }
            }
        }    
        console.log("#########################");
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
  onShow: function (event) {
      console.log("*********************");
      console.log("goods is ",this.data.goods);
      console.log(event);
      console.log("订单页面重新显示");
      let choosedAdd = wx.getStorageSync('choosedAdd');
      console.log("选择的地址是：",choosedAdd);
      this.setData({
          add : choosedAdd
      })
      let pageStack = getCurrentPages();
      console.log("pageStack is ",pageStack);
      console.log("**********************");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载,卸载缓存
   */
  onUnload: function () {
    //   wx.removeStorage({
    //       key: 'buyGoodsItem',
    //       success: function(res) {

    //       },
    //   })

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
  enterAddress : function(event){
      console.log("event si ",event);
      wx.redirectTo({
          url: '../orderAddress/orderAddress',
      })
  },
  //支付接口
  pay : function(){
        var self = this;
        console.log("aid is ",self.data.add.aid)
        if (self.data.add.aid == null) {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: "请添加收货地址",
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            console.log(self.data.goods.pid);
            console.log("发送数据的size is ",self.data.goods.size);
            switch (this.data.interSource) {
                case "0":
                    app.ShortConnect(app.urlw + "Data/AddOrder", {
                        aid: self.data.add.aid,
                        pcount:self.data.goods.count,
                        pid: self.data.goods.pid,
                        buysource: self.data.interSource,
                        uid: 1,
                        fromuid: 0,
                        //规格数据
                        standard: self.data.goods.size
                    }, "pay");
                    break;
                case "1":
                

                    break;
                case "2":
                    break;
            }

        }
  }
})