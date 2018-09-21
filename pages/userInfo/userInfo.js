// pages/userInfo/userInfo.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},

            username:"",
    },
    onPullDownRefresh: function() {
        // Do something when pull down.
    },
    //点击消息通知
    PressMess: function() {
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: "暂无消息",
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //点击我的优惠券
    PressMy: function() {
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: "暂无优惠劵",
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    //点击收货地址
    PressPosition: function() {
        wx.showModal({
            showCancel: false,
            title: '提示',
            content: "此功能暂未开放",
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //点击我的二维码
    MtCode: function() {
        //   app.ShortConnect(app.url +"/users/GetUserQrCode",{
        //       username: app.openid
        //   },"mycode");
        //   wx.reLaunch({
        //       url: '../MyCode/MyCode'
        //   })
    },
    //点击联系客服
    PersonTalk: function() {
        app.ShortConnect(app.url + "/users/GetQrCode", {}, "persontalk");
        wx.navigateTo({
            url: '../Person/Person'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.userInfo);
        this.setData({
            userInfo: app.userInfo
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