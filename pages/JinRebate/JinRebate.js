// pages/JinRebate/JinRebate.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageUrl: "",
        //分享者的微信头像
        wechatImage: "",
        //分享者的微信名
        wechatName: "",
        loadHidden: true,
        isPull: false,
        helpFriend: [],
        shareHidden: true,
        rebate: true,
        //判断数据是否触底
        iscollisionBottom: false,
        hotShop: [],
        joinBotton: "",
        typeButton: "",
        userInfo: "",
        shareParentUid: "",
        buttonText: "",
        url: "http://192.168.1.61:3150"

    },

    changeBottom: function() {
        app.ShortConnect("http://192.168.1.64:3150/Data/AddAgency", {
            parent: this.data.shareParentUid,
            child: app.uid
        }, "agree");
    },
    getUserInfo: function() {
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imageUrl: app.imageUrl
        })
        if (app.isShare) {
            console.log("share4");
            this.setData({
                shareParentUid: options.uid,
                loadHidden: false,
                wechatImage: options.avatarUrl,
                wechatName: options.nickName
            });
            wx.showLoading({
                title: '加载中',
            })
            app.isShouQuan1 = res => {
                console.log("msahngjia");
                this.setData({
                    joinBotton: "changeBottom",
                    buttonText: "马上加入",
                    shareHidden: false,
                    loadHidden: true,
                    hotShop: app.hotShop,
                })
                wx.hideLoading();

            }
            app.isNoShou1 = res => {
                app.setJoin = res => {
                    wx.hideLoading();
                    this.setData({
                        joinBotton: "changeBottom",
                        buttonText: "马上加入",
                    })

                }
                this.setData({
                    typeButton: "getUserInfo",
                    userInfo: "getUserInfo",
                    buttonText: "微信授权",
                    hotShop: app.hotShop,
                    shareHidden: false,
                    loadHidden: true,
                });
                wx.hideLoading();
            }
            
            app.setHotArray = res => {
                var orderArray1 = this.data.hotShop;
                for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
                    orderArray1.push(res.data.hotProducts[i]);
                }
                this.setData({
                    hotShop: orderArray1,
                    isPull: false,
                    shareHidden: false,
                })
                wx.hideLoading();
            }
            if (app.uid == null) {
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                            if (app.uid == null) {
                                app.GetHasAgency = res => {
                                    app.ShortConnect(app.urlw + "Data/HasAgency", {
                                        parent: options.uid,
                                        child: res.data.userInfo.uid
                                    }, "isGrade")
                                }
                            } else {
                                app.GetHasAgency = res => {
                                    app.ShortConnect(app.urlw + "Data/HasAgency", {
                                        parent: options.uid,
                                        child: app.uid
                                    }, "isGrade")
                                }
                            }

                        } else {
                            app.rumenPage = 1;
                            app.ShortConnect(app.urlw + "Data/GetHotProducts", {
                                page: app.rumenPage
                            }, "GetHot1");

                        }
                    }
                })

            } else {
                app.ShortConnect(app.urlw + "Data/HasAgency", {
                    parent: options.uid,
                    child: app.uid
                }, "isGrade")
            }

        } else {

            this.setData({
                rebate: false,
                helpFriend: app.helpFriends
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
        if (app.isShare) {
            if (this.data.isPull == false && app.rumenPage < app.orderPage) {
                app.rumenPage += 1;
                this.setData({
                    isPull: true
                })
                wx.showLoading({
                    title: '加载中',
                });
                app.ShortConnect(app.urlw + "Data/GetHotProducts", {
                    page: app.rumenPage
                }, "loadRemen");
            } else {
                wx.showToast({
                    title: '已经到底了',
                })
                this.setData({
                    iscollisionBottom: true
                })
            }

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        wx.getSetting({
            success(res) {
                var shareUid=null;
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    shareUid = app.uid.toString();
                    console.log(shareUid);
                } else {
                    shareUid = this.data.shareParentUid;
                }
                var shareObj = {
                    desc: '距离成功只差一步，求少侠出手！',
                    title: '分享商城',
                    path: 'pages/JinRebate/JinRebate?uid=' + shareUid + "&nickName=" + app.globalData.userInfo.nickName + "&avatarUrl=" + app.globalData.userInfo.avatarUrl,
                    success: function(res) {
                        console.log("333");
                        // 转发成功之后的回调
                        if (res.errMsg == 'shareAppMessage:ok') {
                            console.log("???????");
                        }
                    },
                    fail: function(res) {　　　　　　 // 转发失败之后的回调
                        console.log(res.errMsg);
                    },
                }
                return shareObj;
            }
        })
    }
})