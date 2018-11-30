// pages/indextwo/indextwo.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexs: 0,
        moveSpeed: 0,
        url: "http://shop.ykplay.com",
        url1: "http://shop.ykplay.com",
        //初始化typeview的海都
        loadHeight: 354,
        //初始化点开分类按钮
        isPressType: false,
        activityImage: ["https://share.ykplay.com/images/Index/a微信图片_20180927164654.jpg", "https://share.ykplay.com/images/Index/b微信图片_20180927164718.png"],
        //标签1 的活动图
        userInfeo: {},
        hotShop: [],
        //热门商品总页数
        remenPages: 0,
        //热门商品当前页数
        nowPage: 1,
        aa: [1, 2, 3, 4],
        isPull: false,
        //初始化类型数组
        typeArray: [],
        typeImage: ["../../resources/face_icon_1.png", "../../resources/face_icon_2.png", "../../resources/face_icon_3.png", "../../resources/face_icon_4.png", "../../resources/face_icon_5.png", "../../resources/face_icon_6.png", "../../resources/face_icon_7.png", "../../resources/face_icon_8.png", "../../resources/face_icon_9.png", "../../resources/face_icon_10.png"],

    },
    pressType: function(event) {
        console.log(event.currentTarget.id + "/////////////////////////");
        wx.navigateTo({
            url: '../lck/hotShopping/hotShopping?tid=' + event.currentTarget.id,
        })
    },
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
        }
    },
    changeSwiper: function(e) {
        this.setData({
            indexs: e.detail.current
        })
        console.log("333");
    },
   
    pressBuy: function(event) {
        console.log(typeof event.currentTarget.id);
        console.log(event.currentTarget.dataset.shopmsg);
        var shopmsg1 = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.shopmsg));
        console.log(typeof event.currentTarget.dataset.shopmsg);
        console.log("str is ", event.currentTarget.dataset.shopmsg);
        wx.setStorageSync("goods", event.currentTarget.dataset.shopmsg);
        wx.navigateTo({
            url: '../lck/cartGoodsDetail/cartGoodsDetail?interSource=0&inter=0'
        })
    },
    pressLoda: function() {
        console.log("3");
        if (this.data.isPressType) {
            this.setData({
                isPressType: false,
                loadHeight: 354,
            })
        } else {
            this.setData({
                isPressType: true,
                loadHeight: 531,
            })

        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (this.data.activityImage.length <= 3) {
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
        if (app.IndexTypeArray) {

            this.setData({
                typeArray: app.IndexTypeArray
            })
            console.log(this.data.typeArray);
        } else {
            app.setIndexTypeArray = res => {
                this.setData({
                    typeArray: res.data.tabs,
                })
                console.log(this.data.typeArray);
            }
        }
        app.setIndexHotArray = res => {
            var orderArray1 = this.data.hotShop;
            for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
                res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
            }
            for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
                orderArray1.push(res.data.hotProducts[i]);
            }
            this.setData({
                hotShop: orderArray1,
                isPull: false
            })
            wx.hideLoading();
        }
        if (app.hotShop) {
            for (var i = 0; i <= app.hotShop.length - 1; i++) {
                app.hotShop[i].head = app.hotShop[i].head.split(",");
                console.log(app.hotShop[i].head);
            }
            this.setData({
                hotShop: app.hotShop,
            })
            console.log(JSON.stringify(this.data.hotShop) + "hotshop");
        } else {
            app.setIndex2Hot = res => {
                for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
                    res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
                }
                this.setData({
                    hotShop: res.data.hotProducts,
                })
            }
            console.log(JSON.stringify(this.data.hotShop) + "hotshop");

        }
        this.setData({
            userInfeo: app.userInfo1.wechatMsg
        })

    },
    MoveSwiper: function() {

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
        app.ShortConnect(app.urlw + "Data/GetHotProducts", {
            page: 1
        }, "getPages");
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
        console.log(this.data.isPull +" onReachBottom");
        console.log(this.data.nowPage +" onReachBottom");
        console.log(app.orderPage +" onReachBottom");
        if (this.data.isPull == false && this.data.nowPage < app.orderPage) {
            this.setData({
                isPull: true,
                nowPage: this.data.nowPage + 1,
            })
            wx.showLoading({
                title: '加载中',
            });
            app.ShortConnect(app.urlw2 + "Data/GetHotProducts", {
                page: this.data.nowPage
            }, "loadIndexRemen");
        } else {
            wx.showToast({
                title: '已经到底了',
            })
            // this.setData({
            //   iscollisionBottom: true
            // })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        console.log("444");
        return {
            title: '这里的秘密,你知道多少?我来帮你指点迷津',
            path: '/pages/indextwo/indextwo'
        }
    }
})