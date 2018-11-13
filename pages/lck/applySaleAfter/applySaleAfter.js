// pages/lck/applySaleAfter/applySaleAfter.js
import Const from '../../../utils/Const.js';
import Request from '../../../utils/Request.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      //退换货的商品
      goods: {

      },
      receptInfo : {
          收货人   : '',
          手机号   : '',
      },
      //问题描述
      questionDescription : '',
      //缩略图数组
      screenshotArray : [],
      showReason : false,
      reasonList : ['质量问题','商品与页面描述不符','误购','卖家发错货'],
      //退换货原因
      reason : '',
      host : app.host,
      //服务的类型
      constArray: Const.saleCommon,
      //退换货类型
      backGoodsType : {
          
      },
      //输入的文字个数
      inputNumber : 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      console.log("uid is ",app.uid);
      let orderItem = wx.getStorageSync('orderItem');
      console.log("orderItem is ",orderItem);
      this.setData({
          goods : orderItem
      });
      //从缓存中取值完成之后将缓存中的数据删除防止下次取出来的商品不同
      wx.removeStorageSync('orderItem');
      //向服务器获取该商品对应的售后选项
      let data = {
          uid     : app.uid,
          oitemid : orderItem.oitemid
      }
      let url = this.data.host + 'Data/GetAfterSaleTypeByOitemId';
      let req = new Request(url,data,'POST','text');
      let res = await req.sendRequest();
      console.log("res is ",res);
      this.data.backGoodsType.msg = res.data.msg;
      this.data.backGoodsType.type = res.data.type;
      this.setData({
          backGoodsType : this.data.backGoodsType
      })
      console.log("constArray is ",this.data.constArray);

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
  //联系客服
  contactServer : function(e){
      console.log("e is ",e);
      console.log("联系客服");
      console.log("e.path is ",e.path);
      console.log("e.path is ",e.query);
  },
  //多行输入框输入响应
  textAreaInput : function(e){
      let inputString = e.detail.value;
      console.log("inputString is ",inputString);
      console.log("inputString's length is ",inputString.length);
      this.setData({
          questionDescription : inputString,
          inputNumber         : inputString.length
      })
  },
  //上传相册图片到微信小程序
  uploadImage : function(e){
      let self = this;
      console.log("e is ",e);
      wx.chooseImage({
          count : 5,
          sourceType : 'album',
          success : function(res){
              console.log("tempFilePaths is ",res.tempFilePaths);
              console.log("tempFiles is ",res.tempFiles);
              let screenShotLen = res.tempFiles.length;
              for(let i = 0;i < screenShotLen;i++){
                  self.data.screenshotArray.push(res.tempFiles[i].path);
              }
              console.log("缩略图数组是：",self.data.screenshotArray);
              //压缩完图片之后进行显示
              self.setData({
                  screenshotArray : self.data.screenshotArray
              })
          }
      });
  },
  //选择申请售后原因
  chooseReason : function(event){
      console.log("event is ",event);
      this.setData({
          showReason : !this.data.showReason
      })
  },
  //不显示弹出框
  cancel : function(e){
      console.log("e is ",e);
      this.setData({
          showReason : false
      })
  },
  test : function(e){
      console.log("e is ",e);
  },
  //选择该退货退款原因
  chooseTheReason : function(event){
     let dataSet = event.currentTarget.dataset;
     let reason = dataSet.reason;
     console.log("reason is ",reason);
     this.setData({
         reason : reason
     });
     this.cancel();
  },
  //选择收货地址
  chooseAdd : function(){

  },
  //提交原因
  submit : function(){
      let self = this;
      console.log("uid is ",app.uid);
      console.log("收货人是 ",this.data.receptInfo['收货人']);
      console.log("手机号是 ",this.data.receptInfo['手机号']);
      let reasonList = {
          accept   : this.data.receptInfo['收货人'],
          phone    : this.data.receptInfo['手机号'],
          question :  this.data.questionDescription,
          reason   : this.data.reason,
          add      : '上海市',
          oitemid  : 18,
          uid      : app.uid,
          typ      : self.data.backGoodsType.type
      }
      //获得缩略图数组的长度
      let uploadImgLen = this.data.screenshotArray.length;
      let j = 0;
      let renameImgArr = [];
      if(uploadImgLen > 0){
          console.log("host is ",self.data.host);
          for(let i = 0;i < uploadImgLen;i++){
            wx.uploadFile({
                url: self.data.host + 'Data/UploadImage',
                filePath: self.data.screenshotArray[i],
                formData : reasonList,
                header : {
                    'content-type' : 'multipart/form-data'
                },
                name: 'file' + `${i}`,
                success : function(res){
                    j++;
                    console.log("上传文件成功");
                    console.log("res is ",res);
                    renameImgArr.push(JSON.parse(res.data).head);
                    reasonList.re = renameImgArr;
                    console.log("j is ",j);
                    console.log("uploadImgLen",uploadImgLen);
                    console.log("uploadImgLen === j",uploadImgLen === j);
                    if(j === uploadImgLen){
                        console.log("j --==");
                        console.log("host is ",self.data.host);
                        //发送给服务器上传完毕
                        wx.request({
                            url: self.data.host + 'Data/ApplyAfterSale',
                            method : 'POST',
                            data   : reasonList,
                            success :function(res){
                                console.log("图片上传完毕的相应");
                                console.log("res is ",res);
                            },
                            fail : function(){
                                console.log("请求失败");
                            }
                        })

                    }
                    
                },
                fail : function(){
                    console.log("上传图片出错了");
                }
            })
          }
      }  
  },
  //获取输入的用户名
  getName : function(e){
      console.log("in getName e is ",e);
      let name = e.detail.value;
      this.data.receptInfo['收货人'] = name;
      this.setData({
          receptInfo : this.data.receptInfo
      })
  },
  //检查用户名是否输入
  checkName : function(e){
      console.log("in checkName e is ",e);
      if(this.data.receptInfo['收货人'] === ''){
          wx.showToast({
              title: '收货人不能为空',
              icon : 'none'
          })
      }else{
          console.log("检查用户名通过");
      }
  },
  //获取用户的手机号码
    getPhoneNumber : function(e){
      console.log("e is ",e);
      let phone = e.detail.value;
      this.data.receptInfo['手机号'] = phone;
      this.setData({
          receptInfo : this.data.receptInfo
      })
  },
  //检查电话号码
  checkPhoneNumber : function(e){
      console.log("输入的电话号码是：",this.data.receptInfo['手机号']);
      let phoneNumber = this.data.receptInfo['手机号'];
      console.log("phoneNumber is ",phoneNumber);
      let regx = /^1[0-9]{10}$/;
      let isRight = regx.test(phoneNumber);
      if(isRight){
          //手机号验证通过
          console.log("手机号验证通过");
      }else{
          wx.showToast({
              title : '手机号码不合法!',
              icon  : 'none'
          })
      }
  },
  close : function(e){
      console.log("e is ",e);
      let dataSet = e.currentTarget.dataset;
      console.log("dataSet is ",dataSet);
      let index = dataSet.index;
      console.log("index is ",index);
      console.log("screenShotArray is ", this.data.screenshotArray);
      this.data.screenshotArray.splice(index,1);
      this.setData({
          screenshotArray: this.data.screenshotArray
      });
      console.log("screenshotArray is ",this.data.screenshotArray);
  }
})