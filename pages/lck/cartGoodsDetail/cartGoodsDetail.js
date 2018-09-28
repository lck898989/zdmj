// pages/lck/cartGoodsDetail/cartGoodsDetail.js
import Host from '../../../utils/Const.js'
import Request from '../../../utils/Request.js'
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsImageList: [],
      host : Host.host,
      goods : null,
      showBuyCon : false,
      animationData : null,
      backAnimaData : null,
      //加入购物车的数量
      count : 1,
      //点击加入购物车
      addCart : false,
      //立即购买
      BuyIt : false,
      //是否是默认选择的
      isDefaultChoosed : true,
    //   colorChoosed : '',
    //   sizeChoosed : '',
      typeArr : [],
      //二维数组
      typeValueArr : [],
      selectColor : '#ec0023',
      selectFontColor : '#fff',
      unSelectColor : '#eee',
      unSelectFontColor : '#000',
      //发送服务器的商品大小信息
      sendServerSize : {

      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //请求服务器
      console.log("options is ",options);
      console.log(typeof(options.goods));
      if(typeof(options.goods) === 'string'){
          let goodsObj = JSON.parse(options.goods);
          console.log("goodsObj is ",goodsObj);
          let sizeStr = goodsObj.size;
          if(sizeStr.includes('{')){
              this.data.size = JSON.parse(sizeStr);
              for(let m in this.data.size){
                  console.log("m is ",m);
                  this.data.typeArr.push(m);
                  let value = this.data.size[m];
                  let valueItemArr = value.split('|');
                  let len = valueItemArr.length;
                  for(let i = 0;i < len;i++){
                      let ob = {

                      }
                      ob.mode = valueItemArr[i];
                      ob.touch = false;
                      valueItemArr[i] = ob;
                  }
                  //将每一项对应的键值
                  this.data.typeValueArr.push(valueItemArr);
                  console.log("value is ", this.data.typeValueArr);
              }
              console.log("typeArr is ",this.data.typeArr);
              this.setData({
                  typeArr : this.data.typeArr,
                  typeValueArr : this.data.typeValueArr
              })
          }
          if(goodsObj !== null){
              this.setData({
                  goods : goodsObj
              })
          }
          //商品图像信息数据
          this.data.goodsImageList.push(goodsObj.head);
          this.data.goodsImageList.push(goodsObj.image);
          console.log("goodsImageList is ",this.data.goodsImageList);
          if(this.data.goodsImageList.length !== 0){
            this.setData({
                goodsImageList : this.data.goodsImageList
            })
          }
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
  cancel : function(){
      let animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'liner',
      });
      let backAnimation = wx.createAnimation({
          duration: 100,
          timingFunction: 'liner',
      });
    //   new Promise(function(resolve,reject){

    //   }).then()
      animation.translateY(500).step();
      backAnimation.opacity(1).step().backgroundColor('#efefef').step();
      //   backAnimation.backgroundColor('#000').step();
      this.setData({
          animationData: animation.export(),
          backAnimaData: backAnimation.export(),
          showBuyCon : false
      })
    //   this.setData({
    //       showBuyCon: false,
    //   });
  },
  showBuyCon : function(event){
      console.log("event is ",event);
    //   this.data.sizeChoosed = this.data.sizeArr[0];
    //   this.data.colorChoosed = this.data.colorArr[0];
    //   this.setData({
    //       sizeChoosed : this.data.sizeArr[0],
    //       colorChoosed : this.data.colorArr[0],
    //   })
    //   console.log(this.data.sizeChoosed,this.data.colorChoosed);
      if(event.currentTarget.id === 'addcart'){
          this.setData({
              addCart : true,
              BuyIt   : false,
          })
      }else if(event.currentTarget.id === 'buyit'){
          this.setData({
              BuyIt : true,
              addCart : false,
          })
      }
      this.setData({
          showBuyCon : true,
      });
      let animation = wx.createAnimation({
          duration:1000,
          timingFunction:'liner',
      });
      let backAnimation = wx.createAnimation({
          duration:100,
          timingFunction:'liner',
      });
      animation.translateY(-500).step();
      backAnimation.opacity(0.1).step().backgroundColor('000000').step();
    //   backAnimation.backgroundColor('#000').step();
      this.setData({
          animationData : animation.export(),
          backAnimaData : backAnimation.export()
      })
  },
  //减少商品数量
  sub : function(){
      if(this.data.count > 0){
        this.setData({
            count : this.data.count - 1
        })
      }
  },
  add : function(){
      this.setData({
          count: this.data.count + 1
      })
  },
  //确认订单 
  confirm : async function(event){
      console.log("in confirm event is ",event);
      let pid = event.currentTarget.id;
      console.log("pid is ",pid);
      console.log("点击了添加购物车事件：",this.data.addCart);
      console.log("点击了立即购买事件：",this.data.BuyIt);
      //确认加入购物车
      if(this.data.addCart){
          console.log();
        let url = Host.host + 'Data/AddCart';
        let data = {
            uid : 1,
            pid : pid,
            size : this.data.sendServerSize,
            count : this.data.count,
            source : 0,
        }
        let req = new Request(url,data,"POST","text");
        let res = await req.sendRequest();
        console.log("res is ",res);
        if(res.data.encode === 0){
            //弹框
            wx.showToast({
                title: '加入购物车成功',
            });
            //让弹框不显示
            this.cancel();
        }
      }else if(this.data.BuyIt){
          let data = {
              uid: 1,
              pid: pid,
              size: this.data.sendServerSize,
              count: this.data.count,
              source: 0,
              
          }
          wx.navigateTo({
              url: '../order/order?goods='+JSON.stringify(data),
          });
      }


  },
  //点击规格尺寸事件
  chooseType : function(event){
      
      console.log("event is ",event);
      console.log("event.id is ",event.currentTarget.id);
      let target = event.currentTarget.id;
      let targetArr = target.split('-');
      let targetValue = targetArr[0];
      let index = targetArr[1];
      let tag = targetArr[2];
      //动态添加属性
      this.data.sendServerSize[`${tag}`]=targetValue;
      console.log("sendServerSize is ",this.data.sendServerSize);
      console.log("index is ",index);
      console.log("tag is ",tag);
      //在typeValueArr中找到mode为id的这个对象并设置该对象的touch属性为true
      let testData = this.data.typeValueArr;
      console.log("testData is ",testData);
      let len = testData.length;
      console.log("len is ",len);
      let find = false;
        let innerLen = testData[index].length;
        for(let j = 0; j < innerLen;j++){
            //将其他的touch重置为false
            testData[index][j].touch = false;
            if(testData[index][j].mode === targetValue){
                console.log("找到了");
                testData[index][j].touch = true;
                console.log("index is ",index);
            }
        }
      this.setData({
        typeValueArr: testData,
        sendServerSize: this.data.sendServerSize
      });
  },
})