// pages/goodsList.js
let app = getApp();
import Host from '../../utils/Const'
Component({
    //包含多个slot节点的时候需要声明的
    options: {
        multipleSlots: true
    },
    //组件之间代码复用机制   
    behaviors: [],
    /**
     * 组件的属性列表
     */
    properties: {
        pro: {
            type: String,
            value: '',
            //数据发生变化的时候出发该事件
            observer: function (newVal, oldVal, changedPath) {
                console.log("newVal is ", newVal);
                console.log("oldVal is ", oldVal);
            }
        },
        //商品类
        goods: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal, changedPath) {
                
            }
        },
        

    },
    computed : {
        headList : function(){
            console.log("in headList goods is ",this.data.goods);
            if(this.data.goods.length !== 0){
                let headList;
                //对头图进行切割
                if (this.data.goods.head instanceof Array) {
                    headList = this.data.goods.head;
                } else if (typeof this.data.goods.head === 'string') {
                    headList = this.data.goods.head.split(',');
                }
                return headList;
            }
        }
    },
    lifetimes: {
        created: function () {
            
        },
        attached: function () {
            console.log("商品列表项被创建-->", "attacher()");
        },
        ready: function () {
            // console.log("goods is ", this.data.goods);
            // let headList;
            // //对头图进行切割
            // if (this.data.goods.head instanceof Array) {
            //     headList = this.data.goods.head;
            // } else if (typeof this.data.goods.head === 'string') {
            //     headList = this.data.goods.head.split(',');
            // }
            // console.log("headList is ", headList);
            // this.setData({
            //     headList : headList
            // })
            console.log("headList is ",this.data);
        },
        show: function () {
            console.log("pagelifetimes show");
            console.log("----->>>>page is showed again.....");
        },
        hide: function () {
            console.log("pagelifetimes hide");
        },
        moved: function () {
            console.log("该组件被移动了");
            console.log("in moved data is ",this.data.goods);
        },
        detached: function () {
            console.log("组件被节点树移动了");
            console.log("in detached data is ", this.data.goods);
        },
    },
    //组件所在页面的生命周期声明对象，
    pageLifetimes: {
        show: function () {
            console.log("pagelifetimes show");
            console.log("----->>>>page is showed again.....");
        },
        hide: function () {
            console.log("pagelifetimes hide");
        }
    },
    /**
     * 组件的初始数据 进行模板渲染
     */
    data: {
        host : Host.productionHost,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function () {
            this.data.paramA,
            this.data.paramB
        },
        onMyButtonTap: function () {
            this.setData({

            })
        },
        _myPrivateMethod: function () {
            this.setData({

            })
        },
        anotherEventListener: function (e) {
            console.log("e is ", e);
        },
        onTap: function () {
            console.log("in listComponent goods is ",this.data.goods);
            console.log("goods String is ",JSON.stringify(this.data.goods));
            //利用缓存传递页面数据
            wx.setStorage({
                key: 'goods',
                data: this.data.goods,
            })
            wx.navigateTo({
                url: '../cartGoodsDetail/cartGoodsDetail'
            })
        }
    }
})
