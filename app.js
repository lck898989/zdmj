//app.js
App({
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
    onLaunch: function(res) {
        var self = this;
        this.StartLongConnect();
        // var self = this;
        // if (res.scene == 1007 || res.scene == 1008) {
        //   self.isShare = true;
        // }
        // // 展示本地存储能力d
        // var logs = wx.getStorageSync('logs') 
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs);
        // 登录 
        wx.login({
            fail: function(res) {
                console.log(res);
            },
            success: res => {
                console.log("33333333333333333");
                self.loginCode = res.code;
                //判断是否授权
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                            if (self.loginCode) {
                                self.ShortConnect(self.url + "/users/WeChatLogin", {
                                    "code": self.loginCode,
                                    "appid": self.appid,
                                    "secret": self.secret,
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
                                self.ShortConnect(self.url + "/users/WeChatLogin", {
                                    "code": self.loginCode,
                                    "appid": self.appid,
                                    "secret": self.secret,
                                }, "code");
                                console.log("1111111111111");
                                if (self.setscopeHidden) {
                                    self.setscopeHidden(res);
                                } else {
                                    self.scoreHiddenScope = false;
                                }
                            } else {
                                self.ShortConnect(self.url + "/users/WeChatLogin", {
                                    "code": self.loginCode,
                                    "appid": self.appid,
                                    "secret": self.secret,
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
    StartLongConnect: function() {
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
        wx.onSocketOpen(function(res) {
            self.interval = setInterval(function() {
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
        wx.onSocketMessage(function(res) {
            if (self.setLong) {
                self.setLong(JSON.parse(res.data).data[0]);
            }
            console.log('收到服务器内容：' + res.data)

        })
        wx.onSocketError(function(res) {
            console.log('WebSocket连接打开失败，请检查！')
        })
        wx.onSocketClose(function(res) {})
    },
    //微信授权
    ShouQuan: function() {
        var self = this;
        wx.getUserInfo({
            success: res => {
                self.userInfo = res.userInfo;
                console.log("5555555" + JSON.stringify(res));
                self.GetUserInfo(res);
            }
        })
    },
    onShow: function(res) {
        console.log(res.scene);
        console.log("onHide");
        if (res.scene == 1007 || res.scene == 1008) {
            console.log("ppppppppppppppppppppp");
            this.isShare = true;
        }
        // this.isShare = false;
        // this.isShareEnter = false;
    },
    onHide: function(res) {
        // if (this.isShare) {
        //   this.isShareEnter = true;
        // }
    },
    //显示分享界面
    ShowShareMsg: function() {

    },
    //与服务器断链接发送请求
    ShortConnect(url1, data1, state) {
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
            success: function(res) {
                console.log("22222222222222222" + JSON.stringify(res));
                switch (state) {
                    case "code":
                         if (res.data.success == "true") {
                            self.openid = res.data.username;
                            console.log("33333");
                            if (self.isShare == false) {
                                wx.getSetting({
                                    success(res) {
                                        //当授权时
                                        if (res.authSetting['scope.userInfo']) {
                                            self.ShouQuan();
                                        }
                                    }
                                })
                            }
                            // if (self.isShare == false) {
                            //     // console.log("sss");
                            //     // self.GetUserInfo();
                            // } else {
                            //     self.openid = res.data.username;
                            //     app.ShortConnect(app.url + "/commodity/GetShareCommodityLink", {
                            //         "username": self.openid,
                            //         "commid": self.getShopId(res),
                            //     }, "getHelpFriend");
                            // }
                        }
                        break;
                    case "getHelpFriend":
                        self.helpFriend = res.helpName;
                        break;
                    case "shop":
                        self.ShowShopDate(res);
                        break;
                    case "userInfo":
                        if (self.isShare) {
                            self.ShortConnect(self.url + "/commodity/ShowAllCommodity", {}, "shop");
                        } else {
                            if (res.data.success == "true") {
                                self.ShortConnect(self.url + "/commodity/ShowAllCommodity", {}, "shop");
                                console.log("???????????????????");
                            }
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
                                    success: function(res) {
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
                                    success: function(res) {
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
                            // self.shopNumber = res.data.orderNumber;
                            self.setOrdernumber(res);
                            self.detailShopMsg = res.data;
                            self.detailShopMsg.comm[0].price = parseInt(res.data.comm[0].price);
                            self.detailShopMsg.comm[0].shareNumber = res.data.shareNumber;
                            wx.navigateTo({
                                url: '../shopshare/shopshare?id=' + self.shopNumber,
                            })
                            // if (self.shopdetailmsgcallback) {
                            //     self.shopdetailmsgcallback(res);
                            // 
                        }
                        break;
                    case "detailShop":
                        if (res.data.success == "true") {
                            // self.shopNumber = res.data.orderNumber;
                            self.detailShopMsg = res.data;
                            console.log();
                            wx.navigateTo({
                                url: '../detailshop/detailshop?shopid=' + res.data.comm[0].commid.toString()
                            })
                            // if (self.shopdetailmsgcallback) {
                            //     self.shopdetailmsgcallback(res);
                            // }
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
                                success: function(res) {
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
                            success: function(res) {
                                console.log(self.url + "/users/TransformQrCode");
                                self.ShortConnect(self.url + "/users/TransformQrCode", {
                                    QrCode: res.data,
                                }, "stringcode");
                                // if (self.getUserCode) {
                                //     self.getUserCode(res);
                                // }
                            },
                            fail: function(res) {
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
                    case "myshop":
                        if (res.data.msg == "查询结果为空") {
                            self.setFalse1(res);
                        } else {
                            self.setHidden3(res);
                        }
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
                        self.codeMsg = res.data.code[0];
                        self.cerchanAddress = res.data.cerchan[0].cerchanAddress;
                        wx.navigateTo({
                            url: '../CheckCode/CheckCode',
                        })
                        break;
                    case "typeShop":
                        self.setUserInfo(res);
                        break;
                    case "remen":
                        self.setRenMen(res);
                        break;
                }
            },
        })
    },
    //显示商品信息
    ShowShopDate: function(res) {
        this.shopMsg = res;
        wx.hideLoading();
        // if (this.setindexHidden)
        // {
        //     this.setindexHidden(res);
        // }
        if (this.shopmsgcallback) {
            this.shopmsgcallback(res);
        }
        wx.reLaunch({
            url: '../index/index'
        })
        // if (this.isShare) {
        //     // wx.redirectTo({
        //     //     url: '../detailshop/detailshop'
        //     // })
        //     console.log("ttttt");
        // } else {
        //     this.shopMsg = res;
        //     if (this.shopmsgcallback) {
        //         this.shopmsgcallback(res);
        //     }
        //     console.log("!!!!!!!!!!!!!!");
        // }

        // wx.redirectTo({
        //     url: "../index/index"
        // })
        // this.ShortConnect(this.url +"/users/SaveUserInformation",{
        //   username: this.openid,
        // },"username");
        // index.indexObject.userInfo=res;
        // console.log(index.indexObject.userInfo);
        // wx.navigateTo({
        //   url: "pages/index/index"
        // }) 
    },
    // 获取用户信息
    GetUserInfo: function(res) {
        var self = this;
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo;
        console.log(this.openid + "6666666666");
        res.username = this.openid;
        console.log(JSON.stringify(res));
        this.ShortConnect(this.url + "/users/SaveUserInformation", res, "userInfo");
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情 况
        // if (this.userInfoReadyCallback) {
        //     this.userInfoReadyCallback(res)
        // }
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo;
        //                     console.log("5555555" + JSON.stringify(res));
        //                     withCredentials: true,
        //                         res.username = this.openid;
        //                     this.ShortConnect(this.url + "/users/SaveUserInformation", res, "userInfo");
        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情 况 
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         } else {
        // // 可以将 res 发送给后台解码出 unionId
        // this.globalData.userInfo = res.userInfo;
        // withCredentials: true,
        //     res.username = this.openid;
        // this.ShortConnect(this.url + "/users/SaveUserInformation", res, "userInfo");
        // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // // 所以此处加入 callback 以防止这种情 况
        // if (this.userInfoReadyCallback) {
        //     this.userInfoReadyCallback(res)
        // }
        // wx.authorize({
        //     scope: 'scope.userInfo',
        //     success() {
        //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //         wx.getUserInfo({
        //             success: res => {
        //                 // 可以将 res 发送给后台解码出 unionId
        //                 this.globalData.userInfo = res.userInfo;
        //                 withCredentials: true,
        //                     res.username = this.openid;
        //                 this.ShortConnect(this.url + "/users/SaveUserInformation", res, "userInfo");
        //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                 // 所以此处加入 callback 以防止这种情 况
        //                 if (this.userInfoReadyCallback) {
        //                     this.userInfoReadyCallback(res)
        //                 }
        //             }
        //         })
        //     }
        // })
        //         }
        //     }
        // })
    },
    globalData: {
        userInfo: null
    }
})