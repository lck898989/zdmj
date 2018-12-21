// pages/zcw/friends/friends.js
import Const from '../../../utils/Const.js';
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year:"",
        day:"",
        heights:0,
        wechatImage: "",
        wechatName: "",
        userMsg: null,
        joinBotton: "",
        typeButton: "",
        userInfo: "",
        shareParentUid: "",
        buttonText: "马上加入",
        srcp2: 'https://shopfile.ykplay.com/resources/xiaoquan.png',
        srcp1: app.imageUrl + 'img_myfriend_letter.png',
        loadHidden: true,
        shareHidden: true,
        rebate: true,
        buyBoxHidden: true,
        hide: false,
     
        //头像数组
        friend: [

        ],
        imageHost: 'https://shopfile.ykplay.com/resources/ico_Lv'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(new Date().getMonth()+1);
        console.log(new Date().getDate());
        this.setData({
            hide: this.data.friend.length == 0 ? false : true,
            heights: app.seeHeight - 720 / app.ratio
        })
        if (app.isShare) {
            
            if (app.globalData.userInfo)
            {
                this.setData({
                    userMsg: app.globalData.userInfo.nickName
                })
            }
            else
            {
                app.setshared = res => {
                    this.setData({
                        userMsg: res.nickName
                    })
                }
            }
            console.log(options.avatarUrl);
            console.log("share4");
            this.setData({
                shareParentUid: options.uid,
                loadHidden: false,
                wechatImage: options.avatarUrl,
                wechatName: options.nickName,
                year: options.year,
                day: options.day
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

                })
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
                var self = this;
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                             app.isScope = true;
                            if (app.uid == null) {
                                app.isNoShou1 = res => {
                                    app.setJoin = res => {
                                        wx.hideLoading();
                                        app.ShortConnect(app.urlw + "Data/AddAgency", {
                                            parent: self.data.shareParentUid,
                                            child: app.uid
                                        }, "agree");
                                    }
                                    self.setData({
                                        typeButton: "getUserInfo",
                                        userInfo: "getUserInfo",
                                        buttonText: "马上加入",
                                        shareHidden: false,
                                        loadHidden: true,
                                    });
                                    wx.hideLoading();
                                }
                            } else {
                                // app.GetHasAgency = res => {
                                //   app.ShortConnect(app.urlw + "Data/HasAgency", {
                                //     parent: options.uid,
                                //     child: app.uid
                                //   }, "isGrade")
                                // }
                            }

                        } else {
                            app.setJoin = res => {
                                wx.hideLoading();
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.shareParentUid,
                                    child: app.uid
                                }, "agree");
                            }
                            self.setData({
                                typeButton: "getUserInfo",
                                userInfo: "getUserInfo",
                                buttonText: "马上加入",
                                shareHidden: false,
                                loadHidden: true,
                            });
                            wx.hideLoading();
                            // app.isScope = true;
                        }
                    }
                })
            } else {
                var self = this;
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                            app.isScope = true;
                            self.setData({
                                joinBotton: "changeBottom",
                                buttonText: "马上加入",
                                shareHidden: false,
                                loadHidden: true,
                                buyBoxHidden: true

                            })
                            wx.hideLoading();
                        } else {
                            app.setJoin = res => {
                                wx.hideLoading();
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.shareParentUid,
                                    child: app.uid
                                }, "agree");
                                // this.setData({
                                //     joinBotton: "changeBottom",
                                //     buttonText: "马上加入",
                                // })

                            }
                            self.setData({
                                typeButton: "getUserInfo",
                                userInfo: "getUserInfo",
                                buttonText: "马上加入",
                                shareHidden: false,
                                loadHidden: true,
                            });
                            console.log(self.data.userInfo);
                            console.log(self.data.typeButton);
                            console.log(self.data.buttonText);
                            wx.hideLoading();
                        }
                    }
                })
                // app.ShortConnect(app.urlw + "Data/HasAgency", {
                //   parent: options.uid,
                //   child: app.uid
                // }, "isGrade")
            }

        } else {
            app.isScope=true;
            this.setData({
                rebate: false,
                friend: app.helpFriends
            });
            console.log(this.data.friend);
        }
        
    },
    getUserInfo: function() {
        console.log("222222222222222222");
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
    addAdd1: function() {
        wx.navigateTo({
            url: '../myfriends/myfriends',
        })
    },
    addAdd: function() {
        this.setData({
            buyBoxHidden: false
        })

    },
    pressNull: function() {
        this.setData({
            buyBoxHidden: true
        })
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
        // if (res.scene == 1007 || res.scene == 1008) {
        //   self.isShare = true;
        // }
        // if(app.isShare){
        //   this.setData({
        //     shareHidden:false
        //   })
        // }

    },
    changeBottom: function() {
        app.ShortConnect(app.urlw + "Data/AddAgency", {
            parent: this.data.shareParentUid,
            child: app.uid
        }, "agree");
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
    onShareAppMessage: function() {
        let year = new Date().getMonth() + 1;
        let day = new Date().getDate();
        // console.log(new Date().getMonth() + 1);
        // console.log(new Date().getDate());
        // console.log(typeof app.uid);
        var shareUid = null;
        //当授权时
        if (app.isScope) {
            shareUid = app.uid.toString();
            console.log(shareUid + "==============");
        } else {
            shareUid = this.data.shareParentUid;
        }
        console.log(shareUid+"==============");
        var shareObject = {
            desc: '距离成功只差一步，求少侠出手！',
            title: '分享商城',
            path: '/pages/zcw/friends/friends?uid=' + shareUid + "&nickName=" + app.globalData.userInfo.nickName + "&avatarUrl=" + app.globalData.userInfo.avatarUrl + "&year=" + year.toString() + "&day=" + day.toString(),
            // path: 'pages/zcw/user/user',
            success: function(res) {
                console.log("???????2");
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    console.log("???????2");
                }
            },
            fail: function(res) {　　　　　　 // 转发失败之后的回调
                console.log(res.errMsg + "???????");
            },
            complete: function(res) {
                console.log(res.errMsg + "???????1");
            }
        }
        return shareObject;


    }
})