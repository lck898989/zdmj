// pages/lck/cartGoodsDetail/cartGoodsDetail.js
import Host from '../../../utils/Const.js'
import Request from '../../../utils/Request.js'
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsImageList: [],
      host : Host.devHost,
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

      },
      //大小尺寸值数组
      sizeValueArr : [],
      //提交到购物车是否完整
      isOk : true,
      //默认收货地址
      defaultAdd : null,
      //是通过商品详情点击了选择款式的按钮进入尺寸选择界面
      isChooseType : false
    //   index : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
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
      //请求收货地址
      //请求所有收货地址的数据
      let url = Host.devHost + 'Data/getAddressByUid';
      console.log("uid is  ", app.uid);
      let data = {
          uid: app.uid
      }
      let req = new Request(url, data, "POST", 'text');
      let res = await req.sendRequest();
      console.log("res is ", res.data.address);
      let addArr = res.data.address;
      if(addArr !== null){
        let lena = addArr.length;
        for(let i = 0;i < lena;i++){
            console.log("地址的默认状态是 ",addArr[i].status);
            if(addArr[i].state === 0){
                this.setData({
                    defaultAdd : addArr[i].district + addArr[i].detaildistrict
                })
            }
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
      //检查规格数据是否选择完毕
      this.checkData(this.data.goods.pid,'cancel');
    //   console.log("isChoosedOk is ",isChoosedOk);
      if(this.data.isOk){
        //商品类别选择完毕填充选择款式栏的内容
        this.data.sizeValueArr = Object.values(this.data.sendServerSize);
        console.log("尺寸类别是：",this.data.sizeValueArr);
        this.setData({
            sizeValueArr : this.data.sizeValueArr,
            isChooseType : true
        })
      }
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
      animation.translateY(400).step();
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
//   showBuyCon_t : function(event){
//       this.showBuyCon(event);
//   },
  showBuyCon : async function(event){
      console.log("event is ",event);
      let dataSet = event.currentTarget.dataset;
    //   if(clickType === 'yes'){
    //       //设置状态为已经选择了尺寸参数
    //       this.setData({
    //           isChooseType : true
    //       })
    //   }
    //   this.data.sizeChoosed = this.data.sizeArr[0];
    //   this.data.colorChoosed = this.data.colorArr[0];
    //   this.setData({
    //       sizeChoosed : this.data.sizeArr[0],
    //       colorChoosed : this.data.colorArr[0],
    //   })
    //   console.log(this.data.sizeChoosed,this.data.colorChoosed);
      let id = event.currentTarget.id;
      if(id === 'addcart_t'){
            let url = Host.devHost + 'Data/AddCart';
            let data = this.checkData(this.data.goods.pid);
            //在选择规格界面添加购物车
            if (this.data.isOk) {
                this.setData({
                    //尺寸颜色都已经选择了
                    isChooseType: true
                });

                //将对象的值取出来
                this.data.sizeValueArr = Object.values(this.data.sendServerSize);
                console.log("sizeValueArr is ", this.data.sizeValueArr);
                console.log("data is ", data);
                console.log(data.size.size);
                console.log(data.size.color);
                let req = new Request(url, data, "POST", "text");
                let res = await req.sendRequest();
                console.log("res is ", res);
                if (res.data.encode === 0) {
                    //弹框
                    wx.showToast({
                        title: '加入购物车成功',
                    });
                    //让弹框不显示
                    this.cancel();
                }
            }
      }else if(id === 'buyit_t'){
          let data = this.checkData(this.data.goods.pid);
          if(this.data.isOk){
              wx.navigateTo({
                  url: '../order/order?goods=' + JSON.stringify(data),
              });
          }
      }
      else if(id === 'addcart'){
          this.setData({
              addCart : true,
              BuyIt   : false,
          })
          
      }else if(id === 'buyit'){
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
      animation.translateY(-400).step();
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
    //   if(pid === 'addcart_t'){
    //       //通过选择尺寸的时候点击的添加购物车
    //       this.setData({
    //           addCart: true,
    //           BuyIt: false,
    //       });
    //   } else if (pid === 'buyit_t'){
    //       this.setData({
    //           addCart: false,
    //           BuyIt: true,
    //       });
    //   }
      console.log("点击了添加购物车事件：",this.data.addCart);
      console.log("点击了立即购买事件：",this.data.BuyIt);
      //确认加入购物车
      if(this.data.addCart){
          console.log();
        let url = Host.devHost + 'Data/AddCart';
        let data = this.checkData(pid);
        if(this.data.isOk){
            this.setData({
                //尺寸颜色都已经选择了
                isChooseType: true
            });

            //将对象的值取出来
            this.data.sizeValueArr = Object.values(this.data.sendServerSize);
            console.log("sizeValueArr is ",this.data.sizeValueArr);
            console.log("data is ",data);
            console.log(data.size.size);
            console.log(data.size.color);
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
        }
      }else if(this.data.BuyIt){
          let data = this.checkData(pid);
          //如果数据合法的话就跳转页面
          if(this.data.isOk){
            wx.navigateTo({
                url: '../order/order?goods='+JSON.stringify(data),
            });
          }
      }


  },
  //检查加入购物车或者立即购买的时候选择的数据是否合法
  checkData : function(pid){
      let cancel = '';
      if(arguments.length === 2){
          cancel = arguments[1];
      }
      let data = {
          uid: 1,
          pid: pid,
          size: this.data.sendServerSize,
          count: this.data.count,
          source: 0,
      }
      console.log("typeArr is ", this.data.typeArr);
      let typeA = this.data.typeArr;
      let typeLen = this.data.typeArr.length;
      for (let i = 0; i < typeLen; i++) {
          console.log("--->>>", data.size[`${typeA[i]}`]);
          console.log("i --->> ", `${typeA[i]}`);
          console.log("i --->>value ", data.size[`${typeA[i]}`]);
          if (data.size[`${typeA[i]}`] === undefined) {
              this.setData({
                  isOk: false,
              });
          } else {
              this.setData({
                  isOk: true
              })
          }
      }
      console.log("isOk is ", this.data.isOk);
      //规格没有选择正确或者是没有选择足够
      if (!this.data.isOk && cancel !== 'cancel') {
          wx.showToast({
              title: '请选择规格',
              icon: 'none'
          })
      }
      return data;
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
      //刷新选择款式栏的内容
    //   let isChoosedOver = this.checkData(this.data.goods.pid);
    //   if(isChoosedOver){
    //     //商品类别选择完毕填充选择款式栏的内容
    //       this.data.typeValueArr = Object.values(this.data.sendServerSize);
    //       console.log("尺寸类别是：",this.data.typeValueArr);

    //   }
      this.setData({
        typeValueArr: testData,
        sendServerSize: this.data.sendServerSize,
        sizeValueArr : this.data.sizeValueArr
      });
  },
})