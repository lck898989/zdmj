// pages/SreachResult/SreachResult.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        indexShopJson:{}, 
        allDefault:false,
        shopNumber:1,
        buyBoxHidden:true,
        url:"",
        sreachText: "",
        //初始化综合最热开关
        buttonsonType: false,
        //初始化吃喝乐购按钮开关
        buttonParentType: false,
        leftArray: [],
        rightArray: [],
        scrollHeight: null,
        top: null,
        isleftDa: true,
        goodShop: [1, 2, 3, 4, 5],
        allproducts: [],
        allessays: [],
        keywords:"",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            url:app.urlw3
        })
        if (app.sreacJson) {
           
            for (let i = 0; i <= app.sreacJson.allessays.length-1;i++)
            {
                if (app.sreacJson.allessays[i].productstype =="shopessays")
                {
                    if (app.sreacJson.allessays[i].essaycustom==1)
                    {
                        if (typeof app.sreacJson.allessays[i].essaycustomhead == "string") {
                            console.log("SreachResult222" + JSON.stringify(app.sreacJson));
                            app.sreacJson.allessays[i].essaycustomhead = app.sreacJson.allessays[i].essaycustomhead.split(",");
                        }
                    }
                    else
                    {
                        if (typeof app.sreacJson.allessays[i].shopessayhead == "string") {
                           
                            app.sreacJson.allessays[i].shopessayhead = app.sreacJson.allessays[i].shopessayhead.split(",");
                        }
                      
                    }
                }
                if (app.sreacJson.allessays[i].productstype == "essays") {
                    console.log(i);
                    if (app.sreacJson.allessays[i].essaycustom==1)
                    {
                        if (typeof app.sreacJson.allessays[i].essaycustomhead == "string") {
                            app.sreacJson.allessays[i].essaycustomhead = app.sreacJson.allessays[i].essaycustomhead.split(",");
                        }
                    }
                    else
                    {
                        if (typeof app.sreacJson.allessays[i].essayhead=="string")
                        {
                            console.log("SreachResult111" + JSON.stringify(app.sreacJson));
                            app.sreacJson.allessays[i].essayhead = app.sreacJson.allessays[i].essayhead.split(",");
                        }
                    }
                }  
            }
            console.log(JSON.stringify(app.sreacJson.allproducts) + "allessays11111111111111");
         
            for (let i = 0; i <= app.sreacJson.allproducts.length - 1; i++) {
                if (app.sreacJson.allproducts[i].custom == 1 && typeof app.sreacJson.allproducts[i].customhead=="string")
                {
                    app.sreacJson.allproducts[i].customhead = app.sreacJson.allproducts[i].customhead.split(",");
                }
                if (typeof app.sreacJson.allproducts[i].head=="string")
                {
                    app.sreacJson.allproducts[i].head = app.sreacJson.allproducts[i].head.split(",");
                }
                else
                {

                }
            }
            this.setData({
                allproducts: app.sreacJson.allproducts,
                allessays: app.sreacJson.allessays,
            })
            if (this.data.allproducts.length > 0 && this.data.allessays.length > 0) {
                var allArray = [];
                for (let i = 0; i <= this.data.allessays.length - 1; i++) {
                    allArray.push(this.data.allessays[i]);
                }
                if (allArray.length % 2 == 0) {
                    let leftArray1 = [];
                    let rightArray1 = [];
                    for (let i = 0; i <= allArray.length - 1; i++) {
                        if (i <= (allArray.length / 2 - 1)) {
                            leftArray1.push(allArray[i]);
                            this.setData({
                                leftArray: leftArray1,
                            })
                        }
                        else {
                            rightArray1.push(allArray[i]);
                            this.setData({
                                rightArray: rightArray1,
                            })
                        }
                    }
                }
                else {
                    let leftArray1 = [];
                    let rightArray1 = [];
                    for (let i = 0; i <= allArray.length - 1; i++) {
                        if (i <= (allArray.length / 2 - 0.5)) {
                            leftArray1.push(allArray[i]);
                            this.setData({
                                leftArray: leftArray1,
                            })
                        }
                        else {
                            rightArray1.push(allArray[i]);
                            this.setData({
                                rightArray: rightArray1,
                            })
                        }
                    }
                }
            
              
            } else {
                if (this.data.allproducts.length > 0) {

                    this.setData({
                        buttonParentType: true
                    })
                }
                if (this.data.allessays.length > 0) {
                    var allArray = [];
                    // for (let i = 0; i <= this.data.allproducts.length - 1; i++) {
                    //     allArray.push(this.data.allproducts[i]);
                    // }
                    for (let i = 0; i <= this.data.allessays.length - 1; i++) {
                        allArray.push(this.data.allessays[i]);
                    }
                    if (allArray.length % 2 == 0) {
                        let leftArray1 = [];
                        let rightArray1 = [];
                        for (let i = 0; i <= allArray.length - 1; i++) {
                            if (i <= (allArray.length / 2 - 1)) {
                                leftArray1.push(allArray[i]);
                                this.setData({
                                    leftArray: leftArray1,
                                })
                            }
                            else {
                                rightArray1.push(allArray[i]);
                                this.setData({
                                    rightArray: rightArray1,
                                })
                            }
                        }
                    }
                    else {
                        let leftArray1 = [];
                        let rightArray1 = [];
                        for (let i = 0; i <= allArray.length - 1; i++) {
                            if (i <= (allArray.length / 2 - 0.5)) {
                                leftArray1.push(allArray[i]);
                                this.setData({
                                    leftArray: leftArray1,
                                })
                            }
                            else {
                                rightArray1.push(allArray[i]);
                                this.setData({
                                    rightArray: rightArray1,
                                })
                            }
                        }
                    }
                   
                }
            }
        } else {
            app.setSreachWen = res => {
                console.log("SreachResult2" + res.data.allproducts.length.toString());
                console.log("SreachResult2" + res.data.allessays.length.toString());
                for (let i = 0; i <= res.data.allessays.length - 1; i++) {
                    if (res.data.allessays[i].productstype == "shopessays") {
                        if (res.data.allessays[i].essaycustom == 1) {
                            res.data.allessays[i].essaycustomhead = res.data.allessays[i].essaycustomhead.split(",");
                        }
                        else {
                            console.log("SreachResult222" + JSON.stringify(app.sreacJson));
                            res.data.allessays[i].shopessayhead = res.data.allessays[i].shopessayhead.split(",");
                        }
                    }
                    if (res.data.allessays[i].productstype == "essays") {
                        if (res.data.allessays[i].essaycustom == 1) {
                            res.data.allessays[i].essaycustomhead = res.data.allessays[i].essaycustomhead.split(",");
                        }
                        else {
                            console.log("SreachResult111" + JSON.stringify(app.sreacJson));
                            res.data.allessays[i].essayhead = res.data.allessays[i].essayhead.split(",");
                        }
                    }
                }
                for (let i = 0; i <= res.data.allproducts.length - 1; i++) {
                    if (res.data.allproducts[i].custom == 1 && typeof res.data.allproducts[i].customhead=="string")
                    {
                        res.data.allproducts[i].customhead=res.data.allproducts[i].customhead.split(",");
                    }
                    res.data.allproducts[i].head =res.data.allproducts[i].head.split(",");
                }
                this.setData({
                    allproducts: res.data.allproducts,
                    allessays: res.data.allessays,
                    leftArray:[],
                    rightArray:[],
                })
                if (this.data.allproducts.length > 0 && this.data.allessays.length > 0) {
                    var allArray = [];
                    // for (let i = 0; i <= this.data.allproducts.length - 1; i++) {
                    //     allArray.push(this.data.allproducts[i]);
                    // }
                    for (let i = 0; i <= this.data.allessays.length - 1; i++) {
                        allArray.push(this.data.allessays[i]);
                    }
                    if (allArray.length % 2 == 0) {
                        let leftArray1 = [];
                        let rightArray1 = [];
                        for (let i = 0; i <= allArray.length - 1; i++) {
                            if (i <= (allArray.length / 2 - 1)) {
                                leftArray1.push(allArray[i]);
                                this.setData({
                                    leftArray: leftArray1,
                                })
                            }
                            else {
                                rightArray1.push(allArray[i]);
                                this.setData({
                                    rightArray: rightArray1,
                                })
                            }
                        }
                    }
                    else {
                        let leftArray1 = [];
                        let rightArray1 = [];
                        for (let i = 0; i <= allArray.length - 1; i++) {
                            if (i <= (allArray.length / 2 - 0.5)) {
                                leftArray1.push(allArray[i]);
                                this.setData({
                                    leftArray: leftArray1,
                                })
                            }
                            else {
                                rightArray1.push(allArray[i]);
                                this.setData({
                                    rightArray: rightArray1,
                                })
                            }
                        }
                    }
                    console.log(JSON.stringify(this.data.leftArray) + "!!!!!!!!!!!!!!");
                    console.log(JSON.stringify(this.data.rightArray) + "!!!!!!!!!!!!!!");
               
                } else {
                    if (this.data.allproducts.length > 0) {
                        this.setData({
                            buttonParentType: true
                        })
                    }
                    if (this.data.allessays.length > 0) {
                        var allArray = [];
                        // for (let i = 0; i <= this.data.allproducts.length - 1; i++) {
                        //     allArray.push(this.data.allproducts[i]);
                        // }
                        for (let i = 0; i <= this.data.allessays.length - 1; i++) {
                            allArray.push(this.data.allessays[i]);
                        }
                        if (allArray.length % 2 == 0) {
                            let leftArray1 = [];
                            let rightArray1 = [];
                            for (let i = 0; i <= allArray.length - 1; i++) {
                                if (i <= (allArray.length / 2 - 1)) {
                                    leftArray1.push(allArray[i]);
                                    this.setData({
                                        leftArray: leftArray1,
                                    })
                                }
                                else {
                                    rightArray1.push(allArray[i]);
                                    this.setData({
                                        rightArray: rightArray1,
                                    })
                                }
                            }
                        }
                        else {
                            console.log("cuo");
                            let leftArray1 = [];
                            let rightArray1 = [];
                            for (let i = 0; i <= allArray.length - 1; i++) {
                                if (i <= (allArray.length / 2 - 0.5)) {
                                    console.log(i);
                                    leftArray1.push(allArray[i]);
                                    this.setData({
                                        leftArray: leftArray1,
                                    })
                                }
                                else {
                                    console.log(i);
                                    rightArray1.push(allArray[i]);
                                    this.setData({
                                        rightArray: rightArray1,
                                    })
                                }
                            }
                        }
                      
                    }
                }
            }
        }
        console.log(options.sreachText);
        this.setData({
            sreachText: options.sreachText,
            keywords: options.keywords,

        })
        for (let i = 0; i <= this.data.leftArray.length - 1; i++) {
            for (let j = 0; j <= this.data.rightArray.length - 1; j++) {
                if (i == j) {
                    if (this.data.leftArray[i].height > this.data.rightArray[j].height) {
                        if (this.data.isleftDa) {
                            this.setData({
                                isleftDa: false,
                            })
                            break;
                        } else {
                            var leftNumber = this.data.leftArray[i];
                            this.data.leftArray[i] = this.data.rightArray[j];
                            this.data.rightArray[j] = leftNumber;
                            this.setData({
                                isleftDa: true,
                            })
                        }
                    } else if (this.data.leftArray[i].height < this.data.rightArray[j].height) {
                        if (this.data.isleftDa) {
                            var leftNumber = this.data.leftArray[i];
                            this.data.leftArray[i] = this.data.rightArray[j];
                            this.data.rightArray[j] = leftNumber;
                            this.setData({
                                isleftDa: false,
                            })
                        } else {
                            this.setData({
                                isleftDa: true,
                            })
                            break;
                        }
                    }
                }
            }
        }
        console.log(this.data.leftArray);
        console.log(this.data.rightArray);
        this.setData({
            leftArray: this.data.leftArray,
            rightArray: this.data.rightArray,
            scrollHeight: app.seeHeight - 225 / app.ratio,
            top: 225 / app.ratio
        })

    },
    getHeight: function(event) {
        var width = event.detail.width;
        var height = event.detail.height;
        if (event.currentTarget.dataset.type=="left")
        {
            this.data.leftArray[event.currentTarget.dataset.id].height = 343 * height / width;
            this.setData({
                leftArray: this.data.leftArray
            })
        }
        if (event.currentTarget.dataset.type == "right") {
            this.data.rightArray[event.currentTarget.dataset.id].height = 343 * height / width;
            this.setData({
                rightArray: this.data.rightArray
            })
        }
        console.log(JSON.stringify(this.data.leftArray) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(JSON.stringify(this.data.rightArray) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //获取每张图片的高度
    },
    buyShop: function (event) {
        console.log(event.currentTarget.dataset.pid);
        app.shopMsgJson = null;
        app.ShortConnect(app.urlw + "Data/GetProductByPid", {
            pid: event.currentTarget.dataset.pid
        }, 'ActicleInterShop', function (r) {
            wx.setStorage({
                key: 'goods',
                data: r,
                success: function () {
                    wx.navigateTo({
                        url: '../lck/cartGoodsDetail/cartGoodsDetail'
                    })
                    // wx.navigateTo({
                    //     url: '../lck/careGoodsDetail/cartGoodsDetail',
                    // }) 

                },
            })  
        });
        // wx.navigateTo({
        //     url: '../lck/cartGoodsDetail/cartGoodsDetail'
        // })
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
    sreach: function() {
        app.goodShop=null;
        wx.navigateTo({
            url: '../search/search?sreachText=' + this.data.sreachText + "&inter=0",
        })
    },
    sreach1: function() {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    cancel:function(){
        this.setData({
            buyBoxHidden:true
        })
    },
    pressSure: function () {
        let data = {
            uid: app.uid,
            pid: this.data.indexShopJson.pid,
            size: this.data.indexShopJson.size,
            count: this.data.shopNumber,
        }
        console.log(JSON.stringify(this.data.wenzhangJson) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
            url: '../lck/order/order?interSource=0',
        });
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
    intetWenzhang: function(event) {
     
        if (event.currentTarget.dataset.productstype =="essays")
        {
            console.log(event.currentTarget.dataset.shopurl);
            app.wenzhangJson=null;
            app.ShortConnect(app.urlw + "Data/GetEssayInfo", {
                pid: event.currentTarget.dataset.shopjson.pid,
                eid: event.currentTarget.dataset.shopjson.eid,
                uid:app.uid
            }, "interWenZhang",function(res){});
            wx.navigateTo({
                url: '../ActicleScene/ActicleScene?essayhead=' + event.currentTarget.dataset.shopurl + "&title=" + event.currentTarget.dataset.title + "&authorurl=" + event.currentTarget.dataset.shopjson.wxhead + "&authorname=" + event.currentTarget.dataset.shopjson.wxnickname + "&pid=" + JSON.stringify(event.currentTarget.dataset.shopjson.pid) + "&eid=" + JSON.stringify(event.currentTarget.dataset.shopjson.eid) + "&introduction=" + event.currentTarget.dataset.introduction,
            })
        }
        if (event.currentTarget.dataset.productstype == "shopessays") {
            console.log(event.currentTarget.dataset.title+"--=----------------");
            var shopjson2 = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.shopjson));
            // app.wenzhangShop = null;
            app.shopWenZhangJson=null;
            app.wenzhangShop=null;
            app.ShortConnect(app.urlw + "Data/GetShopProductsByShopEssayShopid", {
                shopid: event.currentTarget.dataset.shopid,
                uid: app.uid
            }, "turnShopWen",function(res){});
            wx.navigateTo({
                url: '../ShopActicle/ShopActicle?shopurl=' + event.currentTarget.dataset.shopurl + '&introduction=' + event.currentTarget.dataset.title + "&shopjson=" + shopjson2,
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    pressParentType: function() {
        if (this.data.buttonParentType) {
            console.log("333");
            this.setData({
                buttonParentType: false
            })
        } else {
           
            this.setData({
                buttonParentType: true,
            })
        }
    },
    pressTypeSon: function() {
        if (this.data.buttonsonType) {
            console.log("111");
            this.setData({
                buttonsonType: false
            })
            app.ShortConnect(app.urlw + "Data/searchInfoByKeyWords", {
                uid: app.uid,
                page: 1,
                type: 0,
                keywords: this.data.keywords
            }, "pressSreach");
          
        } else {
            app.ShortConnect(app.urlw + "Data/searchInfoByKeyWords", {
                uid: app.uid,
                page: 1,
                type: 1,
                keywords: this.data.keywords
            }, "pressSreach");
            this.setData({
                buttonsonType: true
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