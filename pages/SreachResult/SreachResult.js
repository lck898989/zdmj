// pages/SreachResult/SreachResult.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
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



    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            url:app.urlw3
        })
        console.log("SreachResult");
        if (app.sreacJson) {
            console.log("SreachResult1" + app.sreacJson.allproducts.length);
            console.log("SreachResult1" + app.sreacJson.allessays.length);
            for (let i = 0; i <= app.sreacJson.allessays.length-1;i++)
            {
                if (app.sreacJson.allessays[i].productstype =="shopessays")
                {
                    app.sreacJson.allessays[i].shopessayhead = app.sreacJson.allessays[i].shopessayhead.split(",");
                }
                if (app.sreacJson.allessays[i].productstype == "essays") {
                    app.sreacJson.allessays[i].essayhead = app.sreacJson.allessays[i].essayhead.split(",");
                }  
            }
            for (let i = 0; i <= app.sreacJson.allproducts.length - 1; i++) {
                app.sreacJson.allproducts[i].head = app.sreacJson.allproducts[i].head.split(",");
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
                console.log(this.data.leftArray.length + "!!!!!!!!!!!!!!");
                console.log(this.data.rightArray.length + "!!!!!!!!!!!!!!");
              
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
                    console.log(this.data.leftArray.length + "!!!!!!!!!!!!!!");
                    console.log(this.data.rightArray.length + "!!!!!!!!!!!!!!");
                }
            }
        } else {
            app.setSreachWen = res => {
                console.log("SreachResult2" + res.data.allproducts.length.toString());
                console.log("SreachResult2" + res.data.allessays.length.toString());
                for (let i = 0; i <= res.data.allessays.length - 1; i++) {
                    if (res.data.allessays[i].productstype=="essays")
                    {
                        res.data.allessays[i].essayhead = res.data.allessays[i].essayhead.split(",");
                    }
                    else
                    {
                        res.data.allessays[i].shopessayhead = res.data.allessays[i].shopessayhead.split(",");
                    }
                }
                for (let i = 0; i <= res.data.allproducts.length - 1; i++) {
                    res.data.allproducts[i].head =   res.data.allproducts[i].head.split(",");
                }
                this.setData({
                    allproducts: res.data.allproducts,
                    allessays: res.data.allessays,
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
                    console.log(this.data.leftArray.length + "!!!!!!!!!!!!!!");
                    console.log(this.data.rightArray.length + "!!!!!!!!!!!!!!");
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
                        console.log(this.data.leftArray.length + "!!!!!!!!!!!!!!");
                        console.log(JSON.stringify(this.data.rightArray) + "!!!!!!!!!!!!!!");
                    }
                }
            }
        }

        console.log(options.sreachText);
        this.setData({
            sreachText: options.sreachText
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
        console.log(event.detail);
        console.log(event.currentTarget.dataset.id);
        console.log(event.currentTarget.dataset.type);
        //获取每张图片的高度

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
    intetWenzhang: function(event) {
        app.ShortConnect(app.urlw+"Data/GetShopProductsByShopEssayShopid",{
            shopid: event.currentTarget.dataset.shopid
        },"turnShopWen");
        wx.navigateTo({
            url: '../ShopActicle/ShopActicle',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    pressParentType: function() {
        if (this.data.buttonParentType) {
            this.setData({
                buttonParentType: false
            })
        } else {
            this.setData({
                buttonParentType: true
            })

        }
    },
    pressTypeSon: function() {
        if (this.data.buttonsonType) {
            this.setData({
                buttonsonType: false
            })
        } else {
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