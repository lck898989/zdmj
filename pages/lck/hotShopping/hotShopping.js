// pages/lck/hotShopping/hotShopping.js
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
var app = getApp();
//支持es6 async..await
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url: "http://192.168.1.139:3150",
        url1:"http://shop.ykplay.com",
        //初始化精选好货的初始化页数
        jingIndex: 1,
        //初始化精选好货的总页数
        jingAll: null,
        //精选商城商品数组
        arrayTextMsg: [1, 2, 3, 4],
        //精选好货数组
        perfactShopArray: null,
        //精选商城商品数组
        arrayTextMsg: [],
        //商品列表
        goods: [],
        typeArr: [],
        moreTypeArr: [],
        //是否显示行式排版
        banshi: false,
        moreType: false,
        //当前页面被显示
        choosed: true,
        /***
         * 左右滑动所需要的变量指定偏移量进行动作
         */
        touchStartPosition: {
            startX: 0,
            startY: 0
        },
        touchEndPosition: {
            endX: 0,
            endY: 0
        },
        inputString: '',
        page: 1,
        pricePage: 1,
        salesPage: 1,
        typechoosed: false,
        typeActiveColor: 'color:#ff861a;border-bottom:4rpx solid #ff861a;',
        typeUnActiveColor: 'color:#808080',
        //是否显示更多
        isMore: false,
        //价格升序
        isUpPrice: true,
        isDownPrice: false,
        //销量升序降序
        /*下拉状态，是对价格下拉还是普通下拉，销量下拉
        0   :  普通下拉
        1  ：  价格下拉
        2  ： 销量下拉
        */
        updateState: 0,
        salesStyle: 'color:#ff861a;',
        salesActive: false,
        //以及分类id
        tid: null,
        isPull: false,
        showArrowDown: true,
        t2id : 0,
        //需要显示的数据是否加载完毕加载完毕才进行显示数据
        dataOk : false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        console.log("uid is ",app.uid);
        wx.showLoading({
            title: '数据加载中...',
        });
        Array.prototype.contain = function (item) {
            let len = this.length;
            for (let i = 0; i < len; i++) {
                if (this[i].t2id === item.t2id && this[i].t2name === item.t2name && this[i].tid === item.tid) {
                    return true;
                }
            }
            return false;
        }
        console.log(options.tid + "//////////");
        app.loadJingArray = res => {
            var orderArray1 = this.data.perfactShopArray;
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                res.data.essays[i].product_head = res.data.essays[i].product_head.split(",");
            }
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                orderArray1.push(res.data.essays[i]);
            }
            this.setData({
                perfactShopArray: orderArray1,
                isPull: false,

            })
            // wx.hideLoading();
        }
        app.setJingArray = res => {
            console.log(res.data.essays[0]);
            console.log(res.data.essays[0].txturl);
            console.log("asdfasdf");
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                res.data.essays[i].product_head = res.data.essays[i].product_head.split(",");
            }
            console.log(res.data.essays[0].product_head);
            this.setData({
                perfactShopArray: res.data.essays,
                jingAll: res.data.pages
            })
        }
        //   console.log("options is ",options.tid === undefined);
        console.log("options's tid is ",options.tid);
        if (options.tid === undefined) {
            this.data.tid = 14;
            console.log("tid is ",this.data.tid)
        } else {
            this.data.tid = Number(options.tid);
            console.log("tid is ",this.data.tid);
        }
        console.log("this.data.tid is ", this.data.tid);
        console.log("asdfasdf");
        //获得typeArr /Data/ 
        let typeUrl = 'Data/GetTab2ByTid';
        let data = {
            tid: this.data.tid
        }
        let typeReq = new Request(app.host + typeUrl, data, 'POST', 'text');
        let typeRes = await typeReq.sendRequest();
        console.log("获得二级分类的res is ", typeRes.data.tab2s);
        if (typeRes.data.tab2s.length === 0) {
            wx.showToast({
                title: '没有该分类',
                icon: 'none'
            })
        } else {
            console.log("二级分类开始重新组装");
            //转换为我需要的数据格式
            let resourceData = typeRes.data.tab2s;
            let typeLen = resourceData.length;
            if (typeLen > 5) {
                for (var i = 0; i < 5; i++) {
                    let tempJson = {

                    }
                    tempJson.tid = resourceData[i].tid;
                    tempJson.t2id = resourceData[i].t2id;
                    tempJson.text = resourceData[i].t2name;
                    tempJson.choosed = (i === 0 ? true : false);
                    if (!this.data.typeArr.contain(tempJson)) {
                        this.data.typeArr.push(tempJson);
                    }
                    if(i === 0){
                        this.setData({
                            t2id : tempJson.t2id
                        })
                    }
                    console.log("第一个t2id is ",this.data.t2id);
                }
                for (let j = i; j < typeLen; j++) {
                    let tempJson = {

                    }
                    tempJson.tid = resourceData[j].tid;
                    tempJson.t2id = resourceData[j].t2id;
                    tempJson.text = resourceData[j].t2name;
                    tempJson.choosed = false;
                    if (!this.data.moreTypeArr.contain(tempJson)) {
                        this.data.moreTypeArr.push(tempJson);
                    }

                }
            } else {
                //如果种类小于五个
                for (let m = 0; m < typeLen; m++) {
                    let tempJson = {

                    }
                    tempJson.tid = resourceData[m].tid;
                    tempJson.t2id = resourceData[m].t2id;
                    tempJson.text = resourceData[m].t2name;
                    tempJson.choosed = (m === 0 ? true : false);
                    if (!this.data.typeArr.contain(tempJson)) {
                        this.data.typeArr.push(tempJson);
                    }
                    if(m === 0){
                        this.setData({
                            t2id : tempJson.t2id
                        })
                    }
                }
                this.setData({
                    showArrowDown: false
                })
            }
            //向服务器请求数据
            let req = new Request(app.host + 'Data/GetProductsByT2id', { page: this.data.page, t2id: this.data.t2id }, "POST", "text");
            console.log("ae32333");
            let res = await req.sendRequest();
            console.log("res.data is ", res.data.products);
            //去重操作
            let resGoods = Const.uniqObjInArray(res.data.products);
            console.log("resGoods is ",resGoods);
            this.splitHeadImage(resGoods);
            this.setData({ 
                goods  : resGoods,
                dataOk : true
            });
            console.log("in hotShopping uid is ", app.uid);

            console.log("typeArr is ", this.data.typeArr);
            console.log("moreTypeArr is ", this.data.moreTypeArr);
            wx.hideLoading();
            this.setData({
                typeArr: this.data.typeArr,
                moreTypeArr: this.data.moreTypeArr,
            })
        }
        app.loadJingArray = res => {
            var orderArray1 = this.data.perfactShopArray;
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                res.data.essays[i].product_head = res.data.essays[i].product_head.split(",");
            }
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                orderArray1.push(res.data.essays[i]);
            }
            this.setData({
                perfactShopArray: orderArray1,
                isPull: false,

            })
            wx.hideLoading();
        }
        app.setJingArray = res => {
            console.log(res.data.essays[0].txturl);
            console.log("asdfasdf");
            for (var i = 0; i <= res.data.essays.length - 1; i++) {
                res.data.essays[i].product_head = res.data.essays[i].product_head.split(",");
            }
            console.log(res.data.essays[0].product_head);
            this.setData({
                perfactShopArray: res.data.essays,
                jingAll: res.data.pages
            })
        }

    },
    splitHeadImage : function(array){
        let goodsLen = array.length;
        for(let i = 0;i < goodsLen;i++){
            if(typeof array[i].head === 'string')
                array[i].head = array[i].head.split(',');
        }
        this.setData({
            array : array
        })
    },
    acticleScene: function (event) {
        console.log(event);
        console.log(event.currentTarget.dataset.username);
        console.log(event.currentTarget.dataset.code);
        var bb = "<p>&nbsp;&nbsp;&nbsp;&nbsp; 从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事，老和尚说：从前有座山，山里有两个和尚，一个老和尚一个小和尚，老和尚给小和尚讲故事。</p><p><img src=\"http:// 192.168.1.188:3150 / images / ueditor / 1056867677018132480.png\" title=\"\" alt=\"蘑菇云.png\"/></p><p>就这样讲了一辈子。充实</p>";
        app.wenzhangJson=null;
        var shoemsg1 = encodeURIComponent(bb);
        app.ShortConnect(app.urlw + "Data/GetEssayInfo", {
            pid: event.currentTarget.dataset.pid,
            eid: event.currentTarget.dataset.eid,
        }, "interWenZhang");
        wx.navigateTo({
            url: '../../ActicleScene/ActicleScene?title=' + event.currentTarget.dataset.title + "&authorurl=" + event.currentTarget.dataset.authorurl + "&authorname=" + event.currentTarget.dataset.authorname + "&shopurl=" + event.currentTarget.dataset.shopurl + "&pid=" + event.currentTarget.dataset.pid + "&aa=" + shoemsg1 + "&essayuid=" + event.currentTarget.dataset.essayuid + "&eid=" + event.currentTarget.dataset.eid,
        });
        
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
    onPullDownRefresh: function (event) {
        console.log("下拉事件是：", event);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        if (this.data.choosed == false) {
            if (this.data.jingIndex < this.data.jingAll && this.data.isPull == false) {
                wx.showLoading({
                    title: '加载中',
                })
                this.setData({
                    jingIndex: this.data.jingIndex + 1,
                    isPull: true,
                })
                app.ShortConnect(app.urlw2 + "Data/GetAllEssays", {
                    page: this.data.jingIndex
                }, "loadWenzhang");
            } else {
                wx.showToast({
                    title: '已经到底了',
                })
            }
        } else {
            console.log("加载更多");
            //调用下拉刷新动画
            wx.showLoading({
                title: '加载中...',
            });
            let url = '';
            let data = {

            };
            switch (this.data.updateState) {
                case 0:
                    console.log("普通排序");
                    url = 'Data/GetProductsByT2id';
                    data.page = ++this.data.page;
                    break;
                case 1:
                    console.log("价格排序");
                    url = 'Data/GetProductByPrice';
                    data.page = ++this.data.pricePage;
                    break;
                case 2:
                    console.log("销量排序");
                    url = 'Data/GetProductBySales';
                    data.page = ++this.data.salesPage;
                    break;
            }
            //以及分类id
            data.t2id = this.data.t2id;
            //向服务器请求更多数据
            let req = new Request(app.host + url, data, "POST", "text");
            console.log("ae32333");
            let res = await req.sendRequest();
            if (res.data.products.length === 0) {
                wx.hideLoading();
                wx.showToast({
                    title: '已经到底了',
                    icon: 'none'
                })
            } else {
                //隐藏加载中
                wx.hideLoading();
                this.data.goods = this.addGoods(this.data.goods, res.data.products);
                this.splitHeadImage(this.data.goods);
                this.data.goods = Const.uniqObjInArray(this.data.goods);
                this.setData({
                    goods: this.data.goods
                });
            }
        }
    },
    //追加商品
    addGoods: function (sourceArr, tempArr) {
        let len = tempArr.length;
        for (let j = 0; j < len; j++) {
            sourceArr.push(tempArr[j]);
        }
        return sourceArr;
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {


    },
    //通过商品类别id获得商品
    getGoodsById: function (typeArr, id) {
        let len = typeArr.length;
        if (typeArr === this.data.typeArr) {
            console.log("in getGoodsById typeArr is equal to this.data.typeArr");
            let moreTypeArrLen = this.data.moreTypeArr.length;
            for (let m = 0; m < moreTypeArrLen; m++) {
                this.data.moreTypeArr[m].choosed = false;
            }
        } else {
            let typeArrLen = this.data.typeArr.length;
            for (let j = 0; j < typeArrLen; j++) {
                this.data.typeArr[j].choosed = false;
            }
        }
        for (let i = 0; i < len; i++) {
            console.log("id is ", id);
            console.log("t2id is  ", typeArr[i].t2id);
            if (id === typeArr[i].t2id) {
                typeArr[i].choosed = true;
            } else {
                typeArr[i].choosed = false;
            }
        }
        console.log("typeArr is ", typeArr);
    },
    banshi: function () {
        this.setData({
            banshi: !this.data.banshi
        })
    },
    // startMove: function(event) {
    //     console.log("in startMove event is ", event);
    //     this.setData({
    //         touchStartPosition: {
    //             startX: event.touches[0].pageX,
    //             startY: event.touches[0].pageY
    //         }
    //     });
    //     console.log("startX is ", this.data.touchStartPosition.startX);
    //     console.log("startY is ", this.data.touchStartPosition.startY);
    // },
    switchShoppingType: function (event) {
        console.log("event is ", event);
        //   this.setData({
        //     touchStartPosition: {
        //         startX: event.touches[0].pageX,
        //         startY: event.touches[0].pageY
        //     }
        //   });
    },
    // clearEventArr: function(event) {
    //     console.log("in clearEventArr event is ", event);
    //     //判断事件数组中的个数来进行左右滑动事件的执行
    //     //记录下结束时候的坐标位置
    //     this.setData({
    //         touchEndPosition: {
    //             endX: event.changedTouches[0].pageX,
    //             endY: event.changedTouches[0].pageY
    //         }
    //     });
    //     let offsetX = this.data.touchStartPosition.startX - this.data.touchEndPosition.endX;
    //     let offsetY = this.data.touchStartPosition.startY - this.data.touchEndPosition.endY;
    //     console.log("offsetX is ", offsetX);
    //     console.log("offsetY is ", offsetY);
    //     if ((offsetY >= -50 && offsetY <= 50) && (offsetX <= -50 || offsetX >= 50)) {
    //         this.setData({
    //             choosed: !this.data.choosed
    //         });
    //     }
    // },
    enterHot: function () {
        //切换热门商城的组件部分
        this.setData({
            choosed: true
        });
    },
    enterPerfact: function () {
        console.log("333");
        //切换为精选商城的组件部分
        this.setData({
            choosed: false,
            jingIndex: 1,
        });
        app.ShortConnect(app.urlw + "Data/GetAllEssays", {
            page: this.data.jingIndex
        }, "getWenzhang");
    },
    //显示更多分类，下拉菜单
    showMore: function () {
        //合并类型数组和更多类型数组
        //显示更多容器内容向服务器请求更多分类
        let req = new Request();
        //测试环境下暂时用假数据
        this.setData({
            isMore: !this.data.isMore
        })

    },
    getSearch: function (event) {
        console.log("event is ", event);
        let inputString = event.detail.value;
        this.setData({
            inputString: inputString
        });
        console.log("输入的内容是：", inputString);
        //将搜素类型字段发送给服务器进行处理
    },
    //提交输入框中的内容
    enterSearchDetail: function (event) {
        wx.navigateTo({
            url: '../searchDetail/searchDetail',
        })
    },
    //输入框失去焦点时候触发该事件
    initInput: function (event) {
        console.log("in initInput event is ", event);
        event.detail.value = "";
        console.log("in initInput event is ", event);
        this.setData({
            inputString: ''
        });
    },
    chooseType: async function (event) {
        console.log("in chooseType event is ", event);
        let requestType = event.currentTarget.dataset.type;
        let id = Number(event.currentTarget.id);
        console.log("t2id is ",id);
        this.data.t2id = id;
        console.log("请求类型是 ", requestType);
        wx.showLoading({
            title: '加载数据中...',
        })
        //重置page=1
        this.data.page = 1;
        this.data.pricePage = 1;
        this.data.salesPage = 1;
        switch (requestType) {
            case 'goodsType':
                let data = {
                    t2id : this.data.t2id,
                    page : this.data.page
                }
                let url = 'Data/GetProductsByT2id'
                let req = new Request(app.host + url,data,'POST','text');
                let res = await req.sendRequest();
                wx.hideLoading();
                console.log("in chooseType res is ",res);
                if(res.data.products.length === 0){
                    wx.showToast({
                        title: '暂时还没有该分类的商品...',
                        icon : 'none'
                    })
                }
                this.splitHeadImage(res.data.products);
                this.setData({
                    goods :res.data.products
                })
                //选择类型的请求，改变类型选择的颜色
                this.getGoodsById(this.data.typeArr, id);
                //更新视图资源
                this.setData({
                    typeArr: this.data.typeArr,
                    moreTypeArr: this.data.moreTypeArr
                })
                switch (id) {
                    case 'all':
                        //发送给服务器查询该类型的商品
                        let req = new Request();
                        break;
                }
                break;
            case 'moreType':
                let data2 = {
                    t2id: this.data.t2id,
                    page: this.data.page
                }
                let url2 = 'Data/GetProductsByT2id'
                let req2 = new Request(app.host + url2, data2, 'POST', 'text');
                let res2 = await req2.sendRequest();
                wx.hideLoading();
                console.log("in moreType res is ", res2);
                if(res2.data.products.length === 0){
                    wx.showToast({
                        title : '暂时还没有该分类的商品...',
                        icon  : 'none'
                    })
                }
                this.splitHeadImage(res2.data.products);
                this.setData({
                    goods: res2.data.products
                })
                console.log("in chooseType -----> goods is ",this.data.goods);
                this.getGoodsById(this.data.moreTypeArr, id);
                this.setData({
                    moreTypeArr: this.data.moreTypeArr,
                    typeArr: this.data.typeArr
                })
                break;    
        }
    },
    //价格排序  
    sortPrice: async function (event) {
        wx.showLoading({
            title: '数据加载中...',
        })
        //价格下拉
        this.data.updateState = 1;
        console.log("in sortPrice event is ", event);
        let dataSort = event.currentTarget.dataset.sort;
        if (dataSort === 'up') {
            //   升序排列价格 改变升序的图标
            this.setData({
                isUpPrice: !this.data.isUpPrice,
                isDownPrice: !this.data.isDownPrice,
            })
        } else if (dataSort === 'down') {
            this.setData({
                isDownPrice: !this.data.isDownPrice,
                isUpPrice: !this.data.isUpPrice,
            })
        }
        let url = Const.devHost + 'Data/GetProductByPrice'
        console.log("in price order t2id is ",this.data.t2id);
        let data = {
            t2id : this.data.t2id,
            up: null,
            page: this.data.pricePage
        }
        //查看是升序请求还是降序请求
        if (this.data.isUpPrice) {
            data.up = 1;
        } else if (this.data.isDownPrice) {
            //发送根据价格降序排列的数据
            data.up = -1;
        }
        data.tid = this.data.tid;
        //发送根据价格升序排列的数据
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        wx.hideLoading();
        console.log("in sort price res is ", res.data.products);
        //先将原来的置空
        this.data.goods = [];
        this.splitHeadImage(res.data.products);
        res.data.products = Const.uniqObjInArray(res.data.products);
        this.setData({
            goods: res.data.products
        })
    },
    //销量排序 
    sortSales: async function (event) {
        //变换销量字体颜色
        this.setData({
            salesActive: !this.data.salesActive
        });
        //销量下拉刷新
        this.data.updateState = 2;
        console.log("in sortPrice event is ", event);
        let dataSort = event.currentTarget.dataset.sort;
        let data = {
            t2id : this.data.t2id,
            up: null,
            page: this.data.salesPage
        }
        if (dataSort === 'up') {
            data.up = 1;
        } else if (dataSort === 'down') {
            data.up = -1;
        }
        data.tid = this.data.tid;
        let url = Const.devHost + 'Data/GetProductBySales'
        //发送根据价格升序排列的数据
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("in sort price res is ", res.data.products);
        this.data.goods = [];
        this.splitHeadImage(res.data.products);
        res.data.products = Const.uniqObjInArray(res.data.products);
        this.setData({
            goods: res.data.products
        })
    },

    //切换版式
    banshi: function () {
        this.setData({ banshi: !this.data.banshi })
    },
    //切换热卖商品和精选好货
    // startMove: function (event) {
    //     console.log("in startMove event is ", event);
    //     this.setData({
    //         touchStartPosition: {
    //             startX: event.touches[0].pageX,
    //             startY: event.touches[0].pageY
    //         }
    //     });
    //     console.log("startX is ", this.data.touchStartPosition.startX);
    //     console.log("startY is ", this.data.touchStartPosition.startY);
    // },
    //切换商品类型
    switchShoppingType: function (event) {
        console.log("event is ", event);
        //   this.setData({
        //     touchStartPosition: {
        //         startX: event.touches[0].pageX,
        //         startY: event.touches[0].pageY
        //     }
        //   });
    },
    //进入热门商城
    enterHot: function () {
        //切换热门商城的组件部分
        this.setData({ choosed: true });
    },
    //进入精选商城
    enterPerfact: function () {
        console.log("333");
        //切换为精选商城的组件部分
        this.setData({
            choosed: false,
            jingIndex: 1,
        });
        app.ShortConnect(app.urlw + "Data/GetAllEssays", {
            page: this.data.jingIndex
        }, "getWenzhang");

    },
    //搜索商品
    getSearch: function (event) {
        console.log("event is ", event);
        let inputString = event.detail.value;
        this.setData({ inputString: inputString });
        console.log("输入的内容是：", inputString);
    },
    //提交输入框中的内容
    commit: function (event) {
        console.log("in commit event is ", event);
    },
    //输入框失去焦点时候触发该事件
    initInput: function (event) {
        console.log("in initInput event is ", event);
        event.detail.value = "";
        console.log("in initInput event is ", event);
        this.setData({ inputString: '' });
    },
    //进入商品详情界面
    goodsDetail: function () {
        wx.navigateTo({
            url: '../cartGoodsDetail/cartGoodsDetail',
        })
    },
    onShareAppMessage: function (ops) {
        console.log("ops is ", ops);
        return {
            title: "指点迷津",
            desc: 'a good app for tianjin area',
            path: '/page/hotShopping/hotShopping'
        }
    }
    //上拉加载更多商品
    //   loadMore : function(){
    //       console.log("上拉刷新显示更多商品");
    //   }
})