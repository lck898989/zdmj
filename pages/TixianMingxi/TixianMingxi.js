// pages/TixianMingxi/TixianMingxi.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pname:null,
        number: null,
        products: null,
        state: null,
        detailtype: null,
        type: null,
        money1: null,
        success: null,
        time: null,
        srcp1: app.imageUrl + 'ico_detail_incom_1.png', //收入的图
        srcp2: app.imageUrl + 'ico_detail_cash_1.png', //提现的图
        srcp3: app.imageUrl + 'ico_detail_pay_1.png', //支付的图
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        if (options.type == "3" || options.type == "1") {
           this.setData({
               products: JSON.parse(options.products),
           })
            console.log(JSON.stringify(this.data.products));
        }
        this.setData({
            money1: parseFloat(options.rebate),
            type: parseInt(options.type),
            time: options.time,
            detailtype: parseInt(options.detailtype),
            state: parseInt(options.state),
            number: options.number,
     

        })

        // console.log(this.data.money1);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     *
    onShow: function() {
        console.log("333");

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