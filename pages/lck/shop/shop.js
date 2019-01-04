// pages/lck/play/play.js
import Request from '../../../utils/Request';
import Const from '../../../utils/Const';
let app = getApp();
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageHost: "https://shopfile.ykplay.com/",
        serverImageHost: 'https://shop.ykplay.com/',
        swiperIndex: 0,
        btnArr: [{
            btnText: '精品分享',
            active: true,
            srcActive: '../../../resources/btn_share_1.png',
            srcUnActive: '../../../resources/btn_share_0.png'
        },
        {
            btnText: '热卖商城',
            active: false,
            srcActive: '../../../resources/btn_shopping_1.png',
            srcUnActive: '../../../resources/btn_shopping_0.png'
        }
        ],
        btnActive: 'background: linear-gradient(to right,#e84e86,#644caf);background: -webkit - linear - gradient(to right, #e84e86, #644caf);',
        btnUnActive: 'background: linear-gradient(to right,#7d7d7d,#999999);background: -webkit - linear - gradient(to right, #7d7d7d, #999999);',
        //一级分类源数据
        topLevelSource: [],
        //一级分类数组
        bannerType: [],
        //一级分类是否展开
        isTopLevel: false,
        //二级分类数组
        secondLevels: [],
        //二级分类是否展开
        IsecondLevel: false,
        dataArray: [],
        //模拟加载更能多数据
        moreDataArray: [],
        backgroundColor: '#d0d0d0',
        goods: [],
        //以及分类id
        tid: null,
        //一级分类下的二级分类
        t2id: -2,
        page: 1,
        // scorll-view的高度
        scrollH: 0,
        //图片的宽度
        imageWidth: 342,
        //加载图片的数量
        loadingCount: 6,
        col1: [],
        // scorll-view的高度
        scrollH: 0,
        //图片的宽度
        imageWidth: 342,
        //加载图片的数量
        loadingCount: 6,
        col2: [],
        ratio: 2,
        col1H: 0,
        col2H: 0,
        isHot: false,
        isShare: true,
        //显示加入购物车半窗
        showWindow: false,
        typeArr: [],
        typeValueArr: [],
        sendServerSize: {},
        //当前商品
        currentGoods: null,
        selectColor: '#ede2f4',
        selectFontColor: '#863bb7',
        unSelectColor: '#eee',
        unSelectFontColor: '#000',
        selectBorder: '2rpx solid #863bb7',
        unselectBorder: '2rpx solid #eee',
        count: 1,
        updateState: 0,
        sizeValueArr: [],
        isOk: false,
        floorStatus: false,
        //是否是全部
        isAll: true,
        HeadImageArr: [],
        topLevelStyle: '',
        //已经设置悬浮状态
        topLevelFloat: false,
        //选择完一级分类之后，一级分类滚动图向左滚动的距离
        scrollLeftDis: 0,
        loadText: '上拉获取更多文章...',
        //在onImageLoad里面只渲染那些新增的文章，渲染完成之后添加到文章列表中去
        newAddEssays: [],
        //是否显示用户头像
        isShowUser: false,
        showUser: false,
        //所有的规格都是默认
        allDefault : false,
        //是否点击了精品分享或者是一级分类下的标签，或者是更改数据时候设置的标记
        click : false,
    },
    topLevelArr: ["resources/btn_type_5.png", "resources/btn_type_6.png", "resources/btn_type_1.png", "resources/btn_type_2.png", "resources/btn_type_4.png", "resources/btn_type_7.png", "resources/btn_type_3.png", "resources/btn_type_8.png", "resources/btn_type_9.png", "resources/btn_type_10.png"],
    //详细分类
    detailClass: function (e) {
        //将一级分类展开显示
        this.setData({
            isTopLevel : !this.data.isTopLevel,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let self = this;
        this.getAllDataArrayInShare(function () {
        });
        this.getScrollImages();
        //获取到系统的信息
        wx.getSystemInfo({
            success: function (res) {
                console.log("res is ", res);
                let ratio = res.pixelRatio;
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let scrollH = wh;
                self.setData({
                    scrollH: scrollH,
                    ratio: ratio
                })
                console.log("scrollH is ", self.data.scrollH);
            }
        });
        //通过tid获取
        console.log("tid is ", this.data.tid);
        //获得一级分类
        let oneClassUrl = app.host + 'Data/GetTabs';
        let oneClassData = {};
        let req = new Request(oneClassUrl, oneClassData, "POST", "text");
        let res = await req.sendRequest();
        console.log("一级分类res is ", res);
        for (let i = 0; i < res.data.tabs.length; i++) {
            let tempJson = {
                tid: res.data.tabs[i].tid,
                choosed: false,
                text: res.data.tabs[i].tname,
                scrollLeft: i <= 2 ? 0 : 160 + (i - 3) * 100
            }
            this.data.bannerType.push(tempJson);
        }
        console.log("加入全部之前bannerType is ", this.data.bannerType);
        this.data.topLevelSource = res.data.tabs;
        console.log("toplevelSource is ", this.data.topLevelSource);
        let allJson = {
            tid: -1,
            text: '全部',
            choosed: true,
            scrollLeft: 0,
        }
        this.data.bannerType.unshift(allJson);
        this.setData({
            bannerType: this.data.bannerType,
            topLevelSource: res.data.tabs
        });
        console.log("bannerType is ", this.data.bannerType);
        this.getAllType();

    },
    //获得滚动图
    getScrollImages: async function () {
        let url = app.host + 'Data/GetProductPageActivityHead';
        let data = {
            type: 3,
            tag: 0
        };
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("获取滚动图的res is ", res);
        this.setData({
            HeadImageArr: res.data.activitys
        });
    },
    //滚动图跳转
    goDetail: async function (e) {
        console.log("-----> e is ", e);
        //跳转网页
        let pid = e.currentTarget.dataset.pid;
        //跳转类型：商铺文章，商品文章，商品详情界面
        //商品id
        console.log("pid is ", pid);
        let currentList = null;
        let listLen = this.data.HeadImageArr.length;
        for (let i = 0; i < listLen; i++) {
            let tempList = this.data.HeadImageArr[i];
            if (tempList.pid === pid) {
                currentList = tempList;
                break;
            }
        }
        console.log("currentList is ", currentList);
        console.log("jumptype is ", currentList.ptype);
        let jumptype = currentList.ptype;
        let url = '';
        switch (jumptype) {
            case '1':
                let url = app.host + 'Data/GetProductByPid';
                let data = {
                    pid : pid,
                    uid : app.uid
                };
                //跳转商品界面,获得对应pid的商品
                let product = null;
                let req = new Request(url, data, 'POST', 'text');
                let res = await req.sendRequest();
                console.log("product is ", res.data.product);
                //对产品的头图进行分割
                if (typeof (res.data.product.head) === 'string') {
                    res.data.product.head = res.data.product.head.split(',');
                }
                wx.setStorage({
                    key: 'goods',
                    data: res.data.product,
                });
                wx.navigateTo({
                    url: '../cartGoodsDetail/cartGoodsDetail',
                })
                break;
            case '2':
                //跳转到店铺文章
                console.log("进入商铺文章详情");
                data = {
                    shopid: pid,
                    uid: app.uid
                }
                let shopjson2 = encodeURIComponent(JSON.stringify(this.data.easyItem));
                app.wenzhangShop = null;
                app.ShortConnect(app.urlw + "Data/GetShopProductsByShopEssayShopid", {
                    shopid: pid,
                    uid: app.uid
                }, "turnShopWen", function (r) {
                    console.log("r is ", r);
                    if (JSON.stringify(r) === '{}') {

                    } else {
                        wx.navigateTo({
                            url: '',
                        })
                    }
                });
                break;
            case '3':
                app.wenzhangJson = null;
                app.ShortConnect(app.urlw + "Data/GetEssayInfo", {
                    pid: currentList.pid,
                    eid: currentList.pid,
                    uid: app.uid
                }, "interWenZhang");
                url = app.host + 'Data/GetEssayInfo';
                data = {
                    pid: currentList.pid,
                    eid: currentList.pid,
                    uid: app.uid
                }
                console.log("data is ", data);
                req = new Request(url, data, 'POST', 'text');
                res = await req.sendRequest();
                console.log("--->>res is ", res);
                wx.navigateTo({
                    url: '../../ActicleScene/ActicleScene?essayhead=' + res.data.essay.essayhead + '&title=' + res.data.essay.title + '&authorurl=' + res.data.essay.authorurl + '&authorname=' + res.data.essay.authorname + '&pid=' + currentList.pid + '&eid=' + res.data.essay.eid,
                })
                break;
        }
    },
    //获取精品分享中的全部信息
    getAllDataArrayInShare: function (callback) {
        wx.showLoading({
            title: '数据加载中...',
        });
        let self = this;
        app.ShortConnect(app.urlw + "Data/GetAllEssays", {
            page: self.data.page
        }, "getWenzhang", function (r) {
            console.log("----adfasdf", r);
            this.data.showUser = r.showWrite === 0 ? false : true;
            this.setData({
                showUser: this.data.showUser
            })
            let m = r.essays;
            if (m.length > 0) {
                for (let i = 0; i <= m.length - 1; i++) {
                    m[i].essayhead = m[i].essayhead.split(",");
                    m[i].productstype = 'essays'
                }
                console.log("r is ", m);
                for (let j = 0; j < m.length; j++) {
                    this.data.newAddEssays.push(m);
                }
                this.setData({
                    newAddEssays : m,
                }, () => {
                    callback();
                    setTimeout(function(){
                        self.data.click = false;
                    },100);
                });
                console.log("newAddEssays is ", this.data.newAddEssays);
                this.setData({
                    loadText: '上拉获取更多文章...'
                })
            } else {
                wx.hideLoading();
                this.setData({
                    loadText: '已经到底了~~o(>_<)o ~~'
                })
            }
        }.bind(this));
    },
    //获取全部下的所有商品信息
    getAllType: async function () {
        console.log("---Alltype is ------");
        if (this.data.isHot) {
            //显示全部商品
            let url = app.host + 'Data/GetAllProductsByPage';
            let data = {
                uid: app.uid,
                page: this.data.page
            }
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();
            console.log("---Alltype is res is ", res);
            this.splitHeadImage(res.data.products);
            for (let i = 0; i < res.data.products.length; i++) {
                this.data.goods.push(res.data.products[i]);
            }
            //将图片的头图分割成数组
            this.setData({
                goods: this.data.goods
            });
        } else if (this.data.isShare) {
            //获取分享文章
            this.getAllDataArrayInShare(function () {
            });
        }
    },
    //获得二级分类
    getTwoClass: async function () {
        //通过t2id得到二级分类下的商品
        console.log("in getTwoClass t2id is ", this.data.t2id);
        let req1 = new Request(app.host + 'Data/GetProductsByT2id', { page: this.data.page, t2id: this.data.t2id }, "POST", "text");
        let res1 = await req1.sendRequest();
        console.log("products is ", res1.data.products);
        this.splitHeadImage(res1.data.products);
        console.log("goods is ", res1.data.products);
        if (res1.data.products.length === 0) {
            this.setData({
                loadText: '暂时还没有该分类的商品...'
            });
        }
        this.setData({
            goods: res1.data.products
        });
    },
    splitHeadImage: function (array) {
        let goodsLen = array.length;
        for (let i = 0; i < goodsLen; i++) {
            if (typeof array[i].head === 'string')
                array[i].head = array[i].head.split(',');
        }
    },
    getTid: function (e) {
        this.data.page = 1;
        let dataSet = e.currentTarget.dataset;
        let tid = dataSet.tid;
        let self = this;
        this.setData({
            tid: tid,
            t2id: -2
        }, async () => {
            console.log("关闭一级分类标签");
            this.setActiveByTid(tid);
            self.setData({
                IsecondLevel: true,
                isAll: false
            });
            //设置二级分类数据
            console.log("in getTid tid is ", tid);
            if (this.data.isShare) {
                self.getT2idByTid(tid);
                let essayData = await self.getShareEssayByTid();
                console.log("essayData is ", essayData);
                self.setData({
                    newAddEssays : essayData,
                    IsecondLevel : this.data.newAddEssays.length === 0 ? false : true
                });
            } else {
                self.getT2idByTid(tid);
                let goodsArr = await this.getProductsByTid();
                //分割头图
                this.splitHeadImage(goodsArr);
                console.log("goodsArr is ", goodsArr);
                self.setData({
                    goods        : goodsArr,
                    IsecondLevel : this.data.goods.length === 0 ? false : true
                });
            }
        });
        this.hideTopLevel();
    },
    //隐藏一级分类
    hideTopLevel: function () {
        this.data.IsecondLevel
        this.setData({
            isTopLevel: false,
        })
    },
    //自定义组件触发的事件加入购物车或者是直接购买
    myevent: async function (e) {
        let self = this;
        console.log("组件传递过来的数据是：e is ", e);
        let dataSet = e.detail;
        let currentGoods = null;
        //点击的是哪个商品，然后根据商品的id获取到对应的规格信息显示加入购物车半窗
        let id = dataSet.id;
        //找到该id对应的商品
        for (let i = 0; i < this.data.goods.length; i++) {
            if (this.data.goods[i].pid == id) {
                currentGoods = this.data.goods[i];
            }
        }
        console.log("currentGoods is ", currentGoods);
        if (currentGoods.openstandard !== 1) {
            let sizeStr = currentGoods.size;
            console.log("sizeStr is ", sizeStr);
            sizeStr.trim();
            console.log("sizeStr is ", sizeStr);
            self.data.size = JSON.parse(sizeStr);
            for (let m in self.data.size) {
                console.log("m is ", m);
                self.data.typeArr.push(m);
                let value = self.data.size[m];
                let valueItemArr = value.split('|');
                let outJson = {};
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
            /**
             * 
             * 发送加入购物车请求的时候没有规格产品的该size依情况而定
             * 
             */
            console.log("sendServerSize is ", self.data.sendServerSize);
            self.data.typeArr = Const.uniqByObj(self.data.typeArr);
            self.data.typeValueArr = Const.uniqObjInArray(self.data.typeValueArr);
            self.setData({
                typeArr: self.data.typeArr,
                typeValueArr: self.data.typeValueArr,
                showWindow: true,
                currentGoods: currentGoods
            })
        } else {
            //有规格的商品
            let url = app.host + 'Data/GetStandardByPid';
            let data = {
                pid: currentGoods.pid
            }
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();
            console.log("有规格的产品的规格是：", res.data.products);
            let category = res.data.products.canselectstandard;
            console.log("category is ",category);
            let keys = Object.keys(category);
            console.log("keys is ", keys);
            //把规格存进数组
            for (let m = 0; m < keys.length; m++) {
                let keyObj = keys[m];
                this.data.typeArr.push(keyObj);
                // console.log("种类的值是：", categoryArr[i][`${keyObj}`]);
                let le = category[`${keyObj}`].length;
                let tempJson = {};
                console.log("le is ", le);
                console.log("keyObj is ", keyObj);
                tempJson[`${keyObj}`] = [];
                for (let a = 0; a < le; a++) {
                    // console.log("种类值是：", categoryArr[i][`${keyObj}`][a]);
                    let innerJson = {

                    }
                    innerJson.mode = category[`${keyObj}`][a];
                    let typeKeys = category[`${keyObj}`];
                    console.log("typeKeys is ", typeKeys);
                    // a === 0 ? (innerJson.touch = true) : (innerJson.touch) = false;
                    if (a === 0) {
                        innerJson.touch = true;
                        //默认选择的类型
                        this.data.sendServerSize[`${keyObj}`] = innerJson.mode;
                    } else {
                        innerJson.touch = false;
                    }
                    // //检查商品中的size_choosed中的value值是否与该
                    // innerJson.touch = false;
                    tempJson[`${keyObj}`].push(innerJson);
                }
                this.data.typeValueArr.push(tempJson);
            }
            console.log("typeArr is ", this.data.typeArr);
            console.log("typeValueArr is ", this.data.typeValueArr);
            self.data.typeArr = Const.uniqByObj(self.data.typeArr);
            self.data.typeValueArr = Const.uniqObjInArray(self.data.typeValueArr);
            this.setData({
                typeArr: this.data.typeArr,
                typeValueArr: this.data.typeValueArr,
                sendServerSize: this.data.sendServerSize,
                showWindow: true,
                currentGoods: currentGoods
            });
        }
        let defaultCount = 0;
        for (let k = 0; k < this.data.typeValueArr.length; k++) {
            let itemType = this.data.typeValueArr[k];
            console.log("itemType is ",itemType);
            let key = this.data.typeArr[k];
            let tempJson = itemType[`${key}`];
            console.log("tempJson is ",tempJson);
            for (let m = 0; m < tempJson.length; m++) {
                console.log("默认了吗：",tempJson[m].mode === '默认');
                if (tempJson[m].mode === '默认') {
                    defaultCount++;
                }
            }
        }
        if (defaultCount === this.data.typeArr.length) {
            console.log("所有的规格都是默认");
            this.setData({
                allDefault: true
            })
        }else{
            this.setData({
                allDefault : false
            })
        }
    },
    //取消显示半窗
    cancel: function (e) {
        console.log("e is ", e);
        this.setData({
            typeArr: [],
            typeValueArr: [],
            sendServerSize: {},
            showWindow: false,
        })
    },
    scroll: function (e) {
        console.log("横向的滑动e is ", e);
        //检查
    },
    //view的下拉获取top位置信息
    onPageScroll: function (e) {
        if (e.scrollTop > 100) {
            this.setData({
                floorStatus: true,
            })
            if (e.scrollTop >= 475) {
                if (!this.data.topLevelFloat) {
                    console.log("悬浮设置了1次");
                    this.data.topLevelFloat = true;
                    //将一级分类进行悬浮
                    this.data.topLevelStyle = 'position:fixed;width:750rpx;top:0rpx;left:0rpx;z-index:90;';
                    this.setData({
                        topLevelStyle: this.data.topLevelStyle
                    });
                }
            } else {
                if (this.data.topLevelFloat) {
                    this.data.topLevelStyle = '';
                    this.data.topLevelFloat = false;
                    this.setData({
                        topLevelStyle: this.data.topLevelStyle
                    });
                }
            }

        } else {
            if (this.data.topLevelFloat) {
                this.data.topLevelStyle = '';
                this.data.topLevelFloat = false;
                this.setData({
                    floorStatus: false,
                    topLevelStyle: this.data.topLevelStyle
                });
            } else {
                //设置回顶部的悬浮球消失
                this.setData({
                    floorStatus: false
                });
            }
        }
    },
    //进入商品详情
    enterDetail: function (e) {
        console.log("enterDetail 组件内传递过来的数据是：e is ", e);
        let id = e.detail.id;
        //找到该id对应的商品
        console.log("goods is ", this.data.goods);
        let goodsLen = this.data.goods.length;
        let goodsItem = null;
        for (let i = 0; i < goodsLen; i++) {
            if (this.data.goods[i].pid == id) {
                console.log("找到了该goods ", this.data.goods[i]);
                goodsItem = this.data.goods[i];
            }
        }
        if (goodsItem !== null) {
            //防止走入从文章进入商品详情的流程覆盖了从商城进入商品详情的流程信息
            app.shopMsgJson = null;
            //存入缓存备商品详情页面使用
            wx.setStorage({
                key: 'goods',
                data: goodsItem,
                success: function (res) {
                    wx.navigateTo({
                        url: '../cartGoodsDetail/cartGoodsDetail',
                    });
                }
            });
        }
    },
    onImageLoad: function (e) {
        let isLast = e.currentTarget.dataset.last;
        let imageId = Number(e.currentTarget.id);
        let oImgW = e.detail.width;           //图片原始宽度
        let oImgH = e.detail.height;          //图片原始高度
        let imgWidth = this.data.imageWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;         //比例计算
        let imgHeight = oImgH * scale;        //自适应高度
        //新请求的文章数据
        let images = this.data.newAddEssays;
        let imageLen = images.length;
        let imageObj = null;
        for (let i = 0; i < imageLen; i++) {
            let img = images[i];
            if (img.pid === imageId) {
                imageObj = img;
                break;
            }
        }
        if (imageObj !== null) {
            imageObj.height = imgHeight;
            let loadingCount = this.data.loadingCount - 1;
            let col1 = this.data.col1;
            let col2 = this.data.col2;
            //只要第一列的列高度小于第二列就往第一列放，否则往第二列放
            if (this.data.col1H <= this.data.col2H) {
                this.data.col1H += imgHeight;
                col1.push(imageObj);
            } else {
                this.data.col2H += imgHeight;
                col2.push(imageObj);
            }
            this.setData({
                col1H: this.data.col1H,
                col2H: this.data.col2H
            })
            let data = {
                loadingCount: loadingCount,
                col1: col1,
                col2: col2
            };
            console.log("col1 is ", this.data.col1);
            console.log("col2 is ", this.data.col2);
            if (!loadingCount) {
                data.images = [];
            }
            this.setData(data, () => {
                wx.hideLoading();
            });
            if (isLast) {
                //渲染完图片之后将新加的文章添加到文章列表中去
                this.data.dataArray.push(...this.data.newAddEssays);
                this.setData({
                    dataArray: this.data.dataArray
                })
            }
        } else {
            console.log("此图片对象没有加载");
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
        //刷新浏览量
        this.onPullDownRefresh();
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
    onPullDownRefresh: async function () {
        //检查当前的tid或者是t2id
        console.log("tid is ",this.data.tid);
        console.log("t2id is ",this.data.t2id);
        if(this.data.isShare){
            this.setData({
                newAddEssays : [],
                col1         : [],
                col2         : [],
                col2H        : 0,
                col1H        : 0,
                page         : 1,
            })
            if(this.data.t2id == -2){
                if(this.data.tid == null || this.data.tid == -1){
                //说明选择的是全部分类
                 await this.getAllDataArrayInShare(function(){});
                 console.log("all type is ",this.data.newAddEssays);
                }else{
                  let essays = await this.getShareEssayByTid();
                  console.log("essays is ",essays);
                  this.setData({
                      newAddEssays : essays
                  });
                }
                wx.stopPullDownRefresh();
            }else{
                //二级分类被点击了
                let essays = await this.getSecondLevelEssayByT2id();
                console.log("二级分类文章是：",essays);
                this.setData({
                    newAddEssays : essays
                },()=>{
                    wx.stopPullDownRefresh();
                })
            }
        }else{
            wx.stopPullDownRefresh();
        }
    },
    // //创建瀑布流
    // updateWeaterFall: function () {
    //     console.log("newAddEssays is ", this.data.newAddEssays);
    //     console.log("dixio is ", this.data.ratio);
    //     let addEssaysLen = this.data.newAddEssays.length;
    //     for (let i = 0; i < addEssaysLen; i++) {
    //         let imgW = this.data.newAddEssays[i].width;
    //         let imgH = this.data.newAddEssays[i].height;
    //         let imgWidth = this.data.imageWidth;
    //         let scale = imgWidth / imgW;
    //         //自适应高度
    //         let imgHeight = imgH * scale;
    //         this.data.newAddEssays[i].height = imgHeight;
    //         let col1 = this.data.col1;
    //         let col2 = this.data.col2;
    //         //只要第一列的列高度小于第二列就往第一列放，否则往第二列放
    //         if (this.data.col1H <= this.data.col2H) {
    //             this.data.col1H += imgHeight;
    //             col1.push(this.data.newAddEssays[i]);
    //         } else {
    //             this.data.col2H += imgHeight;
    //             col2.push(this.data.newAddEssays[i]);
    //         }
    //     }
    //     this.setData({
    //         col1: this.data.col1,
    //         col2: this.data.col2,
    //         loadOver: true,
    //         click: false
    //     }, () => {

    //     })
    //     console.log('in createWeaterFall newAddEssays is ', this.data.newAddEssays);
    // },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        wx.showLoading({
            title: '数据正在赶来...',
        });
        console.log("更新数据的标记是：",this.data.click);
        let self = this;
        if (this.data.isHot) {
            this.setData({
                loadText: '上拉显示更多商品...'
            })
            if (this.data.isAll) {
                //点击了全部刷新的时候请求的方式不一样
                this.data.page++;
                this.getAllType();
                wx.hideLoading();
                console.log("goods is ", this.data.goods);
            } else {
                if (this.data.t2id !== -2) {
                    let url = '';
                    let data = {};
                    switch (this.data.updateState) {
                        case 0:
                            url = 'Data/GetProductsByT2id';
                            data.page = ++this.data.page;
                            break;
                    }
                    data.t2id = this.data.t2id;
                    console.log("上拉刷新的时候 data is ", data);
                    let req = new Request(app.host + url, data, "POST", "text");
                    let res = await req.sendRequest();
                    if (res.data.products.length === 0) {
                        wx.hideLoading();
                        this.setData({
                            loadText: '已经到底了~~o(>_<)o ~~'
                        });
                    } else {
                        wx.hideLoading();
                        this.splitHeadImage(res.data.products);
                        this.data.goods = this.addGoods(this.data.goods, res.data.products);
                        this.data.goods = Const.uniqObjInArray(this.data.goods);
                        this.setData({
                            goods: this.data.goods
                        });
                    }
                } else {
                    this.data.page++;
                    // wx.hideLoading();
                    //刷新一级分类下的商品信息
                    let newProducts = await this.getProductsByTid();
                    console.log("new Products is ", newProducts);
                    this.splitHeadImage(newProducts);
                    if (newProducts.length !== 0) {
                        this.data.goods.push(...newProducts);
                        this.setData({
                            goods: this.data.goods,
                            loadText: '没有更多商品...'
                        });
                    } else {
                        this.setData({
                            loadText: '已经到底了~~o(>_<)o ~~'
                        })
                    }
                    wx.hideLoading();
                }
            }
        } else {
            if(!this.data.click){
                this.data.page++;
                if (this.data.isAll) {
                    this.setData({
                        newAddEssays: []
                    }, () => {
                        console.log("newAddEssays is ", self.data.newAddEssays);
                        //获取全部的商品文章
                        self.getAllDataArrayInShare(function () { });
                    });
                } else {
                    this.data.newAddEssays = [];
                    if (this.data.t2id === -2) {
                        //说明还没有点击二级分类
                        console.log("this.data.tid is ", this.data.tid);
                        let url = app.host + 'Data/GetAllEssayByTid';
                        let data = {
                            tid: this.data.tid,
                            page: this.data.page,
                            uid: app.uid
                        }
                        console.log("page is ", this.data.page);
                        let req = new Request(url, data, 'POST', 'text');
                        let res = await req.sendRequest();
                        console.log("请求一级分类文章的 res is ", res.data.essays);
                        if (res.data.essays.length === 0) {
                            wx.hideLoading();
                            this.setData({
                                loadText: '已经到底了~~o(>_<)o ~~'
                            })
                        } else {
                            //对文章头图进行处理
                            for (let i = 0; i < res.data.essays.length; i++) {
                                res.data.essays[i].essayhead = res.data.essays[i].essayhead.split(',');
                            }
                            this.setData({
                                newAddEssays: res.data.essays
                            })
                            this.setData({
                                loadText: '上拉获取更多文章...'
                            })
                        }
                    } else {
                        let t2idEssay = await this.getSecondLevelEssayByT2id();
                        wx.hideLoading();
                        if (t2idEssay.length === 0) {
                            this.setData({
                                loadText: '已经到底了~~o(>_<)o ~~'
                            });
                        } else {
                            this.setData({
                                newAddEssays: t2idEssay
                            });
                            this.setData({
                                loadText: '上拉获取更能多文章...'
                            });
                        }
                    }
                }
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
    onShareAppMessage: function (ops) {
        console.log("ops is ", ops);
        if (ops.from === 'button') {
            console.log("分享的商品是：", this.data.currentGoods);
            //改变来源商品分享得来的
            this.data.currentGoods.resources = 1;
            console.log("分享出去的商品是：", this.data.currentGoods);
            return {
                title: "指点迷津",
                desc: 'a good app for tianjin area',
                path: '/pages/lck/cartGoodsDetail/cartGoodsDetail?goods=' + JSON.stringify(this.data.currentGoods) + '&share=' + 0,
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
    getIndex: function (e) {
        console.log("e is ", e);
        let current = e.detail.current;
        this.setData({
            swiperIndex: current
        })
    },
    //设置一级分类的一些属性值包括是否激活，是否选中状态，要滑动的距离
    setActiveByTid: function (tid) {
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen; i++) {
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if (currentjson.tid === tid) {
                console.log("in setActiveByTid tid is ", this.data.bannerType[i]);
                currentjson.choosed = true;
                this.data.scrollLeftDis = this.data.bannerType[i].scrollLeft;
                this.setData({
                    scrollLeftDis: this.data.scrollLeftDis
                })
            } else {
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType: this.data.bannerType
        })
    },
    //选择类型
    chooseType: function (event) {
        let dataSet = event.currentTarget.dataset;
        let id = Number(dataSet.id);
        console.log("id is ", id);
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen; i++) {
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if (currentjson.tid === id) {
                currentjson.choosed = true;
            } else {
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType: this.data.bannerType
        })
    },
    //点击一级分类
    chooseBannerType: async function (event) {
        let self = this;
        let id = Number(event.currentTarget.dataset.id);
        this.data.tid = id;
        console.log("in chooseBannerType tid is ", this.data.tid);
        this.data.t2id = -2;
        this.data.page = 1;
        wx.showLoading({
            title: '数据加载中...',
        })
        if (id === -1) {
            for (let i = 0; i < this.data.bannerType.length; i++) {
                if (this.data.bannerType[i].tid === id) {
                    this.data.bannerType[i].choosed = true;
                } else {
                    this.data.bannerType[i].choosed = false;
                }
            }
            if (this.data.isHot) {
                this.setData({
                    bannerType: this.data.bannerType,
                    isAll: true,
                    IsecondLevel: false,
                    goods: [],
                    page: 1
                }, () => {
                    wx.hideLoading();
                });
            } else if (this.data.isShare) {
                this.setData({
                    bannerType : this.data.bannerType,
                    isAll : true,
                    IsecondLevel : false,
                    goods : [],
                    dataArray : [],
                    col1  : [],
                    col2  : [],
                    page  : 1,
                    click : true,
                }, () => {
                    wx.hideLoading();
                    //请求服务器
                    self.getAllDataArrayInShare(function () {
                    });
                });
            }
        } else {
            this.setData({
                isAll: false
            });
        }
        if (this.data.isAll) {
            //如果是全部的话就
            this.getAllType();
        } else {
            this.setActiveByTid(id);
            //根据tid获得t2id
            await this.getT2idByTid(this.data.tid);
            //重置page=1
            this.data.page = 1;
            let data = {
                t2id: this.data.t2id,
                page: this.data.page
            }
            if (this.data.isHot) {
                //获得一级分类下的所有商品
                let tidProducts = await this.getProductsByTid();
                this.splitHeadImage(tidProducts);
                console.log("tidProducts is ", tidProducts);
                console.log("goods is ", this.data.goods);
                this.data.goods = tidProducts;
                wx.hideLoading();
                if (tidProducts.length === 0) {
                    this.setData({
                        loadText: '暂时还没有该分类的商品...'
                    });
                }
                this.setData({
                    goods: this.data.goods,
                    bannerType: this.data.bannerType,
                    IsecondLevel: this.data.goods.length === 0 ? false : true
                });
            } else if (this.data.isShare) {
                //要改变数据了
                this.setData({
                    click : true
                })
                let currentEssay = await this.getShareEssayByTid();
                if (currentEssay !== null) {
                    this.data.newAddEssays = currentEssay;
                    console.log("newAddEssays is ", this.data.newAddEssays);
                    this.setData({
                        newAddEssays : this.data.newAddEssays,
                        IsecondLevel : this.data.newAddEssays.length === 0 ? false : true,
                    },()=>{
                        setTimeout(function(){
                            self.data.click = false;
                        },100)
                    });
                    console.log("t2id is ", this.data.t2id);
                }
                wx.hideLoading();
            }
        }
    },
    //根据tid获取一级分类下的商品
    getProductsByTid: async function () {
        console.log("in getProductsByTid is ", this.data.tid);
        let url = app.host + 'Data/GetProductsByTid';
        let data = {
            page: this.data.page,
            tid: this.data.tid
        }
        console.log("data is ", data);
        let req = new Request(url, data, 'POST', 'text');
        let res = await req.sendRequest();
        console.log("res is ", res);
        return res.data.products;
    },
    //根据tid获取所有的商品文章
    getShareEssayByTid: async function () {
        //获取分享商城下的一级分类对应的文章
        let url = app.host + 'Data/GetAllEssayByTid';
        let data = {
            tid  : this.data.tid,
            page : this.data.page,
            uid  : app.uid
        }
        console.log("page is ", this.data.page);
        let req = new Request(url, data, 'POST', 'text');
        let res = await req.sendRequest();
        console.log("请求一级分类文章的 res is ", res.data.essays);
        this.setData({
            dataArray: [],
            col1: [],
            col2: [],
            newAddEssays: [],
            col1H: 0,
            col2H: 0
        });
        if (res.data.essays.length === 0) {
            this.setData({
                loadText: '暂时没有该分类的文章~~o(>_<)o ~~'
            })
        } else {
            console.log("res.data.essays is ", res.data.essays);
            let essayArr = res.data.essays;
            for (let i = 0; i < essayArr.length; i++) {
                res.data.essays[i].essayhead = res.data.essays[i].essayhead.split(',');
            }
        }
        return res.data.essays;
    },
    //通过一级分类获取二级分类的内容
    getT2idByTid: async function (tid) {
        let typeUrl = 'Data/GetTab2ByTid';
        let data = {
            tid: this.data.tid
        }
        let typeReq = new Request(app.host + typeUrl, data, 'POST', 'text');
        let typeRes = await typeReq.sendRequest();
        console.log("获得二级分类的res is ", typeRes.data.tab2s);
        let tab2sLen = typeRes.data.tab2s.length;
        for (let i = 0; i < tab2sLen; i++) {
            typeRes.data.tab2s[i].active = false;
        }
        this.setData({
            secondLevels: typeRes.data.tab2s
        })
    },
    //点击选择二级分类
    chooset2Id: async function (e) {
        let self = this;
        let dataSet = e.currentTarget.dataset;
        let t2id = dataSet.ttid;
        let tid = dataSet.tid;
        this.data.page = 1;
        console.log("选择二级分类 t2id is ", t2id);
        console.log("当前的页数是:", this.data.page);
        let secondL = this.data.secondLevels.length;
        for (let j = 0; j < secondL; j++) {
            if (this.data.secondLevels[j].t2id == t2id) {
                this.data.secondLevels[j].active = true;
            } else {
                this.data.secondLevels[j].active = false;
            }
        }
        this.setData({
            t2id: t2id,
            secondLevels: this.data.secondLevels
        })
        console.log("选择二级分类 t2id is ", t2id);
        if (this.data.isHot) {
            this.setData({
                goods: []
            })
            //根据二级分类获取到商品信息
            this.getTwoClass();
            console.log("选择二级分类后的商品是：", this.data.goods);
        } else if (this.data.isShare) {
            this.setData({
                dataArray: [],
                newAddEssays: [],
                col1: [],
                col2: [],
                col1H: 0,
                col2H: 0
            }, async () => {
                let secondEssay = await this.getSecondLevelEssayByT2id();
                console.log("二级分类下的商品文章是：", secondEssay);
                if (secondEssay.length === 0) {
                    this.setData({
                        loadText: '暂时没有该分类下的商品...'
                    })
                }
                self.setData({
                    newAddEssays: secondEssay
                });
            })
        }
    },
    //获取二级分类文章
    getSecondLevelEssayByT2id: async function () {
        let url = app.host + 'Data/GetAllEssayByT2id'
        let data = {
            t2id: this.data.t2id,
            page: this.data.page,
            uid: app.uid
        }
        let req = new Request(url, data, 'POST', 'text');
        let res = await req.sendRequest();
        console.log("二级分类下的res is ", res.data.essays);
        for (let i = 0; i < res.data.essays.length; i++) {
            res.data.essays[i].essayhead = res.data.essays[i].essayhead.split(',');
        }
        return res.data.essays;
    },
    //选择规格
    chooseStand: function (event) {
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
    //加载更多的图片
    loadImages: function () {
        wx.showLoading({
            title: '数据正在赶来...',
        });
        console.log("dataArray is ", this.data.dataArray);
        console.log("moredataArray is ", this.data.moreDataArray);
        for (let i = 0; i < this.data.moreDataArray.length; i++) {
            this.data.dataArray.push(this.data.moreDataArray[i]);
        }
        this.setData({
            dataArray: this.data.dataArray
        }, () => {
            wx.hideLoading();
        })
    },
    //跳转搜索界面
    enterSearch: function (e) {
        wx.navigateTo({
            url: '../../../pages/search/search',
            success: function () {
                console.log("跳转成功");
            },
            fail: function () {
                console.log("跳转失败");
            }
        });
    },
    //选择精品商城或者热卖商城
    chooseIt: async function (e) {
        let self = this;
        console.log("e is ", e);
        let dataSet = e.currentTarget.dataset;
        let typeName = dataSet.type;
        console.log("typeName is ", typeName);
        this.setData({
            newAddEssays : [],
            dataArray : [],
            col1  : [],
            col2  : [],
            goods : [],
            col1H : 0,
            col2H : 0,
            click : true
        });
        if (typeName === '热卖商城') {
            this.data.page = 1;
            this.data.isHot = true;
            this.data.isShare = false;
            if (this.data.isAll) {
                //点击了全部刷新的时候请求的方式不一样
                this.getAllType();
                wx.hideLoading();
                console.log("goods is ", this.data.goods);
            } else {
                if (this.data.t2id !== -2) {
                    let url = '';
                    let data = {};
                    switch (this.data.updateState) {
                        case 0:
                            url = 'Data/GetProductsByT2id';
                            data.page = this.data.page;
                            break;
                    }
                    data.t2id = this.data.t2id;
                    console.log("上拉刷新的时候 data is ", data);
                    let req = new Request(app.host + url, data, "POST", "text");
                    let res = await req.sendRequest();
                    if (res.data.products.length === 0) {
                        wx.hideLoading();
                        this.setData({
                            loadText: '已经到底了~~o(>_<)o ~~'
                        })
                    } else {
                        wx.hideLoading();
                        this.splitHeadImage(res.data.products);
                        this.setData({
                            goods: res.data.products
                        });
                    }
                } else {
                    //请求tid对应的商品
                    let tidProducts = await this.getProductsByTid();
                    //分割头图
                    this.splitHeadImage(tidProducts);
                    this.setData({
                        goods : tidProducts,
                        click : false
                    });

                }
            }
        } else if (typeName === '精品分享') {
            this.data.page = 0;
            this.data.isShare = true;
            this.data.isHot = false;
            this.setData({
                click : false
            })
            //精品分享请求全部
            if (this.data.isAll) {
                this.data.page = 1;
                this.setData({
                    newAddEssays : [],
                }, () => {
                    console.log("newAddEssays is ", self.data.newAddEssays);
                    //获取全部的商品文章
                    self.getAllType();
                });
            } else {
                // this.data.page = 1;
                // if (this.data.t2id === -2) {
                //     //说明还没有点击二级分类
                //     console.log("this.data.tid is ", this.data.tid);
                //     let url = app.host + 'Data/GetAllEssayByTid';
                //     let data = {
                //         tid: this.data.tid,
                //         page: this.data.page,
                //         uid: app.uid
                //     }
                //     console.log("page is ", this.data.page);
                //     let req = new Request(url, data, 'POST', 'text');
                //     let res = await req.sendRequest();
                //     console.log("请求一级分类文章的 res is ", res.data.essays);
                //     if (res.data.essays.length === 0) {
                //         wx.hideLoading();
                //         this.setData({
                //             loadText: '已经到底了~~o(>_<)o ~~'
                //         })
                //     }else{
                //         let essayArr = res.data.essays;
                //         for (let i = 0; i < essayArr.length; i++) {
                //             res.data.essays[i].essayhead = res.data.essays[i].essayhead.split(',');
                //         }
                //         this.data.newAddEssays = res.data.essays;
                //     }
                // } else {
                //     let t2idEssay = await this.getSecondLevelEssayByT2id();
                //     this.data.newAddEssays = t2idEssay;
                //     wx.hideLoading();
                //     if (t2idEssay.length === 0) {
                //         this.setData({
                //             loadText: '已经到底了~~o(>_<)o ~~'
                //         })
                //     }
                //     for (let j = 0; j < t2idEssay.length; j++) {
                //         this.data.dataArray.push(t2idEssay);
                //     }
                // }
                // this.setData({
                //     newAddEssays : this.data.newAddEssays,
                //     click        : false
                // })
            }
        }
        console.log("isHot is ", this.data.isHot, "isShare is ", this.data.isShare);
        //重置page为1
        this.setData({
            isHot   : this.data.isHot,
            isShare : this.data.isShare,
        });
    },
    chooseItByCss: function (e) {
        console.log("e is ", e);
        let dataSet = e.currentTarget.dataset;
        let typeName = dataSet.type;
        console.log("typeName is ", typeName);
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
    confirm: function (e) {
        console.log("e is ", e);
        let data = this.checkData(this.data.currentGoods.pid);
        console.log("data is ", data);
        console.log("购买的currentGoods is ", this.data.currentGoods);
        data.pname = this.data.currentGoods.pname;
        //分割头图
        if (typeof (this.data.currentGoods.head) === 'string') {
            data.head = this.data.currentGoods.head.split(',')[0];
        } else if (this.data.currentGoods.head instanceof Array) {
            data.head = this.data.currentGoods.head[0];
        }
        data.price = this.data.currentGoods.price * data.count;
        //是否开启规格
        data.openstandard = this.data.currentGoods.openstandard;
        //分割头图
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        console.log("orderA is ", orderA);
        //如果数据合法的话就跳转页面
        if (this.data.isOk) {
            wx.navigateTo({
                url: '../order/order'
            });
        }
    },
    //检查数据是否填充完毕
    //检查加入购物车或者立即购买的时候选择的数据是否合法
    checkData: function (pid) {
        let cancel = '';
        if (arguments.length === 2) {
            cancel = arguments[1];
        }
        let data = {
            uid: app.uid,
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
    //滚动到顶部
    scrollTop: function (e) {
        console.log("scrollTop is ", e.detail.scrollTop);
        if (e.detail.scrollTop > 100) {
            this.setData({
                floorStatus: true
            })
        } else {
            this.setData({
                floorStatus: false
            })
        }
    },
    //一键回到顶部
    goTop: function (e) {
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，暂无法使用该功能',
            });
        }
    },
    //加入购物车
    addCart: async function (e) {
        let url = app.host + 'Data/AddCart';
        let pid = this.data.currentGoods.pid;
        console.log("pid is ", pid);
        console.log("uid is ", app.uid);
        console.log("currentGoods is ", this.data.currentGoods);
        let data = this.checkData(pid);
        console.log("data is ", data);
        if (this.data.currentGoods.openstandard !== 1) {
            //一种规格的商品默认是选择的
            this.data.isOk = true;

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
    },
    //检查加入购物车或者立即购买的时候选择的数据是否合法
    checkData: function (pid) {
        let cancel = '';
        if (arguments.length === 2) {
            cancel = arguments[1];
        }
        let data = {
            uid: app.uid,
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
})