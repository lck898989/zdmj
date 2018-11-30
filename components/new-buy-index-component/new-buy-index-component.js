// components/new-buy-index-component/new-buy-index-component.js
import Const from '../../utils/Const'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goods : {
            type  : Object,
            value : {}
        }
    },
    lifetimes : {
        created : function(){
            console.log("组件被创建");
        },
        ready : function(){
            console.log("组件已经准备完毕");
            console.log("goods is ",this.data.goods);
        }
    },
    pageLifetimes : {
        //页面被展示的时候调用
        show : function(){

        },
        //页面被隐藏时候调用
        hide : function(){

        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        host : Const.productionHost
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addCart : function(e){
            console.log("组件内的e is ",e);
            let dataSet = e.currentTarget.dataset;
            let id = dataSet.id;
            let eventOption = {
                bubbles : false,
            }
            this.triggerEvent('addcart',{id : id},eventOption);
            // console.log("dataSet is ",dataSet);
            // console.log("e is ",e);
            // console.log("e's id is ",);
        },
        enterDetail : function(e){
            console.log("准备进入商品详情");
            let dataSet = e.currentTarget.dataset;
            let id = dataSet.id;
            let eventOption = {
                bubbles : false,
            }
            this.triggerEvent('enterDetail',{id : id},eventOption);
        },
        test : function(e){
            console.log("in test e is ",e);
        }
    }
})
