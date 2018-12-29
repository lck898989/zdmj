// pages/Discountone/Discountone.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPay:false,
        shopJSon: {},
        url: "",
        shopid: 0,
        yuan: 0,
        jie: 0,
        shi: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            shopJSon: JSON.parse(options.shopJSon),
            url: app.urlw,
            shopid: options.shopid,
            yuan: app.price1,
            jie: app.price2,
            shi: app.price3
        })
        // app.setSeeNumber = res => {
        //     this.setData({
        //         yuan: res.data.money,
        //         jie: res.data.discount_money,
        //         shi: res.data.actual_payment
        //     })

        // }

    },
    pressSure: function() {
        var self=this;
        if (this.data.isPay==false)
        {
            app.hotShop = null;
            app.iszhe = true;
            app.ShortConnect(app.urlw + "Data/AddDiscountPayRecode", {
                shopid: this.data.shopid,
                money: this.data.yuan,
                uid: app.uid,
                actual_payment: this.data.shi,
                discount_money: this.data.jie
            }, "zhekouPay1");
            this.setData({
                isPay:true
            })
            var t = setTimeout(function(res){
                self.setData({
                    isPay:false
                })
            }, 3000)
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