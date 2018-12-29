// pages/ShopActicle/ShopActicle.js
import wxParse from '../../wxParse/wxParse.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scanCode:[],
        heightSwiper:[],
        bottomView: true,
        url: "",
        activityImage: [],
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
    turnIndex: function () {
        wx.switchTab({
            url: "../lck/index/index"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            scanCode:[4,2,9]
        })
        // app.ShortConnect(app.urlw+"Data/");

        // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        if (app.isSao)
        {   
            this.setData({

            })
            scene = decodeURIComponent(options.scene);
            console.log(JSON.stringify(scene)+"===========================");
        }
        // app.ShortConnect(app.urlw+"Data/AddShopOrder",{
        // },);
        this.setData({
            url: app.urlw3
        })
        var shopmsg2 = JSON.parse(decodeURIComponent(options.shopjson));
        options.shopurl = options.shopurl.split(",");
        if (app.shopWenZhangJson && app.wenzhangShop) {
            if (app.wenzhangShop.length > 0) {
                for (let i = 0; i <= app.wenzhangShop.length - 1; i++) {
                    if (typeof app.wenzhangShop[i].head=="string")
                    {
                        app.wenzhangShop[i].head = app.wenzhangShop[i].head.split(",");
                    }
                  
                    app.wenzhangShop[i].isOpen = false;
                }
                this.setData({
                    shopArray: app.wenzhangShop,
                    onePlice: app.wenzhangShop[0].shopprice,
                    chooseShop: app.wenzhangShop[0]
                })

            }
            if (typeof app.shopWenZhangJson.shophead == "string") {
                app.shopWenZhangJson.shophead = app.shopWenZhangJson.shophead.split(",");
            } else {

            }
            this.setData({
                shopJSon: app.shopWenZhangJson,
                shopJSon1: shopmsg2,
                shopHead: options.shopurl,
                shopIntroduction: options.introduction,
            })
            console.log(JSON.stringify(this.data.shopJSon)+"11111111111111111111111111111d");
            var article = this.data.shopJSon1.txt;
            wxParse.wxParse('article', 'html', article, this);


        } else {

            app.setwenzhangShop = res => {
                if (res.data.shopproducts.length > 0) {
                    for (let i = 0; i <= res.data.shopproducts.length - 1; i++) {
                        if (typeof res.data.shopproducts[i].head =="string")
                        {
                            res.data.shopproducts[i].head = res.data.shopproducts[i].head.split(",");
                        }
                    
                        res.data.shopproducts[i].isOpen = false;
                    }
                    this.setData({
                        shopArray: res.data.shopproducts,
                        onePlice: res.data.shopproducts[0].shopprice,
                        chooseShop: res.data.shopproducts[0]
                    })
                   

                }

                if (typeof res.data.shop.shophead == "string") {
                    res.data.shop.shophead = res.data.shop.shophead.split(",");

                } else {


                }
                this.setData({
                    shopJSon: res.data.shop,
                    shopJSon1: shopmsg2,
                    shopHead: options.shopurl,
                    shopIntroduction: options.introduction,
                })
                console.log(JSON.stringify(this.data.shopJSon) + "11111111111111111111111111111f");
                var article = this.data.shopJSon1.txt;
                wxParse.wxParse('article', 'html', article, this);
            }
        }
    },
    gunhdong: function (event) {
        if (parseInt(event.detail.scrollTop) > 10) {
            console.log("33");
            this.setData({
                bottomView: false
            })
        } else {
            this.setData({
                bottomView: true
            })
        }
        console.log(event.detail.scrollTop);
    },
    buy: function () {
        this.setData({
            buyBoxHidden: false,
        })
    },
    pressClose: function () {
        this.setData({
            buyBoxHidden: true,
        })
    },
    add: function () {
        this.setData({
            shopNumber: this.data.shopNumber + 1
        })


    },
    jian: function () {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
        }
    },
    loadImage: function (event) {
        let heightSwiper = this.data.heightSwiper;
        //计算此图片加载完是的高度
        let heightImage = 750 * event.detail.height / event.detail.width;
        heightSwiper[event.target.dataset.id] = heightImage;
        console.log(JSON.stringify(heightSwiper) + "=========================");
        this.setData({
            heightSwiper: heightSwiper
        })
    },
    changeSwiper: function (event) {
        this.setData({
            index: parseInt(event.detail.current) + 1,
        })
    },
    chooseShop: function (event) {

        this.setData({
            chooseIndex: event.currentTarget.dataset.index,
            onePlice: this.data.shopArray[event.currentTarget.dataset.index].shopprice,
            chooseShop: this.data.shopArray[event.currentTarget.dataset.index]
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    pressSure: function (event) {
        
        let data = {
            uid: app.uid,
          
            count: this.data.shopNumber,

        }
        if (app.isShare) {
            data.source = 2
        }
        else {
            data.source = 0;
        }
        let endtime = this.data.chooseShop.endtime;
        endtime = endtime.split(" ");
        data.endtime = endtime[0];
        data.head = this.data.chooseShop.head[0];
        data.pname = this.data.chooseShop.shoppname;
        data.price = this.data.onePlice * this.data.shopNumber;
        data.iswenzhang=true;
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        // app.ShortConnect(app.urlw + "Data/AddShopOrder", {
        //     shopid: this.data.shopJSon.shopid.toString(),
        //     shoppid: this.data.chooseShop.shoppid.toString(),
        //     pcount: this.data.shopNumber.toString(),
        //     uid: app.uid,
        //     buysource: 0,
        //     fromuid: 0, 
        //     shopessayuid: this.data.shopJSon1.shopauthoruid.toString(),
        //     shopeid: this.data.shopJSon1.shopeid.toString()
        // }, "pay");

        // console.log(JSON.stringify(this.data.shopJSon));
        if (app.isShare) {
            wx.navigateTo({
                url: '../lck/order/order?interSource=2&shoppid=' + this.data.chooseShop.shoppid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopeid=" + this.data.shopJSon1.shopeid.toString() + "&shopid=" + this.data.shopJSon.shopid.toString() + "&essayuid=" + this.data.shopJSon1.shopauthoruid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopname=" + this.data.shopJSon.shopname,
            });
        }
        else {
            wx.navigateTo({
                url: '../lck/order/order?interSource=0&shoppid=' + this.data.chooseShop.shoppid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopeid=" + this.data.shopJSon1.shopeid.toString() + "&shopid=" + this.data.shopJSon.shopid.toString() + "&essayuid=" + this.data.shopJSon1.shopauthoruid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&inter=wenzhang" + "&shopname=" + this.data.shopJSon.shopname,
            });
        }
    },

    pressDetail: function (event) {
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
    onReady: function () {

    },
 
    turnDazhe:function(){
        console.log(JSON.stringify(this.data.shopJSon));
        wx.navigateTo({
            url: '../Discount/Discount?shopid=' + this.data.shopJSon.shopid.toString() + "&shopJSon=" + JSON.stringify(this.data.shopJSon),
        })       
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // app.buyNumber = this.data.shopNumber;
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
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log(JSON.stringify(this.data.shopJSon));
        console.log(JSON.stringify(this.data.shopJSon1));
        var self = this;
        var shareObj = {
            desc: '距离成功只差一步，求少侠出手！',
            title: '分享商城',
            path: 'pages/ShopActicle/ShopActicle',
            success: function (res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    console.log('shareAppMessage:ok');
                    app.ShortConnect(app.urlw + "Data/ShopEssayForword", {
                        shopeid: self.data.shopJSon1.shopeid,
                        uid: app.uid
                    }, "");
                }
            },
            fail: function (res) {　　　　　　 // 转发失败之后的回调
                console.log(res.errMsg);
            },
        }
        console.log(shareObj);
        return shareObj;

    }
})