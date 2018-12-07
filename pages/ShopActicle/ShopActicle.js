// pages/ShopActicle/ShopActicle.js
import wxParse from '../../wxParse/wxParse.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bottomView:true,
        url: "",
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
        onePlice: 0,
        //店铺信息json
        shopJSon: {},
        //店铺信息
        shopJSon1: {},
        shopHead: [],
        shopIntroduction: "",
        chooseShop: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // app.ShortConnect(app.urlw+"Data/AddShopOrder",{
        // },);
        this.setData({
            url: app.urlw3
        })
        var shopmsg2 = JSON.parse(decodeURIComponent(options.shopjson));
        options.shopurl = options.shopurl.split(",");
        if (app.wenzhangShop) {
            for (let i = 0; i <= app.wenzhangShop.length - 1; i++) {
                app.wenzhangShop[i].head = app.wenzhangShop[i].head.split(",");
                app.wenzhangShop[i].isOpen = false;
            }
            if (typeof app.shopWenZhangJson.shophead == "string") {
                app.shopWenZhangJson.shophead = app.shopWenZhangJson.shophead.split(",");
            } else {

            }
            this.setData({
                shopArray: app.wenzhangShop,
                onePlice: app.wenzhangShop[0].shopprice,
                shopJSon: app.shopWenZhangJson,
                shopJSon1: shopmsg2,
                shopHead: options.shopurl,
                shopIntroduction: options.introduction,
            })
            this.setData({
                chooseShop: this.data.shopArray[0]
            })
            console.log(JSON.stringify(this.data.shopJSon) + "==================");
        } else {
            app.setwenzhangShop = res => {
                for (let i = 0; i <= res.data.shopproducts.length - 1; i++) {
                    res.data.shopproducts[i].head = res.data.shopproducts[i].head.split(",");
                    res.data.shopproducts[i].isOpen = false;
                }
                if (typeof res.data.shop.shophead == "string") {
                    res.data.shop.shophead = res.data.shop.shophead.split(",");

                } else {


                }
                this.setData({
                    shopArray: res.data.shopproducts,
                    onePlice: app.wenzhangShop[0].shopprice,
                    shopJSon: res.data.shop,
                    shopJSon1: shopmsg2,
                    shopHead: options.shopurl,
                    shopIntroduction: options.introduction,
                })
                this.setData({
                    chooseShop: this.data.shopArray[0]
                })
                console.log(JSON.stringify(this.data.shopJSon) + "==================");
            }
        }
        var article = this.data.shopJSon1.txt;
        wxParse.wxParse('article', 'html', article, this);

    },
    gunhdong: function (event) {
        if (parseInt(event.detail.scrollTop) > 10) {
            console.log("33");
            this.setData({
                bottomView: false
            })
        }
        else {
            this.setData({
                bottomView: true
            })
        }
        console.log(event.detail.scrollTop);
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
            onePlice: this.data.shopArray[event.currentTarget.dataset.index].shopprice,
            chooseShop: this.data.shopArray[event.currentTarget.dataset.index]
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    pressSure: function(event) {
        // let data = {
        //     uid: app.uid,
        //     pid: this.data.wenzhangJson.pid,
        //     size: this.data.wenzhangJson.selectsize,
        //     count: this.data.shopNumber,

        // }
        // if (app.isShare) {
        //     data.source = 2
        // }
        // else {
        //     data.source = 0;
        // }
        // data.head = this.data.wenzhangJson.product_head[0];
        // data.pname = this.data.wenzhangJson.product_name;
        // data.price = this.data.wenzhangJson.product_price * this.data.shopNumber;
        // let orderA = [];
        // orderA.push(data);
        app.ShortConnect(app.urlw + "Data/AddShopOrder", {
            shopid: this.data.shopJSon.shopid.toString(),
            shoppid: this.data.chooseShop.shoppid.toString(),
            pcount: this.data.shopNumber.toString(),
            uid: app.uid,
            buysource: 0,
            fromuid: 0,
            shopessayuid: this.data.shopJSon1.shopauthoruid.toString(),
            shopeid: this.data.shopJSon1.shopeid.toString()
        }, "pay");
        console.log(JSON.stringify(this.data.shopJSon));
        // if (app.isShare) {
        //     wx.navigateTo({
        //         url: '../lck/order/order?interSource=2&shoppid=' + this.data.chooseShop.shoppid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopeid=" + this.data.shopJSon1.shopeid.toString() + "&shopid=" + this.data.shopJSon.shopid.toString() + "&shopessayuid=" + this.data.shopJSon1.shopauthoruid.toString(),
        //     });
        // }
        // else {
        //     wx.navigateTo({
        //         url: '../lck/order/order?interSource=0&shoppid=' + this.data.chooseShop.shoppid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopeid=" + this.data.shopJSon1.shopeid.toString() + "&shopid=" + this.data.shopJSon.shopid.toString() + "&shopessayuid=" + this.data.shopJSon1.shopauthoruid.toString(),
        //     });
        // }
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
        app.buyNumber = this.data.shopNumber;
        if (this.data.wenzhangJson) {
            app.ShortConnect(app.urlw + 'Data/EssaySee', {
                eid: this.data.wenzhangJson.eid
            }, "SeeWen");
        } else {
            this.setSee = res => {
                console.log("SeeWen1");
                app.ShortConnect(app.urlw + 'Data/EssaySee', {
                    eid: res.eid
                }, "SeeWen");
            }
        }

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