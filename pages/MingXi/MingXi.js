// pages/MingXi/MingXi.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arrayTixian: [],
        arrayType: ["提现记录", "代理返利", "分享返利", "写手返利"],
        nullMsg: true,
        hasMsg: false,
        money: 0,
        //初始化当前类别
        index: "0",


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.setMingxiNull = res => {
            this.setData({
                arrayTixian:[],
            })
        }
        console.log(options.money);
        app.setMingXiMsg = res => {
            this.setData({
                arrayTixian: res.data.informs
            })
            console.log(this.data.arrayTixian);
        }
        this.setData({
            money: options.money
        })
      
        app.setmingxiFalse = res => {
            this.setData({
                nullMsg: false,
                hasMsg: true,
            })
        }
        if (app.arrayTixian) {
            this.setData({
                arrayTixian: app.arrayTixian
            })

        } else {
            app.setarrayTixian = res => {
                this.setData({
                    arrayTixian: res.data.informs
                })
            }


        }

        console.log(this.data.arrayTixian);
    },
    pressAll:function(){
        app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
            uid: app.uid,
            type: -1,
            page: 1
        }, "GetAllMessage1");
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {


    },
    pressType: function(event) {
        console.log(typeof event.currentTarget.dataset.id);
        if (event.currentTarget.dataset.id.toString() != this.data.index) {
            switch (event.currentTarget.dataset.id.toString()) {
                case "0":
                    this.setData({
                        index: event.currentTarget.dataset.id
                    })
                    app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                        uid: app.uid,
                        type: event.currentTarget.dataset.id,
                        page: 1
                    }, "GetAllMessage1");
                    break;
                case "1":
                    this.setData({
                        index: event.currentTarget.dataset.id
                    })
                    app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                        uid: app.uid,
                        type: event.currentTarget.dataset.id,
                        page: 1
                    }, "GetAllMessage1");
                    break;
                case "2":
                    this.setData({
                        index: event.currentTarget.dataset.id
                    })
                    app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                        uid: app.uid,
                        type: event.currentTarget.dataset.id,
                        page: 1
                    }, "GetAllMessage1");
                    break;
                case "3":
                    this.setData({
                        index: event.currentTarget.dataset.id
                    })
                    app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
                        uid: app.uid,
                        type: event.currentTarget.dataset.id,
                        page: 1
                    }, "GetAllMessage1");
                    break;
            }
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    //点击提现
    pressTixian: function(event) {
        console.log(event.currentTarget.dataset.money);
        console.log(event.currentTarget.dataset.money);
        console.log(event.currentTarget.dataset.money);
        console.log(event.currentTarget.dataset.time);

        //   wx.navigateTo({
        //       url: '../TixianMingxi/TixianMingxi?money=' + event.currentTarget.dataset.money.toString() + "&success=" + event.currentTarget.dataset.success.toString() + "&time=" + event.currentTarget.dataset.time.toString() + "&number=" + event.currentTarget.dataset.number.toString(),
        //   })

        wx.navigateTo({
            url: '../TixianMingxi/TixianMingxi?money=' + event.currentTarget.dataset.money.toString() + "&success=" + event.currentTarget.dataset.success + "&time=" + event.currentTarget.dataset.time.toString() + "&number=" + event.currentTarget.dataset.number.toString(),
        })

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