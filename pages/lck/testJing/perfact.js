// pages/lck/testJing/perfact.js
import wxParse from '../../../wxParse/wxParse.js';
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      host : app.host,
      dkheight: 300,
      dkcontent: `你好<br/>nihao,<br/><br/><br/><br/><br/><br/><br/>这个是测试<br/><br/>你同意了吗<br/><br/><br/>hehe<b class='nihao'>n你好啊，我加粗了kk</b >
      <p><img src='http://shop.ykplay.com/upload/1/App.ico'/><strong>asdfasdfasd</strong></p>`,
      typeValue : null,
      showRightToast : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.typeValue = {};
      this.data.typeValue.size = 'M';
      this.data.typeValue.color = 'red';
      console.log("typeValue is ",this.data.typeValue);
      this.setData({
          typeValue : this.data.typeValue
      })
      let winPage = this;
      wx.getSystemInfo({
          success: function (res) {
              let winHeight = res.windowHeight;
              console.log(winHeight);
              winPage.setData({
                  dkheight: winHeight - winHeight * 0.05 - 80
              })
          }
      })

      wxParse.wxParse('dkcontent', 'html', this.data.dkcontent, this, 5);
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
    //   wx.hideLoading();
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
  previewImage: function (e) {
    var that = this,
    //获取当前图片的下表
    index = e.currentTarget.dataset.index,
    //数据源
    pictures = this.data.pictures;
    wx.previewImage({
        //当前显示下表
        current: pictures[index],
        //数据源
        urls: pictures
    })
  },
    onShareAppMessage: function(ops) {
        console.log("ops is ", ops);
        let user = {
            name : 'asdf',
            age  : 23,
            sex  : 'man'
        }
        if(ops.from === 'button'){
            return {
                title: "指点迷津",
                desc: 'a good app for tianjin area',
                path: '/pages/lck/hotShopping/hotShopping?name='+ user.name
            }
        }
    },
    share : async function(event){
        let url = app.host + 'Data/create_qrcode?text=http://blog.csdn.net/fo11ower';
        let data = {

        };
        let req = new Request(url,data,'GET','text');
        let res = await req.sendRequest();
        console.log("res is ",res);

    },
    showTable : function(){
        this.setData({
            showRightToast : !this.data.showRightToast
        });
    }
})