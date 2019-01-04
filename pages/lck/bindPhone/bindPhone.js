// pages/lck/bindPhone/bindPhone.js
import Request from '../../../utils/Request';
import Const from '../../../utils/Const';
let app = getApp();
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //绑定的手机号
        bindNumber : '',
        showDel    : false,
        //点击下一步按钮
        clickNext  : false,
        //简略版的手机号码
        simplePhone : '',
        //倒计时
        cutdownTime : 58,
        //倒计时开始
        cutdownStart : false,
        //输入框的个数
        inputArr : 6,
        //输入框是否聚焦
        isFocus : false,
        //输入的内容
        value : [],
        //是否密文显示
        isPasswword : true,
        //是否是修改电话号码
        isEditorPhoneNumber : false,
        //是否是输入手机号了
        isInputNumber : false,
        //输入框的值
        ipkey : ''
    },
    //获得用户输入的手机号
    getNumber : function(e){
        console.log(e.detail.value);
        this.setData({
            isInputNumber : true
        })
        if(e.detail.value.length > 0){
            this.setData({
                showDel : true
            })
            this.setData({
                bindNumber : e.detail.value
            })
            // this.checkPhoneNumber(e.detail.value);
        }else{
            this.setData({
                showDel : false
            })
        }
    },
    //检查手机号码的合法性
    checkNum : function(e){
        console.log("电话号码是 ",e.detail.value);
        e.detail.value = e.detail.value || this.data.bindNumber;
        this.checkPhoneNumber(e.detail.value);
    },
    //检查手机号码
    checkPhoneNumber : function(str){
        let reg = /^1[0-9]{10}$/;
        let isValid = reg.test(str);
        if (!isValid) {
            wx.showToast({
                title: '手机号码不合法',
                icon: 'none'
            });

        } else {
            this.setData({
                bindNumber: str
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("options is ",options);
        console.log("phoneNumber is ",options.phoneNumber);
        if(options.phoneNumber === ''){
            this.setData({
                isEditorPhoneNumber : false
            });
        }else{
            this.setData({
                isEditorPhoneNumber : true,
                bindNumber          : options.phoneNumber,
                showDel             : true
            })
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
    //点击下一步按钮
    next : function(e){
        if(this.data.bindNumber !== ''){
            this.data.simplePhone = this.data.bindNumber.substring(0,3) + '****' + this.data.bindNumber.substring(7);
            console.log("simplePhone is ",this.data.simplePhone);
            this.setData({
                clickNext    : true,
                simplePhone  : this.data.simplePhone,
                cutdownStart : true
            })
            //开启计时器
            let timer = setInterval(function(){
                this.data.cutdownTime = this.data.cutdownTime - 1;
                if(this.data.cutdownTime === 0){
                    //清除计时器
                    clearInterval(timer);
                    //重置计时器
                    this.data.cutdownTime = 58;
                    //重置计时器开始标记
                    this.setData({
                        cutdownStart : false,
                        clickNext    : false,
                    })
                }
                this.setData({
                    cutdownTime : this.data.cutdownTime
                })
            }.bind(this),1000)
        }
    },
    tap :function(){
        let self = this;
        self.setData({
            isFocus : true,
        });
    },
    //获取验证码信息
    getAuthCode : function(e){
        console.log('验证码信息是：',e.detail.value);
        if (e.detail.value == '') {
            this.setData({
                value: [],
                ipkey: '',
            })
            return;
        }
        var regNum = new RegExp('[0-9]', 'g');
        var k = e.detail.value;
        var rsNum = regNum.exec(k[k.length - 1]);
        if (rsNum == null) {
            console.log(22222222)
            this.setData({
                ipkey: this.data.ipkey,
            })
            return;
        }
        this.data.value = [];
        for(let i = 0;i < e.detail.value.length;i++){
            let tempJson = {};
            tempJson.active = true;
            tempJson.text = e.detail.value[i];
            this.data.value.push(tempJson);
        }
        this.setData({
            value : this.data.value
        })
        if(this.data.value.length === 6){
            //将验证码发送到服务器进行验证

        }
    },
    //删除手机号
    delNumber : function(e){
        console.log("e is ",e);
        //删除手机号和不显示删除手机号图标
        this.setData({
            bindNumber : "",
            showDel    : false
        })
    }
})