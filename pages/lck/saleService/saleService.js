// pages/lck/saleService/saleService.js
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
      saleOrderArray : [{
          orderNumber : '654654654654',
          orderTime   : '2018-12-21 12:12:40',
          goods       : {
              headImg : '../../resources/example.jpg',
              pname   : '商品商品商品商品商品商品商品商品商品商品',
              size    : {
                 size : 'M',
                 color: 'red'
              },
              count   : 2,
              price   : 800,
          }
        },
        {
            orderNumber: '654654654654',
            orderTime: '2018-12-21 12:12:40',
            goods: {
                headImg: '../../resources/example.jpg',
                pname: '商品商品商品商品商品商品商品商品商品商品',
                size: {
                    size: 'M',
                    color: 'red'
                },
                count: 2,
                price: 800,
            }
        },
        {
            orderNumber: '654654654654',
            orderTime: '2018-12-21 12:12:40',
            goods: {
                headImg: '../../resources/example.jpg',
                pname: '商品商品商品商品商品商品商品商品商品商品',
                size: {
                    size: 'M',
                    color: 'red'
                },
                count: 2,
                price: 800,
            }
        },
        {
            orderNumber: '654654654654',
            orderTime: '2018-12-21 12:12:40',
            goods: {
                headImg: '../../resources/example.jpg',
                pname: '商品商品商品商品商品商品商品商品商品商品',
                size: {
                    size: 'M',
                    color: 'red'
                },
                count: 2,
                price: 800,
            }
        },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseTitle : function(e){
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
      saleHeadText : this.data.saleHeadText
    })
    console.log("saleHeadText is ",this.data.saleHeadText);
  }

})