// pages/MyOrder/MyOrder.js
var app=getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //分类数组
        typeArray: ["全部", "待付款", "待收货", "已完成"],
        //初始化分类
        indexs: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    pressType: function(event) {
        switch (event.currentTarget.id) {
            case "0":
                app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
                    uid: app.uid,
                    page: 1
                }, "myorder");
                this.setData({
                    indexs: parseInt(event.currentTarget.id)
                })
                break;
            case "1":
                app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                    uid: app.uid,
                    page: 1,
                    state:1
                }, "myorder");
                this.setData({
                    indexs: parseInt(event.currentTarget.id)
                })
                break;
            case "2":
                app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                    uid: app.uid,
                    page: 1,
                    state: 3
                }, "myorder");
                this.setData({
                    indexs: parseInt(event.currentTarget.id)
                })
                break;
            case "3":
                app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
                    uid: app.uid,
                    page: 1,
                    state:4
                }, "myorder");
                this.setData({
                    indexs: parseInt(event.currentTarget.id)
                })
                break;
        }

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})