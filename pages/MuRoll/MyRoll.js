// pages/MuRoll/MyRoll.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexJSON:{},
        indexverificationcode: [],
        codeHidden: true,
        codeurl: "",
        url: "",
        shop: [],
        topHeight: 0,
        quanbuhidden: true,
        goumaiHidden: true,
        indexQuanbu: 0,
        indexGoumai: 1,
        buyBoxHidden: true,
        bottomHeight: "",
        quanbuArray: ["全部类别", "可使用", "退款中", "已使用", "已退款", "已过期"],
        goumaiArray: ["到期时间", "购买时间"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            url: app.urlw3
        })

        var self = this;
        var ratio;
        var seeHeight;
        wx.getSystemInfo({
            success(res) {
                ratio = 750 / res.windowWidth;
                seeHeight = res.windowHeight;
            }
        })
        this.setData({
            bottomHeight: seeHeight - 62 / ratio,
            topHeight: 62 / ratio,
            shop: app.shangpuArray
        })

    },
    tui: function() {
        wx.navigateTo({
            url: "../lck/saleService/saleService"
        })
    },
    pressType1: function(event) {
        var self = this;
        if (event.currentTarget.dataset.index != this.data.indexGoumai) {
            switch (event.currentTarget.dataset.index) {
                case 0:
                    if (self.data.quanbuhidden == true) {
                        self.setData({
                            buyBoxHidden: true,
                        })
                    }
                    self.setData({
                        indexGoumai: event.currentTarget.dataset.index,
                        goumaiHidden: true
                    })
                    console.log("3333");
                    this.data.shop.sort(function(a, b) {
                        if (b.endtime > a.endtime) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                    this.setData({
                        shop: this.data.shop
                    })
                    break;
                case 1:
                    if (self.data.quanbuhidden == true) {
                        self.setData({
                            buyBoxHidden: true,

                        })
                    }
                    self.setData({
                        indexGoumai: event.currentTarget.dataset.index,
                        goumaiHidden: true
                    })
                    this.data.shop.sort(function(a, b) {
                        if (b.starttime > a.starttime) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                    this.setData({
                        shop: this.data.shop
                    })
                    break;
            }
        }
    },
    pressShiYongs: function(event) {
        console.log(JSON.stringify(event.currentTarget.dataset.shopjson));
        let url = "https://shop.ykplay.com/Data/create_qrcode?url=https://shop.ykplay.com/BMS/qrcodeInfo&shopoid=" + event.currentTarget.dataset.shopoid.toString() + "&verificationcode=" + event.currentTarget.dataset.verificationcode.toString()
        let verificationcode = [];
        verificationcode[0] = event.currentTarget.dataset.verificationcode.toString().substr(0, 4);
        verificationcode[1] = event.currentTarget.dataset.verificationcode.toString().substr(4, 4);
        verificationcode[2] = event.currentTarget.dataset.verificationcode.toString().substr(8, 4);
        this.setData({
            codeurl: url,
            codeHidden: false,
            indexverificationcode: verificationcode,
            indexJSON: event.currentTarget.dataset.shopjson
        })
    },
    pressYin: function() {

        this.setData({
            codeHidden: true,
        })
    },
    pressType: function(event) {
        console.log(event.currentTarget.dataset.index);
        var self = this;
        if (event.currentTarget.dataset.index != this.data.indexQuanbu) {
            switch (event.currentTarget.dataset.index) {
                case 0:
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,

                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 0
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })

                    })
                    break;
                case 1:
                    console.log("?????????????????????");
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,

                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 2
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })

                    })
                    break;
                case 2:
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,
                            quanbuhidden: true
                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 3
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })
                    })
                    break;
                case 3:
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,
                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 21
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })

                    })
                    break;
                case 4:
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,

                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 4
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })
                    })
                    break;
                case 5:
                    if (self.data.goumaiHidden == true) {
                        self.setData({
                            buyBoxHidden: true,

                        })
                    }
                    self.setData({
                        indexQuanbu: event.currentTarget.dataset.index,
                        quanbuhidden: true
                    })
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 6
                    }, "getShop", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                            res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(" ");
                        }
                        self.setData({
                            shop: res.data.shoporders
                        })
                    })
                    break;
            }
        }
    },
    pressQuanbu: function() {
        if (this.data.quanbuhidden) {

            this.setData({
                quanbuhidden: false,
                buyBoxHidden: false
            })

        } else {
            if (this.data.goumaiHidden) {
                this.setData({
                    buyBoxHidden: true
                })
            } else {
                this.setData({
                    buyBoxHidden: false
                })

            }
            this.setData({
                quanbuhidden: true
            })
        }

    },
    pressGoumai: function() {
        if (this.data.goumaiHidden) {
            console.log("???????????????????????");
            this.setData({
                goumaiHidden: false,
                buyBoxHidden: false
            })
        } else {
            console.log("???????????????????????");
            if (this.data.quanbuhidden) {
                this.setData({
                    buyBoxHidden: true
                })
            } else {
                this.setData({
                    buyBoxHidden: false
                })
            }
            this.setData({
                goumaiHidden: true
            })
        }
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