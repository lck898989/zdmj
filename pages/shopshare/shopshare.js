// pages/shopshare/shopshare.js

var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loadHidden: true,
        hidden4: false,
        //用户信息
        userInfo: {},
        countDownList: [],
        actEndTimeList: "",
        commMsg: {},
        //更多商品数组
        moreShop: [],
        //需要分享数
        shareNumber: 150,
        shareProcess: 0,
        buttonText: "推荐好友免费拿",
        isShare: false,
        shopNumber: 0,
        //帮助好友数组
        helpFriend: [],
        pressName: "HelpFriend",
        hidden: true,
        //是否获取用户信息
        isGetMsg: false,
        buttonAuthroity: "",
        //用户信息回调
        userBack: "",
        url1: "https://share.ykplay.com",
        url: "",
        //商品idm
        commid: 0,
        buttonZuo: "share",
        pressName1: "",
        userBack1: "",
        //查看详情模态弹窗
        hidden1: true,
        hidden2: true,
        //存储我的体验吗
        getCode: "",
        //存储我的商品已有多少人领取
        getNumber: null,
        //分享界面
    },
    onShareAppMessage(Object) {
        console.log("555");
        var id1 = app.shopNumber;
        // //修改转发属性
        // wx.showShareMenu({
        //     withShareTicket: true
        // })
        var moreshop1 = [];

        for (var i = 0; i <= this.data.moreShop.length - 1; i++) {
            if (this.data.moreShop.length - 1 >= i + 1) {
                moreshop1[i] = this.data.moreShop[i];
                if (i == 3) {
                    break;
                }
            }
        }
        var bb = JSON.stringify(this.data.commMsg);
        var shoemsg1 = encodeURIComponent(bb);
        console.log(shoemsg1);
        // console.log(JSON.parse(bb));
        // return custom share data when user share.
        var shareObj = {
            desc: '距离成功只差一步，求少侠出手！',
            title: '分享商城',
            path: '/pages/shopshare/shopshare?id=' + id1 + "&user=" + JSON.stringify(this.data.userInfo) + "&shopmsg=" + shoemsg1 + "&helpFriend=" + JSON.stringify(this.data.helpFriend) + "&moreComm=" + JSON.stringify(moreshop1),
            success: function(res) {
                console.log("333");
                console.log(JSON.stringify(res) + "onShareAppMessage");
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {}
            },
            fail: function(res) {　　　　　　 // 转发失败之后的回调
                console.log(res.errMsg);
            },
        }
        return shareObj;
    },
    //跳转分享界面
    pressGetMian: function(event) {
        if (app.isShare == false) {
            console.log(event.currentTarget.dataset.hi);
            app.ShortConnect(app.url + "/commodity/GetShareCommodityLink", {
                "username": app.openid,
                "commid": event.currentTarget.id,
            }, "turnshare");
        } else {
            wx.getSetting({
                success(res) {
                    //当授权时
                    if (res.authSetting['scope.userInfo']) {
                        app.ShortConnect(app.url + "/commodity/ShowAllCommodity", {}, "shop");
                        wx.switchTab({
                            url: "../index/index",
                        })
                    } else {
                        console.log("????????????????");
                        wx.reLaunch({
                            url: '../wxscope/wxscope'
                        })
                    }
                }
            })
        }

        // wx.navigateTo({
        //     url: '../shopshare/shopshare?id=' + app.shopNumber.toString(),
        // })
        //访问
        // app.ShortConnect();
    },
    onGotUserInfo: function(e) {
        // this.setData({
        //     buttonText: "我也要免费领取",
        //     hidden: false,
        //     buttonAuthroity: "share"
        // })
        this.setData({
            userInfo: e.detail.userInfo,
            pressName: "HelpFriend",
            buttonAuthroity: "",
            userBack: "",
        })
        // wx.redirectTo({
        //     url: '../detailshop/detailshop'
        //  })
        // if (this.data.isGetMsg == false) {

        //     // wx.redirectTo({
        //     //     url: '../index/index'
        //     // })
        //     // console.log("ttttt");
        // }
        // this.setData({
        //     isGetMsg: true,
        // })
    },
    //跳转商品详情界面
    TurnDetailShop: function() {
        if (app.helpFriend != null) {
            var id1 = this.data.commMsg.orderNumber;
            console.log("onGotUserInfo");
            // app.GetUserInfo(e.detail);
            wx.redirectTo({
                url: '../detailshop/detailshop?id=' + id1 + "&user=" + JSON.stringify(this.data.userInfo) + "&shopmsg=" + JSON.stringify(this.data.commMsg) + "&helpFriend=" + JSON.stringify(app.helpFriend),
            })
        }
    },
    //点击帮好友砍刀
    HelpFriend: function() {
        //访问保存用户信息接口
        //显示按钮
        //发送消息到服务器
        app.ShortConnect(app.url + "/commodity/JudgeUserFirstClick ", {
            username: app.openid,
            orderNumber: this.data.shopNumber
        }, "helpFriend");
        // app.ShortConnect("https://192.168.1.114:13579"+ "/commodity/JudgeUserFirstClick ", {
        //     username: app.openid,
        //     orderNumber: this.data.shopNumber
        // }, "helpFriend");
    },
    //点击分享规则
    pressShareGui: function() {
        //游戏规则弹窗
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: "  1. 邀请好友参与游戏,分享数到所参与商品的最大值后,即可免费领取商品。\r\n2. 每一个参与链接,每个用户只能参与一次。\r\n3. 每次好友参与只提供一点分享数。\r\n4. 每个用户只能同时进行10个商品的领取。\r\n5. 领取成功后用户可在商品详情中查看领取的商品。\r\n6. 当商品的活动时间或商家活动时间过期后,信息作废。\r\n7. 每个礼物每人只能领取一次。\r\n8. 本程序所有实体商品只限天津地区包邮,非天津地区的用户。\r\n9.每个用户每天只有五次帮助分享的机会。\r\n10所有商品解释权归指点迷津官方所有。",
            // content: '第一行内容\r\n第二行内容\r\n第三行内容\r\n第四行内容',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //点击浏览商城
    cancel: function() {
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    app.ShouQuan();
                    wx.switchTab({
                        url: "../index/index",
                    })
                } else {
                    console.log("????????????????");
                    wx.reLaunch({
                        url: '../wxscope/wxscope'
                    })
                }
            }
        })
    },
    //绑定分享好友或群方法s
    TurnIndex: function() {
        wx.navigateTo({
            url: '../wxscope/wxscope'
        })
    },
    //商品到达分享度，点击立即免费领取
    PressGetShop: function(e) {
        console.log("3333");
        console.log(e.detail.errMsg);
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            console.log(app.shopNumber);
            console.log(this.data.commMsg.commName);
            console.log(e.detail);
            console.log(e.detail);
            app.ShortConnect(app.url + "/commodity/GetExperienceCode", {
                orderNumber: app.shopNumber,
                commName: this.data.commMsg.commName,
                phone: e.detail
            }, "experience");
        }
    },
    //点击我也要免费拿
    PressGetMe: function() {
        //修改转发属性
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    //点击返回页面
    confirm: function() {
        this.setData({
            hidden: true,
        })
    },

    // cancel1:function(){

    // },
    //点击返回界面
    confirm1: function() {
        this.setData({
            hidden2: true,
        })
    },
    //点击浏览商城
    //点击浏览商城
    cancel1: function() {
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    app.ShortConnect(app.url + "/commodity/ShowAllCommodity", {}, "shop");
                    wx.switchTab({
                        url: "../index/index",
                    })
                } else {
                    wx.reLaunch({
                        url: '../wxscope/wxscope'
                    })
                }
            }
        })
    },

    //点击查看详情界面
    pressDetail: function() {
        app.shopMsg = null,
            // app.openShare=false;
            app.isPressDetail = true;
        // app.ShortConnect(app.url + "/commodity/ShowAllCommodity", {}, "shop");
        wx.switchTab({
            url: "../myshop/myshop",
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var arrayPath = [];
        if (app.isShare) {
            console.log(JSON.parse(decodeURIComponent(options.shopmsg)));
            console.log("88888888888888888888888888");
            // console.log(app.url + JSON.parse(options.shopmsg).filepath);
            console.log(options.id);
            console.log(JSON.parse(options.user));
            // console.log(JSON.parse(options.shopmsg));
            console.log(JSON.parse(options.helpFriend));
            console.log(options.moreComm);
            console.log(typeof options.moreComm);
            console.log(JSON.parse(options.moreComm));
            // this.setData({
            //     loadHidden: false,
            // })
            // wx.showLoading({
            //     title: '加载中',
            // })
            var b = JSON.parse(options.moreComm);
            this.setData({
                // loadHidden:true,
                url: app.url + JSON.parse(decodeURIComponent(options.shopmsg)).filepath,
                buttonText: "接受ta分享",
                isShare: true,
                shopNumber: options.id,
                userInfo: JSON.parse(options.user),
                commMsg: JSON.parse(decodeURIComponent(options.shopmsg)),
                helpFriend: JSON.parse(options.helpFriend),
                moreShop: b
            })
           wx.hideLoading();
            console.log("buttonText");
            //帮好友砍刀成功接受回调弹框
            //帮好友砍刀成功
            app.getHelpFriend = res => {
                res.data.comm[0].shareNumber = res.data.shareNumber;
                res.data.comm[0].price = parseInt(res.data.comm[0].price);
                res.data.comm[0].startTime = res.data.comm[0].startTime.slice(0, 10);
                res.data.comm[0].validTime = res.data.comm[0].validTime.slice(0, 10);
                this.setData({
                    helpFriend: res.data.helpName,
                    buttonText: "我也要免费获取",
                    hidden: false,
                    buttonAuthroity: "",
                    userBack: "",
                    pressName: "TurnIndex",
                    commMsg: res.data.comm[0],
                    // shareProcess: (parseInt(res.data.commMsg.price) / this.data.shareNumber * 100).toString
                })
                console.log(this.data.commMsg);
            }
            //
            //打开帮好友看过一次隐藏开关
            app.setHidden2 = res => {
                this.setData({
                    hidden2: false,
                    buttonText: "我也要免费获取",
                    buttonAuthroity: "",
                    userBack: "",
                    pressName: "TurnIndex",
                })
            }
            this.countDown();

        } else {
            //打开免费领取框领取开关
            app.setHidden1 = res => {
                console.log("44");
                this.setData({
                    hidden1: false,
                    getCode: res.data.code,
                })

            }
            for (var i = 0; i <= app.detailShopMsg.comm.length - 1; i++) {
                if (app.detailShopMsg.comm[i].filepath.indexOf(",") >= 0) {

                    arrayPath = app.detailShopMsg.comm[i].filepath.split(",");
                    app.detailShopMsg.comm[i].filepath = arrayPath[0];
                }
            }
            for (var i = 0; i <= app.detailShopMsg.moreComm.length - 1; i++) {
                if (app.detailShopMsg.moreComm[i].filepath.indexOf(",") >= 0) {

                    arrayPath = app.detailShopMsg.moreComm[i].filepath.split(",");
                    app.detailShopMsg.moreComm[i].filepath = arrayPath[0];
                }
            }
            app.detailShopMsg.comm[0].startTime = app.detailShopMsg.comm[0].startTime.slice(0, 10);
            app.detailShopMsg.comm[0].validTime = app.detailShopMsg.comm[0].validTime.slice(0, 10);
            if (app.detailShopMsg.comm[0].shareNumber == 0) {
                this.setData({
                    url: app.url + app.detailShopMsg.comm[0].filepath,
                    userInfo: app.detailShopMsg.user[0],
                    commMsg: app.detailShopMsg.comm[0],
                    helpFriend: app.detailShopMsg.helpName,
                    userBack1: "PressGetShop",
                    buttonText: "立即免费获取",
                    buttonZuo: "getPhoneNumber",
                    moreShop: app.detailShopMsg.moreComm,

                })

            } else {
                this.setData({
                    url: app.url + app.detailShopMsg.comm[0].filepath,
                    userInfo: app.detailShopMsg.user[0],
                    commMsg: app.detailShopMsg.comm[0],
                    helpFriend: app.detailShopMsg.helpName,
                    moreShop: app.detailShopMsg.moreComm,
                    shareProcess: (parseInt(app.detailShopMsg.comm[0].price) / this.data.shareNumber * 100).toString(),


                })
                console.log(this.data.helpFriend);
                // this.setData({
                //     shareProcess: (parseInt(app.detailShopMsg.comm[0].price) / this.data.shareNumber * 100).toString()
                // })
            }
            console.log(JSON.stringify(this.data.helpFriend));
            this.countDown();
        }
        console.log(this.data.shareProcess + "///");
        // this.data.shareProcess;
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
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        // let endTimeList = this.data.actEndTimeList;
        let countDownArr = [];
        let day = "";
        let hou = "";
        let min = "";
        let sec = "";
        let days = "";
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.makeDate(this.data.commMsg.validTime)).getTime();
        let obj = null;
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
            //   obj = {
            //       day= this.timeFormat(parseInt(time / (60 * 60 * 24))),
            //       hou= this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)),
            //       min= this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)),
            //       sec= this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60))
            //   }
        } else { //活动已结束，全部设置为'00'
            day = '0';
            hou = '00';
            min = '00';
            sec = '00';
            // obj = {
            //     day: '00',
            //     hou: '00',
            //     min: '00',
            //     sec: '00'
            // }
        }
        this.data.commMsg.time = {
            days: day,
            hous: hou,
            mins: min,
            secs: sec,
        }
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            commMsg: this.data.commMsg,
        })
        setTimeout(this.countDown, 1000);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(res) {


    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function() {

    // }
})