// pages/lck/searchDetail/searchDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hostTypeArr : ['vivo','iPhone','华为','男外套','牛仔裤男','休闲裤','耐克鞋男鞋 篮球鞋'],
      isSearch : true,
      isRow : false,
      isCol : false,
      keyWord : '',
      goodsList : [{
          head: ['/upload/head/154216272161926.jpeg'],
          pname  : 'asdfasd',
          sales  : 12,
          rebate : 15.2,
          price  : 10,
          },
          {
              head: ['/upload/head/154216272161926.jpeg'],
              pname: 'asdfasd',
              sales: 12,
              rebate: 15.2,
              price: 10,
          },
          {
              head: ['/upload/head/154216272161926.jpeg'],
              pname: 'asdfasd',
              sales: 12,
              rebate: 15.2,
              price: 10,
          },
          {
              head: ['/upload/head/154216272161926.jpeg'],
              pname: 'asdfasd',
              sales: 12,
              rebate: 15.2,
              price: 10,
          }],
      page : 1,
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
  onReachBottom: function (e) {
      console.log("e is ",e);
      console.log("page is ",this.data.page);
      this.data.page++;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获得输入内容
  getSearchContent : function(event){
     console.log(event.detail.value);
     this.setData({
         keyWord : event.detail.value
     })
  },
  search : function(e){
      var self = this;
      console.log("e is ",e);
      console.log("keyWord is ",this.data.keyWord);
      if(self.data.keyWord !== ''){
        //模拟请求数据的时间间隔
        setTimeout(function(){
            console.log("请求数据完成！！！");
            self.setData({
                isSearch : false,
                isRow    : true,
                isCol    : false,
            });
        },500);
      }
  },
  //切换显示商品的版式
  showGoods : function(event){
      let id = event.target.id;
      console.log("id is ",id);
      if(id === 'row'){
          this.setData({
              isRow : false,
              isCol : true
          })
      }else if(id === 'col'){
          this.setData({
              isRow : true,
              isCol : false
          })
      }
      console.log("current showType is 行",this.data.isRow,'--列',this.data.isCol);
  }
})