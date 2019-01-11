// pages/zcw/user/user.js
import Const from '../../../utils/Const.js'
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        systemType: null,
        money: 0,
        arraytu: {
            dh_dh: app.imageUrl + 'img_mine_BG.png', //最上方导航
            dh_ewm: app.imageUrl + 'btn_mine_QRcode.png', //导航图上类二维码图片
            fw_jjsx: app.imageUrl + 'btn_mine_help.png', //即将上线按钮图片
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
        ],
        //小程序码的二级制数据
        url: '',
        //系统的平台：是安卓平台还是苹果平台
        systemType: '',
        //是否显示二维码
        isShowQrCode : false,
        //二维码图片地址
        qrcodeUrl : '',
        top : 0,
        uid : 0,
    },

    gundongdianji() {
        console.log('点击了滚动视图中的图片')
    },

    turn: function() {        
        this.setData({
            isShowQrCode : true
        })
        var self = this;
        app.ShortConnect(app.urlw + "Data/GetAddFriendSmallProgramCode", {'fromUid' : app.uid}, "shengchneg", function(res) {
            let timestamp = new Date().getTime();
            let filePath = `${wx.env.USER_DATA_PATH}/`;
            console.log("二维码图片路径是：" + 'https://shop.ykplay.com' + res.data.path);
            self.setData({
                qrcodeUrl: 'https://shop.ykplay.com' + res.data.path
            })
        });
    },

    turn2 : function(){
        this.setData({
            isShowQrCode: true
        })
        var self = this;
        app.ShortConnect(app.urlw + "Data/GetSmallProgramCode", {}, "shengchneg", function (res) {
            let timestamp = new Date().getTime();
            let filePath = `${wx.env.USER_DATA_PATH}/`;
            console.log("二维码图片路径是：" + 'https://shop.ykplay.com' + res.data.path);
                // self.setData({
                //     qrcodeUrl: app.urlw + res.data.path
                // })
                // wx.downloadFile({
                //     url     : 'https://shop.ykplay.com' + res.data.path,
                //     success : function(res){
                //         console.log(res.tempFilePath);
                //         wx.saveFile({
                //             tempFilePath: res.tempFilePath,
                //             success : function(re){
                //                 console.log("re is ",re.savedFilePath);
                //                 let qrCodeCanvas = wx.createCanvasContext('qrcode-canvas', self);
                //                 console.log("canvas is ", qrCodeCanvas);
                //                 qrCodeCanvas.drawImage(filePath, 80, 5, 200, 200);
                //                 qrCodeCanvas.draw(true);
                //             }
                //         })
                //     }
                // })
            wx.getImageInfo({
                src: 'https://shop.ykplay.com' + res.data.path,
                success : function(re){
                    console.log("re is ",re);
                    let qrCodeCanvas = wx.createCanvasContext('qrcode-canvas', self);
                    console.log("canvas is ", qrCodeCanvas);
                    qrCodeCanvas.drawImage(re.path, 80, 5, 200, 200);
                    qrCodeCanvas.draw(true);
                },
                fail : function(e){
                    console.log(e);
                }
            })
        });
    },

    shouhou: function() {
        wx.navigateTo({
            url: '../../lck/saleService/saleService',
        })
    },
    //个人信息中的钱包按钮点击事件
    grxx_qb() {
        wx.navigateTo({
            url: '../qianbao/qbsy?money=' + this.data.money,
        })
        console.log('你点击了钱包')
    },

    //个人信息中的商铺券按钮点击事件
    grxx_spq() {
        var self=this;
        app.ShortConnect(app.urlw +"Data/GetShopOrdersByUidAndState",{
            uid:app.uid, 
            state:0,
            page:1

        },"getShangpu",function(res){
            for (let i = 0; i <= res.data.shoporders.length-1;i++)
            {
                res.data.shoporders[i].head = res.data.shoporders[i].head.split(",");
                res.data.shoporders[i].endtime = res.data.shoporders[i].endtime.split(",");

            }
            app.shangpuArray = res.data.shoporders;
            wx.navigateTo({
                url: '../../MuRoll/MyRoll',
            })
        })
        console.log('你点击了商铺券')
    },

    //个人信息中的我的好友按钮点击事件
    grxx_wdhy() {
        app.ShortConnect(app.urlw + "Data/GetAllAgencys", {
            uid: app.uid
        }, "interJinjie");
        // wx.navigateTo({
        //     url: '../friends/friends',
        // })
        console.log('你点击了我的好友')
    },
    wddd_dfk1() {
        app.setMyOrder = null;
        app.orderLoadPage = 1;
        console.log(app.orderLoadPage);
        app.orderIndexType = 0;
        app.myorderArray = null;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUid", {
            uid: app.uid,
            page: app.orderLoadPage
        }, "interorder1");
        wx.navigateTo({
            url: '../../MyOrder/MyOrder?indexs=0',
        })
    },
    //我的订单中待付款按钮点击事件
    wddd_dfk() {
        app.setMyOrder = null;
        app.myorderArray = null;
        app.orderLoadPage = 1;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
            uid: app.uid,
            page: 1,
            state: 1
        }, "interorder1");

        app.orderIndexType = 1;
        wx.navigateTo({
            url: '../../MyOrder/MyOrder?indexs=1',
        })
        console.log('你点击了待付款')
    },
    //我的订单中待收货按钮点击事件
    wddd_dsh() {
        app.setMyOrder = null;
        app.myorderArray = null;
        app.orderLoadPage = 1;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
            uid: app.uid,
            page: 1,
            state: 3
        }, "interorder1");

        app.orderIndexType = 1;
        wx.navigateTo({
            url: '../../MyOrder/MyOrder?indexs=2',
        })
        console.log('你点击了待收货')
    },

    //我的订单中已完成按钮点击事件
    wddd_ywc() {
        app.myorderArray = null;
        app.orderLoadPage = 1;
        app.setMyOrder = null;
        app.ShortConnect(app.urlw + "Data/GetOrdersByUidAndState", {
            uid: app.uid,
            page: 1,
            state: 5
        }, "interorder1");
        app.orderIndexType = 1;
        wx.navigateTo({
            url: '../../MyOrder/MyOrder?indexs=3',
        })
        console.log('你点击了待收货')
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
        wx.navigateTo({
            url: '../../lck/help/help',
        });
    },
    createCode: function(e) {
        let appid = app.appid;
        let screat = app.secret;
        let accessToken = '';
        let self = this;
        this.setData({
            isShowQrCode : true
        })
        wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + screat,
            method: 'GET',
            success: function(res) {
                console.log("res is ", res);
                accessToken = res.data.access_token;
                console.log("accessToken is ", accessToken);
                wx.request({
                    url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + accessToken,
                    method: 'POST',
                    responseType: 'arraybuffer',
                    data: {
                        scene: 'test',
                        page: 'pages/zcw/user/user',
                        width: 280,
                        is_hyaline: false
                    },
                    header: {
                        'content-type': 'application/json;charset=utf-8'
                    },
                    success: function(res) {
                        console.log("---->>res is ", res);
                        console.log("res.data is ", res.data);
                        let fsm = wx.getFileSystemManager();
                        let base64 = wx.arrayBufferToBase64(res.data);
                        base64 = 'data:image/PNG;base64,' + base64;
                        self.setData({
                            url: base64
                        })
                        let base64DataIndex = base64.indexOf('base64,') + 7;
                        console.log("base64 data is ", base64);
                        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
                        console.log("format is ", format);
                        let timestamp = new Date().getTime();
                        let filePath = `${wx.env.USER_DATA_PATH}/${timestamp}.${format}`;
                        if (self.data.systemType === 'iphone') {
                            fsm.writeFile({
                                filePath,
                                data: base64.slice(base64DataIndex),
                                encoding: 'base64',
                                success: function() {
                                    console.log("filePath is ", filePath);
                                    let qrCodeCanvas = wx.createCanvasContext('qrcode-canvas', self);
                                    console.log("canvas is ", qrCodeCanvas);
                                    qrCodeCanvas.drawImage(filePath, 80, 5, 200, 200);
                                    qrCodeCanvas.draw(true, function() {
                                        //保存图片到相册
                                        self.createImageFromCanvas();
                                    });
                                }
                            })
                        } else {
                            //安卓系统环境
                            fsm.writeFile({
                                filePath,
                                data: res.data,
                                encoding: 'binary',
                                success: function() {
                                    let qrCodeCanvas = wx.createCanvasContext('qrcode-canvas', self);
                                    console.log("安卓环境下canvas is ", qrCodeCanvas);
                                    console.log("安卓环境下filePath is ", filePath);
                                    qrCodeCanvas.drawImage(filePath, 80, 5, 200, 200);
                                    qrCodeCanvas.draw(true, self.createImageFromCanvas);
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    //从canvas上生成图片
    createImageFromCanvas: function() {
        let self = this;
        wx.canvasToTempFilePath({
            x: 80,
            y: 5,
            width: 200,
            height: 200,
            destWidth: 200,
            destHeight: 200,
            canvasId: 'qrcode-canvas',
            success: function(res) {
                console.log("从画布中转换的图片路径是：", res.tempFilePath);
                //将临时路径的图片保存到相册中去
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(res) {
                        console.log("保存到相册的二维码图片是：", res);
                    },
                    fail: function() {
                        console.log("保存到相册失败");
                    },
                    complete: function() {
                        console.log("保存到相册完成");
                    }
                }, self)
            }
        })
    },




    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function(options) {
        var self = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log("res is ", res);
                let ratio = res.pixelRatio;
                let height = res.screenHeight;
                console.log("height is ",height);
                self.setData({
                    systemType : res.system.indexOf('Android') >= 0 ? 'android' : 'iphone',
                    top        : (height - 120) / 2
                })
            },
        });
        // this.createCode();
        console.log("onload1");
        this.setData({
            uid : app.uid
        })
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
            console.log(this.data.money + "sadsada");
            // console.log("==============================");
        }
        this.setData({
            userInfo: app.userInfo
        })
        console.log(this.data.gundongpic, "user信息")
        wx.getSystemInfo({
            success: function(res) {
                console.log("res is ", res);
                self.setData({
                    systemType: res.system.indexOf('Android') >= 0 ? 'android' : 'iphone'
                })
            },
        });

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
        this.setData({
            isShowQrCode : false
        })
        console.log("onShow1");
        app.ShortConnect(app.urlw + "Data/GetPersonCenter", {
            uid: app.uid
        }, "getuserInfo1");
        app.ShortConnect(app.urlw + "Data/UpdateWuLiuInfo", {
            uid: app.uid
        }, "");
    },
    //取消二维码遮罩
    cancelMask : function(){
        this.setData({
            isShowQrCode : false
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
        var shareObj = {
            desc: '距离成功只差一步，求少侠出手！',
            title: '分享商城',
            path: 'pages/zcw/user/user',
            success: function(res) {

                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    console.log("???????2");
                }
            },
            fail: function(res) {　　　　　　 // 转发失败之后的回调
                console.log(res.errMsg + "???????");
            },
            complete: function(res) {
                console.log(res.errMsg + "???????1");
            }
        }
        return shareObj;
    },

    //从canvas上生成图片
    createImageFromCanvas: function() {
        let self = this;
        wx.canvasToTempFilePath({
            x: 80,
            y: 5,
            width: 200,
            height: 200,
            destWidth: 200,
            destHeight: 200,
            canvasId: 'qrcode-canvas',
            success: function(res) {
                console.log("从画布中转换的图片路径是：", res.tempFilePath);
                //将临时路径的图片保存到相册中去
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(res) {
                        console.log("保存到相册的二维码图片是：", res);
                    },
                    fail: function() {
                        console.log("保存到相册失败");
                    },
                    complete: function() {
                        console.log("保存到相册完成");
                    }
                }, self)
            }
        })
    },
    previewQrcode : function(e){
        console.log("预览图片");
        wx.previewImage({
            urls: ["https://shop.ykplay.com/smallprogram/" + app.uid + "_fromuid.png"],
            success : function(){
                console.log("预览图片成功");
            }
        })
    }
})