// pages/Discount/Discount.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sreachText: "",
        shopid: 0,
        shopJSon: {},
        url: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.shopJSon);
        this.setData({
            shopid: options.shopid,
            shopJSon: JSON.parse(options.shopJSon),
            url: app.urlw3
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
    pressSure: function() {
        var self = this;
        if (this.isSHuzi(this.data.sreachText)) {
            app.ShortConnect(app.urlw + "Data/CountPayByDiscountRate", {
                shopid: this.data.shopid,
                money: parseFloat(this.data.sreachText)
            }, "zhekouPay",function(res){
                wx.navigateTo({
                    url: '../Discountone/Discountone?shopJSon=' + JSON.stringify(self.data.shopJSon) + "&shopid=" + self.data.shopid,
                })
            });
        } else {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: "请输入数字",
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

    },
    sreach: function(event) {
        this.setData({
            sreachText: event.detail.value
        })
    },
    isSHuzi: function(value) {
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) == null || value == "") {
            return false
        } else {
            return true
        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },
    inputPrice: function() {

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