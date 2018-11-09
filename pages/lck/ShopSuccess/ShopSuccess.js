// pages/lck/ShopSuccess/ShopSuccess.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPull: false,
        //热门商品数组
        hotShop: [],
        url: "",
        hotEssay: [],

        shopName: "",
        //地址
        adress: "",
        shopNumber: "",
        shopAllplice: "",
        //初始化热门商品hidden
        shopviewHidden: true,
        essayviewHidden: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            shopName: app.shopName,
            //地址
            adress: app.adress,
            shopNumber: app.shopNumber,
            shopAllplice: app.shopAllplice,
        })
        app.rumenPage = 1;
        this.setData({
            url: app.urlw3
        })
        for (var i = 0; i <= app.hotShop.length - 1; i++) {
            app.hotShop[i].head = app.hotShop[i].head.split(",");
        }
        switch (options.buyType) {
            case "wenzhang":
                this.setData({
                    hotEssay: app.hotEssay,
                    essayviewHidden: false
                })
                break;
            case "shop":
                this.setData({
                    hotShop: app.hotShop,
                    shopviewHidden: false
                })
                break;
        }
        app.setHotArray = res => {
            var orderArray1 = this.data.hotShop;
            for (var i = 0; i <= res.data.hotProducts.length - 1; i++) {
                res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
                orderArray1.push(res.data.hotProducts[i]);
            }
            this.setData({
                hotShop: orderArray1,
                isPull: false
            })
            wx.hideLoading();
        }
    },
    pressBuy: function(event) {
        var shopmsg1 = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.shopmsg));
        console.log(typeof event.currentTarget.dataset.shopmsg);
        wx.navigateTo({
            url: '../../lck/cartGoodsDetail/cartGoodsDetail?interSource=0&inter=0' + "&goods=" + shopmsg1,
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

    },
    backIndex: function() {
        wx.switchTab({
            url: '../../indextwo/indextwo',
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    //点击查看详情界面
    checkDetail: function() {
        app.orderLoadPage = 1;
        console.log(app.orderLoadPage);
        app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
            uid: app.uid,
            page: app.orderLoadPage
        }, "interorder");
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
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})