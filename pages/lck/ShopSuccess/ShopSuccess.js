// pages/lck/ShopSuccess/ShopSuccess.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buyBoxHidden: true,
        indexShopArray:{},
        allDefault:false,
        top:null,
        allproducts:[],
        scrollHeight:null,
        srp:"https://shopfile.ykplay.com/resources/img_mine_BG.png",
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
            scrollHeight: app.seeHeight - 299 / app.ratio,
            top: 299 / app.ratio,
        })
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
            if (typeof app.hotShop[i].head=="string")
            {
                app.hotShop[i].head = app.hotShop[i].head.split(",");
            }
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
    buyShop: function (event) {
        console.log(event.currentTarget.dataset.pid);
        app.shopMsgJson = null;
        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
            pid: event.currentTarget.dataset.pid
        }, 'ActicleInterShop', function (r) { });
        wx.navigateTo({
            url: '../cartGoodsDetail/cartGoodsDetail'
        })
    },
    pressSure: function () {
        let data = {
            uid: app.uid,
            pid: this.data.indexShopJson.pid,
            size: this.data.indexShopJson.size,
            count: this.data.shopNumber,
        }
     
        if (app.isShare) {
            data.source = 2
        }
        else {
            data.source = 0;
        }
        data.head = this.data.indexShopJson.head[0];
        data.pname = this.data.indexShopJson.pname;
        data.price = this.data.indexShopArray.price;
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        wx.navigateTo({
            url: '../order/order?interSource=0',
        });
    },
    cancel:function(){
        this.setData({
            buyBoxHidden:true
        })
    },
    add: function () {
        this.setData({
            shopNumber: this.data.shopNumber + 1
        })
    },
    sub: function () {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
        }
    },
    buyShop1: function (event) {
        this.setData({
            allDefault: false
        })
        console.log(event.currentTarget.dataset.shop);
        // event.currentTarget.dataset.shop.head = event.currentTarget.dataset.shop.head.split(",");
        console.log(event.currentTarget.dataset.pid);
        if (event.currentTarget.dataset.shop.openstandard == 1) {
            this.setData({
                indexShopArray: event.currentTarget.dataset.shop,
            })
            app.ShortConnect(app.urlw + "Data/GetStandardByPid", {
                pid: event.currentTarget.dataset.pid
            }, "setSreachSize");
        } else {
            var selectsize = JSON.parse(event.currentTarget.dataset.shop.size);
            console.log(JSON.stringify(event.currentTarget.dataset.shop) + "333333333333");
            var keys = Object.keys(selectsize);
            var selectsize1 = {};
            for (let i = 0; i < keys.length; i++) {
                var value = selectsize[`${keys[i]}`];
                var keyss = keys[i].split(",");
                var values = value.split("|");
                for (let j = 0; j < keyss.length; j++) {
                    selectsize1[keyss[j]] = values[j];
                }
            }
            event.currentTarget.dataset.shop.size = selectsize1;
            var typeValueArr1 = Object.values(event.currentTarget.dataset.shop.size);
            var typeValueArr2 = [];
            this.data.typeArr = Object.keys(event.currentTarget.dataset.shop.size);
            for (let i = 0; i <= typeValueArr1.length - 1; i++) {
                let typeValueJson = {};
                console.log("typeArr is ", this.data.typeArr);
                for (let j = 0; j < this.data.typeArr.length; j++) {
                    typeValueJson[`${this.data.typeArr[j]}`] = [];
                    let tempArr = typeValueJson[`${this.data.typeArr[j]}`];
                    let tempJson = {}
                    tempJson.mode = typeValueArr1[i];
                    tempJson.touch = true;
                    tempArr.push(tempJson);
                }
                // typeValueJson.mode = typeValueArr1[i];
                // typeValueJson.touch = true
                typeValueArr2.push(typeValueJson);
            }
            console.log("typeValueArr2 is ", typeValueArr2);
            this.setData({
                buyBoxHidden: false,
                indexShopArray: event.currentTarget.dataset.shop,
                typeArr: Object.keys(event.currentTarget.dataset.shop.size),
                typeValueArr: typeValueArr2,
                goodShop: this.data.goodShop,
                indexShopJson: event.currentTarget.dataset.shop
            })
            let defaultCount = 0;
            for (let k = 0; k < this.data.typeValueArr.length; k++) {
                let itemType = this.data.typeValueArr[k];
                console.log("itemType is ", itemType);
                let key = this.data.typeArr[k];
                let tempJson = itemType[`${key}`];
                console.log("tempJson is ", tempJson);
                for (let m = 0; m < tempJson.length; m++) {
                    console.log("默认了吗：", tempJson[m].mode === '默认');
                    if (tempJson[m].mode === '默认') {
                        defaultCount++;
                    }
                }
            }
            if (defaultCount === this.data.typeArr.length) {
                console.log("所有的规格都是默认");
                this.setData({
                    allDefault: true
                })
            }
            console.log(this.data.buyBoxHidden + "333333333333");
        }
    },
    backIndex:function(){
        wx.reLaunch({
            url: '../index/index',
        })
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
    // backIndex: function() {
    //     wx.switchTab({
    //         url: '../../indextwo/indextwo',
    //     })
    // },
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