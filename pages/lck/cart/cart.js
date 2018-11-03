// pages/lck/cart/cart.js
import Cart from '../../../utils/Cart.js';
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
      host : app.host,
      imageHost: Host.productionHost,
      //是否为店铺选中状态
      isChoosed : false,
      //是否为商品选中状态
      isGoodsChoosed : false,
      choosedColor : '#bbb',
      choosedGoodsColor: '#bbb',
      //店铺名称
      storeName : '',
      storeArr : [],
      goodsCount : 0,
      showBuyCon : false,
      //商店列表
      storeList : [],
      //产品列表
      products : [],
      //编辑的产品
      product : {},
      /*产品规格对象
        {
            "规格":"1|2",
            "尺寸":"1|L|XL|XXL",
            "颜色":"1|red|blue"
        }
      */
      product_size : {},
      /*产品规格
        
      */
      productSize : [],
      //购物车对象
      carts : {},
      //是否为全选
      isFullChoosed : false,
      fullChoosedColor : '#bbb',
      selectColor: '#ede2f4',
      selectFontColor: '#863bb7',
      unSelectColor: '#eee',
      unSelectFontColor: '#000',
      selectBorder : '2rpx solid #863bb7',
      unselectBorder : '2rpx solid #eee',
      //显示商品图的索引
      showImgIndex : 0,
      //无规格的规格信息
      sizeInfo : '',
      //有规格的规格信息
      categoryObj : null,
      //类型数组
      typeArr : [],
      //类型值数组
      typeValueArr : [],
      pid : 0,
      sid : 0,
      choosedType : {},
      //所有规格组合
      groups : [],
      cartsItem : {},
      //当前选择商品的价格
      thisPrice : 0,
      //总价
      totalPrice : 0,
      //选中的商品个数
      totalCount : 0
  },
  
  /**
   * 获得购物车里面的购物车对象
   * @param  {Number} pid 商品id
   * @param  {Number} sid 商店id
   * @param  {String} tag 规格
   */
  getCartItemFromCarts : function(pid,sid,tag){
    //   let storeKeys = Object.keys(this.data.storeList);
        for(let j = 0;j < this.data.storeList.length;j++){
            if(this.data.storeList[j] === storeKeys[i]){
                //找到该店对应的购物车商品信息
                console.log(".....",this.data.carts[`${storeKeys[i]}`])
                let cartsItemArr = this.data.carts[`${storeKeys[i]}`];
                for(let k = 0;k < cartsItemArr.length;k++){
                    console.log("cartsItem is ",cartsItemArr[k]);
                    if(cartsItemArr[k].pid === pid && cartsItemArr[k].product.sid === sid){
                        console.log("找到的购物车项是：",cartsItemArr[k]);
                        found = true;
                        return cartsItemArr[k];
                    }
                }
            }
      }
      return null;
  },
//   getCartsItemByPidAndSid : function(pid,sid){

