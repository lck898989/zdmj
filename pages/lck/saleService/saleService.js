// pages/lck/saleService/saleService.js
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
import Request from '../../../utils/Request.js'
import Const from '../../../utils/Const.js'
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      saleHeadText : [
        {
          text    : '售后申请',
          choosed : true
        },
        {
          text    : '正在申请',
          choosed : false
        },
        {
          text    : '申请记录',
          choosed : false
        },
      ],
      headText :`font-size: 30rpx;
        color: #383838;
        padding: 30rpx 0rpx;`,
      redText  : `font-size: 30rpx;
        color : #b31227;
        padding: 30rpx 0rpx;
        border-bottom:2rpx solid #b31227;`,
      saleOrderArray : [],
      host : app.host,
      productList : [],
      //服务器发来的原始数据
      sourceData : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      //请求服务器数据
      this.getSaleAfterList();
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
      console.log("uid is ",app.uid);
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
  chooseTitle : async function(e){
    console.log("e is ",e);
    let dataSet = e.currentTarget.dataset;
    let text = dataSet.text;
    console.log("text is ",text);
    let len = this.data.saleHeadText.length;
    for(let i = 0;i < len;i++){
      console.log("是否找到了？",this.data.saleHeadText[i].text === text);
      if(this.data.saleHeadText[i].text === text){
        console.log("找到了");
        //设置它的选中状态为false
        this.data.saleHeadText[i].choosed = true;
      }else{
        this.data.saleHeadText[i].choosed = false;
      }
    }
    this.setData({
      saleHeadText : this.data.saleHeadText,
      saleOrderArray : []
    })
    console.log("saleHeadText is ",this.data.saleHeadText);
    //向服务器请求信息
    switch(text){
        case '售后申请':
            this.getSaleAfterList();
            break;
        case '正在申请':
            this.getApplyingList();
            break;
        case '申请记录':
            this.getApplyRecord();
            break;
    }
  },
    //获取售后列表
    getSaleAfterList: async function () {
        let url = this.data.host + 'Data/GetAfterSale';
        console.log("host is ", this.data.host);
        console.log("uid is ", app.uid);
        let data = {
            uid: app.uid,
            page: 1
        }
        if (data.uid !== null) {
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();
            console.log(res);
            console.log("时间是：", res.data.orders);
            if (res.data.encode === 0) {
                let orders = res.data.orders;
                this.setData({
                    sourceData: orders
                })
                for (let i = 0; i < orders.length; i++) {
                    let time = Const.formatDate(orders[i].ordertime);
                    let orderItemsLen = orders[i].orderItems.length;
                    let saleOrderView = {
                        ordertime: time,
                        onumber: res.data.orders[i].onumber,
                    }
                    let products = [];
                    //遍历订单项
                    for (let j = 0; j < orderItemsLen; j++) {
                        let headImg = orders[i].orderItems[j].product.head.split(',')[0];
                        let count = orders[i].orderItems[j].pcount;
                        let pname = orders[i].orderItems[j].product.pname;
                        let price = orders[i].orderItems[j].product.price;
                        let oitemid = orders[i].orderItems[j].oitemid;
                        let oid = orders[i].orderItems[j].oid;
                        let product = {
                            headImg: headImg,
                            count: count,
                            pname: pname,
                            price: price,
                            oitemid: oitemid,
                            oid: oid
                        }
                        products.push(product);
                    }
                    saleOrderView.products = products;
                    // res.data.orders[i].ordertime = time;
                    this.data.saleOrderArray.push(saleOrderView);
                }
                console.log("saleOrderArray is ", this.data.saleOrderArray);
                this.setData({
                    saleOrderArray: this.data.saleOrderArray
                })
            } else {
                //没有可以售后的订单信息
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        }
    },
    //获取正在申请的列表等待运营进行审核
    getApplyingList: async function () {
        console.log("获取正在申请的售后信息");
    },
    //获取申请的记录
    getApplyRecord: async function () {
        console.log("获取申请记录信息");
    },
  //申请售后
  applyAfterSale : function(event){
      console.log("saleOrderArray is ",this.data.saleOrderArray);
      let dataSet = event.currentTarget.dataset;
      console.log("dataSet is ",dataSet);
      let oitemid = dataSet.oitemid;
      let goods = null;
      console.log("oitemid's type is ",typeof oitemid);
      for(let i = 0;i < this.data.saleOrderArray.length;i++){
         for(let j = 0;j < this.data.saleOrderArray[i].products.length;j++){
             if(oitemid === this.data.saleOrderArray[i].products[j].oitemid){
                 //找到该商品
                 goods = this.data.saleOrderArray[i].products[j];
             }
         }
      }
      console.log("goods is",goods);
      wx.setStorage({
          key: 'orderItem',
          data: goods
      })
      wx.navigateTo({
          url: '../applySaleAfter/applySaleAfter',
      })
  }

})