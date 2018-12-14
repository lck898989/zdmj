// pages/zcw/user/user.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        money: 0,
        arraytu: {
            dh_dh: app.imageUrl + 'img_mine_BG.png', //最上方导航
            dh_ewm: app.imageUrl + 'btn_mine_QRcode.png', //导航图上类二维码图片
            fw_jjsx: app.imageUrl + 'btn_mine_soon.png', //即将上线按钮图片
            fw_shdz: app.imageUrl + 'btn_mine_adds.png', //收货地址
            fw_sz: app.imageUrl + 'btn_mine_settings.png', //设置
            fw_kf: app.imageUrl + 'btn_mine_service.png', //联系客服
            dd_dfk: app.imageUrl + 'btn_mine_pay.png', //待付款
            dd_dsh: app.imageUrl + 'btn_mine_goods.png', //待收货
            dd_ywc: app.imageUrl + 'btn_mine_finish.png', //已完成
        },
        userInfo: {},
        //在我的中滚动视图中的子物体  scr 为图片地址需要填写   bindtype为此图片的点击事件的方法名称
        gundongpic: [
            // { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
            // { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
            // { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
            // { src: app.imageUrl + '22222.png', bindtype: 'gundongdianji' },
        ]
    },

    gundongdianji() {
        console.log('点击了滚动视图中的图片')
    },




    //个人信息中的钱包按钮点击事件
    grxx_qb() {
        wx.navigateTo({
            url: '../qianbao/qbsy?money='+this.data.money,
        })
        console.log('你点击了钱包')
    },

    //个人信息中的商铺券按钮点击事件
    grxx_spq() {
        console.log('你点击了商铺券')
    },

    //个人信息中的我的好友按钮点击事件
    grxx_wdhy() {
        wx.navigateTo({
            url: '../friends/friends',
        })
        console.log('你点击了我的好友')
    },
    //我的订单中待付款按钮点击事件
    wddd_dfk() {
        app.orderLoadPage = 1;
        console.log(app.orderLoadPage);
        app.orderIndexType = 0;
        app.myorderArray = null;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
            uid: app.uid,
            page: app.orderLoadPage
        }, "interorder1");
        wx.navigateTo({
            url: '../../MyOrder/MyOrder',
        })

        console.log('你点击了待付款')
    },

    //我的订单中待收货按钮点击事件
    wddd_dsh() {
        app.orderLoadPage = 1;
        console.log(app.orderLoadPage);
        app.orderIndexType = 0;
        app.myorderArray = null;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
            uid: app.uid,
            page: app.orderLoadPage
        }, "interorder1");
        wx.navigateTo({
            url: '../../MyOrder/MyOrder',
        })
        console.log('你点击了待收货')
    },

    //我的订单中已完成按钮点击事件
    wddd_ywc() {
        app.orderLoadPage = 1;
        console.log(app.orderLoadPage);
        app.orderIndexType = 0;
        app.myorderArray = null;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
            uid: app.uid,
            page: app.orderLoadPage
        }, "interorder1");
        wx.navigateTo({
            url: '../../MyOrder/MyOrder',
        })
        console.log('你点击了已完成')
    },




    // 我的服务中收货地址按钮点击事件
    fw_shdz() {
        wx.navigateTo({
            url: '../../lck/address/address',
        })
    },

    // 我的服务中联系客服按钮点击事件
    fw_kf() {
        console.log('联系客服')
    },

    // 我的服务中设置按钮点击事件
    fw_sz() {
        wx.navigateTo({
            url: '../shezhi/zhezhi',
        })
        console.log('设置')
    },

    // 我的服务中即将上线按钮点击事件
    fw_jjsx() {
        console.log('即将上线')
    },





    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function(options) {
        console.log("onload1");
       
        app.setMessageNumber = res => {
            this.setData({
                messageAllNumber: res.data.counts,
                messageArray: res.data.informs,
            })
        }
  
        app.setUserInfo11 = res => {
            this.setData({
                money: res.data.user.wallet,
                shopNumber: res.data.cartCounts
            })
            console.log(this.data.money+"sadsada");
            // console.log("==============================");
        }
        this.setData({
            userInfo: app.userInfo
        })
        console.log(this.data.gundongpic, "user信息")
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
        console.log("onShow1");
        app.ShortConnect(app.urlw + "Data/GetPersonCenter", {
            uid: app.uid
        }, "getuserInfo1");
        app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
            uid: app.uid
        }, "");
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