// pages/MyOrder/MyOrder.js
var app = getApp();
var js;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url: "http://shop.ykplay.com",
        //分类数组
        typeArray: ["全部", "待付款", "待收货", "已完成"],
        //初始化分类
        indexs: 0,
        //我的订单数组
        orderArray: [],
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
        switch (options.indexs)
        {
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
                    // app.myorderArray[i].orderItems[0][j].product.size = JSON.parse(app.myorderArray[i].orderItems[0][j].product.size);                  
                    app.myorderArray[i].orderItems[0][j].standard = app.myorderArray[i].orderItems[0][j].standard.replace("|", "  ");
                    if (typeof app.myorderArray[i].orderItems[0][j].product.head=="string")
                    {
                        var c = app.myorderArray[i].orderItems[0][j].product.head.split(",");

                        app.myorderArray[i].orderItems[0][j].product.head = c;

                    }
                 
                    let size = Object.values(JSON.parse(app.myorderArray[i].orderItems[0][j].product.size));
                    let size1="";
                    for (let k = 0; k <= size.length-1;k++)
                    {
                        size1 = size1 + size[k];
                    }
                    app.myorderArray[i].orderItems[0][j].product.size = size1;
                    console.log();
                }
            }
            this.setData({
                isHas: false,
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
            if (app.isStartOrder==false)
            {
                var isHas=false;
                for (let i = 0; i <= this.data.orderArray.length-1;i++)
                {
                    if (this.data.orderArray[i].state==1)
                    {
                        isHas=true;
                    }
                }
                if (isHas)
                {
                    // this.countDown();
                    app.isStartOrder=true;
                }
            }
            else
            {
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
                console.log("???????????????????2");
            
                for (var i = 0; i <= res.data.orders.length - 1; i++) {
                    for (var j = 0; j <= res.data.orders[i].orderItems[0].length - 1; j++) {
                        // res.data.orders[i].orderItems[0][j].product.size = JSON.parse(res.data.orders[i].orderItems[0][j].product.size);
                        res.data.orders[i].orderItems[0][j].standard = res.data.orders[i].orderItems[0][j].standard.replace("|", "  ");
                        var c = res.data.orders[i].orderItems[0][j].product.head.split(",");
                        res.data.orders[i].orderItems[0][j].product.head = c;
                        console.log();
                    }
                }
                this.setData({
                    isHas: false,
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
                }
                else {
                 
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
                this.setData({
                    orderArray: orderArray1,
                    isPull: false,
                    isHas: false
                })
                console.log(this.data.orderArray.length);
            } else {
                this.setData({
                    orderArray: res.data.orders,
                    isPull: false,
                    isHas: false
                })
                console.log(JSON.stringify(this.data.orderArray));
                console.log(JSON.stringify(this.data.orderArray) + "==================================");
            }
         
            app.orderPage = res.data.pages;
            wx.hideLoading();
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
                let endTime = new Date(a).getTime() +50000;
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
        js=setTimeout(this.countDown, 1000);
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
            app.orderMsg.ordertime = event.currentTarget.dataset.ordernumber;
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
        console.log("4444");
        console.log(app.orderLoadPage);
        if (this.data.isPull == false && app.orderLoadPage < app.orderPage) {
            this.setData({
                isPull: true
            })
            wx.showLoading({
                title: '加载中',
            })
            app.orderLoadPage += 1;
            switch (this.data.indexs) {
                case 0:
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                        uid: app.uid,
                        page: app.orderLoadPage
                    }, "getmyOrder");
                    break;
                case 1:
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: app.orderLoadPage,
                        state: 1
                    }, "getmyOrder");
                    break;
                case 2:
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: app.orderLoadPage,
                        state: 3
                    }, "getmyOrder");
                    break;
                case 3:
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                        uid: app.uid,
                        page: app.orderLoadPage,
                        state: 5
                    }, "getmyOrder");
                    break;
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
        console.log();
        console.log(event.currentTarget.dataset.shopmsg);
        wx.navigateTo({
            url: '../lck/order/order?inter=myOrder&interSource=0&oid=' + event.currentTarget.dataset.shopmsg,
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
    pressType: function(event) {
        if (parseInt(event.currentTarget.id) != this.data.indexs) {
            switch (event.currentTarget.id) {
                case "0":
                    app.orderLoadPage = 1;
                    app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                        uid: app.uid,
                        page: 1
                    }, "getmyOrder");
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
                    }, "getmyOrder");
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
                    }, "getmyOrder");
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
                    }, "getmyOrder");
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