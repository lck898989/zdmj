import Host from '../../utils/Const.js';
// components/goodsList1/goodsList1.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goods: {
            type: Object,
            value: {},
            obsever: function (newVal, oldVal) {
                
            }
        }
    },
    lifetimes: {
        created: function () {
            console.log("created()-->商品列表单元组件被创建...");
            console.log(this.data.goods);
        },
        attached: function () {
            console.log("商品列表项被创建-->", "attacher()");
        },
        ready: function () {
            console.log("商品列表信息" + 'ready()');
            console.log("goods is ", this.data.goods);
            let headList;
            //对头图进行切割
            if (this.data.goods.head instanceof Array) {
                headList = this.data.goods.head;
            } else if (typeof this.data.goods.head === 'string') {
                headList = this.data.goods.head.split(',');
            }
            console.log("headList is ", headList);
            this.data.headList = headList;
            this.setData({
                headList: this.data.headList
            })
        },
        moved: function () {
            console.log("该组件被移动了");
        },
        detached: function () {
            console.log("组件被节点树移动了");
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        host : Host.productionHost,
        headList : []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap: function (event) {
            console.log("event si ", event);
            console.log("enter the goodsList1");
            //利用缓存传递数据
            wx.setStorage({
                key: 'goods',
                data: this.data.goods,
            })
            wx.navigateTo({
                url: '../cartGoodsDetail/cartGoodsDetail'
            })
            // wx.switchTab({
            //   url: '/pages/self/self',
            // })
        }

    }
})
