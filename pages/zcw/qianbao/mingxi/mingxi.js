// pages/zcw/qianbao/mingxi/mingxi.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataArray: [],
        hid1: false,
        hid2: false,
        hid3: false,
        jishujun: 3,
        srcp1: app.imageUrl + 'ico_detail_incom_1.png', //收入的图
        srcp2: app.imageUrl + 'ico_detail_cash_1.png', //提现的图
        srcp3: app.imageUrl + 'ico_detail_pay_1.png', //支付的图
        srcp5: app.imageUrl + 'ico_detail_incom_0.png', //收入的图2
        srcp6: app.imageUrl + 'ico_detail_cash_0.png', //提现的图2
        srcp7: app.imageUrl + 'ico_detail_pay_0.png', //支付的图2
        srcp4: app.imageUrl + 'btn_detail_day.png',
        bottomHeight: null,
    },

    shuaxin(e) {
        switch (e.currentTarget.id) {
            //点击了收入按钮
            case '0':
                console.log('收入')
                var a = this.panduan();
                if (a || (!a && this.data.hid1)) {
                    this.setData({
                        hid1: !this.data.hid1
                    })
                }
                break;
                //点击了提现按钮
            case '1':
                console.log('提现')
                var a = this.panduan();
                if (a || (!a && this.data.hid2)) {
                    this.setData({
                        hid2: !this.data.hid2
                    })
                }
                break;
                //点击了支付按钮
            case '2':
                console.log('支付')
                var a = this.panduan();
                if (a || (!a && this.data.hid3)) {
                    this.setData({
                        hid3: !this.data.hid3
                    })
                }
                break;
        }
    },
    panduan() {
        var a = 0;
        if (!this.data.hid1) {
            a += 1;
        }
        if (!this.data.hid2) {
            a += 1;
        }
        if (!this.data.hid3) {
            a += 1;
        }
        if (a == 1) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.MingXiaRRAY + "????????????????????????????");
        if (app.MingXiaRRAY) {
            for (let i = 0; i <= app.MingXiaRRAY.length - 1; i++) {
                if (typeof app.MingXiaRRAY[i].time == "string") {
                    app.MingXiaRRAY[i].time = app.MingXiaRRAY[i].time.split("-");
                }

                for (let j = 0; j <= app.MingXiaRRAY[i].content.length - 1; j++) {
                    let time = app.MingXiaRRAY[i].content[j].time.split(" ");
                    console.log(time + "///////////////");
                    app.MingXiaRRAY[i].content[j].time1 = time[0].split("-");
                    console.log(app.MingXiaRRAY[i].content[j].time1 + "///////////////");
                    app.MingXiaRRAY[i].content[j].time2 = time[1].split(":");
                    console.log(app.MingXiaRRAY[i].content[j].time2 + "///////////////");
                }

            }
            this.setData({
                dataArray: app.MingXiaRRAY
            })
            console.log(JSON.stringify(this.data.dataArray) + "onLoad");
        } else {
            app.GetAllMessage1 = res => {
                for (let i = 0; i <= res.data.informs.length - 1; i++) {
                    res.data.informs[i].time = res.data.informs[i].time.split("-");
                    for (let j = 0; j <= res.data.informs[i].content.length - 1; j++) {
                        let time = res.data.informs[i].content[j].time.split(" ");
                        res.data.informs[i].content[j].time1 = time[0].split("-");
                        res.data.informs[i].content[j].time2 = time[1].split(":");
                    }

                }
                this.setData({
                    dataArray: res.data.informs
                })
                console.log(JSON.stringify(this.data.dataArray) + "onLoad");
            }
        }

        this.setData({
            bottomHeight: app.seeHeight - 74 / app.ratio
        })

    },
    turndetail: function(event) {
        console.log(typeof event.currentTarget.dataset.products);
        wx.navigateTo({
            url: '../../../TixianMingxi/TixianMingxi?type=' + event.currentTarget.dataset.type.toString() + "&time=" + event.currentTarget.dataset.time + "&rebate=" + event.currentTarget.dataset.rebate + "&detailtype=" + event.currentTarget.dataset.detailtype + "&state=" + event.currentTarget.dataset.state + "&number=" + event.currentTarget.dataset.number + "&products=" + JSON.stringify(event.currentTarget.dataset.products)
        })
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