// pages/lck/hotShopping/hotShopping.js
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
import Goods from '../../../utils/Goods.js';
//支持es6 async..await
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //商品列表
      goods: [new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人'),
              new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人'),
              new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人')],
      //是否显示行式排版
      banshi : false,
      moreType : false,
      //当前页面被显示
      choosed : true,
      /***
       * 左右滑动所需要的变量指定偏移量进行动作
       */
      touchStartPosition : {
          startX : 0,
          startY : 0
      },
      touchEndPosition : {
          endX : 0,
          endY : 0
      },
      inputString : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      console.log("asdfasdf");
      //向服务器请求数据
//       let req = new Request(Const.host +`API?query={products(page:1) {
//         pid
//         pname
//         price
//         unit
//         size
//         info
//         sname
//         counts
//         sales
//         tname
//         t2name
//         image
//         head
//     }
// }`,{},"GET","text");
//       console.log("ae32333");
//       let res = await req.sendRequest();
//       console.log();
//       console.log("res.data is ",res.data.data.products);
//       this.setData({ goods: res.data.data.products});
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
  banshi : function(){
      this.setData({banshi : !this.data.banshi})
  },
  startMove : function(event){
    console.log("in startMove event is ",event);
    this.setData({touchStartPosition : {
        startX : event.touches[0].pageX,
        startY : event.touches[0].pageY
    }});
    console.log("startX is ",this.data.touchStartPosition.startX);
    console.log("startY is ",this.data.touchStartPosition.startY);
  },
  switchShoppingType: function(event){
      console.log("event is ",event);
    //   this.setData({
    //     touchStartPosition: {
    //         startX: event.touches[0].pageX,
    //         startY: event.touches[0].pageY
    //     }
    //   });
  },
  clearEventArr : function(event){
      console.log("in clearEventArr event is ",event);
      //判断事件数组中的个数来进行左右滑动事件的执行
      //记录下结束时候的坐标位置
      this.setData({touchEndPosition : {
          endX : event.changedTouches[0].pageX,
          endY : event.changedTouches[0].pageY
      }});
      let offsetX = this.data.touchStartPosition.startX - this.data.touchEndPosition.endX;
      let offsetY = this.data.touchStartPosition.startY - this.data.touchEndPosition.endY;
      console.log("offsetX is ",offsetX);
      console.log("offsetY is ",offsetY);
      if ((offsetY >= -50 && offsetY <= 50) && (offsetX <= -50 || offsetX >= 50)){
          this.setData({choosed : !this.data.choosed});
      }
  },
  enterHot : function(){
      //切换热门商城的组件部分
      this.setData({choosed : true});
  },
  enterPerfact : function(){
      //切换为精选商城的组件部分
      this.setData({choosed : false});
      
  },
  //显示更多分类，下拉菜单
  showMore : function(){
      //显示下拉菜单
      this.setData({moreType : !this.data.moreType});
  },
  getSearch : function(event){
      console.log("event is ",event);
      let inputString = event.detail.value;
      this.setData({inputString : inputString});      
      console.log("输入的内容是：",inputString);
      //将搜素类型字段发送给服务器进行处理
  },
  //提交输入框中的内容
  commit : function(event){
      console.log("in commit event is ",event);
  },
  //输入框失去焦点时候触发该事件
  initInput : function(event){
      console.log("in initInput event is ",event);
      event.detail.value = "";
      console.log("in initInput event is ",event);
      this.setData({inputString : ''});
  },
  //处理所有的网络请求
  dealRequest : function(data){
    let req = new Request();
    //将请求数据发送给服务器
    
  }
})