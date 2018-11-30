// pages/myshop/myshop.js
var app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //判断界面是否为空
        hidden6: true,
        //判断分享记录和领取记录数组是否有 数据
        isHas: false,
        toView: 'red',
        scrollTop: 100,
        color1: "#ff861a",
        color2: "#727272",
        hidden1: false,
        hidden2: true,
        //领取记录框
        hidden3: false,
        //分享记录框
        hidden4: true,
        url: "https://share.ykplay.com",
        //分享记录数组
        shareMsg: [],
        //分享记录对应的商品信息数组
        shopMsg: [],
        //领取记录数组
        getMsg: [],
        //商品订单
        ordernumber: null,
        //初始化此时页面的状态
        SceneState: 0,
        //判断获取记录是否有数据
        isHas1: false,
    },
    //点击继续分享按钮
    PressContinue: function (event) {
        console.log(event.currentTarget.dataset.ordernumber);
        console.log(event.currentTarget.dataset.username);
        console.log(parseInt(event.currentTarget.dataset.shopnumber));
        console.log(app.url + "/commodity/GoShareData");
        if (parseInt(event.currentTarget.dataset.shopnumber) == 0) {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: "该商品已售空",
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        else {
            this.setData({
                ordernumbe: event.currentTarget.dataset.ordernumber
            })
            app.setOrdernumber = res => {
                app.shopNumber = this.data.ordernumbe
            }
            app.ShortConnect(app.url + "/commodity/GoShareData", {
                "username": event.currentTarget.dataset.username,
                "orderNumber": event.currentTarget.dataset.ordernumber,
            }, "pressContinue");

        }
    },
    //点击查看体验码
    CheckCode: function (event) {
        console.log(event.currentTarget.dataset.username);
        console.log(event.currentTarget.dataset.code);
        app.ShortConnect(this.data.url + "/commodity/CheckVolum", {
            username: event.currentTarget.dataset.username,
            code: event.currentTarget.dataset.code,
            codeid: event.currentTarget.dataset.codeid,
        }, "checkCode");
    },
    //获取订单结束剩余时间
    GetOrderTime: function (orderTime) {
        var orderTime1 = new Date(this.makeDate(orderTime)).getTime();
        console.log(orderTime1);
        return orderTime1;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var arrayPath = [];
        app.setFalse1 = res => {
            this.setData({
                isHas1: false,
                hidden2: true,
                hidden1: false,
            })
        }
        app.setFalse = res => {
            console.log("===================");
            this.setData({
                isHas: false,
                hidden1: true,
                hidden2: false,
            })
        }
        app.setHidden4 = res => {
            for (var i = 0; i <= res.data.comm.length - 1; i++) {
                if (res.data.comm[i].filepath.indexOf(",") >= 0) {
                    arrayPath = res.data.comm[i].filepath.split(",");
                    res.data.comm[i].filepath = arrayPath[0];
                }
            }
            var shopArray = res.data.comm;
            console.log(JSON.stringify(shopArray));

            for (var i = 0; i <= shopArray.length - 2; i++) {
                for (var j = i + 1; j <= shopArray.length - 1; j++) {

                    if (shopArray[j].number < 10) {
                        if (shopArray[i].number < 10) {
                            if (shopArray[j].number < shopArray[i].number) {
                                var indexObject = shopArray[i];
                                shopArray[i] = shopArray[j];
                                shopArray[j] = indexObject;
                            }
                        }
                        else {
                            var indexObject = shopArray[i];
                            shopArray[i] = shopArray[j];
                            shopArray[j] = indexObject;
                        }
                    }
                    else {
                        if (shopArray[i].number < 10) {
                            break;
                        }
                        else {
                            if (this.GetOrderTime(shopArray[j].orderValidTime) < this.GetOrderTime(shopArray[i].orderValidTime)) {
                                console.log("LLLLLLLLLLLLLLLLLL");
                                var indexObject = shopArray[i];
                                shopArray[i] = shopArray[j];
                                shopArray[j] = indexObject;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
            console.log("[][][][][][" + JSON.stringify(shopArray));
            this.setData({
                hidden2: false,
                hidden1: true,
                // shareMsg: res.data.order,
                shopMsg: shopArray,
                isHas: true,
                SceneState: 1,
            })
            this.countDown();
        }
        app.setHidden3 = res => {
            console.log("33");
            for (var i = 0; i <= res.data.comm.length - 1; i++) {
                if (res.data.comm[i].filepath.indexOf(",") >= 0) {

                    arrayPath = res.data.comm[i].filepath.split(",");
                    res.data.comm[i].filepath = arrayPath[0];
                }
            }
            for (var i = 0; i <= res.data.code.length - 1; i++) {
                res.data.code[i].succTime = res.data.code[i].succTime.slice(0, 10);
                res.data.code[i].validTime = res.data.code[i].validTime.slice(0, 10);
            }
            var shopArray1 = res.data.code;
            console.log(JSON.stringify(shopArray1));
            for (var i = 0; i <= shopArray1.length - 2; i++) {
                for (var j = i + 1; j <= shopArray1.length - 1; j++) {
                    if (shopArray1[j].codeStatus == 0 && shopArray1[i].codeStatus == 1) {
                        var indexObject = shopArray1[i];
                        shopArray1[i] = shopArray1[j];
                        shopArray1[j] = indexObject;
                    }
                }
            }
            this.setData({
                hidden2: true,
                hidden1: false,
                getMsg: shopArray1,
                isHas1: true,
                // shopMsg: res.data.comm,
                SceneState: 0,
            })
            console.log(this.data.getMsg);
        }

        // if (app.openShare == false) {
        //     app.ShortConnect(app.url + "/commodity/UserClickGetRecode", {
        //         username: app.openid
        //     }, "myshop");
        // }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
    /**0
1   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        if (this.data.SceneState == 0) {
            app.ShortConnect(app.url + "/commodity/UserClickGetRecode", {
                username: app.openid
            }, "myshop");
        }
        if (this.data.SceneState == 1) {
            app.ShortConnect(app.url + "/commodity/MyGetCommInformationClick", {
                username: app.openid,
            }, "shareMsg");
        }
    },
    //点击分享记录
    PressShareMsg: function () {
        if (this.data.SceneState == 0) {
            console.log("55555");
            //访问分享记录接口
            app.ShortConnect(app.url + "/commodity/MyGetCommInformationClick", {
                username: app.openid,
            }, "shareMsg");
        }
        this.setData({
            color1: "#727272",
            color2: "#ff861a",
            SceneState: 1,
            hidden3: true,
            hidden4: false,
        })
    },
    //点击立即行动
    TurnIndex: function () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    //点击领取记录
    PressGetMsg: function () {
        if (this.data.SceneState == 1) {
            app.ShortConnect(app.url + "/commodity/UserClickGetRecode", {
                username: app.openid
            }, "myshop");
        }
        this.setData({
            color1: "#ff861a",
            color2: "#727272",
            SceneState: 0,
            hidden3: false,
            hidden4: true,
        })
    },
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    makeDate(date) {
        try {
            var date = new Date(date).toISOString().
                replace(/T/, ' ').
                replace(/\..+/, '');
        } catch (e) {
            console.log(e);
            var date = "0000-00-00 00:00:00";
        } finally {
            return date;
        }
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        // let endTimeList = this.data.actEndTimeList;
        // let countDownArr = [];
        // 对结束时间进行处理渲染到页面
        this.data.shopMsg.forEach(o => {
            var a = o.orderValidTime.replace(/-/g, "/");
            a = a.replace("T", " ");
            a = a.replace(".000Z", " ");

            let endTime = new Date(a).getTime();
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
                day = this.timeFormat(parseInt(time / (60 * 60 * 24))).toString();
                if (day[0] == '0') {
                    days = day.substr(1, 1);
                    day = days;
                }
                hou = this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600)).toString();
                min = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60)).toString();
                sec = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60)).toString();
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
                day = "0";
                hou = '00';
                min = '00';
                sec = '00';
            }
            o.time = {
                days: day,
                hous: hou,
                mins: min,
                secs: sec,
            };
        })
        this.setData({
            shopMsg: this.data.shopMsg,
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        // this.setData({ countDownList: countDownArr })
        setTimeout(this.countDown, 1000);
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

    }
})