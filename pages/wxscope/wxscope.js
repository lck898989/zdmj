
let app = getApp();
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../utils/Request.js';
import Const from '../../utils/Const.js';
Page({
    data: {
        scopeHidden : true,
        loadHidden  : true,
        imageUrl    : "",

    },
    //点击浏览商城
    cancel: function() {

    },
    //点击返回页面
    confirm: function() {
    },
    TurnScene: function() {
        console.log("444");         
    },
    onGotUserInfo: function(e) {
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    wx.showLoading({
                        title: '加载中',
                    })
                    app.ShouQuan();
                } else {
                    console.log("555");
                }
            }
        })
    },
    //事件处理函数
    bindViewTap: function() {

    },

    onPullDownRefresh: function() {
        // Do something when pull down.
    },
    changeName: function() {


    },
    //分享界面
    onShareAppMessage: function() {

    },
    onLoad: function(options) {
        console.log("in wxscope options is ",options);
        if (options.scene) {
            let scene = decodeURIComponent(options.scene);
            console.log("scene is ", scene);
            app.scene = scene;
            console.log("app is ", app);
        }
        this.setData({
            imageUrl: app.imageUrl
        })
        console.log("44444444444444444444444");
        if (app.isShare) {
            console.log("3333");
            this.setData({
                scopeHidden: false,
            })
        }
        else
        {
          if (app.scoreHiddenScope != null) {
            console.log("555");
            this.setData({
              scopeHidden: app.scoreHiddenScope
            })
          }
          else {
            app.setscopeHidden = res => {
              console.log("0000000000000000");
              this.setData({
                scopeHidden: false,
                loadHidden: true,
              })
            }
          }
          if (app.scoreHiddenLoad != null) {
            this.setData({ 
              loadHidden: app.scoreHiddenLoad
            })

          }
          else {
            app.setloadHidden = res => {
              // app.ShouQuan();
              this.setData({
                scopeHidden: true,
                loadHidden: false,
              })
            }
          }
        }
    },

    //绑定搜索功能的点击事件
    SearchClick: function(event) {

    },
})