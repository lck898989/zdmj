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
          text    : '申请售后',
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
      isSaleAfter : false,
      isApplying : false,
      isApplyRecord : false,
      headText :`font-size: 30rpx;
        color: #383838;
        padding: 10rpx 10rpx;`,
      redText  : `font-size: 30rpx;
        color : #b964d8;
        padding: 10rpx 10rpx;
        border-bottom:4rpx solid #b964d8;font-weight:bold;`,
      //售后申请page
      saleAfterPage : 1,
      //正在申请page
      applyingPage  : 1,
      //申请记录page 
      applyRecordPage   : 1,
      //可以申请售后的订单数组
      saleOrderArray : [],
      //正在申请的记录
      applyingOrderArr : [],
      //申请记录的数组
      applyRecord : [],
      host : app.host,
      //需要申请售后的商品信息
      productList : [],
      //服务器发来的原始数据
      sourceData : [],
      //服务类型对象
      saleType : Const.saleCommon,
      //运单号
      expressOrder : '',
      //运单号是否已经提交
      isSubmitOrder : false,
      //显示物流公司
      showExpressOrg : false,
      //物流公司列表
      expressOrgList : [],
      //选择的物流公司
      choosedExpressOrg : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
        title: '数据加载中...',
    })
    if(options.status === "1"){
          //申请提交后跳转到正在申请的界面
          this.data.saleHeadText[1].choosed = true;
          this.data.saleHeadText[0].choosed = false;
          this.data.saleHeadText[2].choosed = false;
          //对saleOrderArray进行赋值
          this.setData({
              saleHeadText :  this.data.saleHeadText,
          });
          //向服务器请求正在申请的业务
          this.getApplyingList();
    } else if (options.status === "2") {
        this.data.saleHeadText[2].choosed = true;
        this.data.saleHeadText[1].choosed = false;
        this.data.saleHeadText[0].choosed = false;
        this.setData({
            saleHeadText : this.data.saleHeadText,
        })
        this.getApplyRecord();
    } else {
        //请求服务器数据(可以申请售后的服务列表)
        this.getSaleAfterList();
    }
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
      wx.hideLoading();
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
      console.log();
      //申请售后下拉刷新
      if (this.data.isSaleAfter){
        this.data.saleAfterPage++;
        //重新获取
        console.log("拼接后 saleOrderArray is ", this.data.saleOrderArray);
        this.updateSaleAfterList();
        this.data.saleOrderArray = Const.uniqObjInArray(this.data.saleOrderArray);
      }else if(this.data.isApplying){
        console.log("正在申请的页面数是：",this.data.applyingPage);
        this.data.applyingPage++;
        this.updateApplying();
        this.data.applyingOrderArr = Const.uniqObjInArray(this.data.applyingOrderArr);
        
      }else if(this.data.isApplyRecord){
        console.log("申请记录的页面数是：",this.data.applyRecordPage);
        this.data.applyRecordPage++;
        this.updateApplyRecord();
        this.data.applyRecord = Const.uniqObjInArray(this.data.applyRecord);
      }
      this.setData({
          saleOrderArray   : this.data.saleOrderArray,
          applyingOrderArr : this.data.applyingOrderArr,
          applyRecord      : this.data.applyRecord
      });

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //选择申请售后，正在申请，申请记录按钮
  chooseTitle : async function(e){
    wx.showLoading({
        title: '数据加载中...',
    })
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
    })
    console.log("saleHeadText is ",this.data.saleHeadText);
    //向服务器请求信息重置相关信息
    switch(text){
        case '申请售后':
            this.data.saleAfterPage = 1;
            this.setData({
                saleOrderArray : []
            });
            this.getSaleAfterList();
            break;
        case '正在申请':
            this.data.applyingPage = 1;
            this.setData({
                applyingOrderArr : []
            });
            this.getApplyingList();
            break;
        case '申请记录':
            this.data.applyRecordPage = 1;
            this.setData({
                applyRecord : []
            });
            this.getApplyRecord();
            break;
    }
    this.setData({

    })
  },
    //获取售后列表
    getSaleAfterList: async function () {
        this.data.saleAfterPage = 1;
        console.log("saleAfterPage is ",this.data.saleAfterPage);
        this.setData({
            isSaleAfter: true,
            isApplying: false,
            isApplyRecord: false
        });
        this.updateSaleAfterList();
    },
    //更新售后申请列表
    updateSaleAfterList : async function(){
        let url = this.data.host + 'Data/GetAfterSale';
        console.log("host is ", this.data.host);
        console.log("uid is ", app.uid);
        let data = {
            uid: app.uid,
            page: this.data.saleAfterPage
        }
        // console.log("uid is ",app.uid);
        if (data.uid !== null) {
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();

            console.log(res);
            console.log("时间是：", res.data.orders);
            if (res.data.orders.length === 0) {
                wx.showToast({
                    title: '没有多余售后订单了!',
                    icon: 'none'
                })
            }
            if (res.data.encode === 0) {
                // wx.hideLoading();
                let orders = res.data.orders;
                this.setData({
                    sourceData: orders,
                });
                for (let i = 0; i < orders.length; i++) {
                    let time = null;
                    if (orders[i].ordertime.includes('-')) {
                        time = orders[i].ordertime;
                    } else {
                        time = Const.formatDate(orders[i].ordertime);
                    }
                    let orderItemsLen = orders[i].orderItems.length;
                    let saleOrderView = {
                        ordertime: time,
                        onumber: res.data.orders[i].onumber,
                    }
                    let products = [];
                    //遍历订单项
                    for (let j = 0; j < orderItemsLen; j++) {
                        if(orders[i].orderItems[j].product){
                            let headImg = orders[i].orderItems[j].product.head.split(',')[0];
                            let count = orders[i].orderItems[j].pcount;
                            let pname = orders[i].orderItems[j].product.pname;
                            let price = orders[i].orderItems[j].product.price;
                            let oitemid = orders[i].orderItems[j].oitemid;
                            let oid = orders[i].orderItems[j].oid;
                            let size = JSON.parse(orders[i].orderItems[j].product.size);
                            let product = {
                                headImg  : headImg,
                                count    : count,
                                pname    : pname,
                                price    : price,
                                oitemid  : oitemid,
                                oid      : oid,
                                size     : size
                            }
                            products.push(product);
                        }
                    }
                    saleOrderView.products = products;
                    // res.data.orders[i].ordertime = time;
                    this.data.saleOrderArray.push(saleOrderView);
                }
                console.log("saleOrderArray is ", this.data.saleOrderArray);
                // this.data.saleOrderArray = Const.uniqObjInArray(this.data.saleOrderArray);
                wx.hideLoading();
                this.setData({
                    saleOrderArray: this.data.saleOrderArray
                },()=>{
                })
            } else {
                wx.hideLoading();
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
        this.data.applyingPage = 1;
        //检查第一页有没有内容如果没有内容就证明没有正在审核的商品了
        this.setData({
            isSaleAfter: false,
            isApplying: true,
            isApplyRecord: false
        })
        this.updateApplying();
    },
    updateApplying : async function(){
        let url = this.data.host + 'Data/GetAfterSaleIng';
        let data = {
            uid: app.uid,
            page: this.data.applyingPage,
        }
        let req = new Request(url, data, 'POST', 'text');
        let res = await req.sendRequest();
        console.log("正在申请的售后信息是：", res);
        let applyingSaleDates = res.data.aftersales;
        if (applyingSaleDates.length === 0) {
            wx.showToast({
                title: '没有更多了',
                icon: 'none'
            })
        }
        for (let i = 0; i < applyingSaleDates.length; i++) {
            let serviceNumber = applyingSaleDates[i].service_number;
            let servicetype = applyingSaleDates[i].type.toString();
            let saleType = this.data.saleType[`${servicetype}`];
            let reason = applyingSaleDates[i].reason;
            let progressMsg = applyingSaleDates[i].progress_msg;
            console.log("saleType is ", saleType);
            let applyingView = {
                serviceNumber: serviceNumber,
                serviceType: saleType,
                progressMsg: progressMsg,
                reason: reason,
                recepter: applyingSaleDates[i].consignee,
                recepterPhone: applyingSaleDates[i].phone,
                address: applyingSaleDates[i].address,
                submitTime: applyingSaleDates[i].start_time,
                questionDes: applyingSaleDates[i].info
            }
            let products = [];
            if (applyingSaleDates[i].orderItems[0].product !== null){
                let productTemp = {
                    pname: applyingSaleDates[i].orderItems[0].product.pname,
                    headImg: applyingSaleDates[i].orderItems[0].product.head.split(',')[0],
                    price: applyingSaleDates[i].orderItems[0].product.price,
                    count: applyingSaleDates[i].orderItems[0].pcount,
                    oitemid: applyingSaleDates[i].orderItems[0].oitemid,
                    oid: applyingSaleDates[i].orderItems[0].oid,
                    size: JSON.parse(applyingSaleDates[i].orderItems[0].product.size)
                }
                products.push(productTemp);
                applyingView.products = products;
                this.data.applyingOrderArr.push(applyingView);
            }
        }
        console.log("applyingOrderArr is ", this.data.applyingOrderArr);
        console.log("去重后的applyingOrderArr is ", Const.uniqObjInArray(this.data.applyingOrderArr));
        this.data.applyingOrderArr = Const.uniqObjInArray(this.data.applyingOrderArr);
        this.setData({
            applyingOrderArr : this.data.applyingOrderArr
        },()=>{
            wx.hideLoading();
        })
    },
    //获取申请的记录
    getApplyRecord: async function () {
        this.data.applyRecordPage = 1;
        console.log("applyRecordPage is ",this.data.applyRecordPage);
        console.log("获取申请记录信息");
        this.setData({
            isApplyRecord : true,
            isApplying    : false,
            isSaleAfter   : false,
        });
        this.updateApplyRecord();
    },
    //刷新申请记录
    updateApplyRecord : async function(){
        let url = this.data.host + 'Data/GetAfterSaleRecord';
        console.log("用户uid is ",app.uid);
        let data = {
            uid: app.uid,
            page: this.data.applyRecordPage
        }
        let req = new Request(url, data, 'POST', 'text');
        let res = await req.sendRequest();

        console.log("获得的申请的记录是：", res.data.aftersales);
        let applyingSaleDates = res.data.aftersales;
        if (applyingSaleDates.length === 0) {
            wx.showToast({
                title: '没有更多了',
                icon: 'none'
            })
        }
        for (let i = 0; i < applyingSaleDates.length; i++) {
            let serviceNumber = applyingSaleDates[i].service_number;
            let servicetype = applyingSaleDates[i].type.toString();
            let saleType = this.data.saleType[`${servicetype}`];
            let reason = applyingSaleDates[i].reason;
            let index = applyingSaleDates[i].progress_msg.lastIndexOf(';');
            let progressMsg = applyingSaleDates[i].progress_msg.slice(index + 1);
            console.log("saleType is ", saleType);
            let applyingView = {
                serviceNumber: serviceNumber,
                serviceType: saleType,
                progressMsg: progressMsg,
                progressRes: applyingSaleDates[i].progress
            }
            let products = [];
            if (applyingSaleDates[i].orderItems[0].product){
                let productTemp = {
                    pname: applyingSaleDates[i].orderItems[0].product.pname,
                    headImg: applyingSaleDates[i].orderItems[0].product.head.split(',')[0],
                    price: applyingSaleDates[i].orderItems[0].product.price,
                    count: applyingSaleDates[i].backcount,
                    oitemid: applyingSaleDates[i].orderItems[0].oitemid,
                    oid: applyingSaleDates[i].orderItems[0].oid,
                    size: JSON.parse(applyingSaleDates[i].orderItems[0].product.size)
                }
                products.push(productTemp);
                applyingView.products = products;
                this.data.applyRecord.push(applyingView);
            }
        }
        console.log("applyRecord is ", this.data.applyRecord);
        wx.hideLoading();
        this.setData({
            applyRecord: this.data.applyRecord
        })
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
    },
    //查看审核进度
    enterProgress : function(event){
        console.log("isApplyRecord is ",this.data.applyRecord);
        let dataSet = event.currentTarget.dataset;
        console.log("oitemid is ",dataSet.oitemid);
        let oitemid = Number(dataSet.oitemid);
        console.log("oitemid is ",oitemid);
        // console
        console.log("applyingOrderArr is ",this.data.applyingOrderArr);
        let curGoods = null;
        let saleOrderLen = this.data.applyingOrderArr.length;
        for(let i = 0;i < saleOrderLen;i++){
            let currentOrder = this.data.applyingOrderArr[i];
            if(currentOrder.products instanceof Array){
                let productsLen = currentOrder.products.length;
                for(let j = 0;j < productsLen;j++){
                    if(currentOrder.products[j].oitemid === oitemid){
                        curGoods = currentOrder;
                    }
                }

            }
        }
        console.log("curGoods is ",curGoods);
        if(curGoods !== null){
            wx.setStorageSync('serverItem', curGoods);
            wx.navigateTo({
                url: '../applyProgress/applyProgress',
            });
        
        }
    },
    //获取输入的运单号
    getExpressOrder : function(event){
        console.log(event.detail.value);
        this.setData({
            expressOrder : event.detail.value
        })
    },
    //提交运单号
    submitExpressOrder : async function(event){
        let dataSet = event.currentTarget.dataset;
        console.log("dataSet is ",dataSet);
        let serverNumber = dataSet.exorder;
        console.log("serverNumber is ",serverNumber);
        console.log("expressOrder is ",this.data.expressOrder);
        if(this.data.expressOrder === ''){
            wx.showToast({
                title: '请填写运单号！',
            })
        }else{
            let url = app.host + 'Data/UploadExpressNumber'
            let data = {
                serverNumber : serverNumber,
                uid          : app.uid,
                expressOrder : this.data.expressOrder,
                expressAge   : this.data.choosedExpressOrg
            }
            let req = new Request(url,data,'POST','text');
            let res = await req.sendRequest();
            console.log("提交运单的结果是 res is ",res);
            if(res.data.encode === 0){

                wx.showToast({
                    title : '提交运单号成功!',
                    icon  : 'none'
                })
                this.setData({
                    isSubmitOrder :true
                })
            }
        }
    },
    //选择物流
    chooseExpress :async function(){
        this.setData({
            showExpressOrg : !this.data.showExpressOrg
        })
        let url = app.host + 'Data/GetExpressAge';
        let data = {
            uid : app.uid
        }
        let req = new Request(url,data,'POST','text');
        let res = await req.sendRequest();
        console.log("res is ",res);
        this.setData({
            expressOrgList : res.data.expressage
        })

    },
    //取消显示物流公司
    cancel : function(){
        this.setData({
            showExpressOrg : false
        })
    },
    test : function(){

    },
    chooseExpressOrg : function(event){
        let dataSet = event.currentTarget.dataset;
        let expressOrg = dataSet.reason;
        console.log("物流公司是：",expressOrg);
        if(expressOrg !== ''){
            console.log("expressOrg is ",expressOrg);
            this.setData({
                choosedExpressOrg : expressOrg
            });
            this.cancel();
        }
    }
})