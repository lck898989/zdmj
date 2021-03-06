// pages/MyMoney/MyMoney.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        money:"0",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            money: options.money,
            
        })
        console.log("3333");

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
    tixianButton:function(){
        wx.navigateTo({
            url: '../TiXian/TiXian?money='+this.data.money,
        })
    },
    mingxiButton:function(){
        app.ShortConnect(app.urlw + "Data/GetAllInformByUid", {
            uid: app.uid,
            type:-1,
            page:1
        }, "GetAllMessage");
        wx.navigateTo({
            url: '../MingXi/MingXi?money='+this.data.money,
        })
    },
    tixian: function() {
        wx.request({
            url: "https://pay.ykplay.com/wechat/getOpenidVerify?from=zhidianmijin&openid=" + app.serverOpenid,
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "GET",
            success: function(res) {
                if (res.data.result == "1") {
                    console.log(res);
                    app.ShortConnect(app.urlw + "Data/WithDraw", {
                        amount: 1000,
                        desc: "指点迷津商家付款",
                        openid: app.serverOpenid,
                        from: "zhidianmijin"
                    }, "tixianOne");
                } else {
                    console.log(res);
                    app.ShortConnect(app.urlw + "Data/WithDraw", {
                        amount: 1000,
                        desc: "指点迷津商家付款",
                        openid: app.serverOpenid,
                        from: "zhidianmijin"
                    }, "tixianZero");
                    wx.navigateTo({
                        url: '../Advertisting/Advertisting',
                    })
                }
            }
        })
      
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