// pages/detailshop/detailshop.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url3: [],

        textOpacity: 0,
        //图片透明度
        imageOpacity: 0,
        url2: "https://share.ykplay.com",
        url: [],
        //用户信息
        userInfo: {},
        countDownList: [],
        actEndTimeList: "",
        commMsg: {},
        orientation: "left",
        marqueeDistance2: 82,
        size: "13",
        //文字加图片移动的距离
        moveDistance1: 0,
        moveDistance2: 0,
        //文字的块
        textWidth: 0,
        getText: "……已领取了……商品",
        buttonText: "分享好友免费拿",
        isShare: false,
        shopNumber: 0,
        marqueeDistance3: 100,
        //帮助好友数组
        helpFriend: [],
        pressName: "",
        hidden: true,
        //保存商家信息
        shopperMsg: {},
        //文字和图片向上移动的速度
        speed: 2,
        //是否获取用户信息
        isGetMsg: false,
        buttonAuthroity: "",
        //用户信息回调
        userBack: "",
        price: 0,
        shopPosition: "南开区水上公园西路水运花 园B区5号楼",
        startTime1: "",
        overTime1: "",
        //商品id
        commid: 0,
        //存取该商品领取人数
        getNumber: null,
        //商家图片数组
        shoperPicture: [],
        //声明当前页
        index: 1,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.setLong = res => {
            this.setData({
                getText: "……已领取了此商品"
            })
            this.setData({
                getText: res.slice(0, 3) + this.data.getText,
                marqueeDistance3: 100,
                marqueeDistance2: 82,
                textOpacity: 0,
                imageOpacity: 0,
            })
            console.log(this.data.imageOpacity);
            //初始化移动距离
            this.move();
        }
        var arrayPath = [];
        //声明数组
        var arrayPath1 = [];
        console.log(options.shopmsg + "5555555555555555555555");
        var startTime = app.detailShopMsg.comm[0].startTime.slice(0, 10);
        var overTime = app.detailShopMsg.comm[0].validTime.slice(0, 10);
        console.log(app.detailShopMsg.cerchan[0].filepath.indexOf(","));
        console.log(app.detailShopMsg.cerchan[0].filepath);
        if (app.detailShopMsg.comm[0].filepath != null) {
            if (app.detailShopMsg.comm[0].filepath.indexOf(",") >= 0) {
                arrayPath = app.detailShopMsg.comm[0].filepath.split(",");
            } else {

                arrayPath[0] = app.detailShopMsg.comm[0].filepath;
            }
        }
        for (var i = 0; i <= arrayPath.length - 1; i++) {
            arrayPath[i] = app.url + arrayPath[i];
        }

        if (app.detailShopMsg.comm[0].commDetails != null) {
            if (app.detailShopMsg.comm[0].commDetails.indexOf(",") >= 0) {
                arrayPath1 = app.detailShopMsg.comm[0].commDetails.split(",");
                console.log(arrayPath1);
            } else {
               
                arrayPath1[0] = app.detailShopMsg.comm[0].commDetails;
            }
        }
        console.log(arrayPath1);
        for (var i = 0; i <= arrayPath1.length - 1; i++) {
            arrayPath1[i] = app.url + arrayPath1[i] ;
        }
        if (app.detailShopMsg.cerchan[0].filepath.indexOf(",") >= 0) {
            this.setData({
                shoperPicture: app.detailShopMsg.cerchan[0].filepath.split(",")
            })
            console.log(this.data.shoperPicture);
        } else {
            if (app.detailShopMsg.cerchan[0].filepath != null) {
                this.data.shoperPicture[0] = app.detailShopMsg.cerchan[0].filepath;
                this.setData({
                    shoperPicture: this.data.shoperPicture
                })
            }
        }
        //   app.detailShopMsg.cerchan[0].startTime = app.detailShopMsg.cerchan[0].startTime.slice(0,5);
        console.log(arrayPath1);
        //   app.detailShopMsg.cerchan[0].endTime = app.detailShopMsg.cerchan[0].endTime.slice(0, 5);
        this.setData({
            url3: arrayPath1,
            userInfo: app.detailShopMsg.user[0],
            commMsg: app.detailShopMsg.comm[0],
            price: parseInt(app.detailShopMsg.comm[0].price),
            startTime1: startTime,
            overTime1: overTime,
            commid: parseInt(options.shopid),
            getNumber: app.detailShopMsg.SuccNumber,
            shopperMsg: app.detailShopMsg.cerchan[0],
            url: arrayPath
        })
        // if (app.isShare) {
        //     app.shopNumber = parseInt(options.id);
        //     console.log(options.id + "777777777777777777");
        //     var startTime = JSON.parse(options.shopmsg).startTime.slice(0, 10);
        //     var overTime = JSON.parse(options.shopmsg).validTime.slice(0, 10);
        //     console.log("66666666666666666");
        //     this.setData({
        //         isShare: true,
        //         helpFriend: JSON.parse(options.helpFriend),
        //         shopNumber: parseInt(options.id),
        //         commMsg: JSON.parse(options.shopmsg),
        //         url: app.url + JSON.parse(options.shopmsg).filepath,
        //         price: parseInt(JSON.parse(options.shopmsg).price),
        //         buttonAuthroity: "getUserInfo",
        //         userBack: "getuser",
        //         commid: JSON.parse(options.shopmsg).commid,
        //     })
        // } else {
        //     console.log(options.shopmsg + "5555555555555555555555");
        //     var startTime = app.detailShopMsg.comm[0].startTime.slice(0, 10);
        //     var overTime = app.detailShopMsg.comm[0].validTime.slice(0, 10);
        //     this.setData({
        //         userInfo: app.detailShopMsg.user[0],
        //         commMsg: app.detailShopMsg.comm[0],
        //         url: app.url + app.detailShopMsg.comm[0].filepath,
        //         price: parseInt(app.detailShopMsg.comm[0].price),
        //         startTime1: startTime,
        //         overTime1: overTime,
        //         commid: parseInt(options.shopid),
        //         getNumber: app.detailShopMsg.SuccNumber,
        //     })
        // }
    },
    PressSwiper: function(event) {

        this.setData({
            index: parseInt(event.detail.current) + 1,
        })
    },
    //点击游戏规则
    pressGame: function() {
        //游戏规则弹窗
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: " 1. 邀请好友参与游戏,分享数到所参与商品的最大值后,即可免费领取商品。\r\n2. 每一个参与链接,每个用户只能参与一次。\r\n3. 每次好友参与只提供一点分享数。\r\n4. 每个用户只能同时进行10个商品的领取。\r\n5. 领取成功后用户可在商品详情中查看领取的商品。\r\n6. 当商品的活动时间或商家活动时间过期后,信息作废。\r\n7. 每个礼物每人只能领取一次。\r\n8. 本程序所有实体商品只限天津地区包邮,非天津地区的用户。\r\n9.每个用户每天只有五次帮助分享的机会。\r\n10所有商品解释权归指点迷津官方所有。",
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    //点击分享好友免费拿
    PressShare: function() {
        app.ShortConnect(app.url + "/commodity/GetShareCommodityLink", {
            "username": app.openid,
            "commid": this.data.commid,
        }, "turnshare");
        //   console.log("33");
        //   var id1 = app.shopNumber.toString();
        //   //修改转发属性
        //   wx.showShareMenu({
        //       withShareTicket: true
        //   })
        // return custom share data when user share.

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //获取到文字框的rpx像素
        //获取屏幕宽
        var self = this;
        wx.getSystemInfo({
            success: function(res) {
                var windowWidth = (12 * self.data.size * 750 / res.windowWidth) + 50;
                self.setData({
                    textWidth: windowWidth,
                })
                // let windowHeight = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px
                console.log(self.data.textWidth) //最后获得转化后得rpx单位的窗口高度
            }
        })
        // this.setData({
        //     textWidth: this.data.getText.length * this.data.size
        // })


    },
    //计时隐藏函数
    ActiviteFalse: function() {
        var self = this;
        var interval2 = setTimeout(function() {
            var interval1 = setInterval(function() {
                self.setData({
                    imageOpacity: self.data.imageOpacity - 1 / (82 / self.data.speed),
                    textOpacity: self.data.textOpacity - 1 / (82 / self.data.speed)
                })
                if (self.data.imageOpacity <= 0 && self.data.textOpacity <= 0) {
                    clearInterval(interval1);
                }
            }, 20);
        }, 10000);
    },
    //循环移动
    move: function() {
        var self = this;
        var interval3 = setInterval(function() {
            if (self.data.marqueeDistance3 > 18) {
                console.log(self.data.marqueeDistance3);
                console.log(self.data.imageOpacity);
                self.setData({
                    marqueeDistance3: self.data.marqueeDistance3 - self.data.speed,
                    imageOpacity: self.data.imageOpacity + 1 / (82 / self.data.speed)
                });
            } else {
                console.log(77777777777777777777);
                // clearInterval(interval);
                // self.setData({
                //     marqueeDistance2: self.data.textWidth,
                // });
                // self.move();
            }
            if (self.data.marqueeDistance2 > 0) {
                self.setData({
                    marqueeDistance2: self.data.marqueeDistance2 - self.data.speed,
                    textOpacity: self.data.textOpacity + 1 / (82 / self.data.speed)
                });
            } else {

                self.ActiviteFalse();
                clearInterval(interval3);
            }
        }, 20);
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
    onShareAppMessage: function(res) {
        // var id1 = app.shopNumber.toString();
        // //修改转发属性
        // wx.showShareMenu({
        //     withShareTicket: true
        // })
        // // return custom share data when user share.
        // return {
        //     title: '分享商城',
        //     path: '/pages/shopshare/shopshare?id=' + id1 + "&user=" + JSON.stringify(this.data.userInfo) + "&shopmsg=" + JSON.stringify(this.data.commMsg)+"&helpFriend=" + JSON.stringify(this.data.helpFriend) ,
        //     success: function(res) {
        //         console.log(JSON.stringify(res) + "onShareAppMessage");
        //         // 转发成功之后的回调
        //         if (res.errMsg == 'shareAppMessage:ok') {}
        //     },
        // }
        //   if (res.from == 'button') {
        //       var id1 = app.shopNumber.toString();
        //       //修改转发属性
        //       wx.showShareMenu({
        //           withShareTicket: true
        //       })
        //       // return custom share data when user share.
        //       return {
        //           title: '分享商城',
        //           path: '/pages/shopshare/shopshare?id=' + id1 + "&user=" + JSON.stringify(this.data.userInfo) + "&shopmsg=" + JSON.stringify(this.data.commMsg) + "&helpFriend=" + JSON.stringify(this.data.helpFriend),
        //           success: function (res) {
        //               console.log(JSON.stringify(res) + "onShareAppMessage");
        //               // 转发成功之后的回调
        //               if (res.errMsg == 'shareAppMessage:ok') { }
        //           },
        //       }
        //   }
        //   else {
        //       var id1 = app.shopNumber.toString();
        //       //修改转发属性
        //       wx.showShareMenu({
        //           withShareTicket: true
        //       })
        //       // return custom share data when user share.
        //       return {
        //           title: '分享商城',
        //           path: '/pages/shopshare/shopshare?id=' + id1 + "&user=" + JSON.stringify(this.data.userInfo) + "&shopmsg=" + JSON.stringify(this.data.commMsg) + "&helpFriend=" + JSON.stringify(this.data.helpFriend),
        //           success: function (res) {
        //               console.log(JSON.stringify(res) + "onShareAppMessage");
        //               // 转发成功之后的回调
        //               if (res.errMsg == 'shareAppMessage:ok') { }
        //           },
        //       }
        //   }
    }
})