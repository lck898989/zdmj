// pages/ShopActicle/ShopActicle.js
import wxParse from '../../wxParse/wxParse.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //初始化本地路径 
        bendiLu:'',
        uid:0,
        pathArray:[],
        indexCodeUrl: "",
        shareFriends: true,
        shareHidden: true,
        indexPress: "",
        open: "",
        getUserInfo: "",
        turnIndex1: "",
        turnDazhe1: "",
        buy1: "",
        //判断是否授权
        isShouQuan: false,
        scanCode: [],
        heightSwiper: [],
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
    pressin: function() {
        this.setData({
            shareHidden: true

        })
    },
    pressin1: function() {
        this.setData({
            shareFriends: true
        })
    },
    saveImage: function() {
        var self=this;
        wx.saveImageToPhotosAlbum({
            filePath: self.data.bendiLu,
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
    },
    shareFriends: function() {
        var self=this;
        this.setData({
            shareHidden: true,
            shareFriends: false
        })
        if(app.isShare)
        {
            app.ShortConnect(app.urlw + "Data/ShareSmallProgramCode", {
                type: 2,
                shopid: self.data.shopJSon.shopid,
                shopeid: self.data.shopJSon1.shopeid,
                parentUid:app.uid,
            });
        }
        else
        {
            app.ShortConnect(app.urlw + "Data/ShareSmallProgramCode", {
                type: 2,
                shopid: self.data.shopJSon.shopid,
                shopeid: self.data.shopJSon1.shopeid,
                parentUid:app.uid,
            },"sharFriends",function(res){
                // let pathArray = res.data.path.split("/");
                self.huaText1(res.data.path);
                // console.log(JSON.stringify(pathArray));
                // self.setData({
                //     indexCodeUrl: app.urlw + res.data.path,
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
    turnIndex: function() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.setData({
            indexPress: "turnIndex"
        })
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    wx.switchTab({
                        url: "../lck/index/index"
                    })
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(query) {
      
        this.setSee = null;
        // this.setData({
        //     scanCode: [4, 2, 9]
        // })
        // app.ShortConnect(app.urlw+"Data/");

        // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        // if (app.isSao)
        // {   
        //     // app.ShortConnect(app.urlw +"Data/EntryShopEssayFromSmallCode",{
        //     //     shopid:4,
        //     //     shopeid:2,
        //     //     uid:app.uid
        //     // });
        //     // this.setData({
        //     //     url: app.urlw3
        //     // })
        //     // scene = decodeURIComponent(query.scene);
        //     console.log(JSON.stringify(scene)+"===========================");
        // }
        // // app.ShortConnect(app.urlw+"Data/AddShopOrder",{
        // // },); 
        this.setData({
            url: app.urlw3
        })
        var self = this;
        if (app.isSao) {
            app.wenzhangsao = true;
            console.log(query);
            console.log(typeof query);
            console.log(JSON.stringify(query));
            var scene = decodeURIComponent(query.scene);
            scene = scene.split("#");
            this.setData({
                scanCode: scene
            })
            if (app.uid) {
                self.setData({
                    isShouQuan: true,
                    turnIndex1: "turnIndex",
                    turnDazhe1: "turnDazhe",
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
                                isShouQuan: true,
                                turnIndex1: "turnIndex",
                                turnDazhe1: "turnDazhe",
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
                                isShouQuan: false,
                                open: "getUserInfo",
                                getUserInfo: "getUserInfo1",
                                turnIndex1: "turnIndex",
                                turnDazhe1: "turnDazhe",
                                buy1: "buy",
                            })
                        }
                    }
                })
            }
            app.ShortConnect(app.urlw + "Data/EntryShopEssayFromSmallCode", {
                shopid: this.data.scanCode[0],
                shopeid: this.data.scanCode[1],
            }, "sranCode", function(res) {
                // console.log();
                if (res.data.shopproducts.length > 0) {
                    for (let i = 0; i <= res.data.shopproducts.length - 1; i++) {
                        if (typeof res.data.shopproducts[i].head == "string") {
                            res.data.shopproducts[i].head = res.data.shopproducts[i].head.split(",");
                        }
                        res.data.shopproducts[i].isOpen = false;
                    }
                    self.setData({
                        shopArray: res.data.shopproducts,
                        onePlice: res.data.shopproducts[0].shopprice,
                        chooseShop: res.data.shopproducts[0]
                    })
                }
                if (typeof res.data.shop.shophead == "string") {
                    res.data.shop.shophead = res.data.shop.shophead.split(",");

                } else {}
                if (typeof res.data.shopessay.shopessayhead == "string") {
                    res.data.shopessay.shopessayhead = res.data.shopessay.shopessayhead.split(",");
                }
                self.setData({
                    shopJSon: res.data.shop,
                    shopJSon1: res.data.shopessay,
                    shopHead: res.data.shopessay.shopessayhead,
                    shopIntroduction: res.data.shopessay.shoptitle,
                })
                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                self.setSee(self.data.shopJSon1);
                var article = self.data.shopJSon1.txt;
                wxParse.wxParse('article', 'html', article, self);
            });
        } else {
            var shopmsg2 = JSON.parse(decodeURIComponent(query.shopjson));
            query.shopurl = query.shopurl.split(",");
            if (app.shopWenZhangJson && app.wenzhangShop) {
                if (app.wenzhangShop.length > 0) {
                    for (let i = 0; i <= app.wenzhangShop.length - 1; i++) {
                        if (typeof app.wenzhangShop[i].head == "string") {
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
                } else {}
                this.setData({
                    shopJSon: app.shopWenZhangJson,
                    shopJSon1: shopmsg2,
                    shopHead: query.shopurl,
                    shopIntroduction: query.introduction,
                })
                console.log(JSON.stringify(this.data.shopJSon) + "11111111111111111111111111111d");
                console.log(JSON.stringify(this.data.shopJSon1) + "11111111111111111111111111111d");
                var article = this.data.shopJSon1.txt;
                wxParse.wxParse('article', 'html', article, this);
            } else {
                app.setwenzhangShop = res => {
                    if (res.data.shopproducts.length > 0) {
                        for (let i = 0; i <= res.data.shopproducts.length - 1; i++) {
                            if (typeof res.data.shopproducts[i].head == "string") {
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

                    } else {}
                    this.setData({
                        shopJSon: res.data.shop,
                        shopJSon1: shopmsg2,
                        shopHead: query.shopurl,
                        shopIntroduction: query.introduction,
                    })
                    if (this.setSee) {
                        this.setSee(this.data.shopJSon1);
                    }
                    console.log(JSON.stringify(this.data.shopJSon) + "11111111111111111111111111111f");
                    console.log(JSON.stringify(this.data.shopJSon1) + "11111111111111111111111111111f");
                    var article = this.data.shopJSon1.txt;
                    wxParse.wxParse('article', 'html', article, this);
                }
            }
            self.setData({
                isShouQuan: true,
                open: "",
                getUserInfo: "",
                turnIndex1: "turnIndex",
                turnDazhe1: "turnDazhe",
                buy1: "buy",
            })
        }
     
        // const ctx = wx.createCanvasContext('myCanvas');
        // ctx.setFillStyle('black');
        // ctx.setFontSize(15);
      
        // var  c='大萨达大所大大奥所大爱仕达大所大大爱仕达撒大所多所大';
        // var chr = c.split("");//这个方法是将一个字符串分割成字符串数组
        // var temp = "";
        // var row = [];
        // for (var a = 0; a < chr.length; a++) {
        //     if (ctx.measureText(temp).width < 250) {
        //         temp += chr[a];
        //     }
        //     else {
        //         a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        //         row.push(temp);
        //         temp = "";
        //     }
        // }
        // row.push(temp);

        // //如果数组长度大于2 则截取前两个
        // if (row.length > 2) {
        //     var rowCut = row.slice(0, 2);
        //     var rowPart = rowCut[1];
        //     var test = "";
        //     var empty = [];
        //     for (var a = 0; a < rowPart.length; a++) {
        //         if (ctx.measureText(test).width < 220) {
        //             test += rowPart[a];
        //         }
        //         else {
        //             break;
        //         }
        //     }
        //     empty.push(test);
        //     var group = empty[0] + "..."//这里只显示两行，超出的用...表示
        //     rowCut.splice(1, 1, group);
        //     row = rowCut;
        // }
        // ctx.font = 'normal bold 17px sans-serif';
        // for (var b = 0; b < row.length; b++) {
        //     ctx.fillText(row[b], 25, 35 + b * 30, 300);
        // }
        // var avatarurl_width = 24;    //绘制的头像宽度
        // var avatarurl_heigth = 24;   //绘制的头像高度
        // var avatarurl_x = 25;   //绘制的头像在画布上的位置
        // var avatarurl_y = 78;   //绘制的头像在画布上的位置
        // ctx.beginPath(); //开始绘制
        // ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

        // ctx.drawImage('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369419058,1797305489&fm=27&gp=0.jpg', avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
        // ctx.setFontSize(10);
        // ctx.fillText("废气气气", 59, 86);
        // ctx.setFontSize(9); 
        // ctx.setFillStyle('#898989');
        // ctx.fillText("11月22日  18：27", 59,101);
        // ctx.setFontSize(12); 
        // ctx.setFillStyle('#000000');
        // //画文章
        // this.huaText(ctx,"爱仕达多撒大啊");
        // ctx.setFillStyle('#000000');
        // ctx.setFontSize(13);
        // ctx.fillText("长按扫码阅读", 212, 332);
      
        // ctx.setFillStyle('red');
        // ctx.fillRect(204,207,107,107);
 
        // ctx.drawImage('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369419058,1797305489&fm=27&gp=0.jpg', 204, 207, 107, 107);
        //   this.roundRect(ctx,25,191,150,150,10);
        // ctx.drawImage('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369419058,1797305489&fm=27&gp=0.jpg', 25, 191,150 ,150 );
        
        // // ctx.fillText(c, 50, 40)
        // ctx.draw();
    },
    //话多行文章
    huaText:function(ctx,c){
        var chr = c.split("");//这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
            if (ctx.measureText(temp).width < 250) {
                temp += chr[a];
            }
            else {
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
                }
                else {
                    break;
                }
            }
            empty.push(test);
            var group = empty[0] + "..."//这里只显示两行，超出的用...表示
            rowCut.splice(1, 1, group);
            row = rowCut;
        }
      
        for (var b = 0; b < row.length; b++) {
            ctx.fillText(row[b], 51, 130 + b * 30, 300);
        }
    },
    roundRect:function(ctx,x,y,w,h,r){
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
                                console.log("asdadadad1");
                                wx.switchTab({
                                    url: "../lck/index/index"
                                })
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,
                                    open: "",
                                    getUserInfo: "",
                                }, "");

                            }

                            break;
                        case "turnDazhe":
                            app.turnDazhe = res => {
                                wx.navigateTo({
                                    url: '../Discount/Discount?shopid=' + self.data.shopJSon.shopid.toString() + "&shopJSon=" + JSON.stringify(self.data.shopJSon),
                                })
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,

                                }, "");
                                self.setData({
                                    open: "",
                                    getUserInfo: "",
                                })
                            }
                            break;
                        case "buy":

                            app.buy1 = res => {
                                console.log("asdadadad");
                                self.setData({
                                    buyBoxHidden: false,
                                })
                                app.ShortConnect(app.urlw + "Data/AddAgency", {
                                    parent: self.data.scanCode[2],
                                    child: app.uid,


                                }, "");
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
        // if (parseInt(event.detail.scrollTop) >= 0) {
        //     console.log("`````````````````````");
        //     this.setData({
        //         bottomView: false
        //     })
        // } else {
        //     this.setData({
        //         bottomView: true
        //     })
        // }
        // console.log(event.detail.scrollTop);
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

    },
    pressClose: function() {
        // this.setData({
        //     indexPress: "pressClose"
        // })
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
        let data = {
            uid: app.uid,

            count: this.data.shopNumber,

        }
        if (app.isShare) {
            data.source = 2
        } else {
            data.source = 0;
        }
        let endtime = this.data.chooseShop.endtime;
        endtime = endtime.split(" ");
        data.endtime = endtime[0];
        data.head = this.data.chooseShop.head[0];
        data.pname = this.data.chooseShop.shoppname;
        data.price = this.data.onePlice * this.data.shopNumber;
        data.iswenzhang = true;
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
        } else {
            wx.navigateTo({
                url: '../lck/order/order?interSource=0&shoppid=' + this.data.chooseShop.shoppid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&shopeid=" + this.data.shopJSon1.shopeid.toString() + "&shopid=" + this.data.shopJSon.shopid.toString() + "&essayuid=" + this.data.shopJSon1.shopauthoruid.toString() + "&pcount=" + this.data.shopNumber.toString() + "&inter=wenzhang" + "&shopname=" + this.data.shopJSon.shopname,
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
    turnDazhe: function() {
        var self = this;
        this.setData({
            indexPress: "turnDazhe"
        })
        wx.getSetting({
            success(res) {
                //当授权时
                if (res.authSetting['scope.userInfo']) {
                    wx.navigateTo({
                        url: '../Discount/Discount?shopid=' + self.data.shopJSon.shopid.toString() + "&shopJSon=" + JSON.stringify(self.data.shopJSon),
                    })
                }
            }
        });
        console.log(JSON.stringify(this.data.shopJSon));

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var self = this;
        if (app.isSao) {
            this.setSee = res => {
                app.ShortConnect(app.urlw + 'Data/ShopEssaySee', {
                    shopeid: res.shopeid
                }, "SeeShopWen", function(res2) {
                    self.data.shopJSon1.see = res2.data.see;
                    self.setData({
                        shopJSon1: self.data.shopJSon1
                    })
                });
            }
        } else {
            if (app.shopWenZhangJson && app.wenzhangShop) {
                app.ShortConnect(app.urlw + 'Data/ShopEssaySee', {
                    shopeid: this.data.shopJSon1.shopeid
                }, "SeeShopWen", function(res) {
                    self.data.shopJSon1.see = res.data.see;
                    self.setData({
                        shopJSon1: self.data.shopJSon1
                    })
                });
            } else {
                this.setSee = res => {
                    app.ShortConnect(app.urlw + 'Data/ShopEssaySee', {
                        shopeid: res.shopeid
                    }, "SeeShopWen", function(res2) {
                        self.data.shopJSon1.see = res2.data.see;
                        self.setData({
                            shopJSon1: self.data.shopJSon1
                        })
                    });
                }
            }
        }
        // app.buyNumber = this.data.shopNumber;
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    huaText1:function(path){
        var self = this;
        const ctx = wx.createCanvasContext('myCanvas',self);
        ctx.setFillStyle('black');
        ctx.setFontSize(15);
        var c = this.data.shopIntroduction;
        var chr = c.split("");//这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
            if (ctx.measureText(temp).width < 250) {
                temp += chr[a];
            }
            else {
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
                }
                else {
                    break;
                }
            }
            empty.push(test);
            var group = empty[0] + "..."//这里只显示两行，超出的用...表示
            rowCut.splice(1, 1, group);
            row = rowCut;
        }
        ctx.font = 'normal bold 17px sans-serif';
        for (var b = 0; b < row.length; b++) {
            ctx.fillText(row[b], 25, 35 + b * 30, 300);
        }
        var avatarurl_width = 24;    //绘制的头像宽度
        var avatarurl_heigth = 24;   //绘制的头像高度
        var avatarurl_x = 25;   //绘制的头像在画布上的位置
        var avatarurl_y = 78;   //绘制的头像在画布上的位置
        ctx.beginPath(); //开始绘制
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
        ctx.drawImage(this.data.shopJSon1.wxhead, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
        ctx.setFontSize(10);
        ctx.fillText(this.data.shopJSon1.wxnickname, 59, 86);
        ctx.setFontSize(9);
        ctx.setFillStyle('#898989');
        ctx.fillText("11月22日  18：27", 59, 101);
        ctx.setFontSize(12);
        ctx.setFillStyle('#000000');
        //画文章
        this.huaText(ctx, this.data.shopJSon1.shopintroduction);
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
        wx.getImageInfo({
            src:"https://shop.ykplay.com/smallprogram/shopshare_4.png",
            success(res) {
                console.log("###############################1" + res.tempFilePath);
                ctx.drawImage(res.tempFilePath, 204, 207, 107, 107);
                ctx.draw(true, setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        success: function (res2) {
                            self.setData({
                                bendiLu: res2.tempFilePath
                            })
                        },
                    })
                }, 2000));  
                // ctx.draw(true, setTimeout(function () {
                //     wx.canvasToTempFilePath({
                //         canvasId: 'myCanvas',
                //         success: function (res2) {
                //             self.setData({
                //                 bendiLu: res2.tempFilePath
                //             })
                //         },
                //     })
                // }, 2000));
            },
            fail:function(res){
                console.log(JSON.stringify(res));
                
            },
        })
        wx.getImageInfo({
            src: self.data.url + self.data.shopHead[0],
            success(res1) {
                self.roundRect(ctx, 25, 191, 150, 150, 10);   
                ctx.drawImage(res1.path, 25, 191, 150, 150);
                ctx.draw(true, setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        success: function (res2) {
                            self.setData({
                                bendiLu: res2.tempFilePath
                            })
                        },
                    })
                }, 2000));  
            }
        })
        // ctx.drawImage(this.data.url + this.data.shopHead[0], 25, 191, 150, 150);
        console.log(this.data.url + this.data.shopHead[0]);
        // ctx.fillText(c, 50, 40)
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
        console.log(JSON.stringify(this.data.shopJSon));
        console.log(JSON.stringify(this.data.shopJSon1));
        var self = this;
        var shareObj = {
            desc: '距离成功只差一步，求少侠出手！',
            title: '分享商城',
            path: 'pages/ShopActicle/ShopActicle',
            success: function(res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    console.log('shareAppMessage:ok');
                    app.ShortConnect(app.urlw + "Data/ShopEssayForword", {
                        shopeid: self.data.shopJSon1.shopeid,
                        uid: app.uid
                    }, "");
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