//   },
  chooseStore : function(event){
    let dataSet = event.currentTarget.dataset;
    let storeIndex = dataSet.storeindex;
    console.log("storeIndex is ",storeIndex);
  },
  change : function(event){
      console.log("event is ",event);
      console.log(event);
      let dataSet = event.currentTarget.dataset;
      console.log("dataSet is ",dataSet);
    let pid = dataSet.pid;
    let sid = dataSet.sid;
    let goodsIndex = dataSet.goodsindex;
    let storeIndex = dataSet.storeindex;
    console.log("pid is ",pid);
    console.log("sid is ",sid);
    console.log("goodsIndex is ",goodsIndex);
    console.log("storeIndex is ",storeIndex);
    //该购物车项被选择了
    let storeItem = this.data.storeList[storeIndex];
    console.log("storeItem is ",storeItem);
    console.log("carts is ",this.data.carts);
    let cartsItemArr = this.data.carts[`${storeItem}`].data;
    console.log("cartsItemArr is ",cartsItemArr);
    console.log("cartsItemArr[j].pid is ",cartsItemArr[goodsIndex].pid);
    console.log("cartsItemArr[j].pid is ",cartsItemArr[goodsIndex].product.sid);
    let cartsItem = cartsItemArr[goodsIndex];
    cartsItem.choosed = !cartsItem.choosed;
    console.log("cartsItem is ",cartsItem);
    //价格为
    console.log(cartsItemArr[goodsIndex].product.price);
    // if(cartsItemArr[j].pid === pid && cartsItemArr[j].product.sid === sid){
    //     console.log("__>>>",cartsItemArr[j].product.price);
    //     console.log("totalPrice is ",this.data.totalPrice);
    //     // this.data.totalPriceArr.push(cartsItemArr[j].product.price);
    //     break;
    // }
    console.log("carts is ",this.data.carts);
    let priceSum = 0;
    let totalCount = 0;
    for(let i = 0;i < this.data.carts[`${storeItem}`].data.length;i++){
        let cartsItem = this.data.carts[[`${storeItem}`]].data[i];
        if(cartsItem.choosed === true){
            //把价格取出来
            let price = cartsItem.product.price;
            priceSum += price;
            totalCount++;
            console.log("price is ",price);
        }
    }
    console.log("sum is ",priceSum);
    this.setData({
        carts : this.data.carts,
        totalPrice : priceSum,
        totalCount : totalCount
    });
  },
  //选择商品
  chooseGoods : function(){
      console.log("该商品被选中");
      console.log("this.data.isGoodsChoosed is ",this.data.isGoodsChoosed);
      if(!this.data.isGoodsChoosed){
          //将全选状态改为false
          this.chooseStore();
      }else{
        this.setData({
            isGoodsChoosed : !this.data.isGoodsChoosed,
            choosedGoodsColor : this.data.isGoodsChoosed ? '#ec0023' : '#bbb'
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
      Array.prototype.contain = function(item){
            let len = this.length;
            for(let i = 0;i < len;i++){
                //pid和sid相同
                if(this[i].pid === item.pid && this[i].sid === item.sid){
                    return true;
                }
            }
        return false;
      }
      //刷新绑定数据的html页面
      this.setData({
          storeArr : this.data.storeArr,
          goodsCount : this.data.goodsCount
      })
      console.log("商品数量是：",this.data.goodsCount);
      //请求购物车里面的商品
      let url = app.host + 'Data/CartList';
      console.log("url is ",url);
      let reqCartListData = {
          uid : 1,
          page : 1
      }

      let req = new Request(url,reqCartListData,'POST','text');
      let res = await req.sendRequest();
      console.log("res is ",res.data.carts);
      this.data.groups = res.data.groups;
      this.setData({
          groups : this.data.groups
      })
      let tempCarts = {

      }
      for(let key in res.data.carts){
        console.log("key is ",key);
      }
      console.log("-------------------");
      for(let m in res.data.carts){
          console.log("m is ",m);
          //将该键值对应的商店的商品的size属性设置为对象
          console.log(res.data.carts[m]);
          let storeProductLen = res.data.carts[m].length;
          //商铺状态是未选中状态
          let tempJ = {};
          tempJ.choosed = false;
          for(let j = 0;j < storeProductLen;j++){
              let itemTemp = res.data.carts[m][j];
              //该购物车项的默认选择状态是false
              res.data.carts[m][j].choosed = false;
              itemTemp.size = JSON.parse(itemTemp.size);
            //   let sizeValues = Object.values(itemTemp.size).join(';');
            //   itemTemp.size = sizeValues;
            //   console.log("sizeValues is ",sizeValues);
              itemTemp.product.head = itemTemp.product.head.split(',');
              //将
            //   for(let k = 0;k<sizeKeys.length;k++){
            //       itemTemp[`${sizeKeys[k]}`] = itemTemp.size[`${sizeKeys[k]}`];
            //   }
              console.log("itemTemp.product is ",itemTemp);
            //   itemTemp.product.size = JSON.parse(itemTemp.product.size);
            //   //商品未选中状态
            //   itemTemp.choosed = false;
              console.log("carts[m][j] is ",res.data.carts[m][j]);

          }
          console.log("carts[m]'s size is ",res.data.carts[m]);
          //将商家的键值保存起来
          this.data.storeList.push(m);
          tempJ.data = res.data.carts[m];
          console.log("tempJ is ",tempJ);
          res.data.carts[m] = tempJ;

      }
      this.setData({
          storeList : this.data.storeList,
          carts     : res.data.carts,
      })
      //将所有产品根据键值取出来
      let storeLen = this.data.storeList.length;
      for(let k = 0;k < storeLen;k++){
          let key = this.data.storeList[k];
          let value = res.data.carts[key];
          console.log("products--value is ",value);
          let valueLen = value.data.length;
          for(let j = 0;j < valueLen;j++){
              let productItem = value.data[j].product;
              //将选择的该商品规格加入到产品列表中
              value.data[j].product.size_choosed = value.data[j].size;
              console.log("value[j] is ",value.data[j].product.size_choosed);
              this.data.products.push(productItem);
          }
       }
       this.setData({
            products : this.data.products
       })

      console.log("products is ",this.data.products);
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
  onShareAppMessage: function () {

  },
  test : function(event){
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
  endEvent : function(event){
      console.log("in endEvent event is ",event);
  },
  //通过商品id和商户id获得产品数据
  /**
   * @param  {产品id} pid
   * @param  {商户id} sid
   * @param  {用户已经选择的类型数组} choosedArr
   */
  getProductByPidAndSid: function (pid, sid,choosedArr) {
    let productsLen = this.data.products.length;
    let product = null;
    console.log("获取产品前产品规格是-->productsize is ",this.data.productSize);
    for (let i = 0; i < productsLen; i++) {
        if (this.data.products[i].sid === sid && this.data.products[i].pid === pid) {
            console.log("=====>>>",this.data.products[i].sid,this.data.products[i].pid);
            console.log("<<<=====>>>",this.data.products[i]);
            //找到对应的pid和sid的商品
            product = this.data.products[i];
            //将size属性解析成json对象
            for(let key in this.data.products[i].size){
                console.log("key is ",key);
                if(key !== null){
                    let tempObj = {};
                    tempObj.text = key;
                    //该商品的所有size属性
                    let typeString = this.data.products[i].size[key];
                    let tempArr = [];
                    let typeArr = typeString.split('|');
                    let typeArrLen = typeArr.length;
                    //获得已经选择的尺寸标红其他尺寸信息不标红
                    for(let m = 0;m < typeArrLen;m++){
                        let dataJson = {};
                        dataJson.msg = typeArr[m];
                        //遍历已经选择类型的数组
                        for(let i = 0;i < choosedArr.length;i++){
                            console.log("类型是：",dataJson.msg);
                            console.log("选择的类型是：",choosedArr[i]);
                            console.log("选择的类型 === 类型：",choosedArr[i] === dataJson.msg);
                            if(dataJson.msg === choosedArr[i]){
                                dataJson.active = true;
                            }
                        }
                        tempArr.push(dataJson);
                    }
                    tempObj.data = tempArr;
                    console.log("tempObj.data is ",tempObj.data);
                    //是否选中
                    console.log("-->productsize is ",this.data.productSize);
                    this.data.productSize.push(tempObj);
                }
            }
            console.log("最终的productSize is ",this.data.productSize);
        }
    }
    this.setData({
        product_size : this.data.product_size
    })
    return product;
  },
  //编辑商品
  editorGoods : async function(event){
      //重新请求该商品id对应的商品的详细信息
      console.log("编辑购物车里面的商品信息");
      console.log("event is ",event);
      console.log("products is ",this.data.products);
      let dataSet = event.currentTarget.dataset;
      let storeId = Number(dataSet.storeindex);
      let goodsId = Number(dataSet.goodsindex);
      let pid = Number(dataSet.pid);
      console.log("storeId is ",storeId);
      console.log("goodsId is ",goodsId);
    //   let pid = Number(dataSet.pid);
    //   let sid = Number(dataSet.sid);
    //   this.data.pid = pid;
    //   this.data.sid = sid;
    //   this.data.cartsItem = this.getCartItemFromCarts(pid,sid);
    //   console.log("购物车项是：",this.data.cartsItem);
    //   //选择的规格
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
      console.log("productObj is ",this.data.product);
      console.log("店名是：",storeName);
       if(this.data.product.openstandard === 1){
            //有规格的商品
            let url = this.data.host+'Data/GetStandardByPid';
            let data = {
                pid : pid
            }
            let req = new Request(url,data,'POST','text');
            let res = await req.sendRequest();
            console.log("有规格的产品的规格是：",res.data.products);
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
                        console.log("choosedType is ",this.data.choosedType);
                        let typeKeys = Object.keys(this.data.choosedType);
                        for(let s = 0;s < typeKeys.length;s++){
                            console.log(this.data.choosedType[typeKeys[s]]);
                            if(this.data.choosedType[typeKeys[s]] === categoryArr[i][`${keyObj}`][a]){
                                //选中状态
                                innerJson.touch = true;
                            }else{
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
                  showBuyCon   : true,
                  product      : this.data.product,
                  typeArr      : this.data.typeArr,
                  typeValueArr : this.data.typeValueArr,
                  pid          : this.data.pid,
                  sid          : this.data.sid,
                  choosedType  : this.data.choosedType,
                  cartsItem    : this.data.cartsItem,
                  thisPrice    : (this.data.cartsItem.product.price / this.data.cartsItem.count).toFixed(2)
            });
       }else{
           this.setData({
            showBuyCon   : true,
            product      : this.data.product,
            typeArr      : this.data.typeArr,
            typeValueArr : this.data.typeValueArr,
            pid          : this.data.pid,
            sid          : this.data.sid,
            choosedType  : this.data.choosedType,
            cartsItem    : this.data.cartsItem,
            thisPrice    : (this.data.cartsItem.product.price / this.data.cartsItem.count).toFixed(2)
           })
       }
  },
  //选择商品的型号
  chooseType : function(event){
    console.log("in chooseType choosedType is ",this.data.choosedType);
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
  //   let choosedTypeKeys = Object.keys(this.data.choosedType);
  //   for(let j = 0;j < choosedTypeKeys.length;j++){
  //       console.log("选中的键值是：",choosedTypeKeys[j]);
  //       //获得value值
  //       let choosedvalue = this.data.choosedType[choosedTypeKeys[j]]
  //       console.log("选中的种类值是：",choosedvalue);
  //   }
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
            console.log("选中的规格是：",testData[index][`${tag}`][j].mode);
            let choosedCategory = testData[index][`${tag}`][j].mode;
            //对应的规格变化，库存,价格跟着变化
            
            //更新choosedType
            this.data.choosedType[`${tag}`] = choosedCategory;
            this.setData({
                choosedType : this.data.choosedType
            })
            console.log("---------------->>>>",this.data.cartsItem);
            this.data.cartsItem.size[`${tag}`] = choosedCategory;
            // if(this.data.pid !== 0 && this.data.sid !== 0 ){
            //   console.log("pid is ",this.data.pid,"sid is ",this.data.sid);
            //   console.log("carts is ",this.data.carts);
            //   let cartsItem = this.getCartItemFromCarts(this.data.pid,this.data.sid,tag);
            //   console.log("购物车项是：",cartsItem);
            //   console.log("cartsItem is ",cartsItem);
            //   console.log("cartsItem's size is ",cartsItem.size);
            //   cartsItem.size[`${tag}`] = choosedCategory;

            //   // let cartsItemArr = cartsItem.split(";");
            //   // cartsItem.size = testData[index][`${tag}`][j].mode;
            //   //刷新购物车内容
            //   this.setData({
            //       carts : this.data.carts
            //   })
            // }
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
  getProductByPidAndsid : function(pid,sid){
      let productsLen = this.data.products.length;
      console.log("商品的长度为：",productsLen);
      for(let i = 0;i < productsLen;i++){
          let product = this.data.products[i];
          if(product.pid === pid && product.sid === sid){
              return product;
          }
      }
      return null;
  },
  //取消编辑商品界面
  cancelBox : function(){
      console.log("关闭弹出框");
      this.setData({
          showBuyCon    : false,
          product       : {},
          productSize   : [],
          product_size  : [],
          typeArr       : [],
          typeValueArr  : [],
          pid           : 0,
          sid           : 0,
          choosedType   : null,
          cartsItem     : {},
          thisPrice     : 0
      });
    
  },
  //确认修改商品信息(包括商品的价格，型号，数量统统更新到购物车对象中去)
  confirm : function(event){
    console.log("cartsItem is ",this.data.cartsItem);
    // console.log("this.data.product is ",this.data.product);
    //同步到carts中去
    if(this.data.product.openstandard === 1){
        let count = this.data.cartsItem.count;
        let price = this.data.cartsItem.product.price;
        let size = this.data.cartsItem.size;
        let pid = this.data.cartsItem.pid;
        let sid = this.data.cartsItem.product.sid;
        let cartsArr = this.data.carts.data;
        console.log("carts is ",this.data.carts);
        for(let j = 0;j < this.data.storeList.length;j++){
            let storeName = this.data.storeList[j];
            let storeCartsArr = this.data.carts[`${storeName}`].data;
            for(let i = 0;i < storeCartsArr.length;i++){
                if(storeCartsArr[i].product.sid === sid && storeCartsArr[i].product.pid){
                    //就修改它了
                    storeCartsArr[i].count = count;
                    storeCartsArr[i].product.price = price;
                    storeCartsArr[i].size = size;
                    break;
                }
            }
        }
        console.log("确定以后的carts is ",this.data.carts);
        this.cancelBox();
        this.setData({
            carts : this.data.carts
        })
    }else{
        console.log("this.data.cartsItem.pid",this.data.cartsItem);
        let count = this.data.cartsItem.count;
        let price = this.data.cartsItem.product.price;
        for(let j = 0;j < this.data.storeList.length;j++){
            let storeName = this.data.storeList[j];
            let storeCartsArr = this.data.carts[`${storeName}`].data;
            console.log("storeCartsArr is ",storeCartsArr);
            for(let i = 0;i < storeCartsArr.length;i++){
                if(storeCartsArr[i].product.sid === this.data.cartsItem.product.sid && storeCartsArr[i].product.pid === this.data.cartsItem.pid){
                    console.log("count is ",count);
                    console.log("price is ",price);
                    //就修改它了
                    storeCartsArr[i].count = count;
                    storeCartsArr[i].product.price = price;
                    console.log("storeCartsArr[i] is ",storeCartsArr[i]);
                    console.log("carts is ",this.data.carts);
                    //找到一个就break了
                    break;
                }
            }
        }
        console.log("确定以后的carts is ",this.data.carts);
        this.cancelBox();
        //改变数量和价格
        this.setData({
            carts : this.data.carts
        })

    }
  },
   //减少商品数量
    sub: function () {
        console.log("减少商品");
        console.log("购物车项是：",this.data.cartsItem);
        console.log("该商品的单价是：",this.data.thisPrice);
        if (this.data.cartsItem.count > 1) {
            this.data.cartsItem.count -= 1;
            for(let i = 0;i < this.data.storeList.length;i++){
                let tempCartsItem = this.data.carts[this.data.storeList[i]];
                for(let j = 0;j < tempCartsItem.length;j++){
                    if (this.data.cartsItem.cid === tempCartsItem[j].cid && this.data.cartsItem.pid === tempCartsItem[j].pid){
                        tempCartsItem[j].count = this.data.cartsItem.count;
                        tempCartsItem[j].product.price = this.data.thisPrice * tempCartsItem[j].count;
                    }
                }
            }
        }
        this.data.cartsItem.product.price =this.data.thisPrice * this.data.cartsItem.count;
        this.setData({
            cartsItem : this.data.cartsItem,
        })
    },
    add: function () {
        console.log("增加商品");
        console.log("该商品的原价是：", this.data.thisPrice);
        this.data.cartsItem.count += 1;
        for (let i = 0; i < this.data.storeList.length; i++) {
            let tempCartsItem = this.data.carts[this.data.storeList[i]];
            for (let j = 0; j < tempCartsItem.length; j++) {
                if (this.data.cartsItem.cid === tempCartsItem[j].cid && this.data.cartsItem.pid === tempCartsItem[j].pid) {
                    console.log("tempCartsItem[j] is ",tempCartsItem[j]);
                    tempCartsItem[j].count = this.data.cartsItem.count;
                    tempCartsItem[j].product.price = this.data.thisPrice * tempCartsItem[j].count;
                }
            }
        }
        this.data.cartsItem.product.price =this.data.thisPrice * this.data.cartsItem.count;
        this.setData({
            cartsItem : this.data.cartsItem,
        })
        console.log("this.carts is ",this.data.carts);
    },
    //依据商店名字选择所有的商品
    selectAllByStoreName : function(event){
        console.log("event is ",event);
        let storeName = event.currentTarget.id;
        console.log("this.data.carts is ",this.data.carts);
        this.chooseStoreByName(storeName);
    },
    chooseStoreByName : function(storeName){
        let productArr = this.data.carts[storeName];
        console.log("产品数组是：",productArr);
        console.log("是否被选中：",productArr.choosed);
        productArr.choosed = !productArr.choosed;
        let productLen = productArr.data.length;
        let priceSum = 0;
        let totalCount = 0;
        for(let i = 0;i < productLen;i++){
            let productItem = productArr.data[i];
            console.log("product item is ",productItem);
            productItem.choosed = !productItem.choosed;
            if(productItem.choosed){
                priceSum += productItem.product.price;
                //总商品数相加
                totalCount++;
            }
        }
        this.setData({
            carts : this.data.carts,
            totalPrice : priceSum,
            totalCount : totalCount
        })
    },
    //全选商品包括商店
    selectAllChange :function(event){
        this.setData({
            isFullChoosed : !this.data.isFullChoosed
        })
        for(let i = 0;i < this.data.storeList.length;i++){
            this.chooseStoreByName(this.data.storeList[i]);
        }
    }
})