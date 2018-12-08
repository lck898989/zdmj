// pages/ActicleScene/ActicleScene.js
import wxParse from '../../wxParse/wxParse.js'
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../utils/Request';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "",
        count: 1,
        buyBoxHidden: true,
        //存取页面转发者的uid
        transpondUid: null,
        //初始化页面的json
        wenzhangJson: null,
        getUserInfo: "",
        typeBttton: "",
        goShop: "",
        textButton: "",
        essayuid: "0",
        //初始化浏览数
        seeNumber: 0,
        shareNumber: 0,
        bottomView:true,
        goods: null,
        shopJson:null,
        activityImage: ["https://share.ykplay.com/images/Index/a微信图片_20180927164654.jpg", "https://share.ykplay.com/images/Index/a微信图片_20180927164654.jpg"],
        index: 1,
        shop: {
            "article": "<p>&nbsp;&nbsp;&nbsp;&nbsp;威锋网无法安达市大大大多啊大大多安达市大大多撒啊敖德萨多撒多撒奥大多</p><p><img src=\"https://shop.ykplay.com/images/ueditor/1058932542901719040.jpg\" title=\"\" alt=\"TB1uZAahwHqK1RjSZJnXXbNLpXa-440-180.jpg\"/></p><p>&nbsp;&nbsp;&nbsp;&nbsp;不买都不好意思。安达市大所大所大大所多所</p>"
        },
        shopArray: [{
            isOpen: false,
            name: "安达市大啊"
        }, {
            isOpen: false,
            name: "安达市大啊"
        }, {
            isOpen: false,
            name: "安达市大啊"
        }],
        chooseIndex: 0,
        shopNumber: 1,
        buyBoxHidden: true
    },
    wxchatScope: function() {
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    console.log("============");
                    app.ShouQuan();
                } else {

                }
            }
        })
    },
    
    pressSure:function(){
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
        if(app.isShare)
        {
            wx.navigateTo({
                url: '../lck/order/order?interSource=2',
            });
        }
        else
        {
            wx.navigateTo({
                url: '../lck/order/order?interSource=0',
            });
        }
    },
    pressClose:function(){
        this.setData({
            buyBoxHidden:true,
            shopNumber:1
        })
    },
    changeSwiper: function(event) {
        this.setData({
            index: parseInt(event.detail.current) + 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //减少商品数量
    sub: function() {
        if (this.data.count > 1) {
            this.setData({
                count: this.data.count - 1
            })
        }
    },
    add: function() {
        this.setData({
            count: this.data.count + 1
        })
    },
    onLoad: function(options) {
        this.setData({
            url: app.urlw3
        })
        app.setShopArrayJson = res => {
            console.log(JSON.stringify(res.data) + "////////////////////");
            res.data.product.head = res.data.product.head.split(",");
            this.setData({
                goods: res.data.product,
                goodsImageList: res.data.product.head
            })
        }
        // app.ShortConnect(app.urlw + "Data/GetProductByPid", {
        //     pid: this.data.wenzhangJson.pid
        // }, 'ActicleInterShop');
        app.setSeeNumber = res => {
            this.setData({
                seeNumber: res.data.see,
                shareNumber: res.data.forword
            })
        }
        var self = this;
        if (app.isShare) {
            console.log(options.wenzhangJson);
            var shop = JSON.parse(decodeURIComponent(options.wenzhangJson));
            var article = shop.article;
            wxParse.wxParse('article', 'html', article, this);
            app.agreeActicleShou = res => {
                this.setData({
                    textButton: "马上分享",
                    goShop: "shopButton",
                    typeBttton: "",
                    getUserInfo: "",
                })
            }
            app.setacticle = res => {
                this.setData({
                    textButton: "微信授权",
                    typeBttton: "getUserInfo",
                    getUserInfo: "wxchatScope",
                })

            }
            this.setData({
                transpondUid: options.uid,
                wenzhangJson: shop,
                essayuid: options.essayuid
            })
        } else {
            this.setData({
                textButton: "马上分享",
                typeBttton: "share",
            })
            if (app.wenzhangJson) {
                console.log(options.shopurl+ "111111111111111111111");
                var article = app.wenzhangJson.content;
                // let selectsize = JSON.parse(app.wenzhangJson.selectsize);
                // let keys=Object.keys(selectsize);
                // let selectsize1={};
                // for (let i = 0; i < keys.length; i++) {
                //     let value = selectsize[`${keys[i]}`];
                //     let keyss = keys[i].split(",");
                //     let values = value.split("|");
                //     for (let j = 0; j < keyss.length; j++) {
                //         selectsize1[keyss[j]] = values[j];
                //     }
                // }
                // console.log(JSON.stringify(selectsize1)+"333333333333");
                var wenzhangJson1 = {};
                // wenzhangJson1.selectsize = selectsize1;
                wenzhangJson1.essayhead = options.essayhead.split(",");
                wenzhangJson1.product_head = app.wenzhangJson.product_head.split(",");
                wenzhangJson1.profit = app.wenzhangJson.profit;
                wenzhangJson1.product_name = app.wenzhangJson.product_name;
                wenzhangJson1.essayuid = options.essayuid;
                wenzhangJson1.see = app.wenzhangJson.see;
                wenzhangJson1.time = app.wenzhangJson.time;
                wenzhangJson1.time = app.wenzhangJson.time;
                wenzhangJson1.rebate = app.wenzhangJson.rebate;
                wenzhangJson1.product_price = app.wenzhangJson.product_price;
                wenzhangJson1.title = options.title;
                wenzhangJson1.authorurl = options.authorurl;
                wenzhangJson1.authorname = options.authorname;
                wenzhangJson1.product_head = app.wenzhangJson.product_head.split(",");
                wenzhangJson1.otherprice = app.wenzhangJson.otherprice;
                wenzhangJson1.shopurl = options.shopurl;
                wenzhangJson1.pid = options.pid;
                wenzhangJson1.eid = options.eid;
                wenzhangJson1.article = app.wenzhangJson.content;
                this.setData({
                    wenzhangJson: wenzhangJson1,
                    essayuid: options.essayuid
                })
                app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                    pid: this.data.wenzhangJson.pid
                }, 'ActicleInterShop');
                wxParse.wxParse('article', 'html', article, self);
                console.log(typeof this.data.wenzhangJson.authorurl +"、、、、、、、、、、、、、、、、、、、、");
                console.log(JSON.stringify(this.data.essayhead) + "、、、、、、、、、、、、、、、、、、、、");
                // <view class='jingxuan' bindtap= 'acticleScene' data- pid='{{item.pid}}'  data- eid='{{item.eid}}' data- title='{{item.title}}' data- authorurl='{{url+item.author_head}}' data- authorname='{{item.author}}' data- shopurl='{{url+item.product_head}}' >
            } else {
                app.setEssay = res => {
                    console.log(options.shopurl + "111111111111111111111");
                    var article = res.data.essay.content;
                    var wenzhangJson1 = {};
                    // let selectsize = JSON.parse(res.data.essay.selectsize);
                    // console.log(selectsize + "333333333333");
                    // let keys = Object.keys(selectsize);
                    // console.log(keys + "333333333333");
                    // let selectsize1 = {};
                    // for (let i=0;i<keys.length;i++) {
                    //     let value = selectsize[`${keys[i]}`];
                    //     let keyss=keys[i].split(",");
                    //     let values=value.split("|");
                    //     for(let j=0;j<keyss.length;j++){
                    //         selectsize1[keyss[j]] = values[j];
                    //     }                        
                    // }
                    // console.log(JSON.stringify(selectsize1) + "333333333333");
                    // wenzhangJson1.authorname = res.data.essay.authorname;
                    wenzhangJson1.product_name = res.data.essay.product_name;
                    // wenzhangJson1.selectsize = selectsize1;
                    wenzhangJson1.otherprice = res.data.essay.otherprice;
                    wenzhangJson1.product_head = res.data.essay.product_head.split(",");
                    wenzhangJson1.essayhead = options.essayhead.split(",");
                    wenzhangJson1.see = res.data.essay.see;
                    wenzhangJson1.essayuid = options.essayuid;
                    wenzhangJson1.rebate = res.data.essay.rebate;
                    wenzhangJson1.time = res.data.essay.time;
                    wenzhangJson1.product_price = res.data.essay.product_price;
                    wenzhangJson1.title = options.title;
                    wenzhangJson1.authorurl = options.authorurl;
                    wenzhangJson1.authorname = options.authorname;
                    wenzhangJson1.shopurl = options.shopurl;
                    wenzhangJson1.pid = options.pid;
                    wenzhangJson1.eid = options.eid;
                    wenzhangJson1.article = res.data.essay.content;
                    this.setData({
                        wenzhangJson: wenzhangJson1,
                        essayuid: options.essayuid
                    })
                    app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                        pid: this.data.wenzhangJson.pid
                    }, 'ActicleInterShop');
                    if (this.setSee) {
                        this.setSee(this.data.wenzhangJson);
                    }
                    console.log(JSON.stringify(this.data.essayhead) + "、、、、、、、、、、、、、、、、、、、、");
                    wxParse.wxParse('article', 'html', article, self);
                    console.log(JSON.stringify(this.data.wenzhangJson) + "、、、、、、、、、、、、、、、、、、、、、、");
                }
            }
        }

    },
    gunhdong: function (event){
        if (parseInt(event.detail.scrollTop)>10)
        {
            console.log("33");
            this.setData({
                bottomView:false
            })
        }
        else
        {
            this.setData({
                bottomView: true
            })
        }
        console.log(event.detail.scrollTop);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    cancel: function() {
        this.setData({
            buyBoxHidden: true
        })
    },
    pressX:function(){
        this.setData({
            buyBoxHidden: true,
        })
    },
    add: function () {
        this.setData({
            shopNumber: this.data.shopNumber + 1
        })
        app.buyNumber = this.data.shopNumber;


    },
    jian: function () {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
            app.buyNumber = this.data.shopNumber;
        }
    },
    buy: function() {
        this.setData({
            buyBoxHidden: false,
        })
        // app.ShortConnect(app.urlw + "Data/GetProductByPid", {
        //     pid: this.data.wenzhangJson.pid
        // }, 'ActicleInterOrder');
        // wx.navigateTo({
        //     url: '../lck/order/order',
        // })
    },
    //进入商品详情
    shopButton: function () {
        let self = this;
        // this.setData({
        // buyBoxHidden: false,
        // })
        if (app.isShare) {
            app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                pid: self.data.wenzhangJson.pid
            }, 'ActicleInterShop');
            wx.navigateTo({
                url: '../lck/cartGoodsDetail/cartGoodsDetail?transpondUid=' + self.data.transpondUid + "&interSource=2" + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid,
            })
        } else {
            console.log("22222222222222222222222222" + JSON.stringify(app.wenzhangJson));
            // wx.setStorageSync("goods", app.wenzhangJson);
            console.log("app.wenzhangJson is ",self.data.wenzhangJson);
            console.log("pid is ",self.data.wenzhangJson.pid);
            // let url = app.host + 'Data/GetProductByPid';
            // let data = {
            //     pid: self.data.wenzhangJson.pid,
            //     uid: app.uid
            // };
            // //跳转商品界面,获得对应pid的商品
            // let product = null;
            // let req = new Request(url, data, 'POST', 'text');
            // let res = await req.sendRequest();
            // console.log("product is ", res.data.product);

            app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                pid : self.data.wenzhangJson.pid,
                uid : app.uid
            }, 'ActicleInterShop',function(r){
                console.log("r is ",r);
                wx.setStorage({
                    key: 'goods',
                    data: r,
                    success : function(){
                        wx.navigateTo({
                            url: '../lck/cartGoodsDetail/cartGoodsDetail?interSource=0' + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid
                        });
                    }
                })
            });
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // app.buyNumber = this.data.shopNumber;
        // if (this.data.wenzhangJson) {
        //     app.ShortConnect(app.urlw + 'Data/EssaySee', {
        //         eid: this.data.wenzhangJson.eid
        //     }, "SeeWen");
        // } else {
        //     this.setSee = res => {
        //         console.log("SeeWen1");
        //         app.ShortConnect(app.urlw + 'Data/EssaySee', {
        //             eid: res.eid
        //         }, "SeeWen");
        //     }
        // }
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
        var self = this;
        var shopmsg1 = encodeURIComponent(JSON.stringify(this.data.wenzhangJson));
        console.log(JSON.stringify(this.data.wenzhangJson));
        if (app.isShare) {
            wx.getSetting({
                success(res) {
                    var shareUid = null;
                    //当授权时
                    if (res.authSetting['scope.userInfo']) {
                        var shardUid=app.uid.toString();
                    }
                    else {
                        var shardUid = this.data.transpondUid;
                    }
                    var shareObj = {
                        desc: '距离成功只差一步，求少侠出手！',
                        title: '分享商城',
                        path: 'pages/ActicleScene/ActicleScene?uid=' + shardUid + "&wenzhangJson=" + shopmsg1 + "&essayuid=" + this.data.essayuid,
                        success: function (res) {
                            console.log("333");
                            // 转发成功之后的回调
                            if (res.errMsg == 'shareAppMessage:ok') {
                                app.ShortConnect(app.urlw + "Data/EssayForword", {
                                    eid: self.data.wenzhangJson.eid
                                }, "shareWenZhang");
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

        } else {
            var shareObj = {
                desc: '距离成功只差一步，求少侠出手！',
                title: '分享商城',
                path: 'pages/ActicleScene/ActicleScene?uid=' + app.uid.toString() + "&wenzhangJson=" + shopmsg1 + "&essayuid=" + this.data.essayuid,
                success: function(res) {
                    // 转发成功之后的回调
                    if (res.errMsg == 'shareAppMessage:ok') {
                        console.log('shareAppMessage:ok');
                        app.ShortConnect(app.urlw + "Data/EssayForword", {
                            eid: self.data.wenzhangJson.eid
                        }, "shareWenZhang");
                    }
                },
                fail: function(res) {　　　　　　 // 转发失败之后的回调
                    console.log(res.errMsg);
                },
            }
            console.log(shareObj);
            return shareObj;
        }
    }
})