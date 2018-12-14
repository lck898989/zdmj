 //app.js
 import Host from './utils/Const.js'
 App({
     wenzhangShop:[],
     sreacJson:null,
     sreachPages:null,
     nearsreachArray:null,
     hotsreachArray:null,
     //初始化购买的商品数量
     buyNumber:null,
     turnShopWen:{},
     //
     buyShopJson:null,
     //计算该手机上rpx和px的换算比例
     ratio: null,
     //获取屏幕可见区域高度
     seeHeight: null,
     //判断是否开启过订单计时器
     isStartOrder: false,   
     timeObject: [],
     oidObject: [],
     imageUrl: "https://shopfile.ykplay.com/resources/",
     //初始化我的订单界面当前类型
     orderIndexType: null,
     //初始化我的订单访问数字
     myOrderNumber: null,
     //初始化订单信息
     orderMsg: {},
     shopJSON: {},
     urlj: "http://sharetwo.ykplay.com",
     hotEssay: [],
     //初始化商品物流数组
     shopAdressArray: [],
     //初始化商品名
     shopName: "",
     dd: [1, 2],
     //地址
     adress: "",
     shopNumber: "",
     shopAllplice: "",
     IndexTypeArray: null,
     //初始化商品信息json
     shopMsgJson: null,
     //初始化文章json
     wenzhangJson: null,
     //初始化帮好友看到数组
     helpFriends: [],
     //初始化入门返利初始页数
     rumenPage: 1,
     //初始化热门商品数组
     hotShop: null,
     //初始化我的订单界面的初始页面数据
     orderLoadPage: 1,
     //初始化我的订单界面的总数据页数
     orderPage: 1,
     //初始化我的订单数组
     myorderArray: null,
     //初始化提现信息数组
     arrayTixian: null,
     access_token: "",
     host: Host.productionHost,
     urlw3: "http://shop.ykplay.com",
     urlw2: "http://shop.ykplay.com/",
     urlw: "https://shop.ykplay.com/",
     //保存订单号
     orderNumber: null,
     //商户好
     payPhone: 1487347762,
     //
     //用户信息
     userInfo1: {
         familyAddress: {
             aid: null
         },
         wechatMsg: {
         },
     },
     goodShop:null,
     //支付detailInfo
     detailInfo: null,
     //吴世超openid
     serverOpenid: null,
     //微信返回的unid
     unionId: null,
     //吴世超uid
     uid: null,
     //获取登录sessionKey
     sessionKey: null,
     scoreHiddenLoad: null,
     scoreHiddenScope: null,
     isShareEnter: false,
     //存取微信登录的code
     loginCode: null,
     //判断是否点击过一次免费领取
     isPressGet: false,
     //存取体验吗数据
     codeMsg: {},
     //存储微信头像
     usetImage: "",
     //存储微信姓名
     userName: "",
     detailShopMsg: null,
     appid: "wxcf83376cf2f40081",
     secret: "023dd5acd11fc01a88373dd77d4f9cf9",
     url: "https://share.ykplay.com",
     openid: "",
     shopMsg: null,
     isShare: false,
     //初始化计时器对象
     interval: null,
     //帮助好友数组
     helpFriend: [],
     //判断是否获取回调
     //存储用户信息
     userInfo: {},
     //好友数组
     helpFriend: null,
     //存储上家地址
     cerchanAddress: "",
     //保存商品订单号
     shopNumber: "",
     //客服二维码信息
     serviceCode: null,
     //用户二维码url
     userCode: null,
     //初始化我的分享界面的信息
     myScene: 1,
     detailShopMsg1: null,
     //判断是否点击进入过一次我的分享界面
     openShare: false,
     //判断点击查看详情
     isPressDetail: false,
     //判断天气情况
     isDay : true,
     onLaunch: function(res) {
         let date = new Date();
         let hours = date.getHours() + 1;
         console.log("当前的时间是：",hours);
         if(hours >= 18){
             this.isDay = false;
         }else{
             this.isDay = true;
         }
         //判断天气情况
         setInterval(function(){
             let date = new Date();
             let hours = date.getHours() + 1;
             console.log("当前的时间是：",hours);
             if(hours >= 18){
                 this.isDay = false;
             }else{
                 this.isDay = true;
             }
         }.bind(this),30 * 60 * 1000);
         var self = this;
         wx.getSystemInfo({
             success(res) {
                 self.ratio = 750 / res.windowWidth;
                 self.seeHeight = res.windowHeight;
             }
         })
         //  var c="adasdasd";
         // for(var i=0;i<=c.length-1;i++)
         // {
         //     console.log(c[i]);
         // }
         //  var c;
         //  if(c==undefined||c==null)
         //  {
         //      console.log("222");
         //  }

        // var a=[];
        // a.push(1);
        // console.log(a);

        console.log(this.userInfo1);
        var self = this;
        this.StartLongConnect();
        // 登录 
        wx.login({
            fail: function (res) {
                console.log(res);
            },
            success: res => {
                console.log("???????????????????" + JSON.stringify(res));
                self.loginCode = res.code;
                //判断是否授权
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                            if (self.loginCode) {
                                self.ShortConnect("https://newaccount.ykplay.com/ykLogin/Login", {
                                    app: "zhidianmijin",
                                    bindingType: "1",
                                    bindingMsg: {
                                        "code": self.loginCode,
                                        "appid": self.appid,
                                        "secret": self.secret,
                                        errMsg: "login:ok"
                                    }
                                }, "code");
                                if (self.isShare == false) {
                                    console.log("0000000000000000");
                                    if (self.setloadHidden) {
                                        self.setloadHidden(res);
                                    } else {
                                        self.scoreHiddenLoad = false;
                                    }
                                    wx.showLoading({
                                        title: '加载中',
                                    })
                                }
                            }
                        } else {
                            if (self.isShare == false) {
                                self.ShortConnect("https://newaccount.ykplay.com/ykLogin/Login", {
                                    app: "zhidianmijin",
                                    bindingType: "1",
                                    bindingMsg: {
                                        "code": self.loginCode,
                                        "appid": self.appid,
                                        "secret": self.secret,
                                        errMsg: "login:ok"
                                    }
                                }, "code");
                                console.log("1111111111111");
                                if (self.setscopeHidden) {
                                    self.setscopeHidden(res);
                                } else {
                                    self.scoreHiddenScope = false;
                                }
                            } else {
                                self.ShortConnect("https://newaccount.ykplay.com/ykLogin/Login", {
                                    app: "zhidianmijin",
                                    bindingType: "1",
                                    bindingMsg: {
                                        "code": self.loginCode,
                                        "appid": self.appid,
                                        "secret": self.secret,
                                        errMsg: "login:ok"
                                    }
                                }, "code");
                            }
                        }
                    }
                })
                //发送 res.code 到后台换取 openId, sessionKey, unionId 
            }
        })
    },
    //开启长链接
    StartLongConnect: function () {
        var self = this;
        //监听长链接
        wx.connectSocket({
            url: 'wss://sharews.ykplay.com',
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json'
            },
            protocols: ['protocol1'],
            method: "GET"
        })
        wx.onSocketOpen(function (res) {
            self.interval = setInterval(function () {
                wx.closeSocket()
                //监听长链接
                wx.connectSocket({
                    url: 'wss://sharews.ykplay.com',
                    data: {
                        x: '',
                        y: ''
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    protocols: ['protocol1'],
                    method: "GET"
                })
                clearInterval(self.interval);
            }, 30000);
            console.log('WebSocket连接已打开！')
        })
        wx.onSocketMessage(function (res) {
            if (self.setLong) {
                self.setLong(JSON.parse(res.data).data[0]);
            }
            console.log('收到服务器内容：' + res.data)

        })
        wx.onSocketError(function (res) {
            console.log('WebSocket连接打开失败，请检查！')
        })
        wx.onSocketClose(function (res) { })
    },
    //微信授权
    ShouQuan: function () {
        console.log("33333");
        var self = this;
        wx.getUserInfo({
            success: res => {
                self.userInfo = res.userInfo;
                console.log("5555555" + JSON.stringify(res));
                self.GetUserInfo(res);
            }
        })
    },
    onShow: function (res) {
        console.log(res.scene);
        console.log("onHide");
        if (res.scene == 1007 || res.scene == 1008) {
            console.log("ppppppppppppppppppppp");
            this.isShare = true;
        }
        // this.isShare = false;
        // this.isShareEnter = false;
    },
    onHide: function (res) {

    },
    //显示分享界面
    ShowShareMsg: function () {

    },
    //与服务器断链接发送请求
    ShortConnect(url1, data1, state,callback) {
        console.log(state);
        var self = this;
        //发起网络请求
        wx.request({
            url: url1,
            data: data1,
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success: function (res) {
                console.log("1111111111111" + JSON.stringify(res));

                switch (state) {
                    case "upda":
                        if (res.data.encode == 0) {
                            switch (self.myOrderNumber) {
                                case 0:
                                    self.orderLoadPage = 1;
                                    self.ShortConnect(self.urlw + "Data/GetOrdersByUid", {
                                        uid: self.uid,
                                        page: 1
                                    }, "getmyOrder");
                                    //  self.setUpda(res)

                                    break;

                                case 2:
                                    self.orderLoadPage = 1;
                                    self.ShortConnect(self.urlw + "Data/GetOrdersByUidAndState", {
                                        uid: self.uid,
                                        page: 1,
                                        state: 3
                                    }, "getmyOrder");
                                    //  self.setUpda(res)
                                    break;
                                case 3:
                                    self.orderLoadPage = 1;
                                    self.ShortConnect(self.urlw + "Data/GetOrdersByUidAndState", {
                                        uid: self.uid,
                                        page: 1,
                                        state: 5
                                    }, "getmyOrder");
                                    //  self.setUpda(res)
                                    break;
                            }
                        }
                        break;
                    case "shareWenZhang":
                        self.setSeeNumber(res);
                        break;
                    case "SeeWen":
                        self.setSeeNumber(res);
                        console.log("SeeWen" + JSON.stringify(res));
                        break;
                    case "pressSreach":
                        self.sreacJson = res.data;
                        if (self.setSreachWen) {
                            self.setSreachWen(res);
                        }
                        break;
                    case "searchText":
                        self.setSreachArray(res);
                        break;
                    case "code":
                        if (res.data.result == "ok") {
                            // self.openid = res.data.username;
                            self.sessionKey = res.data.data;
                            wx.getSetting({
                                success(res) {
                                    //当授权时
                                    if (res.authSetting['scope.userInfo']) {
                                        console.log("============");
                                        self.ShouQuan();
                                    } else {
                                        if (self.isShare) {
                                            console.log("---------------");
                                            self.setacticle(res);
                                        }
                                    }
                                }
                            })
                            console.log("33333");

                        }
                        break;

                    case "getuserInfo1":
                        self.setUserInfo11(res);
                        break;
                    case "getMyQian":
                        wx.navigateTo({
                            url: '../MyMoney/MyMoney?money=' + res.data.user.wallet.toString()
                        })
                        break;
                    case "getHelpFriend":
                        self.helpFriend = res.helpName;
                        break;
                    case "shareshop":
                        self.ShowShopDate(res);
                        break;
                    case "ActicleInterShop":
                        console.log("acticleIntershop is ",res.data);
                        self.shopMsgJson = res.data.product;
                        callback(res.data.product);
                        console.log(JSON.stringify(self.shopMsgJson) + "ActicleInterShop");
                        if (self.setShopArrayJson) {
                            self.setShopArrayJson(res)
                        }
                        break;
                    case "GetAllMessage1":
                        if (res.data.encode == -1) {
                            self.setMingxiNull();


                        } else {
                            self.setMingXiMsg(res);
                        }

                        break;
                    case "getShopDi":
                        if (res.data.encode == -1) {
                            //  res.data.state = parseInt(res.data.state);
                            self.shopJSON = {
                                state: 2,
                                state1: 1,
                                data: [{
                                    context: ["商品出库中"],
                                    time: res.data.time
                                }]


                            };
                            switch (res.data.com) {
                                case "shunfeng":
                                    self.orderMsg.com = "顺丰快递";
                                    break;
                                case "yuantong":
                                    self.orderMsg.com = "圆通快递";
                                    break;
                                case "zhongtong":
                                    self.orderMsg.com = "中通快递";
                                    break;
                                case "shentong":
                                    self.orderMsg.com = "申通快递";
                                    break;
                                case "huitongkuaidi":
                                    self.orderMsg.com = "百世快递";
                                    break;
                                case "yunda":
                                    self.orderMsg.com = "韵达快递";
                                    break;
                                case "tiantian":
                                    self.orderMsg.com = "天天快递";
                                    break;
                                case "yzguonei":
                                    self.orderMsg.com = "中国邮政快递";
                                    break;
                                case "ems":
                                    self.orderMsg.com = "EMS快递";
                                    break;
                                case "debangwuliu":
                                    self.orderMsg.com = "德邦快递";
                                    break;
                                case "quanfengkuaidi":
                                    self.orderMsg.com = "全峰快递";
                                    break;
                            }
                        } else {
                            res.data.state = parseInt(res.data.state);
                            self.shopJSON = res.data;
                            switch (res.data.com) {
                                case "shunfeng":
                                    self.orderMsg.com = "顺丰快递";
                                    break;
                                case "yuantong":
                                    self.orderMsg.com = "圆通快递";
                                    break;
                                case "zhongtong":
                                    self.orderMsg.com = "中通快递";
                                    break;
                                case "shentong":
                                    self.orderMsg.com = "申通快递";
                                    break;
                                case "huitongkuaidi":
                                    self.orderMsg.com = "百世快递";
                                    break;
                                case "yunda":
                                    self.orderMsg.com = "韵达快递";
                                    break;
                                case "tiantian":
                                    self.orderMsg.com = "天天快递";
                                    break;
                                case "yzguonei":
                                    self.orderMsg.com = "中国邮政快递";
                                    break;
                                case "ems":
                                    self.orderMsg.com = "EMS快递";
                                    break;
                                case "debangwuliu":
                                    self.orderMsg.com = "德邦快递";
                                    break;
                                case "quanfengkuaidi":
                                    self.orderMsg.com = "全峰快递";
                                    break;
                            }
                        }
                        wx.navigateTo({
                            url: '../ShopAdress/ShopAdress',
                        })
                        break;
                    case "GetShopAdressNumber":

                        //  self.shopAdressArray = res.data.order.orderitems;
                        //  wx.navigateTo({
                        //      url: '../ShopAdress/ShopAdress',
                        //  })
                        break;
                    case "userInfo":
                        console.log(res.data);
                        self.openid = res.data.userInfo.openid;
                        console.log(res.data.userInfo.openid);
                        self.detailInfo = res.data.detailInfo;
                        self.access_token = res.data.access_token;

                        self.ShortConnect(self.urlw + "Entry", {
                            access_token: res.data.access_token,
                            openId: res.data.userInfo.openid
                        }, "liginSuccess");

                        break;
                    case "interWenZhang":
                         self.wenzhangJson = res.data.essay;
                         if (self.setEssay) {
                           
                             self.setEssay(res);
                         }
                        break;
                    case "GetType":
                        self.IndexTypeArray = res.data.tabs;
                        if (self.setIndexTypeArray) {
                            self.setIndexTypeArray(res);
                        }
                        break;
                    case "liginSuccess":
                        if (res.data.desc == "用户合法登录") {
                            self.ShortConnect(self.urlw + 'Data/GetTabs', {}, "GetType");
                            if (self.isShare) {

                                if (self.setJoin) {
                                    self.setJoin(res);
                                }
                                if (self.agreeActicleShou) {
                                    self.agreeActicleShou(res);
                                }
                                self.openid = res.data.userInfo.wxopenId;
                                console.log(res.data.userInfo.openid);
                                self.unionId = res.data.userInfo.unionId;
                                self.uid = res.data.userInfo.uid;
                                self.serverOpenid = res.data.userInfo.openid;

                            } else {
                                self.openid = res.data.userInfo.wxopenId;
                                console.log(res.data.userInfo.openid);
                                self.unionId = res.data.userInfo.unionId;
                                self.uid = res.data.userInfo.uid;
                                console.log(res.data.userInfo.uid + "???????????????????????");
                                self.serverOpenid = res.data.userInfo.openid;
                                self.ShortConnect("https://pay.ykplay.com/user/reg", {
                                    openid: self.serverOpenid
                                }, "register");
                                self.ShortConnect(self.urlw + "Data/GetHotProducts", {
                                    page: 1
                                }, "index2Remen");
                            }
                        } else {
                            console.log("登录失败");

                        }
                        break;
                    case "loadWenzhang":
                        self.loadJingArray(res);
                        break;
                    case "index2Remen":
                        self.orderPage = res.data.pages;
                        self.hotShop = res.data.hotProducts;
                        if (self.setIndex2Hot) {
                            self.setIndex2Hot(res);
                        }
                        break;
                    case "register":
                        if (self.isShare) {

                        } else {
                            wx.reLaunch({
                                url: '../lck/index/index',
                            })
                        }
                        break;
                    case "turnshare":
                        if (res.data.success == "true") {
                            if (self.isShare) {
                                self.isShare = false;
                                self.isShareEnter = false;
                            }
                            self.shopNumber = res.data.orderNumber;
                            self.detailShopMsg = res.data;
                            self.detailShopMsg.comm[0].price = parseInt(res.data.comm[0].price);
                            self.detailShopMsg.comm[0].shareNumber = res.data.shareNumber;
                            console.log("0200000000000000000000");
                            console.log(self.isShareEnter);
                            wx.navigateTo({
                                url: '../shopshare/shopshare?id=' + self.shopNumber,
                            })
                            console.log("999999999999" + JSON.stringify(self.detailShopMsg));
                        } else {
                            if (res.data.msg == "一个用户最多有三个正在分享中的商品") {
                                wx.showModal({
                                    showCancel: false,
                                    title: '提示',
                                    content: "用户最多有三个正在分享中的商品哦",
                                    success: function (res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                        } else if (res.cancel) {
                                            console.log('用户点击取消')
                                        }
                                    }
                                })
                            } else {
                                wx.showModal({
                                    showCancel: false,
                                    title: '提示',
                                    content: res.data.msg,
                                    success: function (res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                        } else if (res.cancel) {
                                            console.log('用户点击取消')
                                        }
                                    }
                                })
                            }
                        }
                        break;
                    case "pressContinue":
                        if (res.data.success == "true") {
                            if (self.isShare) {
                                console.log("0200000000000000000000" + self.isShareEnter);
                                console.log("111111111111111111111111111111111111111111");
                                self.isShare = false;
                                self.isShareEnter = false;
                            }

                            self.setOrdernumber(res);
                            self.detailShopMsg = res.data;
                            self.detailShopMsg.comm[0].price = parseInt(res.data.comm[0].price);
                            self.detailShopMsg.comm[0].shareNumber = res.data.shareNumber;
                            wx.navigateTo({
                                url: '../shopshare/shopshare?id=' + self.shopNumber,
                            })

                        }
                        break;
                    case "detailShop":
                        if (res.data.success == "true") {

                            self.detailShopMsg = res.data;
                            console.log();
                            wx.navigateTo({
                                url: '../detailshop/detailshop?shopid=' + res.data.comm[0].commid.toString()
                            })

                        }
                        break;
                    case "helpFriend":
                        if (res.data.success == "true") {
                            if (res.data.msg == "砍分享成功") {
                                self.getHelpFriend(res);
                            }
                            if (res.data.msg == "该用户已分享过") {
                                self.setHidden2(res);
                            }
                        }
                        break;
                    case "experience":
                        if (res.data.success == "true" && res.data.msg == "发货成功") {
                            console.log("4444");
                            self.setHidden1(res);
                        } else {
                            wx.showModal({
                                showCancel: false,
                                title: '提示',
                                content: res.data.msg,
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                        break;
                    case "mycode":
                        self.userCode = 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + JSON.parse(res.data).access_token;
                        console.log(JSON.parse(res.data).access_token);
                        wx.request({
                            url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + JSON.parse(res.data).access_token,
                            data: {
                                'path': "pages/index/index",
                                'width': 430
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            method: "POST",
                            success: function (res) {
                                console.log(self.url + "/users/TransformQrCode");
                                self.ShortConnect(self.urlw2 + "/users/TransformQrCode", {
                                    QrCode: res.data,
                                }, "stringcode");

                            },
                            fail: function (res) {
                                console.log('isFail')
                            }
                        })
                        break;
                    case "stringcode":
                        if (self.getUserCode) {
                            self.getUserCode(res);
                        }
                        break;
                    case "persontalk":
                        if (res.data.success == "true") {
                            self.serviceCode = res.data;
                            if (self.getCode) {
                                self.getCode(res);
                            }
                        }
                        break;
                    case "getHistroyData":
                        self.setHistroyData(res);
                        break;
                    case "getHistroy":
                        self.setHistroy(res);
                        break;
                    case "myshop":
                        if (res.data.msg == "查询结果为空") {
                            self.setFalse1(res);
                        } else {
                            self.setHidden3(res);
                        }
                        break;
                    case "getWenzhang":
                        callback(res.data.essays);
                        // if (res.data.essays.length % 2 == 0) {
                        //     for (let i = 0; i <= res.data.essays.length - 1; i++) {
                        //         if (i <= (res.data.essays.length / 2 - 1)) {
                        //             this.setData({
                        //                 col1: res.data.essays[i]
                        //             })

                        //         }
                        //         else {
                        //             this.setData({
                        //                 col2: res.data.essays[i]
                        //             })
                        //         }
                        //     }
                         
                        // }
                        // else {
                        //     for (let i = 0; i <= res.data.essays.length - 1; i++) {
                        //         if (i <= (res.data.essays.length / 2 - 0.5)) {
                        //             this.setData({
                        //                 col1: res.data.essays[i]
                        //             })

                        //         }
                        //         else {
                        //             this.setData({
                        //                 col2: res.data.essays[i]
                        //             })
                        //         }
                        //     }
                         
                        // }
                        break;
                    //访问分享记录
                    case "shareMsg":
                        console.log("333");
                        if (res.data.msg == "查询结果为空") {
                            self.setFalse(res);
                        } else {
                            self.setHidden4(res);
                        }
                        break;
                    case "checkCode":

                        break;
                    case "typeShop":
                        self.setUserInfo(res);
                        break;
                    case "remen":
                        self.setRenMen(res);
                        break;
                    case "wechatpay":
                        wx.requestPayment({
                            'timeStamp': res.data.timeStamp,
                            'nonceStr': res.data.nonce_str,
                            'package': "prepay_id=" + res.data.prepay_id,
                            'signType': "MD5",
                            'paySign': res.data.paySign,
                            'success': function (res) {
                                console.log(res);
                                if (res.errMsg == "requestPayment:ok") {
                                    console.log("555");
                                    self.setLoad();
                                    self.ShortConnect(self.urlw + "Data/PayOrder", {
                                        openid: self.serverOpenid,
                                        orderNumber: self.orderNumber
                                    }, "checkPay");
                                }
                            },
                            'fail': function (res) {
                                console.log(res);
                            },
                            'complete': function (res) {
                                console.log(res);
                            }
                        })
                        break;
                    case "checkPay":
                        if (res.data.msg == "支付成功") {
                            if (res.data.type == 0) {
                                self.ShortConnect(self.urlw + "Data/GetHotShop", {
                                    page: 1
                                }, "loadPaySuccess");
                            } else {
                                self.ShortConnect(self.urlw + "Data/GetHotEssays", {
                                    page: 1
                                }, "loadPaySuccess1");
                            }
                            self.shopName = res.data.order.orderItems[0].pname;
                            self.adress = res.data.order.district + res.data.order.detaildistrict;
                            self.shopNumber = res.data.order.allcounts;
                            self.shopAllplice = res.data.order.oaccount;
                            wx.hideLoading();
                        }
                        break;
                    case "loadPaySuccess1":
                        self.orderPage = res.data.pages;
                        self.hotEssay = res.data.hotProducts;
                        wx.navigateTo({
                            url: '../ShopSuccess/ShopSuccess?buyType=wenzhang',
                        })
                        break;
                    case "loadPaySuccess":
                        self.orderPage = res.data.pages;
                        self.hotShop = res.data.hotProducts;
                        wx.navigateTo({
                            url: '../ShopSuccess/ShopSuccess?buyType=shop',
                        })
                        break;
                    case "tixianZero":
                        if (res.data.encode == -1) {
                            // wx.redirectTo({
                            //     url: '../MyMoney/MyMoney',
                            // })
                        } else {
                            if (res.data.encode == 1) {

                                // wx.redirectTo({
                                //     url: '../MyMoney/MyMoney',
                                // })  
                            } else {

                                // wx.redirectTo({
                                //     url: '../MyMoney/MyMoney',
                                // })
                            }
                        }
                        break;
                    case "tixianOne":
                        if (res.data.encode == -1) {

                        } else {
                            if (res.data.encode == 1) {

                            } else {

                            }
                        }
                        break;
                    case "pay1":

                        if (res.data.encode == 0) {
                            self.orderNumber = res.data.order.onumber;
                            self.ShortConnect("https://pay.ykplay.com/miniWx/miniPay", {
                                openid: self.serverOpenid,
                                orderNumber: res.data.order.onumber,
                                appid: self.appid,
                                mch_id: self.payPhone,
                                body: res.data.info,
                                // total_fee: res.data.order.orderItems[0].product.price,
                                total_fee: 1,
                                wxMsg: self.detailInfo,
                                attach: "指点迷津"
                            }, "wechatpay");
                        } else {







                        }
                        break;
                    case "pay":
                        if (res.data.encode == 0) {
                            self.orderNumber = res.data.order.onumber;
                            self.ShortConnect("https://pay.ykplay.com/miniWx/miniPay", {
                                openid: self.serverOpenid,
                                orderNumber: res.data.order.onumber,
                                appid: self.appid,
                                mch_id: self.payPhone,
                                body: res.data.info,
                                total_fee: res.data.order.oaccount,
                                wxMsg: self.detailInfo,
                                attach: "指点迷津"
                            }, "wechatpay");
                        } else {
                            wx.showModal({
                                showCancel: false,
                                title: '提示',
                                content: res.data.msg,
                                success: function (res) {
                                    if (res.confirm) {
                                        //  wx.switchTab({
                                        //      url: '../indextwo/indextwo'
                                        //  })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                        break;
                    case "agree":
                        console.log("agree1");
                        if (res.data.encode == 0) {
                            wx.showModal({
                                showCancel: false,
                                title: '提示',
                                content: res.data.msg,
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.switchTab({
                                            url: '../indextwo/indextwo'
                                        })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        } else {
                            wx.showModal({
                                showCancel: false,
                                title: '提示',
                                content: res.data.msg,
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                        break;
                    case "GetAllMessage":
                        self.arrayTixian = res.data.informs;
                        if (self.setarrayTixian) {
                            self.setarrayTixian(res);
                        }
                        if (res.data.msg == "消息为空") {
                            self.setmingxiFalse(res);
                        }

                        break;
                    case "interorder":
                        self.myorderArray = res.data.orders;
                        self.orderPage = res.data.pages;
                        wx.navigateTo({
                            url: '../../MyOrder/MyOrder',
                        })
                        console.log(res.data.orders.length);
                        break;

                    case "interorder1":
                        if (res.data.encode == -1) {
                            self.setNullButton();

                        } else {
                            self.myorderArray = res.data.orders;
                            self.orderPage = res.data.pages;
                            if (self.setMyOrder) {
                                self.setMyOrder(res);
                            }


                        }


                        break;
                    case "getmyOrder":
                        if (res.data.encode == -1) {
                            self.setNullButton(res);

                        } else {
                            for (var i = 0; i <= res.data.orders.length - 1; i++) {
                                for (var j = 0; j <= res.data.orders[i].orderItems[0].length - 1; j++) {
                                    var c = res.data.orders[i].orderItems[0][j].product.head.split(",");
                                    res.data.orders[i].orderItems[0][j].product.head = c;
                                    // res.data.orders[i].orderItems[0][j].product.size = JSON.parse(res.data.orders[i].orderItems[0][j].product.size);
                                    res.data.orders[i].orderItems[0][j].standard = res.data.orders[i].orderItems[0][j].standard.replace("|", "  ");
                                }
                            }
                            self.getOrderArray(res);

                        }
                        break;
                    case "getMyShopping":
                        self.getmyshopping(res);
                        break;
                    case "interIntroduction":
                        self.hotShop = res.data.hotProducts;
                        self.orderPage = res.data.pages;
                        wx.navigateTo({
                            url: '../IntroductionRebate/IntroductionRebate',
                        })
                        break;
                    case "loadRemen":
                        self.orderPage = res.data.pages;
                        self.setHotArray(res);
                        break;
                    case "loadIndexRemen":
                        self.orderPage = res.data.pages;
                        self.setIndexHotArray(res);
                        break;
                    case "isGrade":
                        if (res.data.encode == -1) {
                            self.rumenPage = 1;
                            self.ShortConnect(self.url + "Data/GetHotProducts", {
                                page: self.rumenPage
                            }, "GetHot");
                        } else {
                            wx.hideLoading();
                            wx.switchTab({
                                url: "../indextwo/indextwo"
                            })
                        }
                        break;
                    case "GetHot":
                        self.hotShop = res.data.hotProducts;
                        self.orderPage = res.data.pages;
                        self.isShouQuan1(res);
                        break;
                    case "GetHot1":
                        self.hotShop = res.data.hotProducts;
                        self.orderPage = res.data.pages;
                        self.isNoShou1(res)
                        break
                    case "interJinjie":
                        if (res.data.encode == 0) {
                            self.helpFriends = res.data.agencys;
                        }
                        wx.navigateTo({
                            url: '../JinRebate/JinRebate',
                        })
                        break;
                    case "0":
                        self.guanggaoTu = [];
                        for (var i = 0; i <= 4; i++) {
                            self.guanggaoTu.push(self.url + res.data.client[17 + i]);
                        }
                        wx.navigateTo({
                            url: '../GoodThIngs/GoodThings',
                        })
                        break;
                    case "1":
                        self.guanggaoTu = [];
                        for (var i = 0; i <= 6; i++) {
                            self.guanggaoTu.push(self.url + res.data.client[10 + i]);
                        }
                        wx.navigateTo({
                            url: '../LookTianJin/LookTianJin',
                        })
                        break;
                    case "2":
                        self.guanggaoTu = [];
                        for (var i = 0; i <= 4; i++) {
                            self.guanggaoTu.push(self.url + res.data.client[0 + i]);
                        }
                        wx.navigateTo({
                            url: '../TwoFunction/TwoFunction',
                        })
                        break;
                    case "3":
                        self.ShortConnect(self.url + "/commodity/ShowCommodityDetails", {
                            "username": self.openid,
                            "commid": 1,
                        }, "detailShop");
                        break;
                    case "4":
                        self.guanggaoTu = [];
                        for (var i = 0; i <= 4; i++) {
                            self.guanggaoTu.push(self.url + res.data.client[5 + i]);
                        }
                        wx.navigateTo({
                            url: '../WeiMaTwo/WeiMaTwo',
                        })
                        break;
                    case "checkTiXian":
                        console.log("5555");
                        wx.redirectTo({
                            url: '../TiXian/TiXian?inter=tixian' + "&msg=" + res.data.msg + "&money=" + res.data.wallet,
                        })
                        break;
                    case "sureGet":
                        switch (self.orderIndexType) {
                            case 0:
                                self.orderLoadPage = 1;
                                self.ShortConnect(self.urlw + "Data/GetOrdersByUid", {
                                    uid: self.uid,
                                    page: self.orderLoadPage
                                }, "getmyOrder");
                                break;
                            case 2:
                                self.orderLoadPage = 1;
                                self.ShortConnect(self.urlw + "Data/GetOrdersByUidAndState", {
                                    uid: self.uid,
                                    page: 1,
                                    state: 3
                                }, "getmyOrder");
                                break;
                        }
                        break;
                    case "dissppearOrder":
                        switch (self.orderIndexType) {
                            case 0:
                                self.orderLoadPage = 1;
                                self.ShortConnect(self.urlw + "Data/GetOrdersByUid", {
                                    uid: self.uid,
                                    page: self.orderLoadPage
                                }, "getmyOrder");
                                console.log("dissppearOrder11");
                                break;
                            case 1:
                                self.orderLoadPage = 1;
                                self.ShortConnect(self.urlw + "Data/GetOrdersByUidAndState", {
                                    uid: self.uid,
                                    page: self.orderLoadPage,
                                    state: 1
                                }, "getmyOrder");
                                break;
                        }
                        break;
                    case "getPages":
                        self.orderPage = res.data.pages;

                        break;
                    case "ActicleInterOrder":
                        self.buyShopJson = res.data.product;
                        let data = {
                            uid: self.uid,
                            pid: self.buyShopJson.pid,
                            size: self.buyShopJson.size,
                            count: this.data.count,
                            source: 0,
                        }
                        console.log(res.data);
                        break;
                    case "InterSreach":

                        self.nearsreachArray = res.data.historySearchs;
                        self.hotsreachArray = res.data.hotsearchs;
                        if (self.setNearsreach) {
                            self.setNearsreach(res);
                        }
                        break;
                    case "InterSreach1":
                        self.sreachPages = res.data.pages;
                        self.goodShop = res.data.hotProducts;
                        if (self.setTuiShop) {
                            self.setTuiShop(res);
                        }
                        break;
                    case "InterSreach2":
                        self.setSreachTui(res);
                        break;
                    case "setSreachSize":
                        self.setKaiQi(res);
                        break;
                    case "turnShopWen":
                        self.shopWenZhangJson = res.data.shop;
                        callback(res.data.shop);
                        self.wenzhangShop = res.data.shopproducts;
                        if (self.setwenzhangShop) {
                            self.setwenzhangShop(res);
                        }
                        break;
                    case "GetAllMessage2":

                        self.MingXiaRRAY = res.data.informs;
                        console.log(self.MingXiaRRAY + "!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                        if (self.GetAllMessage1) {

                            self.GetAllMessage1(res);
                        }
                        break;    
                }
            },
        })
    },
    //显示商品信息
    ShowShopDate: function (res) {

        if (this.shopmsgcallback) {
            this.shopmsgcallback(res);
        }


    },
    // 获取用户信息
    GetUserInfo: function (res) {
        var self = this;
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo;
        console.log(this.openid + "6666666666");
        res.sessionKey = this.sessionKey;
        console.log(res.userInfo);
        this.ShortConnect("https://newaccount.ykplay.com/ykLogin/UserInfoLogin", {
            bindingType: "1",
            app: "zhidianmijin",
            platform: "1",
            channel: "0",
            bindingMsg: res
        }, "userInfo");

    },
    globalData: {
        userInfo: null
    }
})