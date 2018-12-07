// pages/search/search.js

var app = getApp();

// pages/search/search.js
Page({
    data: {
        sreachArray: [],
        sendServerSize: {},
        sreachText: "",
        lastSreach: ["所所向已", "所所向已", "所所向已", "所所向", "所所", "所所", "所所", "所所"],
        scrolViewHeight: null,
        scrolltop: 0,
        nearSreach: [],
        hotSreach: [],
        scrolViewHeight1: null,
        goodShop: [],
        url: "",
        indexPages: 1,
        buyBoxHidden: true,
        indexShopArray: {},
        typeArr: {},
        shopNumber: 1,
        typeValueArr: [],
        selectColor: '#ede2f4',
        selectFontColor: '#863bb7',
        unSelectColor: '#eee',
        unSelectFontColor: '#000',
        selectBorder: '2rpx solid #863bb7',
        unselectBorder: '2rpx solid #eee',

    },
    onLoad: function(res) {
        
        app.setKaiQi = res => {
            // var selectsize = JSON.parse(event.currentTarget.dataset.shop.size);
            // console.log(selectsize + "333333333333");
            // var keys = Object.keys(selectsize);
            // console.log(keys + "333333333333");
            // var selectsize1 = {};
            // for (let i = 0; i < keys.length; i++) {
            //     var value = selectsize[`${keys[i]}`];

            //     var keyss = keys[i].split(",");

            //     var values = value.split("|");

            //     for (let j = 0; j < keyss.length; j++) {
            //         selectsize1[keyss[j]] = values[j];
            //     }
            // }
            // event.currentTarget.dataset.shop.size = selectsize1;
            // this.setData({
            //     buyBoxHidden: false,
            //     indexShopArray: event.currentTarget.dataset.shop,
            //     typeArr: Object.keys(event.currentTarget.dataset.shop.size),
            // })
            var keys1=[];
            for (let i = 0; i <= res.data.products.lenth-1;i++)
            {
                let keys = res.data.products[i];
                keys1.push(keys[0]);
            }
            console.log(keys1);
                // buyBoxHidden: false,
                //     indexShopArray: event.currentTarget.dataset.shop,
                //         typeArr: Object.keys(event.currentTarget.dataset.shop.size),
                //             typeValueArr: typeValueArr2
            this.setData({
                typeValueArr: res.data.products,
                buyBoxHidden: false,
                typeArr: keys1, 
            })
        }
        app.setSreachSize = res => {
            // var selectsize = event.currentTarget.dataset.shop;
            // console.log(selectsize + "333333333333");
            // var keys = Object.keys(selectsize);
            // console.log(keys + "333333333333");
            // var selectsize1 = {};
            // for (let i = 0; i < keys.length; i++) {
            //     var value = selectsize[`${keys[i]}`];
            //     var keyss = keys[i].split(",");
            //     var values = value.split("|");
            //     for (let j = 0; j < keyss.length; j++) {
            //         selectsize1[keyss[j]] = values[j];
            //     }
            // }
            // event.currentTarget.dataset.shop.size = selectsize1;
            // this.setData({
            //     buyBoxHidden: false,
            //     indexShopArray: event.currentTarget.dataset.shop

            // })
        }
        this.setData({
            url: app.urlw3
        })
        app.setSreachTui = res => {
            var orderArray1 = this.data.goodShop;
            for (let i = 0; i <= res.data.hotProducts.length - 1; i++) {
                res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
            }
            for (let i = 0; i <= res.data.hotProducts.length - 1; i++) {
                orderArray1.push(res.data.hotProducts[i]);
            }
            this.setData({
                goodShop: orderArray1
            })
            wx.hideLoading();
        }
        if (res.inter == "0") {
            this.setData({
                sreachText: res.sreachText
            })
            app.ShortConnect(app.urlw + "Data/searchShop", {
                sreachText: this.data.sreachText
            }, "searchText");
        }
        if (app.nearsreachArray) {
            this.setData({
                nearSreach: app.nearsreachArray,
                hotSreach: app.hotsreachArray,
            })

            console.log(this.data.nearSreach + "sreach");
        } else {

            app.setNearsreach = res => {
                this.setData({
                    nearSreach: res.data.historySearchs,
                    hotSreach: res.data.hotsearchs,
                    goodShop: res.data.hotProducts
                })
                console.log(this.data.nearSreach + "sreach");
            }
        }
        if (app.goodShop) {
            for (let i = 0; i <= app.goodShop.length - 1; i++) {
                app.goodShop[i].head = app.goodShop[i].head.split(",");
            }
            // for (let k = 0; k <= app.goodShop.length - 1; k++) {
            //     let selectsize = JSON.parse(app.goodShop[k].size);
            //     console.log(selectsize+"444444444444444444444444");
            //     let keys = Object.keys(selectsize);
            //     console.log(keys + "444444444444444444444444");
            //     let selectsize1 = {};
            //     console.log(selectsize1 + "444444444444444444444444");
            //     for (let i = 0; i < keys.length; i++) {
            //         let value = selectsize[`${keys[i]}`];
            //         console.log(value + "444444444444444444444444");
            //         let keyss = keys[i].split(",");
            //         console.log(keyss + "444444444444444444444444");
            //         let values = value.split("|");
            //         console.log(values + "444444444444444444444444");
            //         for (let j = 0; j < keyss.length; j++) {
            //             selectsize1[keyss[j]] = values[j];
            //         }
            //     }
            //     app.goodShop[k].size = JSON.stringify(selectsize1);
            // }

            this.setData({
                goodShop: app.goodShop
            })
        } else {
            app.setTuiShop = res => {
                for (let i = 0; i <= res.data.hotProducts.length - 1; i++) {
                    res.data.hotProducts[i].head = res.data.hotProducts[i].head.split(",");
                }
                // for (let k = 0; k <= res.data.hotProducts.length - 1; k++) {
                //     console.log(k.toString() + "444444444444444444444444");
                //     let selectsize = JSON.parse(res.data.hotProducts[k].size);
                //     console.log(selectsize + "444444444444444444444444");
                //     let keys = Object.keys(selectsize);
                //     console.log(keys + "444444444444444444444444");
                //     let selectsize1 = {};
                //     for (let i = 0; i < keys.length; i++) {
                //         let value = selectsize[`${keys[i]}`];
                //         let keyss = keys[i].split(",");
                //         let values = value.split("|");
                //         for (let j = 0; j < keyss.length; j++) {
                //             selectsize1[keyss[j]] = values[j];
                //         }
                //     }
                //     res.data.hotProducts[k].size = JSON.stringify(selectsize1);
                // }
                this.setData({
                    goodShop: res.data.hotProducts
                })
            }
        }
        app.setSreachArray = res => {
            if (res.data.all.length > 0) {
                for (let i = 0; i <= res.data.all.length - 1; i++) {
                    res.data.all[i].hasArray = [];
                    for (let j = 0; j <= Object.keys(res.data.all[i])[0].length-1; j++) {
                        var isHas = false;
                        for (let k = 0; k <= this.data.sreachText.length - 1; k++) {
                            if (this.data.sreachText[k] == Object.keys(res.data.all[i])[0][j]) {
                                isHas = true;
                            }
                        }
                        res.data.all[i].hasArray.push(isHas);
                      
                    }
                    res.data.all[i].type = res.data.all[i].type.split(",");
                    res.data.all[i].name = Object.keys(res.data.all[i])[0];
                    res.data.all[i].number = res.data.all[i][Object.keys(res.data.all[i])[0]];
                }
                console.log("setSreachArray");
                this.setData({
                    sreachArray: res.data.all
                })
                this.setData({
                    scrolViewHeight1: this.data.sreachArray.length * 90 / app.ratio + 117 / app.ratio
                })
                console.log(this.data.sreachArray);
            }
        }
        console.log(app.seeHeight);
        console.log(app.ratio);
        this.setData({
            scrolViewHeight: app.seeHeight - 84 / app.ratio,
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
    sub: function() {
        if (this.data.shopNumber != 1) {
            this.setData({
                shopNumber: this.data.shopNumber - 1
            })
        }
    },
    buyShop: function(event) {
        console.log(event.currentTarget.dataset.pid);
        app.shopMsgJson = null;
        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
            pid: event.currentTarget.dataset.pid
        }, 'ActicleInterShop');
        wx.navigateTo({
            url: '../lck/cartGoodsDetail/cartGoodsDetail'
        })
    },
    buyShop1: function(event) {
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
            console.log(selectsize + "333333333333");
            var keys = Object.keys(selectsize);
            console.log(keys + "333333333333");
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
                // typeValueJson.touch = true;

                typeValueArr2.push(typeValueJson);

            }
            console.log("typeValueArr2 is ", typeValueArr2);
            this.setData({
                buyBoxHidden: false,
                indexShopArray: event.currentTarget.dataset.shop,
                typeArr: Object.keys(event.currentTarget.dataset.shop.size),
                typeValueArr: typeValueArr2

            })
            console.log(this.data.buyBoxHidden+ "333333333333");
        }
    },
    clearSreach: function() {
        console.log("33");
        this.setData({
            sreachText: ""
        })
    },
    reshshData: function() {
        if (this.data.indexPages < app.sreachPages) {
            wx.showLoading({
                title: '加载中',
            })
            this.setData({
                indexPages: this.data.indexPages + 1
            })
            app.ShortConnect(app.urlw + "Data/GetRecommendProduct", {
                page: this.data.indexPages,
            }, "InterSreach2");
        } else {
            wx.showToast({
                title: '已经到底了',
            })
        }
    },
    clearNear: function() {
        this.setData({
            nearSreach: [],
        })

    },
    turnSreach: function (event) {
        // app.ShortConnect(app.urlw + "Data/searchShop", {
        //     searchText: this.data.sreachText
        // }, "searchText");
        app.sreacJson=null;
        app.ShortConnect(app.urlw + "Data/searchInfoByKeyWords", {
            uid:app.uid,
            page:1,
            keywords: event.currentTarget.dataset.id
        }, "pressSreach");
        wx.navigateTo({
            url: '../SreachResult/SreachResult?sreachText=' + this.data.sreachText,
        })
    },
    //点击最近搜索
    pressZuiSreach: function (event){
        app.sreacJson = null;
        app.ShortConnect(app.urlw + "Data/searchInfoByKeyWords", {
            uid: app.uid,
            page: 1,
            keywords: event.currentTarget.dataset.id
        }, "pressSreach");
        wx.navigateTo({
            url: '../SreachResult/SreachResult?sreachText=' + event.currentTarget.dataset.id,
        })
    },
    pressSreach:function(){
        if (this.data.sreachArray.length>0)
        {
            app.sreacJson = null;
            app.ShortConnect(app.urlw + "Data/searchInfoByKeyWords", {
                uid: app.uid,
                page: 1,
                keywords: this.data.sreachArray[0].keywords
            }, "pressSreach");
            wx.navigateTo({
                url: '../SreachResult/SreachResult?sreachText=' + this.data.sreachText,
            })     
        }       
    },
    sreach: function(event) {
        this.setData({
            sreachText: event.detail.value
        })
        console.log(this.data.sreachText);
        if (this.data.sreachText.length>0)
        {
            app.ShortConnect(app.urlw + "Data/searchShop", {
                searchText: this.data.sreachText
            }, "searchText");
        }
    }
});