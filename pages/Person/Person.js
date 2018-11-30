// pages/Person/Person.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "",

    },
    //点击返回商城
    PressReturn: function() {
        wx.switchTab({
            url: '../indextwo/indextwo'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        if (app.serviceCode) {
            this.setData({
                url: app.url + app.serviceCode.path,
            })
            console.log(this.data.url + "person");
        } else {
            app.getCode = res => {
                this.setData({
                    url: app.url + res.data.path,
                })
            }
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
    //   previewImage: function (e) {
    //       wx.previewImage({
    //           urls: ["https://share.ykplay.com/images/QRPhotos/kefu.jpg"] // 需要预览的图片http链接列表   
    //       })
    //   },


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