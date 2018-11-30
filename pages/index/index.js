//index.js
//获取应用实例
var helloData = {
  name: 'WeChat'
}
// var log=require("log.js");
var app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
module.exports.index = Page({
  data: {
    //判断是否从分享界面进入此页面
    isShareEnter: false,
    //初始化当前的搜索类的index
    typeIndex: 0,
    color1: "#ff861a",
    //粗体字号
    blodSize: 900,
    //正常字号
    normalSize: 600,
    //分类数组
    arrayShopType: ["热门", "美容洗护", "配饰", "食品", "餐具器皿", "电子周边", "学习课程", "母婴", "其他"],
    //滚动动画速度
    moveSpeed: null,
    //当前页的下标
    indexs: 0,
    //活动图片数组
    activityImage: [],
    aaa: {
      b: "dd",
    },
    bb: "1,2,3",
    //存取商品已2个数
    shopChu: [],
    shuGun: 0,
    // //初始化首页标题
    // firstTitle1:"",
    // firstTitle2:"",
    // firstTitle3:"",
    array: [1, 2, 3],
    url: "https://share.ykplay.com",
    indexObject: null,
    motto: 'Hello World',
    userInfo: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: "void",
    //商品搜索按钮名称
    stringSearch: ["  分类  ", "最新  ", "餐饮  ", "服务"],
    toView: 'red',
    scrollTop: 100,
    countDownList: [],
    actEndTimeList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    })
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  changeName: function() {
    this.setData({
      name: "aaa"
    });
  },
  //滑动滑块
  MoveSwiper: function(e) {
    this.setData({
      indexs: e.detail.current
    })
  },
  //点击分类
  PressShopType: function(event) {
    switch (event.currentTarget.id) {
      case "0":

        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commodity/ShowAllCommodity", {}, "remen");

        break;
      case "1":

        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectAllHairdressing", {}, "typeShop");
        break;
      case "2":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectAllAcc", {}, "typeShop");
        break;
      case "3":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectAllfood", {}, "typeShop");
        break;

      case "4":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectTypeInfo", {
          tag: "9"
        }, "typeShop");

        break;
      case "5":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectTypeInfo", {
          tag: "10"
        }, "typeShop");

        break;
      case "6":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectTypeInfo", {
          tag: "11"
        }, "typeShop");

        break;
      case "7":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectTypeInfo", {
          tag: "7"
        }, "typeShop");

        break;
      case "8":
        this.setData({
          typeIndex: parseInt(event.currentTarget.id),
          shuGun: 0,
        })
        app.ShortConnect(app.url + "/commCassify/selectTypeInfo", {
          tag: "8"
        }, "typeShop")
        break;
    }
  },
  //分享界面
  onShareAppMessage: function() {
    // return custom share data when user share.
    return {
      title: '这里的秘密,你知道多少?我来帮你指点迷津',
      path: 'pages/wxscope/wxscope'
    }
  },
  //跳转分享界面
  TurnShare: function(event) {
    var commid1 = event.currentTarget.id;
    if (app.isPressGet == false) {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: "注意：所有实体商品非天津本地不包邮费，请您谨慎考虑",
        success: function(res) {
          if (res.confirm) {
            app.isPressGet = true;
            app.ShortConnect(app.url + "/commodity/GetShareCommodityLink", {
              "username": app.openid,
              "commid": commid1,
            }, "turnshare");
          } else if (res.cancel) {

          }
        }
      })
      app.isPressGet = true;
    } else {
      console.log(event.currentTarget.dataset.hi);
      app.ShortConnect(app.url + "/commodity/GetShareCommodityLink", {
        "username": app.openid,
        "commid": event.currentTarget.id,
      }, "turnshare");
    }
    // wx.navigateTo({
    //     url: '../shopshare/shopshare?id=' + app.shopNumber.toString(),
    // })
    //访问
    // app.ShortConnect();
  },
  //点击最上放滑动图片
  PressSwiper: function(event) {
    console.log(event.currentTarget.id);
    switch (event.currentTarget.id) {
      case "0":
        app.ShortConnect(app.url + "/commodity/client", {}, "0")
        // wx.navigateTo({
        //     url: '../GoodThIngs/GoodThings',
        // })
        break;

      case "1":
        app.ShortConnect(app.url + "/commodity/client", {}, "1")
        // wx.navigateTo({
        //     url: '../LookTianJin/LookTianJin',
        // })
        break;
      case "2":
        app.ShortConnect(app.url + "/commodity/client", {}, "2")
        // wx.navigateTo({
        //     url: '../TwoFunction/TwoFunction',
        // })

        break;

      case "4":
        app.ShortConnect(app.url + "/commodity/client", {}, "4")
        //  wx.navigateTo({
        //         url: '../WeiMaTwo/WeiMaTwo',
        //     })

        break;
      case "3":
        app.ShortConnect(app.url + "/commodity/client", {}, "3")
        // app.ShortConnect(app.url + "/commodity/ShowCommodityDetails", {
        //     "username": app.openid,
        //     "commid": 1,
        // }, "detailShop");
        break;
    }

  },
  //跳转商品详情界面
  TurnDetail: function(event) {
    app.ShortConnect(app.url + "/commodity/ShowCommodityDetails", {
      "username": app.openid,
      "commid": event.currentTarget.id,
    }, "detailShop");
    // wx.navigateTo({
    //     url: '../detailshop/detailshop?id=' + app.shopNumber.toString(),
    // })
  },
  //点击个人信息
  PressUsermsg: function() {
    wx.redirectTo({
      url: '../userInfo/userInfo'
    })
  },
  onLoad: function(option) {
    app.ShortConnect(app.url + "/commodity/ShowAllCommodity", {}, "shareshop");
    // if(app.isShare)
    // {
    //     console.log("??????????????????????");
    //     app.isShareEnter=false;
    //     app.isShare=false;
    // }
    console.log("222");
    app.setUserInfo = res => {
      for (var i = 0; i <= res.data.length - 1; i++) {
        if (res.data[i].filepath.indexOf(",") >= 0) {
          arrayPath = res.data[i].filepath.split(",");
          res.data[i].filepath = arrayPath[0];
          console.log(res.data[i].filepath);
        }
      }
      this.setData({
        userInfo: res.data
      })
    }
    app.setRenMen = res => {
      for (var i = 0; i <= res.data.comm.length - 1; i++) {
        if (res.data.comm[i].filepath.indexOf(",") >= 0) {
          arrayPath = res.data.comm[i].filepath.split(",");
          res.data.comm[i].filepath = arrayPath[0];
        }
      }
      this.setData({
        userInfo: res.data.comm
      })

    }
    var arrayPath = [];
    app.shopmsgcallback = res => {
      // if (app.isShareEnter) {
      //     wx.hideLoading();
      // }
      for (var i = 0; i <= res.data.comm.length - 1; i++) {
        if (res.data.comm[i].filepath.indexOf(",") >= 0) {
          arrayPath = res.data.comm[i].filepath.split(",");
          res.data.comm[i].filepath = arrayPath[0];
          console.log(res.data.comm[i].filepath);
        }
      }
      this.setData({
        userInfo: res.data.comm,
        shopChu: res.data.salas,
        activityImage: res.data.index,
      })
      console.log(this.data.activityImage+"???????????????????");
      this.countDown();
      if (res.data.index.length <= 3) {
        console.log("!!!");
        this.setData({
          moveSpeed: 8000,
        })
      } else if (res.data.index.length > 3 && res.data.index.length <= 5) {
        this.setData({
          moveSpeed: 6000,
        })
      } else if (res.data.index.length > 5 && res.data.index.length <= 7) {
        this.setData({
          moveSpeed: 5000,
        })
      } else {
        this.setData({
          moveSpeed: 4000,
        })
      }
    }
  },
  onHide: function() {
    console.log("33333333333333333333333333");
  },
  onShow: function() {
    // app.detailShopMsg = null;


  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  makeDate(date) {
    try {
      var date = new Date(date).toISOString().
      replace(/T/, ' ').
      replace(/\..+/, '');
    } catch (e) {
      console.log(e);
      var date = "0000-00-00 00:00:00";
    } finally {
      return date;
    }
  },
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    // let endTimeList = this.data.actEndTimeList;
    // let countDownArr = [];
    // 对结束时间进行处理渲染到页面
    this.data.userInfo.forEach(o => {
      var a = o.validTime.replace(/-/g, "/");
      a = a.replace("T", " ");
      a = a.replace(".000Z", " ");
      let endTime = new Date(a).getTime();
      let day = '0';
      let hou = '0';
      let min = '0';
      let sec = '0';
      let obj = null;
      let days = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        day = this.timeFormat(parseInt(time / (60 * 60 * 24))).toString();
        if (day[0] == '0') {
          days = day.substr(1, 1);
          day = days;
        }
        hou = this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)).toString();
        min = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)).toString();
        sec = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60)).toString();
        // obj = {
        //     day: this.timeFormat(day),
        //     hou: this.timeFormat(hou),
        //     min: this.timeFormat(min),
        //     sec: this.timeFormat(sec)
        // }

      } else { //活动已结束，全部设置为'00'
        //   obj = {
        //     day: '00',
        //     hou: '00',
        //     min: '00',
        //     sec: '00'
        //   }
        day = "0";
        hou = '00';
        min = '00';
        sec = '00';
      }
      o.time = {
        days: day,
        hous: hou,
        mins: min,
        secs: sec,
      };
    })
    this.setData({
      userInfo: this.data.userInfo,
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    // this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  },
  //绑定搜索功能的点击事件
  SearchClick: function(event) {
    console.log(event.currentTarget.id);
    switch (event.currentTarget.id) {
      case "0":
        app.ShortConnect(self.url + "/commodity/ShowAllCommodity", {}, "shop");
        break;
      case "1":


        break;
      case "2":

        break;
      case "3":

        break;
    }
  },
  // getUserInfo: function(e) {+
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: app.shopMsg,
  //     hasUserInfo: true
  //   })
  // },
})