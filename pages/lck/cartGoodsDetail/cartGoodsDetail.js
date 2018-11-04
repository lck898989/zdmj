import Request from '../../../utils/Request.js'
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
import Host from '../../../utils/Const.js'
import wxParse from '../../../wxParse/wxParse.js'
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsImageList: [],
        host: app.host,
        imageHost: Host.productionHost,
        goods: null,
        showBuyCon: false,
        animationData: null,
        backAnimaData: null,
        //加入购物车的数量
        count: 1,
        //点击加入购物车
        addCart: false,
        //立即购买
        BuyIt: false,
        //是否是默认选择的
        isDefaultChoosed: true,
        //   colorChoosed : '',
        //   sizeChoosed : '',
        typeArr: [],
        //二维数组
        typeValueArr: [],
        selectColor: '#ede2f4',
        selectFontColor: '#863bb7',
        unSelectColor: '#eee',
        unSelectFontColor: '#000',
        selectBorder: '2rpx solid #863bb7',
        unselectBorder: '2rpx solid #eee',
        //发送服务器的商品大小信息
        sendServerSize: {

        },
        //大小尺寸值数组
        sizeValueArr: [],
        //提交到购物车是否完整
        isOk: false,
        //默认收货地址
        defaultAdd: null,
        //是通过商品详情点击了选择款式的按钮进入尺寸选择界面
        isChooseType: false,
        goodsDetailArr: [],
        slideStart: 1,
        /**
         * 
         * 小泉的变量
         * 
         */
        url: "http://192.168.1.50:3150",
        interSource: null,
        //选择类别时候显示加入购物车和立即购买
        fromTypeToAdd :false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中...',
        })
        wx.showShareMenu({
            //要求小程序返回分享目标信息
            withShareTicket: true
        })
        switch (options.inter) {
            case "0":
                console.log(JSON.parse(options.goods).head);
                JSON.parse(options.goods).head = JSON.parse(options.goods).head.split(",");
                this.setData({
                    goods: JSON.parse(options.goods),
                    goodsImageList: this.data.url + JSON.parse(options.goods).head
                })
                console.log(this.data.goodsImageList);
                break;
        }
        console.log(options.interSource + typeof options.interSource);
        switch (options.interSource) {
            case "0":
                this.setData({
                    interSource: options.interSource,
                })
                break;
            case "1":

                break;
            case "2":
                this.setData({
                    interSource: options.interSource,
                    transpondUid: options.transpondUid
                })
                break;
        }
        if (app.shopMsgJson) {
            app.shopMsgJson.head = app.shopMsgJson.head.split(",");
            this.setData({
                goods: app.shopMsgJson,
                goodsImageList: app.shopMsgJson.head
            })
        } else {
            app.setShopArrayJson = res => {
                res.data.product.head = res.data.product.head.split(",");
                this.setData({
                    goods: res.data.product,
                    goodsImageList: res.data.product.head
                })
            }
        }
        console.log("options is ", options);
        let isNullObj = (JSON.stringify(options) === '{}');
        //通过分享得来的
        if (!isNullObj) {
            try {
                console.log("options is ", options);
                let goodsObj = options.goods;
                console.log("in options goodsObj is ", goodsObj);
                goodsObj = JSON.parse(goodsObj);
                console.log("goodsObj is ", goodsObj);
                //分享的来源编号是
                console.log("商品来源编号是：",goodsObj.resources);
                this.setData({
                    goods: goodsObj
                })
                this.initGoodsInfo();
                wx.hideLoading();
            } catch (e) {
                console.log(e);
            }
        } else {
            let self = this;
            let startTime = new Date().getMilliseconds();
            let Cache = new Promise(function (resolve, reject) {
                wx.getStorage({
                    key: 'goods',
                    success: function (res) {
                        let endTime = new Date().getMilliseconds();
                        console.log("获取缓存的时间长度是：", endTime - startTime);
                        console.log("res is ", res);
                        wx.hideLoading();
                        let goodsObj = res.data;
                        self.setData({
                            goods: goodsObj
                        })
                        //获取完数据之后删除缓存中的数据
                        wx.removeStorage({
                            key: 'goods',
                            success: function (res) {
                                console.log("移除goods成功！");
                            },
                        });
                        resolve("ok");
                    },
                });
            })
            Cache.then(async function (msg) {
                console.log("msg is ", msg);
                if (msg === "ok") {
                    self.initGoodsInfo();
                }
            });
        }
        //获取手机系统信息
        wx.getSystemInfo({
            success: function (res) {
                console.log("res is ", res);
            },
        })
    },
    //初始化商品信息
    initGoodsInfo: async function () {
        let self = this;
        console.log("goods is ", self.data.goods);
        let sizeStr = self.data.goods.size;
        console.log("sizeStr is ", sizeStr);
        if (self.data.goods.openstandard !== 1) {
            sizeStr.trim();
            console.log("sizeStr is ", sizeStr);
            self.data.size = JSON.parse(sizeStr);
            for (let m in self.data.size) {
                console.log("m is ", m);
                self.data.typeArr.push(m);
                let value = self.data.size[m];
                let valueItemArr = value.split('|');
                let outJson = {

                }
                console.log("valueItemArr is ", valueItemArr);
                let len = valueItemArr.length;
                console.log("len is ", len);
                outJson[`${m}`] = [];
                for (let i = 0; i < len; i++) {
                    let ob = {};
                    ob.mode = valueItemArr[i];
                    if (i === 0) {
                        ob.touch = true;
                        this.data.sendServerSize[`${m}`] = ob.mode;
                        console.log("sendServerSize is ", this.data.sendServerSize);
                        this.setData({
                            sendServerSize: this.data.sendServerSize
                        })
                    } else {
                        ob.touch = false;
                    }
                    outJson[`${m}`].push(ob);
                }
                //将每一项对应的键值
                self.data.typeValueArr.push(outJson);
                console.log("value is ", self.data.typeValueArr);
            }
            console.log("typeArr is ", self.data.typeArr);
            console.log("typeValueArr is", self.data.typeValueArr);
            // self.data.sendServerSize = Object.values(self.data.size);
            /**
             * 
             * 发送加入购物车请求的时候没有规格产品的该size依情况而定
             * 
             */
            // self.data.sendServerSize.size = '';
            console.log("sendServerSize is ", self.data.sendServerSize);
            self.setData({
                typeArr: self.data.typeArr,
                typeValueArr: self.data.typeValueArr
            })
        }
        let headList = self.data.goods.head.split(',');
        for (let k = 0; k < headList.length; k++) {
            self.data.goodsImageList.push(headList[k]);
        }
        console.log("imgHtmlString goods is ", self.data.goods);
        let imgHtmlString = self.data.goods.info;
        wxParse.wxParse('goodsDetailList', 'html', imgHtmlString, self, 0);
        console.log("imgHtmlString is ", self.data.goodsDetailList);
        if (self.data.goodsImageList.length !== 0) {
            self.setData({
                goodsImageList: self.data.goodsImageList
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (ops) {
        console.log("ops is ", ops);
        if (ops.from === 'button') {
            console.log("分享的商品是：",this.data.goods);
            //改变来源商品分享得来的
            this.data.goods.resources = 1;
            console.log("分享出去的商品是：",this.data.goods);
            return {
                title: "指点迷津",
                desc: 'a good app for tianjin area',
                path: '/pages/lck/cartGoodsDetail/cartGoodsDetail?goods=' + JSON.stringify(this.data.goods),
                success: function (res) {
                    console.log("分享成功，res is ", res);
                    let shareTickets = res.shareTickets;
                    console.log(shareTickets);
                    if (!res.shareTickets) {

                    }
                }
            }
        }
    },
    test: function (event, item) {
        let dataSet = event.currentTarget.dataset;
        console.log("in test event dataset is ", dataSet.e);
        console.log("in test event is ", event);
        console.log("item is ", item);
    },
    cancel: function () {
        //检查规格数据是否选择完毕
        this.checkData(this.data.goods.pid, 'cancel');
        this.setData({
            showBuyCon: false,
        })
        if (this.data.goods.openstandard === 1) {
            this.setData({
                typeValueArr: [],
                typeArr: []
            });
        }
        //   console.log("isChoosedOk is ",isChoosedOk);
        if (this.data.isOk) {
            //商品类别选择完毕填充选择款式栏的内容
            this.data.sizeValueArr = Object.values(this.data.sendServerSize);
            console.log("尺寸类别是：", this.data.sizeValueArr);
            this.setData({
                sizeValueArr: this.data.sizeValueArr,
                isChooseType: true
            })
        }
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'liner',
        });
        let backAnimation = wx.createAnimation({
            duration: 100,
            timingFunction: 'liner',
        });
    },
    showBuyCon: async function (event) {
        console.log("event is ", event);
        let dataSet = event.currentTarget.dataset;
        let pid = dataSet.pid;
        let id = event.currentTarget.id;
        let clickType = dataSet.clicktype;
        //没有开启规格的时候都是默认的商品类型
        this.setData({
            showBuyCon: true,
        });
        let data = this.checkData(this.data.goods.pid);
        switch(id){
            //点击商品详情页面内的选择规格弹出页面的
            case 'addcart_t':
                let url = this.data.host + 'Data/AddCart';
                if(this.data.goods.openstandard !== 1){
                    //无规格时候是默认选择的
                    this.setData({
                        isOk : true
                    })
                }
                //在选择规格界面添加购物车
                if (this.data.isOk) {
                    this.setData({
                        //尺寸颜色都已经选择了
                        isChooseType: true
                    });
                    //将对象的值取出来
                    this.data.sizeValueArr = Object.values(this.data.sendServerSize);
                    console.log("sizeValueArr is ", this.data.sizeValueArr);
                    console.log("data is ", data);
                    console.log(data.size.size);
                    console.log(data.size.color);
                    if (data.uid !== null) {
                        let req = new Request(url, data, "POST", "text");
                        let res = await req.sendRequest();
                        console.log("res is ", res);
                        if (res.data.encode === 0) {
                            //弹框
                            wx.showToast({
                                title: '加入购物车成功',
                            });
                            //让弹框不显示
                            this.cancel();
                        }
                    } else {
                        wx.showToast({
                            title: '请登录小程序!',
                            icon: 'none'
                        })
                    }
                }
                break;
            case 'buyit_t':
                if(this.data.goods.openstandard !== 1){
                    //没有开启规格
                    this.setData({
                        isOk : true
                    })
                }
                if (this.data.isOk) {
                    wx.navigateTo({
                        url: '../order/order?goods=' + JSON.stringify(data),
                    });
                }
                break;
            case 'addcart':
                this.setData({
                    addCart: true,
                    BuyIt: false,
                    showBuyCon: true,
                    fromTypeToAdd : false
                });
                break;
            case 'buyit':
                this.setData({
                    BuyIt: true,
                    addCart: false,
                    showBuyCon: true,
                    fromTypeToAdd : false
                });
                break;
        }
        //如果选择商品详情页面的选择规格会标记为选中了
        if(clickType === 'yes'){
            this.setData({
                fromTypeToAdd : true,
                BuyIt : false,
                addCart : false
            })
        }
    },
    //减少商品数量
    sub: function () {
        if (this.data.count > 1) {
            this.setData({
                count: this.data.count - 1
            })
        }
    },
    add: function () {
        this.setData({
            count: this.data.count + 1
        })
    },
    //确认订单 
    confirm: async function (event) {
        console.log("in confirm event is ", event);
        let tid = event.currentTarget.id;
        console.log("tid is ", tid);
        if (tid === 'addcart') {
            //通过选择尺寸的时候点击的添加购物车
            this.setData({
                addCart: true,
                BuyIt: false,
            });
        } else if (tid === 'buyit') {
            this.setData({
                addCart: false,
                BuyIt: true,
            });
        }
        console.log("点击了添加购物车事件：", this.data.addCart);
        console.log("点击了立即购买事件：", this.data.BuyIt);
        //确认加入购物车
        if (this.data.addCart) {
            console.log();
            let url = this.data.host + 'Data/AddCart';
            let pid = this.data.goods.pid;
            console.log("pid is ", pid);
            console.log("uid is ", app.uid);
            let data = this.checkData(pid);
            if (this.data.goods.openstandard !== 1) {
                //一种规格的商品默认是选择的
                this.data.isOk = true;
                //    data.size = 
            }
            console.log("data is ", data);
            if (this.data.isOk) {
                this.setData({
                    //尺寸颜色都已经选择了
                    isChooseType: true
                });

                //将对象的值取出来
                this.data.sizeValueArr = Object.values(this.data.sendServerSize);
                console.log("sizeValueArr is ", this.data.sizeValueArr);
                console.log("data is ", data);
                console.log(data.size.size);
                console.log(data.size.color);
                if (data.uid !== null) {
                    let req = new Request(url, data, "POST", "text");
                    let res = await req.sendRequest();
                    console.log("res is ", res);
                    if (res.data.encode === 0) {
                        //弹框
                        wx.showToast({
                            title: '加入购物车成功',
                        });
                        //让弹框不显示
                        this.cancel();
                    }
                } else {
                    wx.showToast({
                        title: '请登录小程序!',
                        icon: 'none'
                    })
                }
            }
        } else if (this.data.BuyIt) {
            let data = this.checkData(this.data.goods.pid);
            console.log("data is ", data);
            console.log("购买的goods is ", this.data.goods);
            data.pname = this.data.goods.pname;
            data.head = this.data.goods.head;
            data.price = this.data.goods.price * data.count;
            //是否开启规格
            data.openstandard = this.data.goods.openstandard;
            wx.setStorageSync('buyGoodsItem', data)
            //如果数据合法的话就跳转页面
            if (this.data.isOk) {
                wx.navigateTo({
                    url: '../order/order'
                });
            }
        }


    },
    //检查加入购物车或者立即购买的时候选择的数据是否合法
    checkData: function (pid) {
        let cancel = '';
        if (arguments.length === 2) {
            cancel = arguments[1];
        }
        let data = {
            uid: 1,
            pid: pid,
            size: this.data.sendServerSize,
            count: this.data.count,
            source: 0,
        }
        console.log("typeArr is ", this.data.typeArr);
        let typeA = this.data.typeArr;
        let typeLen = this.data.typeArr.length;
        console.log("data.size is ", this.data.sendServerSize);
        let checkNum = 0;
        for (let i = 0; i < typeLen; i++) {
            console.log("i --->> ", `${typeA[i]}`);
            console.log("--->>>", data.size[`${typeA[i]}`]);
            console.log("--->>> <<<", data.size[`${typeA[i]}`] === undefined);
            let hasThisProperty = data.size.hasOwnProperty(`${typeA[i]}`);
            console.log("有没有改属性：", hasThisProperty);
            if (hasThisProperty) {
                checkNum++;
            }
        }
        console.log('checkNum is ', checkNum);
        if (checkNum === typeLen) {
            console.log("所有类型都已经选择");
            this.setData({
                isOk: true
            })
        } else {
            console.log("类型没有选择完")
            this.setData({
                isOk: false
            })
        }
        console.log("isOk is ", this.data.isOk);
        //规格没有选择正确或者是没有选择足够
        if (!this.data.isOk && cancel !== 'cancel') {
            if (this.data.goods.openstandard === 1) {
                wx.showToast({
                    title: '请选择规格',
                    icon: 'none'
                })
            }
        }
        return data;
    },
    //点击规格尺寸事件动态显示已经选择的尺寸规格
    chooseType: function (event) {
        //无规格商品
        console.log("event is ", event);
        console.log("event.id is ", event.currentTarget.id);
        let target = event.currentTarget.id;
        let targetArr = target.split('-');
        let targetValue = targetArr[0];
        let index = targetArr[1];
        let tag = targetArr[2];
        console.log("sendServerSize is ", this.data.sendServerSize);
        console.log("index is ", index);
        console.log("tag is ", tag);
        //在typeValueArr中找到mode为id的这个对象并设置该对象的touch属性为true
        let testData = this.data.typeValueArr;
        console.log("testData is ", testData);
        let len = testData.length;
        console.log("len is ", len);
        let find = false;
        let innerLen = testData[index][`${tag}`].length;
        console.log("innerLen is ", innerLen);
        for (let j = 0; j < innerLen; j++) {
            if (testData[index][`${tag}`][j].mode === targetValue) {
                console.log("找到了");
                testData[index][`${tag}`][j].touch = !testData[index][`${tag}`][j].touch;
                console.log("该尺寸类型是否被选中：", testData[index][`${tag}`][j].touch);
                if (testData[index][`${tag}`][j].touch) {
                    //动态添加属性
                    this.data.sendServerSize[`${tag}`] = targetValue;
                } else {
                    console.log("该属性需要删除！");
                    //删除该属性
                    delete this.data.sendServerSize[`${tag}`];
                }
                console.log("sendServerSize obj is ", this.data.sendServerSize);
                console.log("index is ", index);
            } else {
                //将其他的touch重置为false
                testData[index][`${tag}`][j].touch = false;
            }
        }
        console.log("typeValueArr is ", this.data.typeValueArr);
        this.setData({
            typeValueArr: testData,
            sendServerSize: this.data.sendServerSize,
            sizeValueArr: this.data.sizeValueArr,
        });
    },
    slideMove: function (event) {
        console.log("event is ", event);
        this.data.slideStart++;
        this.setData({
            slideStart: this.data.slideStart
        })
    },
})