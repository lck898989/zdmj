// pages/lck/order/order.js
import Request from '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        //请求所有收货地址的数据
        let url = Host.host + 'Data/getAddressByUid';
        let data = {
            uid: 1
        }
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("res is ", res.data.address);
        let addressArr = res.data.address;
        let len = addressArr.length;
        for(let i = 0;i < len;i++){
            if(addressArr[i].state === 0){
                //将该地址取出来显示
                this.setData({
                    add : addressArr[i]
                });
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

  }
})