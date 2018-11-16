// pages/lck/applyProgress/applyProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Goods : {
          pname : '七匹狼裤子',
          price : 152,
          count : 1,
          headImg : '/upload/head/154158366967739.jpeg'
      },
      //正在经办的字体颜色
      onDeal : 'color:#404040',
      dealed : 'color:#9a9a9a',
      applyRouter : [
          {
              id:0,
              text : '接受申请',
              time : '2018-12-15 12:25:25',
              name : 'lll'
          },
          {
              id:1,
              text : '开始接受申请',
              time : '2018-12-14 12:25:25',
              name : 'lll'
          },
          {
              id:1,
              text : '开始接受申请',
              time : '2018-12-14 12:25:25',
              name : '系统'
          },
      ],
      serverpageInfo : {
          '服务类型':'换货',
          '申请原因':'质量问题',
          '商品退回':'快递至第三方卖家',
          '联系人'  :'lck',
          '联系电话':'18522463796',
          '收货地址': '上海市徐汇区滨江大道'
      },
      questionDes  : {},
      progressArr  : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let serverItem = wx.getStorageSync("serverItem");
      console.log(serverItem);
      this.data.questionDes.question = serverItem.questionDes;
      this.data.questionDes.submitTime = serverItem.submitTime;
      console.log("serverItem is ",serverItem.products[0]);
      //赋值产品信息
      this.setData({
          Goods       : serverItem.products[0],
          questionDes : this.data.questionDes
      });
      wx.removeStorageSync("serverItem");
      console.log("Goods is ",this.data.Goods);
      console.log("serverItem is ",serverItem);
      //重新赋值服务单信息
      this.data.serverpageInfo['服务类型'] = serverItem.serviceType;
      this.data.serverpageInfo['申请原因'] = serverItem.reason;
      this.data.serverpageInfo['联系人'] = serverItem.recepter;
      this.data.serverpageInfo['联系电话'] = serverItem.recepterPhone;
      this.data.serverpageInfo['收货地址'] = serverItem.address;
      console.log("服务单信息是：",this.data.serverpageInfo);
      this.setData({
          serverpageInfo : this.data.serverpageInfo
      });
      let progressmsg = serverItem.progressMsg;
      let progressTempArr = progressmsg.split(',');
      for(let i = 0;i < progressTempArr.length;i++){
          let tempJson = {};
          let progressA = progressTempArr[i].split(';');
          for(let j = 0;j < progressA.length;j++){
              tempJson[`t${j}`] = progressA[j];
          }
          this.data.progressArr.push(tempJson);
      }
      this.data.progressArr.reverse();
      this.setData({
          progressArr : this.data.progressArr
      })
      console.log("this.data.progressArr is ",this.data.progressArr);
    //   progressArr
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //删除申请
  deleteApply :function(event){
      
  }
})