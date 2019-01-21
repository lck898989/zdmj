// pages/MyOrder/MyOrder.js
var app = getApp();
var js;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        codeurl: "",
        codeHidden: true,
        indexverificationcode: null,
        indexJSON: {},
        indexchoose: 0,
        url: "http://shop.ykplay.com",
        //分类数组
        typeArray: ["全部", "待付款", "待收货", "已完成"],
        typeShangpu: ["全部", "待付款 ", "可使用", "已使用", "已过期"],
        //初始化分类
        indexs: 0,
        indexss: 0,
        //我的订单数组
        orderArray: [],
        ordershangArray: [],
        //判断是否上拉加载中
        isPull: false,
        //判断是否有数据
        isHas: true,
        text: "未确认收货",
        timeObject: [],
        oidObject: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.setMyOrder1 = res => {
            for (var i = 0; i <= res.data.orders.length - 1; i++) {
                for (var j = 0; j <= res.data.orders[i].orderItems[0].length - 1; j++) {
                    // res.data.orders[i].orderItems[0][j].product.size = JSON.parse(res.data.orders[i].orderItems[0][j].product.size);
                    res.data.orders[i].orderItems[0][j].standard = res.data.orders[i].orderItems[0][j].standard.replace("|", "  ");
                    var c = res.data.orders[i].orderItems[0][j].product.head.split(",");
                    res.data.orders[i].orderItems[0][j].product.head = c;
                    // let size = Object.values(JSON.parse(res.data.orders[i].orderItems[0][j].product.size));
                    // let size1 = "";
                    // for (let k = 0; k <= size.length - 1; k++) {
                    //     size1 = size1 + size[k];
                    // }
                    // res.data.orders[i].orderItems[0][j].product.size = size1;
                    // if (res.data.orders[i].orderItems[0][j].product.size.includes("默认")) {

                    //     res.data.orders[i].orderItems[0][j].product.isMoren = false;
                    // }
                    // else {
                    //     res.data.orders[i].orderItems[0][j].product.isMoren = true;
                    // }
                }
            }
            if (res.data.orders.length > 0) {
                this.setData({
                    isHas: false,
                })

            }
            else {
                this.setData({
                    isHas: true,
                })

            }
            this.setData({
                orderArray: res.data.orders
            })
        }
     
        switch (options.indexs) {
            case "0":
                this.setData({
                    indexs: parseInt(options.indexs)
                })
                break;
            case "1":
                this.setData({
                    indexs: parseInt(options.indexs)
                })
                break;
            case "2":
                this.setData({
                    indexs: parseInt(options.indexs)
                })
                break;
            case "3":
                this.setData({
                    indexs: parseInt(options.indexs)
                })
                break;
        }
        // app.setUpda = res => {
        //     this.setData({
        //         indexs:res
        //     })
        //     console.log("");
        // }

        app.setNullButton = res => {
            console.log("onLoad");
            this.setData({
                isHas: true,
            })
        }
        if (app.myorderArray) {
            console.log("???????????????????1");
            for (var i = 0; i <= app.myorderArray.length - 1; i++) {
                for (var j = 0; j <= app.myorderArray[i].orderItems[0].length - 1; j++) {
                    // app.myorderArray[i].orderItems[0][j].product.size = JSON.parse(app.myorderArray[i].orderItems[0][j].product.size)                
                    app.myorderArray[i].orderItems[0][j].standard = app.myorderArray[i].orderItems[0][j].standard.replace("|", "");
                    if (typeof app.myorderArray[i].orderItems[0][j].product.head == "string") {
                        var c = app.myorderArray[i].orderItems[0][j].product.head.split(",");
                        app.myorderArray[i].orderItems[0][j].product.head = c;
                    }
                    // let size = Object.values(JSON.parse(app.myorderArray[i].orderItems[0][j].product.size));
                    // let size1="";
                    // for (let k = 0; k <= size.length-1;k++)
                    // {
                    //     size1 = size1 + size[k];
                    // }
                    // app.myorderArray[i].orderItems[0][j].product.size = size1;
                    // if (app.myorderArray[i].orderItems[0][j].product.size.includes("默认"))
                    // {
                    //     app.myorderArray[i].orderItems[0][j].product.isMoren=false;
                    // }
                    // else
                    // {
                    //     app.myorderArray[i].orderItems[0][j].product.isMoren = true;
                    // }
                    console.log();
                }
            }
            if (app.myorderArray.length > 0) {
                this.setData({
                    isHas: false,
                })

            }
            else {
                this.setData({
                    isHas: true,
                })

            }
            console.log(JSON.stringify(app.myorderArray) + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            this.setData({
               
                orderArray: app.myorderArray,
            })
            // if (this.data.timeObject.length >= 1) {
            //     for (var j = 0; j <= this.data.timeObject.length - 1; j++) {
            //         clearInterval(this.data.timeObject[j]);
            //         if (j == this.timeObject.length - 1) {
            //             this.setData({
            //                 timeObject: [],
            //                 oidObject: [],
            //             })
            //         }
            //     }
            // }
            if (app.isStartOrder == false) {
                var isHas = false;
                for (let i = 0; i <= this.data.orderArray.length - 1; i++) {
                    if (this.data.orderArray[i].state == 1) {
                        isHas = true;
                    }
                }
                if (isHas) {
                    // this.countDown();
                    app.isStartOrder = true;
                }
            } else {
                clearTimeout(js);
                var isHas = false;
                for (let i = 0; i <= this.data.orderArray.length - 1; i++) {
                    if (this.data.orderArray[i].state == 1) {
                        isHas = true;
                    }
                }
                if (isHas) {
                    // this.countDown();
                }
            }
           
        } else {
            app.setMyOrder = res => {
                console.log(JSON.stringify(res.data.orders) + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.log("???????????????????2");
                for (var i = 0; i <= res.data.orders.length - 1; i++) {
                    for (var j = 0; j <= res.data.orders[i].orderItems[0].length - 1; j++) {
                        // res.data.orders[i].orderItems[0][j].product.size = JSON.parse(res.data.orders[i].orderItems[0][j].product.size);
                        res.data.orders[i].orderItems[0][j].standard = res.data.orders[i].orderItems[0][j].standard.replace("|", "  ");
                        var c = res.data.orders[i].orderItems[0][j].product.head.split(",");
                        res.data.orders[i].orderItems[0][j].product.head = c;
                        // let size = Object.values(JSON.parse(res.data.orders[i].orderItems[0][j].product.size));
                        // let size1 = "";
                        // for (let k = 0; k <= size.length - 1; k++) {
                        //     size1 = size1 + size[k];
                        // }
                        // res.data.orders[i].orderItems[0][j].product.size = size1;
                        // if (res.data.orders[i].orderItems[0][j].product.size.includes("默认")) {

                        //     res.data.orders[i].orderItems[0][j].product.isMoren = false;
                        // }
                        // else {
                        //     res.data.orders[i].orderItems[0][j].product.isMoren = true;
                        // }
                    }
                }
                if (res.data.orders.length>0)
                {
                    this.setData({
                        isHas: false,
                    })
                    
                }
                else
                {
                    this.setData({
                        isHas: true,
                    })

                }
                this.setData({
                   
                    orderArray: res.data.orders
                })

                if (app.isStartOrder == false) {
                    var isHas = false;
                    for (let i = 0; i <= res.data.orders.length - 1; i++) {
                        if (res.data.orders[i].state == 1) {
                            isHas = true;
                        }
                    }
                    if (isHas) {

                        // this.countDown();
                        app.isStartOrder = true;
                    }
                } else {

                    clearTimeout(js);
                    var isHas = false;
                    for (let i = 0; i <= res.data.orders.length - 1; i++) {
                        if (res.data.orders[i].state == 1) {
                            isHas = true;
                        }
                    }
                    if (isHas) {
                        // this.countDown();

                    }

                }
            }
        }
        app.getOrderArray = res => {
            if (app.orderLoadPage > 1) {
                // console.log(res);
                var orderArray1 = this.data.orderArray;
                for (var i = 0; i <= res.data.orders.length - 1; i++) {
                    orderArray1.push(res.data.orders[i]);
                }
                if (res.data.orders.length>0)
                {
                    this.setData({
                        isHas:false
                    })

                }
                else
                {
                    this.setData({
                        isHas:true
                    })
                }
                this.setData({
                    orderArray: orderArray1,
                    isPull: false,
                   
                })
                console.log(this.data.orderArray.length);
            } else {
               
                this.setData({
                    orderArray: res.data.orders,
                    isPull: false,
                    
                })
                console.log(JSON.stringify(this.data.orderArray));
                console.log(JSON.stringify(this.data.orderArray) + "==================================");
            }
            app.orderPage = res.data.pages;
            wx.hideLoading();
        }
    },
    pressShangcheng: function() {
        var self = this;
        if (this.data.indexchoose != 0) {
            app.orderLoadPage = 1;
            app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                uid: app.uid,
                page: 1
            }, "getmyOrder");

            this.setData({
                indexchoose: 0
            })
        }

    },
    pressShangpu: function() {
        var self = this;
        if (this.data.indexchoose != 1) {
            app.orderLoadPage = 1;
            app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                uid: app.uid,
                page: 1,
                state: 0
            }, "getmyOrder2", function(res) {
                if (res.data.shoporders.length>0)
                {
                    self.setData({
                        isHas:false
                    })
                }
                else
                {
                    self.setData({
                        isHas: true
                    })
                }
                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                }
                self.setData({
                    ordershangArray: res.data.shoporders
                })
            });

            this.setData({
                indexchoose: 1
            })
        }
    },
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown: function() {
        var self = this;
        let newTime = new Date().getTime();
        for (let i = 0; i <= self.data.orderArray.length - 1; i++) {
            if (self.data.orderArray[i].state == 1) {
                var a = self.data.orderArray[i].ordertime;
                // a = o.ordertime.replace("-", "/");
                // a = a.replace("T", " ");
                // a = a.replace(".000Z", " ");
                // console.log(a);
                let endTime = new Date(a).getTime() + 50000;
                let day = '0';
                let hou = '0';
                let min = '0';
                let sec = '0';
                let obj = null;
                let days = null;
                // 如果活动未结束，对时间进行处理
                if (endTime - newTime > 0) {
                    let time = (endTime - newTime) / 1000;
                    // 获取天、时、分、秒
                    day = self.timeFormat(parseInt(time / (60 * 60 * 24))).toString();
                    if (day[0] == '0') {
                        days = day.substr(1, 1);
                        day = days;
                    }
                    hou = self.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)).toString();
                    min = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)).toString();
                    sec = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60)).toString();
                    // obj = {
                    //     day: this.timeFormat(day),
                    //     hou: this.timeFormat(hou),
                    //     min: this.timeFormat(min),
                    //     sec: this.timeFormat(sec)
                    // }
                } else { //活动已结束，全部设置为'00'
                    //   obj = {
                    //     day: '00',
                    //     hou: '00',
                    //     min: '00',
                    //     sec: '00'
                    //   }
                    // clearInterval(b);
                    day = "0";
                    hou = '00';
                    min = '00';
                    sec = '00';
                    app.ShortConnect(app.urlw + "Data/CancelOrder", {
                        oid: self.data.orderArray[i].oid,
                        uid: app.uid
                    }, "dissppearOrder");
                }

                self.data.orderArray[i].time = {
                    days: day,
                    hous: hou,
                    mins: min,
                    secs: sec,
                };
                console.log(self.data.orderArray[i].time);
            }
        }
        this.setData({
            orderArray: this.data.orderArray,
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        // this.setData({ countDownList: countDownArr })
        js = setTimeout(this.countDown, 1000);
        // console.log(js+"===========================");
    },
    // countDown() { //倒计时函数
    //     var self = this;
    //     // while (self.data.orderArray.length>0)
    //     // {

    //     // }
    //     // 获取当前时间，同时得到活动结束时间数组
    //     for (let i = 0; i <= self.data.orderArray.length-1; i++) {
    //         if (self.data.orderArray[i].state == 1) {  
    //             let newTime = new Date().getTime();
    //             console.log(newTime+"!!!!!!!!!!!!!!!!!!!!!!!!1");
    //             var a = self.data.orderArray[i].ordertime;
    //             // a = o.ordertime.replace("-", "/");
    //             // a = a.replace("T", " ");
    //             // a = a.replace(".000Z", " ");
    //             // console.log(a);
    //             let endTime = new Date(a).getTime() +20000;
    //             let day = '0';
    //             let hou = '0';
    //             let min = '0';
    //             let sec = '0';
    //             let obj = null;
    //             let days = null;
    //             // 如果活动未结束，对时间进行处理
    //             if (endTime - newTime > 0) {
    //                 let time = (endTime - newTime) / 1000;
    //                 // 获取天、时、分、秒
    //                 day = self.timeFormat(parseInt(time / (60 * 60 * 24))).toString();
    //                 if (day[0] == '0') {
    //                     days = day.substr(1, 1);
    //                     day = days;
    //                 }
    //                 hou = self.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)).toString();
    //                 min = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)).toString();
    //                 sec = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60)).toString();
    //                 // obj = {
    //                 //     day: this.timeFormat(day),
    //                 //     hou: this.timeFormat(hou),
    //                 //     min: this.timeFormat(min),
    //                 //     sec: this.timeFormat(sec)
    //                 // }
    //             } else { //活动已结束，全部设置为'00'
    //                 //   obj = {
    //                 //     day: '00',
    //                 //     hou: '00',
    //                 //     min: '00',
    //                 //     sec: '00'
    //                 //   }
    //                 // clearInterval(b);
    //                 day = "0";
    //                 hou = '00';
    //                 min = '00';
    //                 sec = '00';
    //                 app.ShortConnect(app.urlw + "Data/CancelOrder", {
    //                     oid: self.data.orderArray[i].oid,
    //                     uid: app.uid
    //                 }, "dissppearOrder");
    //             }
    //             self.data.orderArray[i].time = {
    //                 days: day,
    //                 hous: hou,
    //                 mins: min,
    //                 secs: sec,
    //             };
    //             var timeObject1 = this.data.timeObject;
    //             timeObject1.push(self.data.orderArray[i].oid);
    //             self.setData({
    //                 orderArray: self.data.orderArray,
    //                 timeObject: timeObject1,
    //             })   
    //             console.log(self.data.timeObject+"?????????????????????????????????//");
    //             self.data.timeObject[self.data.timeObject.length-1] = setInterval(function() {
    //                 console.log(i.toString()+ "==================");
    //                 let newTime1 = new Date().getTime();
    //                 let c= self.data.orderArray[i].ordertime;
    //                 // a = o.ordertime.replace("-", "/");
    //                 // a = a.replace("T", " ");
    //                 // a = a.replace(".000Z", " ");
    //                 // console.log(a);
    //                 let endTime = new Date(c).getTime() + 100000;
    //                 let day = '0';
    //                 let hou = '0';
    //                 let min = '0';
    //                 let sec = '0';
    //                 let obj = null;
    //                 let days = null;
    //                 // 如果活动未结束，对时间进行处理
    //                 if (endTime - newTime1 > 0) {
    //                     let time = (endTime - newTime1) / 1000;
    //                     // 获取天、时、分、秒
    //                     day = self.timeFormat(parseInt(time / (60 * 60 * 24))).toString();
    //                     if (day[0] == '0') {
    //                         days = day.substr(1, 1);
    //                         day = days;
    //                     }
    //                     hou = self.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)).toString();
    //                     min = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)).toString();
    //                     sec = self.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60)).toString();
    //                     // obj = {
    //                     //     day: this.timeFormat(day),
    //                     //     hou: this.timeFormat(hou),
    //                     //     min: this.timeFormat(min),
    //                     //     sec: this.timeFormat(sec)
    //                     // }
    //                 } else { //活动已结束，全部设置为'00'
    //                     //   obj = {
    //                     //     day: '00',
    //                     //     hou: '00',
    //                     //     min: '00',
    //                     //     sec: '00'
    //                     //   }
    //                     clearInterval(self.data.timeObject[self.data.timeObject.length - 1] );
    //                     day = "0";
    //                     hou = '00';
    //                     min = '00';
    //                     sec = '00';
    //                     app.ShortConnect(app.urlw + "Data/CancelOrder", {
    //                         oid: self.data.orderArray[i].oid,
    //                         uid: app.uid
    //                     }, "dissppearOrder");
    //                 }
    //                 self.data.orderArray[i].time = {
    //                     days: day,
    //                     hous: hou,
    //                     mins: min,
    //                     secs: sec,
    //                 };
    //                 self.setData({
    //                     orderArray: self.data.orderArray,
    //                 })
    //             }, 1000);

    //             // console.log(self.data.timeObject[self.data.timeObject.length - 1] + "==================");
    //             var oidObject1 = this.data.oidObject;
    //             oidObject1.push(self.data.orderArray[i].oid);
    //             self.setData({
    //                 oidObject: oidObject1,
    //             })   
    //             // oidObject
    //         }
    //     }

    // },
    //跳转到物流界面
    GoShopAdress: function(event) {
        console.log(event.currentTarget.dataset.wustate);
        if (event.currentTarget.dataset.wustate == "null") {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: "该商品未发货",
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            // wx.navigateTo({
            //     url: '../ShopAdress/ShopAdress',
            // })
        } else {
            app.orderMsg.ordernumber = event.currentTarget.dataset.ordernumber;
            app.orderMsg.ordertime = event.currentTarget.dataset.ordertime;
            app.orderMsg.paytime = event.currentTarget.dataset.paytime;
            app.orderMsg.phy_number = event.currentTarget.dataset.phy_number;
            app.orderMsg.shopmsg = event.currentTarget.dataset.shopmsg;
            console.log(JSON.stringify(app.orderMsg));
            // app.orderMsg.ordertime = event.currentTarget.dataset.ordernumber;
            // app.orderMsg.ordertime = event.currentTarget.dataset.ordernumber;
            // app.orderMsg.ordertime = event.currentTarget.dataset.ordernumber;
            app.ShortConnect(app.urlw + "Data/InquireLogisticsByNumber", {
                phy_number: event.currentTarget.dataset.wustate
            }, "getShopDi");
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
        switch (this.data.indexs) {
            case 0:
                app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
                    uid: app.uid
                }, "upda");
                app.myOrderNumber = 0;
                break;
            case 1:
                app.orderLoadPage = 1;
                app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                    uid: app.uid,
                    page: app.orderLoadPage,
                    state: 1
                }, "getmyOrder");
                // app.myOrderNumber = 1;
                break;
            case 2:

                app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
                    uid: app.uid
                }, "upda");
                app.myOrderNumber = 2;
                break;
            case 3:
                app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
                    uid: app.uid
                }, "upda");
                app.myOrderNumber = 3;
                break;
        }

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var self=this;
        console.log("4444");
        console.log(app.orderLoadPage);
        if (this.data.isPull == false) {
            this.setData({
                isPull: true
            })
            wx.showLoading({
                title: '加载中',
            })
            app.orderLoadPage += 1;
            if (this.data.indexchoose==1)
            {
                switch (this.data.indexss) {
                    case 0:
                        console.log(app.orderLoadPage);
                        // app.orderLoadPage = 1;
                        app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                            uid: app.uid,
                            page: app.orderLoadPage,
                            state: 0
                        }, "getmyOrder3", function (res) {
                            if (res.data.shoporders.length > 0) {
                                var ordershangArray = this.data.ordershangArray;
                                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                                    ordershangArray.push(res.data.shoporders[i]);
                                }

                                self.setData({
                                    ordershangArray: ordershangArray
                                })
                            }
                            else {
                                console.log("????????????????????????????");
                                wx.showToast({
                                    title: '已经到底了',
                                })
                            }
                        });

                        break;
                    case 1:
                        // app.orderLoadPage = 1;
                        app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                            uid: app.uid,
                            page: app.orderLoadPage,
                            state: 1
                        }, "getmyOrder3", function (res) {
                            if (res.data.shoporders.length > 0) {
                                var ordershangArray = this.data.ordershangArray;
                                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                                    ordershangArray.push(res.data.shoporders[i]);
                                }

                                self.setData({
                                    ordershangArray: ordershangArray
                                })
                            }
                            else {
                                wx.showToast({
                                    title: '已经到底了',
                                })
                            }
                        });

                        break;
                    case 2:
                        // app.orderLoadPage = 1;
                        app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                            uid: app.uid,
                            page: app.orderLoadPage,
                            state: 2
                        }, "getmyOrder3", function (res) {
                            if (res.data.shoporders.length > 0) {
                                var ordershangArray = this.data.ordershangArray;
                                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                                    ordershangArray.push(res.data.shoporders[i]);
                                }

                                self.setData({
                                    ordershangArray: ordershangArray
                                })
                            }
                            else {
                                wx.showToast({
                                    title: '已经到底了',
                                })
                            }
                        });

                        break;
                    case 3:
                        // app.orderLoadPage = 1;
                        app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                            uid: app.uid,
                            page: app.orderLoadPage,
                            state: 21
                        }, "getmyOrder3", function (res) {

                            if (res.data.shoporders.length > 0) {
                                var ordershangArray = this.data.ordershangArray;
                                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                                    ordershangArray.push(res.data.shoporders[i]);
                                }

                                self.setData({
                                    ordershangArray: ordershangArray
                                })
                            }
                            else {
                                wx.showToast({
                                    title: '已经到底了',
                                })
                            }
                        });

                        break;
                    case 4:

                        // app.orderLoadPage = 1;
                        app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                            uid: app.uid,
                            page: app.orderLoadPage,
                            state: 6
                        }, "getmyOrder3", function (res) {
                            if (res.data.shoporders.length > 0) {
                                var ordershangArray = this.data.ordershangArray;
                                for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                                    res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                                    ordershangArray.push(res.data.shoporders[i]);
                                }

                                self.setData({
                                    ordershangArray: ordershangArray
                                })
                            }
                            else {
                                wx.showToast({
                                    title: '已经到底了',
                                })
                            }
                        });
                        break;
                }

            }
           if(this.data.indexchoose==0)
           {
               switch (this.data.indexs) {
                   case 0:
                       app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                           uid: app.uid,
                           page: app.orderLoadPage
                       }, "getmyOrder4");
                       break;
                   case 1:
                       app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                           uid: app.uid,
                           page: app.orderLoadPage,
                           state: 1
                       }, "getmyOrder4");
                       break;
                   case 2:
                       app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                           uid: app.uid,
                           page: app.orderLoadPage,
                           state: 3
                       }, "getmyOrder4");
                       break;
                   case 3:
                       app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                           uid: app.uid,
                           page: app.orderLoadPage,
                           state: 5
                       }, "getmyOrder4");
                       break;
               }

           }
          
        } else {
            wx.showToast({
                title: '已经到底了',
            })
        }
    },
    pressWei: function(event) {
        wx.showModal({
            title: '提示',
            content: "点击确认收货后该商品无法退货",
            success: function(res) {
                if (res.confirm) {
                    app.ShortConnect(app.urlw + "Data/ConfirmTakeGoods", {
                        oitemid: event.currentTarget.dataset.id
                    }, 'sureGet');
                } else if (res.cancel) {

                }
            }
        })
        console.log(event.currentTarget.dataset.id);
    },
    checkWu: function(event) {
        console.log(event.currentTarget.id);
        console.log(typeof event.currentTarget.id);
        app.ShortConnect("http://192.168.1.155:10086/wulIu/yundanInfo", {
            orderNumber: parseInt(event.currentTarget.id)
        });
    },
    goPay: function(event) {
        console.log(JSON.stringify(event.currentTarget.dataset.jsonmsg));
        let data = {
            uid: app.uid,
            pid: event.currentTarget.dataset.jsonmsg.orderItems[0][0].pid,
            size: event.currentTarget.dataset.jsonmsg.orderItems[0][0].standard,
            count: event.currentTarget.dataset.jsonmsg.orderItems[0][0].pcount,
        }
        console.log(JSON.stringify(this.data.wenzhangJson) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (app.isShare) {
            data.source = 2
        } else {
            data.source = 0;
        }
        console.log(event.currentTarget.dataset.jsonmsg.orderItems[0][0].product);
        data.head = event.currentTarget.dataset.jsonmsg.orderItems[0][0].product.head[0];
        data.pname = event.currentTarget.dataset.jsonmsg.orderItems[0][0].product.pname;
        data.price = event.currentTarget.dataset.jsonmsg.orderItems[0][0].product.price;
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        wx.navigateTo({
            url: '../lck/order/order?inter=myOrder&interSource=0&oid=' + event.currentTarget.dataset.shopmsg,
        })
    },
    pressYin: function () {
        this.setData({
            codeHidden: true,
        })
    },
    goPay1: function(event) {
        console.log();
        console.log("222222222222");
        console.log(typeof event.currentTarget.dataset.msg);
        var msg1 = event.currentTarget.dataset.msg;
        console.log(JSON.stringify(msg1)+"3333");
        let data = {
            uid: app.uid,
            count: msg1.pcount,
        }
        if (app.isShare) {
            data.source = 2
        } else {
            data.source = 0;
        }
        let endtime = msg1.endtime;
        endtime = endtime.split(" ");
        data.endtime = endtime[0];
        data.head = msg1.head[0];
        data.pname = msg1.shoppname;
        data.price = msg1.shopprice;
        data.iswenzhang = true;
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        wx.navigateTo({
            url: '../lck/order/order?inter=daifujuan&interSource=0&oid=' + event.currentTarget.dataset.shopmsg + "&shoppid=" + msg1.shoppid.toString() + "&pcount=" + msg1.pcount.toString() + "&shopeid=" + msg1.shopeid.toString() + "&shopid=" + msg1.shopid.toString() + "&shopname=" + msg1.shopname,
        })
    },
    quanxiaoOrder1: function(event) {
        var self = this;
        app.ShortConnect(app.urlw + "Data/CancelShopOrder", {
            shopoid: event.currentTarget.dataset.oid,
        
        }, "dissppearOrder3", function(res) {
            switch (self.data.indexss) {
                case 0:
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 0
                    }, "getmyOrder2", function(res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                   
                    app.orderIndexType =0;
                    break;
                case 1:
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 1
                    }, "getmyOrder2", function (res) {
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    app.orderIndexType =1;
                    break;
            }
        });
    },
    pressShiYongs:function(event){
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
    quanxiaoOrder: function(event) {
        console.log(event.currentTarget.dataset.oid + "quanxiaoOrder");
        // console.log(this.data.oidObject + "quanxiaoOrder");
        // for (var i = 0; i <= this.data.oidObject.length - 1; i++) {
        //     if (this.data.oidObject[i] == event.currentTarget.dataset.oid) {
        //         console.log("quanxiaoOrder" + this.data.timeObject[i]);
        //         clearInterval(this.data.timeObject[i]);
        //         this.setData({
        //             timeObject: this.data.timeObject.splice(i, 1),
        //             oidObject: this.data.oidObject.splice(i, 1)
        //         })
        //         break;
        //     }
        // }
        app.ShortConnect(app.urlw + "Data/CancelOrder", {
            oid: event.currentTarget.dataset.oid,
            uid: app.uid
        }, "dissppearOrder");

    },
    pressTypes: function(event) {
        var self = this;
        if (parseInt(event.currentTarget.id) != this.data.indexss) {
            switch (event.currentTarget.id) {
                case "0":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 0
                    }, "getmyOrder2", function(res) {
                        if (res.data.shoporders.length > 0) {
                            self.setData({
                                isHas: false
                            })
                        }
                        else {
                            self.setData({
                                isHas: true
                            })
                        }
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    this.setData({
                        indexss: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "1":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 1
                    }, "getmyOrder2", function(res) {
                        if (res.data.shoporders.length > 0) {
                            self.setData({
                                isHas: false
                            })
                        }
                        else {
                            self.setData({
                                isHas: true
                            })
                        }
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    this.setData({
                        indexss: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "2":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 2
                    }, "getmyOrder2", function(res) {
                        if (res.data.shoporders.length > 0) {
                            self.setData({
                                isHas: false
                            })
                        }
                        else {
                            self.setData({
                                isHas: true
                            })
                        }
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    this.setData({
                        indexss: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "3":
                  
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 21
                    }, "getmyOrder2", function(res) {
                        if (res.data.shoporders.length > 0) {
                            self.setData({
                                isHas: false
                            })
                        }
                        else {
                            self.setData({
                                isHas: true
                            })
                        }
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    this.setData({
                        indexss: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "4":
                  
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetShopOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 6
                    }, "getmyOrder2", function(res) {
                        if (res.data.shoporders.length > 0) {
                            self.setData({
                                isHas: false
                            })
                        }
                        else {
                            self.setData({
                                isHas: true
                            })
                        }
                        for (let i = 0; i <= res.data.shoporders.length - 1; i++) {
                            res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                        }
                        self.setData({
                            ordershangArray: res.data.shoporders
                        })
                    });
                    this.setData({
                        indexss: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
            }
        }
    },
    pressType: function(event) {
        if (parseInt(event.currentTarget.id) != this.data.indexs) {
            switch (event.currentTarget.id) {
                case "0":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                        uid: app.uid,
                        page: 1
                    }, "getmyOrders");
                    this.setData({
                        indexs: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "1":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 1
                    }, "getmyOrders");
                    this.setData({
                        indexs: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "2":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 3
                    }, "getmyOrders");
                    this.setData({
                        indexs: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
                case "3":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: 1,
                        state: 5
                    }, "getmyOrders");
                    this.setData({
                        indexs: parseInt(event.currentTarget.id)
                    })
                    app.orderIndexType = parseInt(event.currentTarget.id);
                    break;
            }
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})