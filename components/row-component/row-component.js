import Goods from "../../utils/Goods";
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

    /**
     * 组件的初始数据
     */
    data: {
        host : Host.devHost
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap: function (event) {
            console.log("event si ", event);
            console.log("enter the goodsList1");
            let eventName = 'eventListener';
            let eventDetail = {
                goods: 'OK'
            };
            let eventOption = {
                bubbles: true,
                composed: true,
            };
            //自定义事件监听
            this.triggerEvent(eventName, eventDetail, eventOption);
            // wx.switchTab({
            //   url: '/pages/self/self',
            // })
        }

    }
})
