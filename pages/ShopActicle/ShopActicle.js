// pages/ShopActicle/ShopActicle.js
import wxParse from '../../wxParse/wxParse.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:"",
        activityImage: ["https://share.ykplay.com/images/Index/a微信图片_20180927164654.jpg", "https://share.ykplay.com/images/Index/a微信图片_20180927164654.jpg"],
        index: 1,
        shop: {
            "article": "<p>&nbsp;&nbsp;&nbsp;&nbsp;威锋网无法安达市大大大多啊大大多安达市大大多撒啊敖德萨多撒多撒奥大多</p><p><img src=\"https://shop.ykplay.com/images/ueditor/1058932542901719040.jpg\" title=\"\" alt=\"TB1uZAahwHqK1RjSZJnXXbNLpXa-440-180.jpg\"/></p><p>&nbsp;&nbsp;&nbsp;&nbsp;不买都不好意思。安达市大所大所大大所多所</p>"
        },
        shopArray: [],
        chooseIndex: 0,
        shopNumber: 1,
        buyBoxHidden: true,
        shopproducts: [],
        //初始化单价
        onePlice:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            url:app.urlw3
        })
        if (app.wenzhangShop) {
            for (let i = 0; i <= app.wenzhangShop.length - 1; i++) {
                app.wenzhangShop[i].head = app.wenzhangShop[i].head.split(",");
                app.wenzhangShop[i].isOpen = false;
            }
            this.setData({
                shopArray: app.wenzhangShop,
                onePlice: app.wenzhangShop[0].shopprice
            })
        } else {
            app.setwenzhangShop = res => {
                for (let i = 0; i <= res.data.shopproducts.length - 1; i++) {
                    res.data.shopproducts[i].head = res.data.shopproducts[i].head.split(",");
                    res.data.shopproducts[i].isOpen = false;
                }
                this.setData({
                    shopArray: res.data.shopproducts,
                    onePlice: app.wenzhangShop[0].shopprice
                })
            }
        }
        var article = this.data.shop.article;
        wxParse.wxParse('article', 'html', article, this);

    },
    buy: function() {
        this.setData({
            buyBoxHidden: false,
        })
    },
    pressClose: function() {
        this.setData({
            buyBoxHidden: true,
        })
    },
    add: function() {
        this.setData({
            shopNumber: this.data.shopNumber + 1
        })


    },
    jian: function() {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
        }
    },
    changeSwiper: function(event) {
        this.setData({
            index: parseInt(event.detail.current) + 1,
        })
    },
    chooseShop: function(event) {
        this.setData({
            chooseIndex: event.currentTarget.dataset.index,
            onePlice: this.data.shopArray[event.currentTarget.dataset.index].shopprice
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    pressSure: function () {
        let data = {
            uid: app.uid,
            pid: this.data.wenzhangJson.pid,
            size: this.data.wenzhangJson.selectsize,
            count: this.data.shopNumber,

        }
        if (app.isShare) {
            data.source = 2
        }
        else {
            data.source = 0;
        }
        data.head = this.data.wenzhangJson.product_head[0];
        data.pname = this.data.wenzhangJson.product_name;
        data.price = this.data.wenzhangJson.product_price * this.data.shopNumber;
        let orderA = [];
        orderA.push(data);
        if (app.isShare) {
            wx.navigateTo({
                url: '../lck/order/order?interSource=2',
            });
        }
        else {
            wx.navigateTo({
                url: '../lck/order/order?interSource=0',
            });
        }
    },

    pressDetail: function(event) {
        if (this.data.shopArray[event.currentTarget.dataset.index].isOpen) {
            console.log("3");
            this.data.shopArray[event.currentTarget.dataset.index].isOpen = false;
            this.setData({
                shopArray: this.data.shopArray
            })
        } else {
            this.data.shopArray[event.currentTarget.dataset.index].isOpen = true;
            this.setData({
                shopArray: this.data.shopArray
            })
        }

    },
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})