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
      loadButton:true,
      sceneView:false,
      goods : {
          uid: 1,
          pid: 12,
          size: {
              size : 'M',
              color : '骚粉'
          },
          count: 1,
          source: 0,
      },
      add : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      app.setLoad = res => {
          wx.showLoading({
              title: '加载中',
          })
          this.setData({
              loadButton: false,
              sceneView:true
          })
      }
    console.log("options is ",options);
    console.log("options's add is ",options.add);
    if(options.goods !== undefined){
        let goodsObj = JSON.parse(options.goods);
        this.setData({
            goods : goodsObj
        })
    }
    if(options.add !== undefined){
        let addObj = JSON.parse(options.add);
        this.setData({
            add : addObj
        })
    }else{
        console.log(app.uid);
        //请求所有收货地址的数据
        let url = Host.host + 'Data/getAddressByUid';
        let data = {
            uid: app.uid
        }
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("res is ", res.data.address);
        let addressArr = res.data.address;
        if(addressArr !== null){
            let len = addressArr.length;
            for(let i = 0;i < len;i++){
                if(addressArr[i].state === 0){
                    //将该地址取出来显示
                    this.setData({
                        add : addressArr[i]
                    });
                    app.userInfo1.familyAddress = addressArr[i];
                    console.log(app.userInfo1.familyAddress );
                }
            }
        }
    }
    // if(options)
    // let tempData = JSON.parse(options);
    // console.log("tempData is ",tempData);
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
      console.log(event);
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
  enterAddress : function(event){
      console.log("event si ",event);
      wx.navigateTo({
          url: '../orderAddress/orderAddress',
      })
  },
  //支付接口
  pay : function(){
      console.log("444");
      console.log(app.userInfo1.familyAddress);
      var self=this;
      if (app.userInfo1.familyAddress.aid == null)
      {
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
      else
      {
          app.ShortConnect("http://192.168.1.192:3150/Data/AddOrder",{
              aid: app.userInfo1.familyAddress.aid,
              pcount: self.data.goods.count,
              pid: self.data.goods.pid,
              buysource:1,
              uid: app.uid ,
          },"pay");
      }
  }
})