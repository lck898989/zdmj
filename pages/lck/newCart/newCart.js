// pages/lck/cart/cart.js
//请求类
import Request from '../../../utils/Request.js'
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
import Host from '../../../utils/Const.js';
let app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //初始化要提交的订单数组
        orderArray: [],
        //判断数据是否加载中
        isLoda: false,
        //初始化我的购物车数据页数
        myshoppingPage: 1,
        //初始化我的鼓购物车数据总页数
        myshopallPage: 0,
        imgHost : 'https://shopfile.ykplay.com/resources/',
        host: app.host,
        imageHost: Host.productionHost,
        //是否为店铺选中状态
        isChoosed: false,
        //是否为商品选中状态
        isGoodsChoosed: false,
        choosedColor: '#bbb',
        choosedGoodsColor: '#bbb',
        //店铺名称
        storeName: '',
        storeArr: [],
        goodsCount: 0,
        showBuyCon: false,
        //商店列表
        storeList: [],
        //产品列表
        products: [],
        //编辑的产品
        product: {},
        /*产品规格对象
          {
              "规格":"1|2",
              "尺寸":"1|L|XL|XXL",
              "颜色":"1|red|blue"
          }
        */
        product_size: {},
        /*产品规格
          
        */
        productSize: [],
        //购物车对象
        carts: {},
        //是否为全选
        isFullChoosed: false,
        fullChoosedColor: '#bbb',
        selectColor: '#ede2f4',
        selectFontColor: '#863bb7',
        unSelectColor: '#eee',
        unSelectFontColor: '#000',
        selectBorder: '2rpx solid #863bb7',
        unselectBorder: '2rpx solid #eee',
        //显示商品图的索引
        showImgIndex: 0,
        //无规格的规格信息
        sizeInfo: '',
        //有规格的规格信息
        categoryObj: null,
        //类型数组
        typeArr: [],
        //类型值数组
        typeValueArr: [],
        pid: 0,
        sid: 0,
        choosedType: {},
        //所有规格组合
        groups: [],
        cartsItem: {},
        //当前选择商品的价格
        thisPrice: 0,
        //当前的市场价
        marketPrice : 0,
        //总价
        totalPrice: 0,
        //市场总价
        marketTotalPrice : 0,
        //选中的商品个数
        totalCount: 0,
        //购物车源数据
        sourceCarts : [],
        //下拉加载提示
        loadText : '下拉获取更多...',
        //是否允许显示加载更多提示
        isShowLoad : false
    },
    /**
     * 获得购物车里面的购物车对象
     * @param  {Number} pid 商品id
     * @param  {Number} sid 商店id
     * @param  {String} tag 规格
     */
    getCartItemFromCarts: function (pid, sid, tag) {
        //   let storeKeys = Object.keys(this.data.storeList);
        for (let j = 0; j < this.data.storeList.length; j++) {
            if (this.data.storeList[j] === storeKeys[i]) {
                //找到该店对应的购物车商品信息
                console.log(".....", this.data.carts[`${storeKeys[i]}`])
                let cartsItemArr = this.data.carts[`${storeKeys[i]}`];
                for (let k = 0; k < cartsItemArr.length; k++) {
                    console.log("cartsItem is ", cartsItemArr[k]);
                    if (cartsItemArr[k].pid === pid && cartsItemArr[k].product.sid === sid) {
                        console.log("找到的购物车项是：", cartsItemArr[k]);
                        found = true;
                        return cartsItemArr[k];
                    }
                }
            }
        }
        return null;
    },
    chooseStore: function (event) {
        let dataSet = event.currentTarget.dataset;
        let storeIndex = dataSet.storeindex;
        console.log("storeIndex is ", storeIndex);
    },
    change: function (event) {
        console.log("event is ", event);
        console.log(event);
        let dataSet = event.currentTarget.dataset;
        console.log("dataSet is ", dataSet);
        let pid = dataSet.pid;
        let sid = dataSet.sid;
        let goodsIndex = dataSet.goodsindex;
        let storeIndex = dataSet.storeindex;
        console.log("pid is ", pid);
        console.log("sid is ", sid);
        console.log("goodsIndex is ", goodsIndex);
        console.log("storeIndex is ", storeIndex);
        //该购物车项被选择了
        let storeItem = this.data.storeList[storeIndex];
        console.log("storeItem is ", storeItem);
        console.log("carts is ", this.data.carts);
        let cartsItemArr = this.data.carts[`${storeItem}`].data;
        console.log("cartsItemArr is ", cartsItemArr);
        console.log("cartsItemArr[j].pid is ", cartsItemArr[goodsIndex].pid);
        console.log("cartsItemArr[j].pid is ", cartsItemArr[goodsIndex].product.sid);
        let cartsItem = cartsItemArr[goodsIndex];
        cartsItem.choosed = !cartsItem.choosed;
        if (cartsItem.choosed) {
            var orderIndex = {};
            var orderArray1 = this.data.orderArray;
            orderIndex.cid = cartsItem.cid;
            orderIndex.count = cartsItem.count;
            orderIndex.pid = cartsItem.pid;
            orderIndex.size = cartsItem.size;
            orderIndex.source = cartsItem.source;
            orderIndex.state = cartsItem.state;
            orderArray1.push(orderIndex);
            this.setData({
                orderArray: orderArray1,
            })
            console.log(JSON.stringify(this.data.orderArray) + "orderArray2");
        } else {
            var orderIndex = {};
            var orderArray1 = this.data.orderArray;
            orderIndex.cid = cartsItem.cid;
            orderIndex.count = cartsItem.count;
            orderIndex.pid = cartsItem.pid;
            orderIndex.size = cartsItem.size;
            orderIndex.source = cartsItem.source;
            orderIndex.state = cartsItem.state;
            for (var i = 0; i <= orderArray1.length - 1; i++) {
                if (orderArray1[i].cid == orderIndex.cid) {
                    orderArray1.splice(i, 1);
                }
            }
            this.setData({
                orderArray: orderArray1,
            })
            console.log(JSON.stringify(this.data.orderArray) + "orderArray1");
        }
        console.log("cartsItem is ", cartsItem);
        //价格为
        console.log(cartsItemArr[goodsIndex].product.price);
        console.log("carts is ", this.data.carts);
        let priceSum = 0;
        let totalMarketPrice = 0;
        let totalCount = 0;
        for (let i = 0; i < this.data.carts[`${storeItem}`].data.length; i++) {
            let cartsItem = this.data.carts[[`${storeItem}`]].data[i];
            if (cartsItem.choosed === true) {
                //把价格取出来
                let price = cartsItem.product.price;
                let marketPrice = cartsItem.product.otherprice;
                priceSum += price;
                totalMarketPrice += marketPrice;
                totalCount++;
                console.log("price is ", price);
            }
        }
        console.log("sum is ", priceSum);
        console.log("totalMarketPrice is ",totalMarketPrice);
        this.setData({
            carts            : this.data.carts,
            totalPrice       : priceSum,
            totalCount       : totalCount,
            marketTotalPrice : totalMarketPrice
        });
        this.setStoreActive(cartsItemArr,storeItem);
    },
    //设置单单选择商品的时候设置商铺的选择状态
    setStoreActive : function(cartsItemArr,storeItem){
        let cartsItemArrLen = cartsItemArr.length;
        let productChoosed = 0;
        for (let k = 0; k < cartsItemArrLen; k++) {
            let tempProduct = cartsItemArr[k];
            if (tempProduct.choosed) {
                productChoosed++;
            }
        }
        if (productChoosed === cartsItemArrLen) {
            this.data.carts[`${storeItem}`].choosed = true;
        } else {
            this.data.carts[`${storeItem}`].choosed = false;
        }
        //检查商铺的选中状态
        this.checkAllChoseByStore();
        this.setData({
            carts: this.data.carts
        });
    },
    //选择商品
    chooseGoods: function () {
        console.log("该商品被选中");
        console.log("this.data.isGoodsChoosed is ", this.data.isGoodsChoosed);
        if (!this.data.isGoodsChoosed) {
            //将全选状态改为false
            this.chooseStore();
        } else {
            this.setData({
                isGoodsChoosed: !this.data.isGoodsChoosed,
                choosedGoodsColor: this.data.isGoodsChoosed ? '#ec0023' : '#bbb'
            })
        }
    },
    //删除购物车中的该商品
    delete: function (event) {
        let dataSet = event.currentTarget.dataset;
        let pid = dataSet.pid;
        let storeName = dataSet.storeName;
        //将商家名称和商品id给服务器让服务器去删除该商品
        let req = new Request();
        console.log("删除该商品");
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // //刷新绑定数据的html页面
        wx.showLoading({
            title: '数据加载中...',
        })
        
    },
    /*
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //重置相关参数
        this.setData({
            storeArr   : [],
            goodsCount : 0,
            storeList: [],
            carts: {},
            products : [],
            thisPrice : 0,
            totalPrice : 0,
            marketTotalPrice : 0,
            marketPrice : 0,
            sourceCarts : [],
            myshoppingPage : 1,
            isChoosed : false,
            goodsCount : 0,
        })
        this.data.marketTotalPrice
        console.log("商品数量是：", this.data.goodsCount);
        //请求购物车里面的商品
        this.getCartList();
    },
    //获取购物车列表并且初始化一些信息
    getCartList : async function(){
        //请求购物车里面的商品
        let url = app.host + 'Data/CartList';
        console.log("url is ", url);
        let reqCartListData = {
            uid  : app.uid,
            page : this.data.myshoppingPage
        }
        console.log("data is ", reqCartListData);
        let req = new Request(url, reqCartListData, 'POST', 'text');
        // req.sendRequest().catch()
        try {
            let res = await req.sendRequest();
            console.log("res is ", res);
            if(JSON.stringify(res.data.carts) !== '{}'){
                let tempCarts = {

                }
                for (let key in res.data.carts) {
                    console.log("key is ", key);
                }
                console.log("-------------------");
                for (let m in res.data.carts) {
                    console.log("m is ", m);
                    let sCartJson;
                    if(this.data.sourceCarts.length !== 0){
                        for(let h = 0;h < this.data.sourceCarts.length;h++){
                            let tempKey = Object.keys(this.data.sourceCarts[h])[0];
                            console.log("tempKey is ",tempKey);
                            console.log("sourceCarts is ",this.data.sourceCarts[h]);
                            if(tempKey === m){
                                sCartJson = this.data.sourceCarts[h];
                            }
                        }
                        if(!sCartJson){
                            //是一个新的店铺的购物车项
                            sCartJson = {};
                            sCartJson[`${m}`] = [];
                        }
                    }else{
                        sCartJson = {};
                        // this.data.sourceCarts.push()
                        sCartJson[`${m}`] = [];
                    }
                    console.log("sCartJson is ",sCartJson);
                    //将该键值对应的商店的商品的size属性设置为对象
                    console.log(res.data.carts[m]);
                    let storeProductLen = res.data.carts[m].length;
                    //商铺状态是未选中状态
                    let tempJ = {};
                    tempJ.choosed = false;
                    console.log("storeProductLen is ", storeProductLen);
                    for (let j = 0; j < storeProductLen; j++) {
                        let scartJsonArr = {};
                        let itemTemp = res.data.carts[m][j];
                        //该购物车项的默认选择状态是false
                        res.data.carts[m][j].choosed = false;
                        itemTemp.size = JSON.parse(itemTemp.size);
                        itemTemp.product.head = itemTemp.product.head.split(',');
                        //real price
                        itemTemp.realPrice = itemTemp.product.price;
                        scartJsonArr.price = itemTemp.product.price;
                        scartJsonArr.otherPrice = itemTemp.product.otherprice;
                        itemTemp.product.price = Host.MUL(itemTemp.product.price, itemTemp.count);
                        itemTemp.product.otherprice = Host.MUL(itemTemp.product.otherprice, itemTemp.count);
                        itemTemp.marketPrice = itemTemp.product.otherprice;
                        scartJsonArr.pid = itemTemp.pid;
                        scartJsonArr.count = itemTemp.count;
                        sCartJson[`${m}`].push(scartJsonArr);
                        console.log("itemTemp.product is ", itemTemp);
                        console.log("carts[m][j] is ", res.data.carts[m][j]);
                    }
                    console.log("carts[m]'s size is ", res.data.carts[m]);
                    //将商家的键值保存起来
                    this.data.storeList.push(m);
                    this.data.storeList = Host.uniqByObj(this.data.storeList);
                    tempJ.data = res.data.carts[m];
                    console.log("tempJ is ", tempJ);
                    res.data.carts[m] = tempJ;
                    if(this.data.sourceCarts.length === 0){
                        console.log("sCartJson is ",sCartJson);
                        this.data.sourceCarts.push(sCartJson);
                    }
                    if(!this.data.carts[m]){
                        this.data.carts[m] = {};
                        this.data.carts[m].data = [];
                    }
                    this.data.carts[m].data.push(...res.data.carts[m].data);
                    this.data.carts[m].choosed = res.data.carts[m].choosed;
                }
                console.log("sourceCarts is ", this.data.sourceCarts);
                console.log("carts is ",this.data.carts);
                this.setData({
                    storeList : this.data.storeList,
                    carts     : this.data.carts
                });
                //将所有产品根据键值取出来
                let storeLen = this.data.storeList.length;
                for (let k = 0; k < storeLen; k++) {
                    let key = this.data.storeList[k];
                    let value = res.data.carts[key];
                    console.log("products--value is ", value);
                    let valueLen = value.data.length;
                    for (let j = 0; j < valueLen; j++) {
                        let productItem = value.data[j].product;
                        //将选择的该商品规格加入到产品列表中
                        value.data[j].product.size_choosed = value.data[j].size;
                        console.log("value[j] is ", value.data[j].product.size_choosed);
                        this.data.products.push(productItem);
                    }
                }
                this.setData({
                    products: this.data.products
                }, () => {
                    wx.hideLoading();
                })
            }else{
                wx.hideLoading();
                this.setData({
                    loadText: '已经到底了~~o(>_<)o ~~'
                });
                if(this.data.myshoppingPage === 1){
                    wx.showToast({
                        title  : '购物车空空如也',
                        icon   : 'none'
                    })
                }
            }
        } catch (e) {
            console.log("e is ", e);
            wx.hideLoading();
            wx.showToast({
                title: '购物车为空',
            })
        }
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
    onReachBottom: async function () {
        console.log("all page is ",this.data.myshopallPage);
        this.data.myshoppingPage++;
        this.setData({
            isShowLoad  : true,
        })
        //获取新的购物车列表
        this.getCartList();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    test: function (event) {
        //阻止滑动事件的响应
        console.log("阻止滑动事件的响应");
    },
    //进入购物车里面的商品详情
    enterDetail: function (event) {
        console.log("adasdf", event);
        wx.navigateTo({
            url: '../cartGoodsDetail/cartGoodsDetail',
        })
    },
    endEvent: function (event) {
        console.log("in endEvent event is ", event);
    },
    //通过商品id和商户id获得产品数据
    /**
     * @param  {产品id} pid
     * @param  {商户id} sid
     * @param  {用户已经选择的类型数组} choosedArr
     */
    getProductByPidAndSid: function (pid, sid, choosedArr) {
        let productsLen = this.data.products.length;
        let product = null;
        console.log("获取产品前产品规格是-->productsize is ", this.data.productSize);
        for (let i = 0; i < productsLen; i++) {
            if (this.data.products[i].sid === sid && this.data.products[i].pid === pid) {
                console.log("=====>>>", this.data.products[i].sid, this.data.products[i].pid);
                console.log("<<<=====>>>", this.data.products[i]);
                //找到对应的pid和sid的商品
                product = this.data.products[i];
                //将size属性解析成json对象
                for (let key in this.data.products[i].size) {
                    console.log("key is ", key);
                    if (key !== null) {
                        let tempObj = {};
                        tempObj.text = key;
                        //该商品的所有size属性
                        let typeString = this.data.products[i].size[key];
                        let tempArr = [];
                        let typeArr = typeString.split('|');
                        let typeArrLen = typeArr.length;
                        //获得已经选择的尺寸标红其他尺寸信息不标红
                        for (let m = 0; m < typeArrLen; m++) {
                            let dataJson = {};
                            dataJson.msg = typeArr[m];
                            //遍历已经选择类型的数组
                            for (let i = 0; i < choosedArr.length; i++) {
                                console.log("类型是：", dataJson.msg);
                                console.log("选择的类型是：", choosedArr[i]);
                                console.log("选择的类型 === 类型：", choosedArr[i] === dataJson.msg);
                                if (dataJson.msg === choosedArr[i]) {
                                    dataJson.active = true;
                                }
                            }
                            tempArr.push(dataJson);
                        }
                        tempObj.data = tempArr;
                        console.log("tempObj.data is ", tempObj.data);
                        //是否选中
                        console.log("-->productsize is ", this.data.productSize);
                        this.data.productSize.push(tempObj);
                    }
                }
                console.log("最终的productSize is ", this.data.productSize);
            }
        }
        this.setData({
            product_size: this.data.product_size
        })
        return product;
    },
    //编辑商品
    editorGoods: async function (event) {
        //重新请求该商品id对应的商品的详细信息
        console.log("编辑购物车里面的商品信息");
        console.log("event is ", event);
        console.log("products is ", this.data.products);
        let dataSet = event.currentTarget.dataset;
        let storeId = Number(dataSet.storeindex);
        let goodsId = Number(dataSet.goodsindex);
        let pid = Number(dataSet.pid);
        console.log("storeId is ", storeId);
        console.log("goodsId is ", goodsId);
        this.data.choosedType = dataSet.choosed;
        //   console.log("choosedType is ",this.data.choosedType);
        let choosedArr = Object.keys(this.data.choosedType);
        //   console.log("choosedArr is ",choosedArr);
        //   console.log("choosedType is ",this.data.choosedType);
        let storeName = this.data.storeList[storeId];
        let productObj = this.data.carts[`${storeName}`].data[goodsId];
        //订单下的产品项
        this.data.product = productObj.product;
        //订单项
        this.data.cartsItem = productObj;
        console.log("productObj is ", this.data.product);
        console.log("店名是：", storeName);
        if (this.data.product.openstandard === 1) {
            //有规格的商品
            let url = this.data.host + 'Data/GetStandardByPid';
            let data = {
                pid: pid
            }
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();
            console.log("有规格的产品的规格是：", res.data.products);
            let categoryArr = res.data.products;
            let categoryLen = categoryArr.length;
            for (let i = 0; i < categoryLen; i++) {
                let keys = Object.keys(categoryArr[i]);
                console.log("keys is ", keys);
                //把规格存进数组
                for (let m = 0; m < keys.length; m++) {
                    let keyObj = keys[m];
                    this.data.typeArr.push(keyObj);
                    // console.log("种类的值是：", categoryArr[i][`${keyObj}`]);
                    let le = categoryArr[i][`${keyObj}`].length;
                    let tempJson = {};
                    console.log("le is ", le);
                    tempJson[`${keyObj}`] = [];
                    for (let a = 0; a < le; a++) {
                        // console.log("种类值是：", categoryArr[i][`${keyObj}`][a]);
                        let innerJson = {

                        }
                        innerJson.mode = categoryArr[i][`${keyObj}`][a];
                        console.log("choosedType is ", this.data.choosedType);
                        let typeKeys = Object.keys(this.data.choosedType);
                        for (let s = 0; s < typeKeys.length; s++) {
                            console.log(this.data.choosedType[typeKeys[s]]);
                            if (this.data.choosedType[typeKeys[s]] === categoryArr[i][`${keyObj}`][a]) {
                                //选中状态
                                innerJson.touch = true;
                            } else {
                                //未选中状态
                                innerJson.touch = false;
                            }
                        }
                        // //检查商品中的size_choosed中的value值是否与该
                        // innerJson.touch = false;

                        tempJson[`${keyObj}`].push(innerJson);
                    }
                    this.data.typeValueArr.push(tempJson);
                }
            }
            let keys = Object.keys(categoryArr);
            console.log("typeArr is ", this.data.typeArr);
            console.log("typeValueArr is ", this.data.typeValueArr);
            this.setData({
                showBuyCon: true,
                product: this.data.product,
                typeArr: this.data.typeArr,
                typeValueArr: this.data.typeValueArr,
                pid: this.data.pid,
                sid: this.data.sid,
                choosedType: this.data.choosedType,
                cartsItem: this.data.cartsItem,
                thisPrice: Host.DIV(this.data.cartsItem.product.price, this.data.cartsItem.count).toFixed(2)
            });
        } else {
            console.log("product is ", this.data.product);
            let sizeJson = JSON.parse(this.data.product.size);
            this.data.typeArr = Object.keys(sizeJson);
            for(let i =0;i < this.data.typeArr.length;i++){
                let tempJson = {};
                let tempKey = this.data.typeArr[i];
                tempJson[`${tempKey}`] = []; //盛放颜色对应的数组
                let valueArr = sizeJson[tempKey].split(',');//以|分割数组
                for(let j = 0;j < valueArr.length;j++){
                    let innerTempJson = {};
                    innerTempJson.mode = valueArr[j];
                    console.log("-->>>",this.data.choosedType)
                    if (this.data.choosedType[`${tempKey}`] === valueArr[j]) {
                        //选中状态
                        innerTempJson.touch = true;
                    } else {
                        //未选中状态
                        innerTempJson.touch = false;
                    }
                    tempJson[`${tempKey}`].push(innerTempJson);
                }
                this.data.typeValueArr.push(tempJson);
            }
            console.log("无规格的商品的typeValueArr is ",this.data.typeValueArr);
            console.log("无规格的商品的typeArr is ", this.data.typeArr);
            this.setData({
                showBuyCon: true,
                product: this.data.product,
                typeArr: this.data.typeArr,
                typeValueArr: this.data.typeValueArr,
                pid: this.data.pid,
                sid: this.data.sid,
                choosedType: this.data.choosedType,
                cartsItem: this.data.cartsItem,
                thisPrice: Host.DIV(this.data.cartsItem.product.price, this.data.cartsItem.count).toFixed(2)
            })
        }
    },
    setTypeArrAndTypeValueArr : function(categoryArr){
        let categoryLen = categoryArr.length;
        for (let i = 0; i < categoryLen; i++) {
            let keys = Object.keys(categoryArr[i]);
            console.log("keys is ", keys);
            //把规格存进数组
            for (let m = 0; m < keys.length; m++) {
                let keyObj = keys[m];
                this.data.typeArr.push(keyObj);
                // console.log("种类的值是：", categoryArr[i][`${keyObj}`]);
                let le = categoryArr[i][`${keyObj}`].length;
                let tempJson = {};
                console.log("le is ", le);
                tempJson[`${keyObj}`] = [];
                for (let a = 0; a < le; a++) {
                    // console.log("种类值是：", categoryArr[i][`${keyObj}`][a]);
                    let innerJson = {

                    }
                    innerJson.mode = categoryArr[i][`${keyObj}`][a];
                    console.log("choosedType is ", this.data.choosedType);
                    let typeKeys = Object.keys(this.data.choosedType);
                    for (let s = 0; s < typeKeys.length; s++) {
                        console.log(this.data.choosedType[typeKeys[s]]);
                        if (this.data.choosedType[typeKeys[s]] === categoryArr[i][`${keyObj}`][a]) {
                            //选中状态
                            innerJson.touch = true;
                        } else {
                            //未选中状态
                            innerJson.touch = false;
                        }
                    }
                    // //检查商品中的size_choosed中的value值是否与该
                    // innerJson.touch = false;

                    tempJson[`${keyObj}`].push(innerJson);
                }
                this.data.typeValueArr.push(tempJson);
            }
        }
        let keys = Object.keys(categoryArr);
        console.log("typeArr is ", this.data.typeArr);
        console.log("typeValueArr is ", this.data.typeValueArr);
    },
    //选择商品的型号
    chooseType: function (event) {
        console.log("in chooseType choosedType is ", this.data.choosedType);
        //无规格商品
        console.log("event is ", event);
        console.log("event.id is ", event.currentTarget.id);
        let target = event.currentTarget.id;
        let targetArr = target.split('-');
        let targetValue = targetArr[0];
        let index = targetArr[1];
        let tag = targetArr[2];
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
        //找到购物车中的该对象
        for (let j = 0; j < innerLen; j++) {
            if (testData[index][`${tag}`][j].mode === targetValue) {
                console.log("找到了");
                testData[index][`${tag}`][j].touch = !testData[index][`${tag}`][j].touch;
                console.log("选中的规格是：", testData[index][`${tag}`][j].mode);
                let choosedCategory = testData[index][`${tag}`][j].mode;
                //对应的规格变化，库存,价格跟着变化

                //更新choosedType
                this.data.choosedType[`${tag}`] = choosedCategory;
                this.setData({
                    choosedType: this.data.choosedType
                })
                console.log("---------------->>>>", this.data.cartsItem);
                this.data.cartsItem.size[`${tag}`] = choosedCategory;
                console.log("该尺寸类型是否被选中：", testData[index][`${tag}`][j].touch);
            } else {
                //将其他的touch重置为false
                testData[index][`${tag}`][j].touch = false;
            }
        }
        console.log("typeValueArr is ", this.data.typeValueArr);
        this.setData({
            typeValueArr: testData,
        });

    },
    getProductByPidAndsid: function (pid, sid) {
        let productsLen = this.data.products.length;
        console.log("商品的长度为：", productsLen);
        for (let i = 0; i < productsLen; i++) {
            let product = this.data.products[i];
            if (product.pid === pid && product.sid === sid) {
                return product;
            }
        }
        return null;
    },
    //取消编辑商品界面
    cancelBox: function () {
        console.log("关闭弹出框");
        this.setData({
            showBuyCon: false,
            product: {},
            productSize: [],
            product_size: [],
            typeArr: [],
            typeValueArr: [],
            pid: 0,
            sid: 0,
            choosedType: null,
            cartsItem: {},
            thisPrice: 0
        });

    },
    //确认修改商品信息(包括商品的价格，型号，数量统统更新到购物车对象中去)
    confirm: function (event) {
        console.log("cartsItem is ", this.data.cartsItem);
        // console.log("this.data.product is ",this.data.product);
        //同步到carts中去
        if (this.data.product.openstandard === 1) {
            let count = this.data.cartsItem.count;
            let price = this.data.cartsItem.product.price;
            let size = this.data.cartsItem.size;
            let pid = this.data.cartsItem.pid;
            let sid = this.data.cartsItem.product.sid;
            let cartsArr = this.data.carts.data;
            console.log("carts is ", this.data.carts);
            for (let j = 0; j < this.data.storeList.length; j++) {
                let storeName = this.data.storeList[j];
                let storeCartsArr = this.data.carts[`${storeName}`].data;
                for (let i = 0; i < storeCartsArr.length; i++) {
                    if (storeCartsArr[i].product.sid === sid && storeCartsArr[i].product.pid) {
                        //就修改它了
                        storeCartsArr[i].count = count;
                        storeCartsArr[i].product.price = price;
                        storeCartsArr[i].size = size;
                        break;
                    }
                }
            }
            console.log("确定以后的carts is ", this.data.carts);
            this.cancelBox();
            this.setData({
                carts: this.data.carts
            })
        } else {
            console.log("this.data.cartsItem.pid", this.data.cartsItem);
            let count = this.data.cartsItem.count;
            let price = this.data.cartsItem.product.price;
            for (let j = 0; j < this.data.storeList.length; j++) {
                let storeName = this.data.storeList[j];
                let storeCartsArr = this.data.carts[`${storeName}`].data;
                console.log("storeCartsArr is ", storeCartsArr);
                for (let i = 0; i < storeCartsArr.length; i++) {
                    if (storeCartsArr[i].product.sid === this.data.cartsItem.product.sid && storeCartsArr[i].product.pid === this.data.cartsItem.pid) {
                        console.log("count is ", count);
                        console.log("price is ", price);
                        //就修改它了
                        storeCartsArr[i].count = count;
                        storeCartsArr[i].product.price = price;
                        console.log("storeCartsArr[i] is ", storeCartsArr[i]);
                        console.log("carts is ", this.data.carts);
                        //找到一个就break了
                        break;
                    }
                }
            }
            console.log("确定以后的carts is ", this.data.carts);
            this.cancelBox();
            //改变数量和价格
            this.setData({
                carts: this.data.carts
            })

        }
    },
    //减少商品数量
    sub: function () {
        console.log("减少商品");
        console.log("购物车项是：", this.data.cartsItem);
        console.log("该商品的单价是：", this.data.thisPrice);
        if (this.data.cartsItem.count > 1) {
            this.data.cartsItem.count -= 1;
            for (let i = 0; i < this.data.storeList.length; i++) {
                let tempCartsItem = this.data.carts[this.data.storeList[i]];
                let cartsItemArr = tempCartsItem.data;
                let len = cartsItemArr.length;
                for (let j = 0; j < len; j++) {
                    if (this.data.cartsItem.cid === cartsItemArr[j].cid && this.data.cartsItem.pid === cartsItemArr[j].pid) {
                        cartsItemArr[j].count = this.data.cartsItem.count;
                        cartsItemArr[j].product.price = Host.MUL(this.data.thisPrice,cartsItemArr[j].count);
                        cartsItemArr[j].product.otherprice = Host.MUL(this.data.marketPrice,cartsItemArr[j].count);
                    }
                }
            }
            //如果是选中状态的话就更新总价信息
            if (this.data.cartsItem.choosed) {
                this.data.totalPrice = Host.SUB(this.data.totalPrice,this.data.thisPrice);
                this.data.marketTotalPrice = Host.SUB(this.data.marketTotalPrice,this.data.marketPrice);
                this.setData({
                    totalPrice: this.data.totalPrice,
                    marketTotalPrice: this.data.marketTotalPrice
                })
            }
        }else{
            let self = this;
            wx.showModal({
                title: '提示',
                content: '是否要删除该购物车项',
                success : function(res){
                    if(res.confirm){
                        //用户点击确定删除该购物车项
                        //给服务器发送消息
                        self.data.cartsItem.count = 0;
                     
                        self.updateGoodsCounts();
                        //重新获取购物车列表
                    }else if(res.cancel){
                        console.log("用户点击了取消");
                    }
                }
            })
        }
        this.data.cartsItem.product.price = Host.MUL(this.data.thisPrice, this.data.cartsItem.count);
        this.setData({
            cartsItem: this.data.cartsItem,
        })
       
    },
    //减少商品的数量
    subInPage : function(e){
        let pid = Number(e.currentTarget.dataset.pid);
        console.log("pid is ",pid);
        //获取thisPrice
        this.getSourcePriceByPid(pid);
        //获取cartsItem
        this.getCartsItemByPid(pid);
        this.sub();
        this.setData({
            carts : this.data.carts
        });
        this.updateGoodsCounts();
    },
    add: function () {
        console.log("增加商品");
        console.log("该商品的原价是：", this.data.thisPrice);
        this.data.cartsItem.count += 1;
        for (let i = 0; i < this.data.storeList.length; i++) {
            let tempCartsItem = this.data.carts[this.data.storeList[i]];
            console.log("tempCartsItem is ",tempCartsItem.data);
            let cartsItemArr = tempCartsItem.data;
            let len = cartsItemArr.length;
            for (let j = 0; j < len; j++) {
                if (this.data.cartsItem.cid === cartsItemArr[j].cid && this.data.cartsItem.pid === cartsItemArr[j].pid) {
                    console.log("cartsItemArr[j] is ", cartsItemArr[j]);
                    cartsItemArr[j].count = this.data.cartsItem.count;
                    cartsItemArr[j].product.price = Host.MUL(this.data.thisPrice, cartsItemArr[j].count);
                    cartsItemArr[j].product.otherprice = Host.MUL(this.data.marketPrice, cartsItemArr[j].count);
                }
            }
        }
        this.data.cartsItem.product.price = Host.MUL(this.data.thisPrice, this.data.cartsItem.count);
        this.setData({
            cartsItem : this.data.cartsItem,
        })
        console.log("this.carts is ", this.data.carts);
        if(this.data.cartsItem.choosed){
            this.data.totalPrice = Host.ADD(this.data.totalPrice,this.data.thisPrice);
            this.data.marketTotalPrice = Host.ADD(this.data.marketTotalPrice,this.data.marketPrice);
            console.log("totalPrice is ",this.data.totalPrice);
            console.log("marketTotalPrice is ",this.data.marketTotalPrice);
            this.setData({
                totalPrice       : this.data.totalPrice,
                marketTotalPrice : this.data.marketTotalPrice
            });
        }
    },
    //增加商品的数量,如果商品的选中状态为true的时候更新下面的合计的费用和总价信息
    addInPage : async function(e){
        let pid = Number(e.currentTarget.dataset.pid);
        console.log("pid is ", pid);
        //获取thisPrice
        this.getSourcePriceByPid(pid);
        //获取cartsItem
        this.getCartsItemByPid(pid);
        console.log("price is ",this.data.thisPrice);
        console.log("cartsItem is ",this.data.cartsItem);
        this.add();
        this.setData({
            carts : this.data.carts
        });
        this.updateGoodsCounts();
    },
    //更新购物车的数量
    updateGoodsCounts : async function(){
        //向服务器发送购买的数量
        let url = app.host + 'Data/UpdateCartCount';
        let data = {
            cid   : this.data.cartsItem.cid,
            count : this.data.cartsItem.count,
        };
        console.log("data is ",data);
        let req = new Request(url,data,'POST','text');
        let res = await req.sendRequest();
        console.log("res");
        if(this.data.cartsItem.count === 0){
            wx.showToast({
                title: res.data.msg,
            });
            this.setData({
                storeArr: [],
                goodsCount: 0,
                storeList: [],
                carts: {},
                products: [],
                thisPrice: 0,
                totalPrice: 0,
                marketTotalPrice: 0,
                marketPrice: 0,
                sourceCarts: [],
                myshoppingPage: 1,
                isChoosed: false,
                goodsCount: 0,
            });
            this.getCartList();
        }
    },
    getCartsItemByPid : function(pid){
        for (let i = 0; i < this.data.storeList.length; i++) {
            let tempCartsItem = this.data.carts[this.data.storeList[i]];
            console.log("tempCartsItem is ", tempCartsItem);
            for (let j = 0; j < tempCartsItem.data.length; j++) {
                console.log("tempCartsItem[j] is ", tempCartsItem.data[j]);
                if (pid === tempCartsItem.data[j].pid) {
                    this.data.cartsItem = tempCartsItem.data[j];
                    console.log("cartsItem is ", this.data.cartsItem);
                    break;
                }
            }
        }
    },
    //根据pid获取价格
    getSourcePriceByPid : function(pid){
        for (let i = 0; i < this.data.storeList.length; i++) {
            console.log("sourceCarts is ",this.data.sourceCarts);
            let tempCartsItem = this.data.sourceCarts[i][this.data.storeList[i]];
            console.log("tempCartsItem is ", tempCartsItem);
            for (let j = 0; j < tempCartsItem.length; j++) {
                console.log("tempCartsItem[j] is ", tempCartsItem[j]);
                if (pid === tempCartsItem[j].pid) {
                    this.data.thisPrice = tempCartsItem[j].price;
                    this.data.marketPrice = tempCartsItem[j].otherPrice;
                    console.log("thisPrice is ",this.data.thisPrice);
                    console.log("marketPrice is ",this.data.marketPrice);
                    break;
                }
            }
        }
        console.log("thisPrice is ",this.data.thisPrice);
    },
    //依据商店名字选择所有的商品
    selectAllByStoreName: function (event) {
        console.log("event is ", event);
        let storeName = event.currentTarget.id;
        console.log("this.data.carts is ", this.data.carts);
        this.chooseStoreByName(storeName);
    },
    chooseStoreByName: function (storeName) {
        let productArr = this.data.carts[storeName];
        // this.data.carts[storeName].choosed = !this.data.carts[storeName].choosed;
        console.log("产品数组是：", productArr);
        console.log("是否被选中：", productArr.choosed);
        productArr.choosed = !productArr.choosed;
        let productLen = productArr.data.length;
        let priceSum = 0;
        let totalMarketPrice = 0;
        let totalCount = 0;
        for (let i = 0; i < productLen; i++) {
            let productItem = productArr.data[i];
            console.log("product item is ", productItem);
            if(productArr.choosed){
                productItem.choosed = true;
            }else{
                productItem.choosed = false;
            }
            if (productItem.choosed) {
                priceSum = Host.ADD(priceSum,productItem.product.price);
                totalMarketPrice = Host.ADD(totalMarketPrice,productItem.product.otherprice);
                //总商品数相加
                totalCount++;
            }
        }
        this.setData({
            carts            : this.data.carts,
            totalPrice       : priceSum,
            totalCount       : totalCount,
            marketTotalPrice : totalMarketPrice
        })
        this.checkAllChoseByStore();
    },
    checkAllChoseByStore : function(){
        let choosedStore = 0;
        for (let i = 0; i < this.data.storeList.length; i++) {
            console.log("storeName is ", this.data.storeList[i]);
            let storePArr = this.data.carts[this.data.storeList[i]];
            console.log("storePArr is ", storePArr);
            console.log("choosed is ", storePArr.choosed);
            if (storePArr.choosed) {
                ++choosedStore;
            }
        }
        console.log("choosedStore is ", choosedStore);
        if (choosedStore === this.data.storeList.length) {
            this.setData({
                isFullChoosed: true
            });
        } else {
            this.setData({
                isFullChoosed: false
            })
        }
    },
    //全选商品包括商店
    selectAllChange: function (event) {
        this.setData({
            isFullChoosed: !this.data.isFullChoosed
        })
        for (let i = 0; i < this.data.storeList.length; i++) {
            this.chooseStoreByName(this.data.storeList[i]);
        }
    },
    //付款信息
    shopPay: function () {
        //组装数据
        console.log("this.data.carts is ",this.data.carts);
        this.data.orderArray = [];
        //看看哪个店被选中了
        console.log("storeList is ",this.data.storeList);
        for(let i = 0;i < this.data.storeList.length;i++){
            let storeName = this.data.storeList[i];
            //检查该店所在的所有商品的信息
            let cartsLen = this.data.carts[storeName].data.length;
            for(let j = 0;j < cartsLen;j++){
                console.log("cartsItem is ",this.data.carts[storeName].data[j]);
                let cartsUnit = this.data.carts[storeName].data[j];
                console.log("cartsUnit's head is ",cartsUnit.product.head[0]);
                console.log("cartsUnit's name is ",cartsUnit.product.name);
                console.log("cartsUnit's price is ",cartsUnit.product.price);
                //如果选中状态将其加入购物车结算数组中去
                if (cartsUnit.choosed){
                    console.log("头图是：",);
                    let tempJson = {
                        //头图
                        head    : cartsUnit.product.head[0],
                        pname   : cartsUnit.product.pname,
                        price   : cartsUnit.product.price,
                        cid     : cartsUnit.cid,
                        count   : cartsUnit.count,
                        pid     : cartsUnit.pid,
                        size    : cartsUnit.size,
                        source  : cartsUnit.source,
                        state   : cartsUnit.state,
                    }
                    //将该商品加入到订单数组中去
                    this.data.orderArray.push(tempJson);
                }
            }
        }
        console.log("orderArray is ",this.data.orderArray);
        //存储进缓存中去
        wx.setStorageSync('orderArray',this.data.orderArray);
        if (this.data.orderArray.length == 0) {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: '请选择购物车中的商品',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '../order/order?inter=shopCar'
            })
        }
    },
})