// pages/lck/cart/cart.js
import Cart from '../../../utils/Cart.js';
//请求类
import Request from '../../../utils/Request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //是否为店铺选中状态
      isChoosed : false,
      //是否为商品选中状态
      isGoodsChoosed : false,
      choosedColor : '#bbb',
      choosedGoodsColor: '#bbb',
      //店铺名称
      storeName : '',
      storeArr : [],
      //购物车信息,商品列表
      cart : [[{
                storeName : '家乐福',
                imagePath : '../../../resources/example.jpg',
                productName : '笔记本',
                size : {size : '15*20',color : '黄色'},
                price : 80,
                count : 1,
                pid : 12
              },{
                storeName: '家乐福',
                imagePath: '../../../resources/example.jpg',
                productName: 'HP笔记本',
                size: { size: '20*50', color: '黑色' },
                price: 80,
                count: 1,
                pid: 13
              }],[{
                  storeName: '7-11便利店',
                  imagePath: '../../../resources/example.jpg',
                  productName: '洗衣液',
                  size: { size: '大瓶', color:''},
                  price: 80,
                  count: 1,
                  pid: 14
                  },
                  {
                        storeName: '7-11便利店',
                        imagePath: '../../../resources/example.jpg',
                        productName: '洗衣液',
                        size: { size: '大瓶', color: '' },
                        price: 80,
                        count: 1,
                        pid: 16
                  },
              {
                  storeName: '7-11便利店',
                  imagePath: '../../../resources/example.jpg',
                  productName: '洗衣液',
                  size: { size: '大瓶', color: '' },
                  price: 80,
                  count: 1,
                  pid: 18
              }
             ]],
      //是不是处于编辑状态
      isEditor : false,
      count : 3,
      //是否为全选
      isFullChoosed : false,
      fullChoosedColor : '#bbb'
      
  },
  chooseStore:function(){
      console.log("isChoosed is ",this.data.isChoosed);
      this.setData({
          isChoosed : !this.data.isChoosed,
          choosedColor : this.data.isChoosed ? '#ec0023' : '#bbb',
          isGoodsChoosed : !this.data.isGoodsChoosed,
          choosedGoodsColor : this.data.isGoodsChoosed ? '#ec0023' : '#bbb'
      })
  },
  //选择商品
  chooseGoods : function(){
      console.log("this.data.isGoodsChoosed is ",this.data.isGoodsChoosed);
      if(!this.data.isGoodsChoosed){
          //将全选状态改为false
          this.chooseStore();
      }else{
        this.setData({
            isGoodsChoosed : !this.data.isGoodsChoosed,
            choosedGoodsColor : this.data.isGoodsChoosed ? '#ec0023' : '#bbb'
        })

      }
  },
  
  //编辑
  editor : function(event){
      this.editorEvent(event,true);
  },
  //取消编辑
  cancel : function(event){
      this.editorEvent(event,false);
  },
  //删除购物车中的该商品
  delete: function (event) {
    let dataSet = event.currentTarget.dataset;
    let pid = dataSet.pid;
    let storeName = dataSet.storeName;
    //将商家名称和商品id给服务器让服务器去删除该商品
    let req = new Request();
    console.log("删除该商品");
  },
  //编辑的统一处理方法
  editorEvent : function(event,targetValue){
      console.log("event si ",event);
      let dataSet = event.currentTarget.dataset;
      let storeName = dataSet.storename;
      let pid = dataSet.pid;
      console.log("storeName is ",storeName);
      let storeIndex = this.getIndexByStoreName(storeName);
      console.log("storeIndex is ",storeIndex);
      let len = this.data.cart[storeIndex].length;
      console.log("len is ",len);
      for (let j = 0; j < len; j++) {
        console.log("pid is ",this.data.cart[storeIndex][j].pid);
        pid = Number(pid);
        if (this.data.cart[storeIndex][j].pid === pid) {
            console.log("targetValue is ",targetValue);
            //可以编辑
            this.data.cart[storeIndex][j].editor = targetValue;
            break;
        }
      }
      //查看编辑的是哪一个商品
      this.setData({
          cart: this.data.cart
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //使每个店都处于未选中状态
      let len = this.data.cart.length;
      for(let i = 0;i < len;i++){
          let storeName = this.data.cart[i][0].storeName;
          let storeProductLen = this.data.cart[i].length;
          for(let j = 0;j < storeProductLen;j++){
              this.data.cart[i][j].choosed = false;
              //设置商品的编辑状态是false,当点击编辑按钮的时候进行编辑
              this.data.cart[i][j].editor = false
          }
          let storeState = {

          }
          storeState.storeName = storeName;
          storeState.choosed = false,
          this.data.storeArr.push(storeState);
          console.log(this.data.cart);
      }
      console.log("storeChooseList is ",this.data.storeArr);
      //刷新绑定数据的html页面
      this.setData({
          storeArr : this.data.storeArr,
          cart : this.data.cart
      })
  },
  //减少商品
  sub : function(event){
      this.oprateGoodsCount(event,0);
  },
  //添加商品
  add : function(event){
      this.oprateGoodsCount(event,1);
  },
  oprateGoodsCount : function(event,operator){
      console.log("event is ", event)
      let dataSet = event.currentTarget.dataset;
      let storeName = dataSet.storename;
      let storeIndex = this.getIndexByStoreName(storeName);
      let pid = dataSet.pid;
      console.log("pid is ",pid);
      let len = this.data.cart[storeIndex].length;

      console.log("len is ", len);
      for (let j = 0; j < len; j++) {
          console.log("pid is ", this.data.cart[storeIndex][j].pid);
          pid = Number(pid);
          if (this.data.cart[storeIndex][j].pid === pid) {
              //如果是减少商品数量
              if(operator === 0){
                this.data.cart[storeIndex][j].count = this.data.cart[storeIndex][j].count - 1;
                if (this.data.cart[storeIndex][j].count <= 0) {
                    this.data.cart[storeIndex][j].count = 0;
                }
              }else if(operator === 1){
                  this.data.cart[storeIndex][j].count = this.data.cart[storeIndex][j].count + 1;
              }
              break;
          }
      }
      //查看编辑的是哪一个商品
      this.setData({
          cart: this.data.cart
      });
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
  //进入购物车里面的商品详情
  enterDetail: function (event) {
    console.log("adasdf", event);
    wx.navigateTo({
        url: '../cartGoodsDetail/cartGoodsDetail',
    })
  },
  endEvent : function(event){
      console.log("in endEvent event is ",event);
  },
  //根据店名进行选择
  selectAllByStoreName :function(event){
      console.log("in selectAllByStoreName event si ",event);
      let storeName = event.currentTarget.id;
      let len = this.data.storeArr.length;
      for(let i = 0;i < len;i++){
          if(this.data.storeArr[i].storeName === storeName){
              //该店已经被选中
              this.data.storeArr[i].choosed = true;
              //将该店对应的所有商品选中
              let index = this.getIndexByStoreName(storeName);
              console.log("index is ",index);
              let innerLen = this.data.cart[index].length;
              //该店下的所有商品被选中--->全选或者反全选
              for(let m = 0;m < innerLen;m++){
                  this.data.cart[index][m].choosed = !this.data.cart[index][m].choosed;
              }
            break;
          }
      }
      this.setData({
          cart : this.data.cart
      })
  },
  getIndexByStoreName : function(storeName){
      let len = this.data.cart.length;
      for(let i = 0; i < len; i++){
          let innerLen = this.data.cart[i].length;
          for(let j = 0; j < innerLen;j++){
              if(this.data.cart[i][j].storeName === storeName){
                  return i;
              }
          }
      }
  },
  change : function(event){
      console.log("event is ",event);
  },
  //全选
  selectAllChange : function(event){
      //遍历购物车列表将所有商店里的所有商品的可选状态改为ture
      let len = this.data.cart.length;
      for (let i = 0; i < len; i++) {
          let innerLen = this.data.cart[i].length;
          for (let j = 0; j < innerLen; j++) {
              this.data.cart[i][j].choosed = !this.data.cart[i][j].choosed;
          }
      }
      this.setData({
          cart : this.data.cart
      })
  }
})