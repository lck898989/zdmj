// components/index-type-detail-component/index-type-detail-component.js
import Const from '../../utils/Const.js'
let app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        easyItem : {
            type  : Object,
            value : {}
        },
        shadow : {
            type  : String,
            value : '#d0d0d0'
        }
    },
    ready : function(){
        console.log("data is ",this.data);
        console.log("easyItem is ",this.data.easyItem);
        console.log("shadown is ",this.data.shadow);
        //对图片的高度取整
        this.data.easyItem.height = Math.round(this.data.easyItem.height);
        console.log("图片的高度是：",this.data.easyItem.height);
        if(this.data.easyItem.productstype === 'shopessays'){
            this.data.isShopEssays = true;
            this.data.isEssays = false;
            this.data.isProduct = false;
            if(this.data.easyItem.shopessaycustom === 1 && this.data.easyItem.shopessaycustomhead !== ''){
                this.data.headImg = this.data.easyItem.shopessaycustomhead;
                console.log("headImg is ", this.data.headImg);
                this.setData({
                    headImg: this.data.headImg
                });
            }else{
                this.setData({
                    headImg : this.data.easyItem.shopessayhead[0]
                })
            }
        }else if(this.data.easyItem.productstype === 'essays'){
            this.data.isEssays = true;
            this.data.isProduct = false;
            this.data.isShopEssays = false;
            if(this.data.easyItem.essaycustom === 1 && this.data.easyItem.essaycustomhead !== ''){
                this.data.headImg = this.data.easyItem.essaycustomhead;
                console.log("headImg is ",this.data.headImg);
                this.setData({
                    headImg : this.data.headImg
                });
            }else{
                this.setData({
                    headImg : this.data.easyItem.essayhead[0]
                })
            }
        }else if(this.data.easyItem.productstype === 'products'){
            this.data.isProduct = true;
            this.data.isEssays = false;
            this.data.isShopEssays = false;
            if (this.data.easyItem.custom === 1 && this.data.easyItem.customhead !== '') {
                this.data.headImg = this.data.easyItem.customhead;
                console.log("headImg is ", this.data.headImg);
                this.setData({
                    headImg: this.data.headImg
                });
            } else {
                this.setData({
                    headImg: this.data.easyItem.head[0]
                })
            }
        }
        console.log('isProduct is ',this.data.isProduct);
        console.log('isEssays is ',this.data.isEssays);
        console.log('isShopEssays is ', this.data.isShopEssays);
        this.setData({
            isShopEssays : this.data.isShopEssays,
            isEssays     : this.data.isEssays,
            isProduct    : this.data.isProduct
        })
    },
    /**
     * 组件的初始数据
     */
    data: {
        imgHost      : Const.productionHost,
        //推荐的商品
        isProduct    : false,
        //推荐的文章商品
        isEssays     : false,
        //推荐的店铺文章
        isShopEssays : false,
        //头图图片
        headImg      : ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //进入商品或者店铺文章的详情，当时
        enterGoodsOrStore : function(e){
            let self = this;
            if(this.data.isProduct){
                //跳转商品详情
                console.log("进入商品详情");
                console.log("当前的essayitem is", this.data.easyItem);
                wx.setStorage({
                    key     : 'goods',
                    data    :  self.data.easyItem,
                    success : function(){
                        console.log("设置缓存成功可以再商品详情界面进行调用");
                    }
                });
                wx.navigateTo({
                    url: '../cartGoodsDetail/cartGoodsDetail',
                })
            }else if(this.data.isEssays){
                //跳转文章详情界面
                console.log("进入文章详情");
                app.wenzhangJson = null;
                app.ShortConnect(app.urlw + "Data/GetEssayInfo", {
                    pid : self.data.easyItem.pid,
                    eid : self.data.easyItem.eid,
                    uid : app.uid
                }, "interWenZhang",function(r){
                    console.log("商品文章 r is ",r);
                });
                let essayhead = this.data.easyItem.essayhead;
                // let essayuid = this.data.easyItem.e
                let title = this.data.easyItem.title;
                let authorurl = this.data.easyItem.wxhead;
                let authorname = this.data.easyItem.wxnickname;
                // let shopurl = this.data
                let pid = this.data.easyItem.pid;
                let eid = this.data.easyItem.eid;
                wx.navigateTo({
                    url: '../../ActicleScene/ActicleScene?essayhead='+essayhead + '&title='+title + '&authorurl='+authorurl + '&authorname='+authorname + '&pid='+pid + '&eid='+eid,
                })
                
            }else if(this.data.isShopEssays){
                console.log("进入商铺文章详情");
                let data = {
                    shopid : this.data.easyItem.shopid,
                    uid    : app.uid
                }
                console.log("easyItem is ",this.data.easyItem);
                let shopjson2 = encodeURIComponent(JSON.stringify(this.data.easyItem));
                app.wenzhangShop = null;
                app.ShortConnect(app.urlw + "Data/GetShopProductsByShopEssayShopid", {
                    shopid: this.data.easyItem.shopid,
                    uid: app.uid
                }, "turnShopWen",function(r){
                    console.log("商铺文章 r is ",r);
                });
                let shopurl = this.data.easyItem.shopessayhead;
                let introduction = this.data.easyItem.shoptitle;
                let shopjson = shopjson2;
                wx.navigateTo({
                    url: '../../ShopActicle/ShopActicle?shopurl='+ shopurl + '&introduction=' + introduction + '&shopjson='+shopjson2,
                })
            }
        }
    }
})
