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
        indexPress: "",
        turnIndex1: "",
        turnDazhe1: "",
        buy1: "",
        scanCode: [],
        uid: 0,
        indexCodeUrl: "",
        pathArray: [],
        shareFriends: true,
        shareHidden: true,
        //初始化高度swiper高度数组
        heightSwiper: [],
        url: "",
        count: 1,
        open: "",
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
        bottomView: true,
        goods: null,
        shopJson: null,
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
        buyBoxHidden: true,
        imageH: ''
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
    pressin: function() {
        this.setData({
            shareHidden: true

        })
    },
    saveImage: function() {
        wx.downloadFile({
            url: 'https://shop.ykplay.com/upload/head/154158395807047.jpeg',
            success: function(res) {
                console.log(JSON.stringify(res) + "!!!!!!!!!!!!!!!!!!!!!!1");
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(result) {
                        console.log(JSON.stringify(result) + "!!!!!!!!!!!!!!!!!!!!!!");
                    },
                    fail(err) {
                        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                            wx.showModal({
                                title: '提示',
                                content: '需要您授权保存相册',
                                showCancel: false,
                                success: modalSuccess => {
                                    wx.openSetting({
                                        success(settingdata) {
                                            console.log("settingdata", settingdata)
                                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '获取权限成功,再次点击图片即可保存',
                                                    showCancel: false,
                                                })
                                            } else {
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '获取权限失败，将无法保存到相册哦~',
                                                    showCancel: false,
                                                })
                                            }
                                        },
                                        fail(failData) {
                                            console.log("failData", failData)
                                        },
                                        complete(finishData) {
                                            console.log("finishData", finishData)
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    shareFriends: function() {
        var self = this;
        this.setData({
            shareHidden: true,
            shareFriends: false
        })
        if (app.isShare) {
            app.ShortConnect(app.urlw + "Data/ShareSmallProgramCode", {
                pid: this.data.wenzhangJson.pid,
                eid: this.data.wenzhangJson.eid,
                parent: this.data.transpondUid,
                type: 1,
            });
        } else {
            console.log(this.data.wenzhangJson.pid);
            console.log(this.data.wenzhangJson.eid);
            app.ShortConnect(app.urlw + "Data/ShareSmallProgramCode", {
                pid: this.data.wenzhangJson.pid,
                eid: this.data.wenzhangJson.eid,
                parent: app.uid,
                type: 1,
            }, "shareFriends", function(res) {
                self.huaText1(res.data.path);
                // console.log(JSON.stringify(res));
                // let pathArray = res.data.path.split("/");
                // console.log(parseInt(pathArray[2]));
                // self.setData({
                //     indexCodeUrl: app.urlw3 + res.data.path,
                //     pathArray: pathArray,
                //     uid: parseInt(pathArray[2])
                // })
            });
        }
    },
    pressShare: function() {
        this.setData({
            shareHidden: false

        })
    },
    pressSure: function() {
        let data = {
            uid: app.uid,
            pid: this.data.wenzhangJson.pid,
            size: this.data.wenzhangJson.selectsize,
            count: this.data.shopNumber,

        }
        console.log(JSON.stringify(this.data.wenzhangJson) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (app.isShare) {
            data.source = 2
        } else {
            data.source = 0;
        }
        data.head = this.data.wenzhangJson.product_head[0];
        data.pname = this.data.wenzhangJson.product_name;
        data.price = this.data.wenzhangJson.product_price * this.data.shopNumber;
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        if (app.isShare) {
            wx.navigateTo({
                url: '../lck/order/order?interSource=2',
            });
        } else {
            wx.navigateTo({
                url: '../lck/order/order?interSource=0',
            });
        }
    },
    pressClose: function() {
        this.setData({
            buyBoxHidden: true,
            shopNumber: 1
        })
    },
    loadImage: function(event) {
        let heightSwiper = this.data.heightSwiper;
        //计算此图片加载完是的高度
        let heightImage = 750 * event.detail.height / event.detail.width;
        heightSwiper[event.target.dataset.id] = heightImage;
        console.log(JSON.stringify(heightSwiper) + "=========================");
        this.setData({
            heightSwiper: heightSwiper
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
    pressin1: function() {
        this.setData({
            shareFriends: true
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
        if (app.isSao) {
            app.wenzhangsao = true;
            var scene = decodeURIComponent(options.scene);
            scene = scene.split("#");
            this.setData({
                scanCode: scene
            })
            if (app.uid) {
                self.setData({
                    turnIndex1: "turnIndex",
                    turnDazhe1: "shopButton",
                    buy1: "buy",
                })
                app.ShortConnect(app.urlw + "Data/AddAgency", {
                    parent: this.data.scanCode[2],
                    child: app.uid
                }, "sure");
            } else {
                wx.getSetting({
                    success(res) {
                        //当授权时
                        if (res.authSetting['scope.userInfo']) {
                            self.setData({

                                turnIndex1: "turnIndex",
                                turnDazhe1: "shopButton",
                                buy1: "buy",
                            })
                            app.setSranInter = res => {
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid
                                }, "sure");
                            }
                        } else {
                            self.setData({
                                open: "getUserInfo",
                                getUserInfo: "getUserInfo1",
                                turnIndex1: "turnIndex",
                                turnDazhe1: "shopButton",
                                buy1: "buy",
                            })
                        }
                    }
                })
            }
            app.ShortConnect(app.urlw + "Data/EntryEssayFromSmallCode", {
                eid: scene[1],
                pid: scene[0],
                uid: 0
            }, "scanInterShop", function(res) {
                var article = res.data.essay.content;
                var wenzhangJson1 = {};
                wenzhangJson1.essayhead = res.data.essay.essayhead.split(",");
                wenzhangJson1.product_head = res.data.essay.product_head.split(",");
                wenzhangJson1.profit = res.data.essay.profit;
                wenzhangJson1.product_name = res.data.essay.product_name;
                wenzhangJson1.essayuid = res.data.essay.essayuid;
                wenzhangJson1.see = res.data.essay.see;
                wenzhangJson1.time = res.data.essay.time;
                // wenzhangJson1.time = res.data.essay.time;
                wenzhangJson1.rebate = res.data.essay.rebate;
                wenzhangJson1.product_price = res.data.essay.product_price;
                wenzhangJson1.title = res.data.essay.title;
                wenzhangJson1.authorurl = res.data.essay.authorurl;
                wenzhangJson1.authorname = res.data.essay.authorname;
                wenzhangJson1.product_head = res.data.essay.product_head.split(",");
                wenzhangJson1.otherprice = res.data.essay.otherprice;
                wenzhangJson1.shopurl = res.data.essay.shopurl;
                wenzhangJson1.pid = res.data.essay.pid;
                wenzhangJson1.eid = res.data.essay.eid;
                wenzhangJson1.introduction = res.data.essay.introduction;
                wenzhangJson1.article = res.data.essay.content;
                self.setData({
                    wenzhangJson: wenzhangJson1,
                    essayuid: res.data.essay.essayuid
                })
                app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                    pid: self.data.wenzhangJson.pid
                }, 'ActicleInterShop', function(res) {});
                wxParse.wxParse('article', 'html', article, self);
            })
        } else {
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
                    console.log(options.shopurl + "111111111111111111111");
                    var article = app.wenzhangJson.content;
                    var wenzhangJson1 = {};
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
                    wenzhangJson1.introduction = options.introduction;
                    wenzhangJson1.article = app.wenzhangJson.content;
                    this.setData({
                        wenzhangJson: wenzhangJson1,
                        essayuid: options.essayuid
                    })
                    app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                        pid: this.data.wenzhangJson.pid
                    }, 'ActicleInterShop', function(res) {});
                    wxParse.wxParse('article', 'html', article, self);
                    console.log(JSON.stringify(this.data.wenzhangJson) + "、、、、、、、、、、、、、、、、、、、、");
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
                        wenzhangJson1.introduction = options.introduction;
                        wenzhangJson1.article = res.data.essay.content;
                        this.setData({
                            wenzhangJson: wenzhangJson1,
                            essayuid: options.essayuid
                        })
                        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                            pid: this.data.wenzhangJson.pid
                        }, 'ActicleInterShop', function(res) {});
                        if (this.setSee) {
                            this.setSee(this.data.wenzhangJson);
                        }
                        console.log(JSON.stringify(this.data.wenzhangJson) + "、、、、、、、、、、、、、、、、、、、、");
                        wxParse.wxParse('article', 'html', article, self);

                    }
                }
                self.setData({

                    open: "",
                    getUserInfo: "",
                    turnIndex1: "turnIndex",
                    turnDazhe1: "shopButton",
                    buy1: "buy",
                })
            }
        }
    },
    getUserInfo1: function() {
        console.log("???????????????????????????1");
        var self = this;
        wx.getSetting({
            success(res) {

                //当授权时
                if (res.authSetting['scope.userInfo']) {

                    switch (self.data.indexPress) {
                        case "turnIndex":
                            app.turnIndex1 = res => {
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,

                                }, "");
                                console.log("asdadadad1");
                                wx.switchTab({
                                    url: "../lck/index/index"
                                })

                                self.setData({
                                    open: "",
                                    getUserInfo: "",
                                })
                            }

                            break;
                        case "turnDazhe":
                            app.turnDazhe = res => {
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,

                                }, "");
                                if (app.isShare) {
                                    wx.getSetting({
                                        success(res) {
                                            //当授权时
                                            if (res.authSetting['scope.userInfo']) {
                                                app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                                                    pid: self.data.wenzhangJson.pid
                                                }, 'ActicleInterShop', function(res) {});
                                                wx.navigateTo({
                                                    url: '../lck/cartGoodsDetail/cartGoodsDetail?transpondUid=' + self.data.transpondUid + "&interSource=2" + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid,
                                                })
                                            }
                                        }
                                    });

                                } else {
                                    console.log("22222222222222222222222222" + JSON.stringify(app.wenzhangJson));
                                    // wx.setStorageSync("goods", app.wenzhangJson);
                                    console.log("app.wenzhangJson is ", self.data.wenzhangJson);
                                    console.log("pid is ", self.data.wenzhangJson.pid);
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
                                    wx.getSetting({
                                        success(res) {
                                            //当授权时
                                            if (res.authSetting['scope.userInfo']) {
                                                app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                                                    pid: self.data.wenzhangJson.pid,
                                                    uid: app.uid
                                                }, 'ActicleInterShop', function(r) {
                                                    console.log("r is ", r);
                                                    wx.setStorage({
                                                        key: 'goods',
                                                        data: r,
                                                        success: function() {
                                                            wx.navigateTo({
                                                                url: '../lck/cartGoodsDetail/cartGoodsDetail?interSource=0' + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid
                                                            });
                                                        }
                                                    })
                                                });
                                            }
                                        }
                                    });
                                }

                                self.setData({
                                    open: "",
                                    getUserInfo: "",
                                })
                            }
                            break;
                        case "buy":

                            app.buy1 = res => {
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,


                                }, "");
                                console.log("asdadadad");
                                self.setData({
                                    buyBoxHidden: false,
                                })

                                self.setData({
                                    open: "",
                                    getUserInfo: "",
                                })

                            }
                            break;
                    }
                    app.ShouQuan();
                } else {}
            }
        })
    },
    gunhdong: function(event) {
        if (parseInt(event.detail.scrollTop) > 20) {
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
    pressX: function() {
        this.setData({
            buyBoxHidden: true,
        })
    },
    add: function() {
        this.setData({
            shopNumber: this.data.shopNumber + 1
        })
        app.buyNumber = this.data.shopNumber;


    },
    jian: function() {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
            app.buyNumber = this.data.shopNumber;
        }
    },
    huaText1: function(path) {
        var self = this;
        const ctx = wx.createCanvasContext('myCanvas', self);
        ctx.setFillStyle('black');
        ctx.setFontSize(15);
        var c = this.data.wenzhangJson.title;
        var chr = c.split(""); //这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
            if (ctx.measureText(temp).width < 250) {
                temp += chr[a];
            } else {
                a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                row.push(temp);
                temp = "";
            }
        }
        row.push(temp);
        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
            var rowCut = row.slice(0, 2);
            var rowPart = rowCut[1];
            var test = "";
            var empty = [];
            for (var a = 0; a < rowPart.length; a++) {
                if (ctx.measureText(test).width < 220) {
                    test += rowPart[a];
                } else {
                    break;
                }
            }
            empty.push(test);
            var group = empty[0] + "..." //这里只显示两行，超出的用...表示
            rowCut.splice(1, 1, group);
            row = rowCut;
        }
        ctx.font = 'normal bold 17px sans-serif';
        for (var b = 0; b < row.length; b++) {
            ctx.fillText(row[b], 25, 35 + b * 30, 300);
        }
        var avatarurl_width = 24; //绘制的头像宽度
        var avatarurl_heigth = 24; //绘制的头像高度
        var avatarurl_x = 25; //绘制的头像在画布上的位置
        var avatarurl_y = 78; //绘制的头像在画布上的位置
        ctx.beginPath(); //开始绘制
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
        ctx.drawImage(this.data.wenzhangJson.authorurl, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
        ctx.setFontSize(10);
        ctx.fillText(this.data.wenzhangJson.authorname, 59, 86);
        ctx.setFontSize(9);
        ctx.setFillStyle('#898989');
        ctx.fillText("11月22日  18：27", 59, 101);
        ctx.setFontSize(12);
        ctx.setFillStyle('#000000');
        //画文章
        this.huaText(ctx, this.data.wenzhangJson.introduction);
        ctx.setFillStyle('#000000');
        ctx.setFontSize(13);
        ctx.fillText("长按扫码阅读", 212, 332);
        // ctx.setFillStyle('red');
        // ctx.fillRect(204, 207, 107, 107);
        // var img ='https://shop.ykplay.com/smallprogram/shopshare_4.png';
        // console.log(self.data.url + path);
        // var canvas = document.createElement("canvas");  
        // var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        // var dataURL = canvas.toDataURL("image/" + ext);
        // console.log(dataURL);
        console.log(self.data.url + path);

        new Promise(function(resolve, reject) {
            wx.getImageInfo({
                src: self.data.url + self.data.wenzhangJson.essayhead[0],
                success(res1) {
                    console.log("asd");
                    self.roundRect(ctx, 25, 191, 150, 150, 10);
                    ctx.drawImage(res1.path, 25, 191, 150, 150);
                    ctx.draw(true, setTimeout(function () {
                       resolve();
                    }, 2000));


                }
            })
        }).then(function() {
            wx.getImageInfo({
                src: 'https://shop.ykplay.com/smallprogram/share_1478.png',
                success(res) {
                    console.log("###############################1" + JSON.stringify(res));
                    ctx.drawImage(res.path, 204, 207, 107, 107);
                    ctx.draw(true, setTimeout(function() {
                        wx.canvasToTempFilePath({
                            canvasId: 'myCanvas',
                            success: function(res2) {
                                self.setData({
                                    bendiLu: res2.tempFilePath
                                })
                            },
                        })
                    }, 2000));
                },
                fail: function(res) {
                    console.log(JSON.stringify(res));
                },
            })

        })

        // ctx.drawImage(this.data.url + this.data.shopHead[0], 25, 191, 150, 150);

        // ctx.fillText(c, 50, 40)
    },
    roundRect: function(ctx, x, y, w, h, r) {
        // 开始绘制
        ctx.beginPath()
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        // 这里是使用 fill 还是 stroke都可以，二选一即可
        // ctx.setFillStyle('#000000')
        // ctx.setStrokeStyle('transparent')
        // 左上角
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

        // border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + w, y + r)
        // 右上角
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

        // border-right
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w - r, y + h)
        // 右下角
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

        // border-bottom
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x, y + h - r)
        // 左下角
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

        // border-left
        ctx.lineTo(x, y + r)
        ctx.lineTo(x + r, y)

        // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
        ctx.fill()
        // ctx.stroke()
        ctx.closePath()
        // 剪切
        ctx.clip()
    },
    huaText: function(ctx, c) {
        var chr = c.split(""); //这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
            if (ctx.measureText(temp).width < 250) {
                temp += chr[a];
            } else {
                a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                row.push(temp);
                temp = "";
            }
        }
        row.push(temp);

        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
            var rowCut = row.slice(0, 2);
            var rowPart = rowCut[1];
            var test = "";
            var empty = [];
            for (var a = 0; a < rowPart.length; a++) {
                if (ctx.measureText(test).width < 220) {
                    test += rowPart[a];
                } else {
                    break;
                }
            }
            empty.push(test);
            var group = empty[0] + "..." //这里只显示两行，超出的用...表示
            rowCut.splice(1, 1, group);
            row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
            ctx.fillText(row[b], 51, 130 + b * 30, 300);
        }
    },
    buy: function() {
        var self = this;
        console.log("???????????????????????????");
        this.setData({
            indexPress: "buy"
        })
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    self.setData({
                        buyBoxHidden: false,
                    })
                } else {

                }
            }
        })

        // app.ShortConnect(app.urlw + "Data/GetProductByPid", {
        //     pid: this.data.wenzhangJson.pid
        // }, 'ActicleInterOrder');
        // wx.navigateTo({
        //     url: '../lck/order/order',
        // })
    },
    //进入商品详情
    shopButton: function() {
        var self = this;
        this.setData({
            indexPress: "turnDazhe"
        })

        // this.setData({
        // buyBoxHidden: false,
        // })
        if (app.isShare) {
            wx.getSetting({
                success(res) {
                    //当授权时
                    if (res.authSetting['scope.userInfo']) {
                        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                            pid: self.data.wenzhangJson.pid
                        }, 'ActicleInterShop', function(res) {});
                        wx.navigateTo({
                            url: '../lck/cartGoodsDetail/cartGoodsDetail?transpondUid=' + self.data.transpondUid + "&interSource=2" + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid,
                        })
                    }
                }
            });

        } else {
            console.log("22222222222222222222222222" + JSON.stringify(app.wenzhangJson));
            // wx.setStorageSync("goods", app.wenzhangJson);
            console.log("app.wenzhangJson is ", self.data.wenzhangJson);
            console.log("pid is ", self.data.wenzhangJson.pid);
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
            wx.getSetting({
                success(res) {
                    //当授权时
                    if (res.authSetting['scope.userInfo']) {
                        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
                            pid: self.data.wenzhangJson.pid,
                            uid: app.uid
                        }, 'ActicleInterShop', function(r) {
                            console.log("r is ", r);
                            wx.setStorage({
                                key: 'goods',
                                data: r,
                                success: function() {
                                    wx.navigateTo({
                                        url: '../lck/cartGoodsDetail/cartGoodsDetail?interSource=0' + "&inter=wenzhang" + "&essayuid=" + self.data.essayuid
                                    });
                                }
                            })
                        });
                    }
                }
            });
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
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

    turnIndex: function() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.setData({
            indexPress: "turnIndex"
        })
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    wx.reLaunch({
                        url: '../lck/index/index'
                    })
                }
            }
        });
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
                        var shardUid = app.uid.toString();
                    } else {
                        var shardUid = this.data.transpondUid;
                    }
                    var shareObj = {
                        desc: '距离成功只差一步，求少侠出手！',
                        title: '分享商城',
                        path: 'pages/ActicleScene/ActicleScene?uid=' + shardUid + "&wenzhangJson=" + shopmsg1 + "&essayuid=" + this.data.essayuid,
                        success: function(res) {
                            console.log("333");
                            // 转发成功之后的回调
                            if (res.errMsg == 'shareAppMessage:ok') {
                                app.ShortConnect(app.urlw + "Data/EssayForword", {
                                    eid: self.data.wenzhangJson.eid,
                                    uid: app.uid
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
                            eid: self.data.wenzhangJson.eid,
                            uid: app.uid
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