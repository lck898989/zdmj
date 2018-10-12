// pages/lck/hotShopping/hotShopping.js
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
import Goods from '../../../utils/Goods.js';
var app=getApp();
//支持es6 async..await
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //精选商城商品数组
        arrayTextMsg: [],
        //商品列表
        goods: [new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人'),
            new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人'),
            new Goods(50, '/resources/example.jpg', '好商品不容错过', '天津一家人')
        ],
        typeArr : [
            {id:'0',text:'全部',choosed:true},
            {id:'1',text:'洗护',choosed:false},
            {id:'2',text:'电器',choosed:false},
            {id:'3',text:'数码产品',choosed:false},
            {id:'4',text:'厨卫',choosed:false},
            {id:'5',text:'美妆',choosed:false}
        ],
        moreTypeArr: [{ id: '6', text: '全部', choosed: false },
            { id: '7', text: '洗护', choosed: false },
            { id: '8', text: '电器', choosed: false },
            { id: '9', text: '数码产品', choosed: false },
            { id: '10', text: '厨卫', choosed: false },
            { id: '11', text: '美妆', choosed: false }],
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
        typechoosed : false,
        typeActiveColor: 'color:#ff861a',
        typeUnActiveColor: 'color:#808080',
        //是否显示更多
        isMore : false,
        //价格升序
        isUpPrice : true,
        isDownPrice : false
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      console.log("asdfasdf");
      //向服务器请求数据
      let req = new Request(Const.devHost +'Data/GetProducts',{page : this.data.page},"POST","text");
      console.log("ae32333");
      let res = await req.sendRequest();
      console.log();
      console.log("res.data is ",res.data.products);
      this.setData({ goods: res.data.products});
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {


    },
    //通过商品类别id获得商品
    getGoodsById : function(typeArr,id){
        let len = typeArr.length;
        if(typeArr === this.data.typeArr){
            console.log("in getGoodsById typeArr is equal to this.data.typeArr");
            let moreTypeArrLen = this.data.moreTypeArr.length;
            for(let m = 0;m < moreTypeArrLen;m++){
                this.data.moreTypeArr[m].choosed = false;
            }
        }else{
            let typeArrLen = this.data.typeArr.length;
            for(let j = 0;j < typeArrLen;j++){
                this.data.typeArr[j].choosed = false;
            }
        }
        for(let i = 0;i < len;i++){
            if(id === typeArr[i].id){
                typeArr[i].choosed = true;
            }else{
                typeArr[i].choosed = false;
            }
        }
        console.log("typeArr is ",typeArr);
    },
    banshi: function() {
        this.setData({
            banshi: !this.data.banshi
        })
    },
    startMove: function(event) {
        console.log("in startMove event is ", event);
        this.setData({
            touchStartPosition: {
                startX: event.touches[0].pageX,
                startY: event.touches[0].pageY
            }
        });
        console.log("startX is ", this.data.touchStartPosition.startX);
        console.log("startY is ", this.data.touchStartPosition.startY);
    },
    switchShoppingType: function(event) {
        console.log("event is ", event);
        //   this.setData({
        //     touchStartPosition: {
        //         startX: event.touches[0].pageX,
        //         startY: event.touches[0].pageY
        //     }
        //   });
    },
    clearEventArr: function(event) {
        console.log("in clearEventArr event is ", event);
        //判断事件数组中的个数来进行左右滑动事件的执行
        //记录下结束时候的坐标位置
        this.setData({
            touchEndPosition: {
                endX: event.changedTouches[0].pageX,
                endY: event.changedTouches[0].pageY
            }
        });
        let offsetX = this.data.touchStartPosition.startX - this.data.touchEndPosition.endX;
        let offsetY = this.data.touchStartPosition.startY - this.data.touchEndPosition.endY;
        console.log("offsetX is ", offsetX);
        console.log("offsetY is ", offsetY);
        if ((offsetY >= -50 && offsetY <= 50) && (offsetX <= -50 || offsetX >= 50)) {
            this.setData({
                choosed: !this.data.choosed
            });
        }
    },
    enterHot: function() {
        //切换热门商城的组件部分
        this.setData({
            choosed: true
        });
    },
    enterPerfact: function() {
        //切换为精选商城的组件部分
        this.setData({
            choosed: false
        });
        //访问服务器
        app.ShortConnect(Const.devHost + "API", {
            "query": `{
                essays(page: 1) {
                 eid
                 title
                 author
                 see
                 forword
                 txturl
                 head
                 pid
                 time
                  }
             }`
        }, "showTextMsg");

    },
    //显示更多分类，下拉菜单
    showMore: function() {
        //合并类型数组和更多类型数组
        //显示更多容器内容向服务器请求更多分类
        let req = new Request();
        //测试环境下暂时用假数据
        this.setData({
            isMore : !this.data.isMore
        })

    },
    getSearch: function(event) {
        console.log("event is ", event);
        let inputString = event.detail.value;
        this.setData({
            inputString: inputString
        });
        console.log("输入的内容是：", inputString);
        //将搜素类型字段发送给服务器进行处理
    },
    //提交输入框中的内容
    commit: function(event) {
        console.log("in commit event is ", event);
    },
    //输入框失去焦点时候触发该事件
    initInput: function(event) {
        console.log("in initInput event is ", event);
        event.detail.value = "";
        console.log("in initInput event is ", event);
        this.setData({
            inputString: ''
        });
    },
    //处理所有的网络请求
    dealRequest: function(event) {
        console.log("event is ",event);
        let req = new Request();
        //将请求数据发送给服务器

    },
  chooseType : function(event){
      console.log("in chooseType event is ",event);
      let requestType = event.currentTarget.dataset.type;
      let id = event.currentTarget.id;
      console.log("请求类型是 ",requestType);
      switch(requestType){
          case 'goodsType':
            //选择类型的请求，改变类型选择的颜色
            this.getGoodsById(this.data.typeArr,id);
            //更新视图资源
            this.setData({
                typeArr:this.data.typeArr,
                moreTypeArr : this.data.moreTypeArr
            })
            switch(id){
                case 'all' :
                    //发送给服务器查询该类型的商品
                    let req = new Request();
                break;    
            }
          break;
          case 'moreType':
            this.getGoodsById(this.data.moreTypeArr,id);
            this.setData({
                moreTypeArr : this.data.moreTypeArr,
                typeArr : this.data.typeArr
            })
          break;  

      }
  },
  //价格排序  
  sortPrice : async function(event){
      console.log("in sortPrice event is ",event);
      let dataSort = event.currentTarget.dataset.sort;
      if(dataSort === 'up'){
        //   升序排列价格 改变升序的图标
        this.setData({
            isUpPrice : !this.data.isUpPrice,
            isDownPrice : !this.data.isDownPrice,
        })
      }else if(dataSort === 'down'){
          this.setData({
              isDownPrice : !this.data.isDownPrice,
              isUpPrice : !this.data.isUpPrice,
          })
      }
      let url = Const.devHost + 'Data/GetProductByPrice'
      let data = {
          up : null
      }
      //查看是升序请求还是降序请求
      if(this.data.isUpPrice){
          data.up = 1;
      }else if(this.data.isDownPrice){
          //发送根据价格降序排列的数据
          data.up = -1;
      }
     //发送根据价格升序排列的数据
     let req = new Request(url,data,"POST",'text');
     let res = await req.sendRequest();
     console.log("in sort price res is ",res);
  },

  //切换版式
  banshi :function(){
      this.setData({banshi : !this.data.banshi})
  },
  //切换热卖商品和精选好货
  startMove : function(event){
    console.log("in startMove event is ",event);
    this.setData({touchStartPosition : {
        startX : event.touches[0].pageX,
        startY : event.touches[0].pageY
    }});
    console.log("startX is ",this.data.touchStartPosition.startX);
    console.log("startY is ",this.data.touchStartPosition.startY);
  },
  //切换商品类型
  switchShoppingType: function(event){
      console.log("event is ",event);
    //   this.setData({
    //     touchStartPosition: {
    //         startX: event.touches[0].pageX,
    //         startY: event.touches[0].pageY
    //     }
    //   });
  },
  clearEventArr : function(event){
      console.log("in clearEventArr event is ",event);
      //判断事件数组中的个数来进行左右滑动事件的执行
      //记录下结束时候的坐标位置
      this.setData({touchEndPosition : {
          endX : event.changedTouches[0].pageX,
          endY : event.changedTouches[0].pageY
      }});
      let offsetX = this.data.touchStartPosition.startX - this.data.touchEndPosition.endX;
      let offsetY = this.data.touchStartPosition.startY - this.data.touchEndPosition.endY;
      console.log("offsetX is ",offsetX);
      console.log("offsetY is ",offsetY);
      if ((offsetY >= -50 && offsetY <= 50) && (offsetX <= -50 || offsetX >= 50)){
          this.setData({choosed : !this.data.choosed});
      }
  },
  //进入热门商城
  enterHot :function(){
      //切换热门商城的组件部分
      this.setData({choosed : true});
  },
  //进入精选商城
  enterPerfact : function(){
      //切换为精选商城的组件部分
      this.setData({choosed : false});
      
  },
  //搜索商品
  getSearch : function(event){
      console.log("event is ",event);
      let inputString = event.detail.value;
      this.setData({inputString : inputString});      
      console.log("输入的内容是：",inputString);
      //将搜素类型字段发送给服务器进行处理
  },
  //提交输入框中的内容
  commit : function(event){
      console.log("in commit event is ",event);
  },
  //输入框失去焦点时候触发该事件
  initInput : function(event){
      console.log("in initInput event is ",event);
      event.detail.value = "";
      console.log("in initInput event is ",event);
      this.setData({inputString : ''});
  },
  //处理所有的网络请求
  dealRequest : function(data){
    let req = new Request();
    //将请求数据发送给服务器
    
  },
  //进入商品详情界面
  goodsDetail:function(){
      wx.navigateTo({
          url: '../cartGoodsDetail/cartGoodsDetail',
      })
  }
})