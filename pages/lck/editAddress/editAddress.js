/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-17 09:33:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-17 11:24:09
 */
// pages/lck/editAddress/editAddress.js

import Request from '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //地址类型
      dzleixing:{
          text : '公司',
          id   : 1
      },
     //当前修改的地址
     currentAdd : null,
     //是否显示默认地址
     isShowDefault : true,
     //是不是添加地址
     isAddress : false,
     addressText : "请输入收货地址所在的省市区",
     addressDetail : "道路/小区/写字楼/楼号/单元/门牌号",
     //添加地址的时候需要的信息
     username : '',
     phoneNumber : '',
     district : '',
     detailDistrict : '',
     state : false,
     errorObj : {
         infoError : false,
     },
     //从订单里面修改地址
     order_address : false,
     //所在城市字段
     locationAdd : '',
     imgHost : 'https://shopfile.ykplay.com/resources/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options is ",options);
      //传递过来的地址对象
    //   this.data.currentAdd = options.currentAdd;
    if (options.currentAdd === "addNew"){
        this.setData({
            isAddress : true,
        })
    }else if(options.currentAdd === 'addNew_order'){
        this.setData({
            order_address : true,
            isAddress : true
        })
    }else{
        //编辑地址
        this.setData({
            currentAdd: JSON.parse(options.currentAdd)
        });
        console.log("currentAdd is ", this.data.currentAdd);
        let addType = this.data.currentAdd.type;
        switch(addType){
            case 1:
                this.data.dzleixing.text = '公司';
                this.data.dzleixing.id   = 1;
                break;
            case 2:
                this.data.dzleixing.text = '住宅';
                this.data.dzleixing.id = 2;
                break;
            case 3:
                this.data.dzleixing.text = '学校';
                this.data.dzleixing.id = 3;
                break;
            case 4:
                this.data.dzleixing.text = '其他';
                this.data.dzleixing.id = 4;
                break;            
        }
        wx.showLoading({
            title: '数据加载中',
        });
        console.log("onLoad");
        // this.data.currentAdd.district = cityData[0].name + cityData[0].sub[0].name + cityData[0].sub[0].sub[0].name;
        this.setData({
            currentAdd: this.data.currentAdd,
            dzleixing : this.data.dzleixing
        })
        wx.hideLoading({

        })
    }
    console.log("data is ",this.data);
},
    //显示地址编辑界面
   showAddress : function(event){
       console.log("dfasdffff");
       let dataSet = event.currentTarget.dataset;
       if(dataSet.user === 'add'){
        //    this.checkNumber(event);
            if(!this.data.errorObj.infoError){
                console.log("in showAddress event is ", event);
                wx.navigateTo({
                    url: '../../../libs/citySelector/switchcity/switchcity?back_url=pages/lck/editAddress/editAddress',
                });
            }
       }else{
            console.log("in showAddress event is ",event);
            wx.navigateTo({
                url: '../../../libs/citySelector/switchcity/switchcity?back_url=pages/lck/editAddress/editAddress',
            })
       }
   },
   enterDetail : function(event){
       console.log("event is ",event);
   },
   open : function(){
    //点击地址选项的时候默认地址消失
    this.setData({
        isShowDefault : false,
    })
   },
   //所有信息都更新完毕之后进行重新设置绑定的数据
   updateAdd : function(event){
        this.setData({
            currentAdd : this.data.currentAdd
        });
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
      console.log("in onShow function this.data is ",this.data);
      console.log("in onShow function address is ",this.data.address);
      //添加地址的情况下
      if(this.data.isAddress){
        console.log("address is ",this.data.address);
        if(this.data.address !== undefined){
          if(this.data.address.street.includes('区')){
            this.data.district = this.data.address.province + this.data.address.city + this.data.address.district;
          }else if(this.data.address.street !== ''){
              this.data.district = this.data.address.province + this.data.address.city + this.data.address.district + this.data.address.street;
          }
          this.setData({
              district : this.data.district
          })
        }
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
  onReachBottom: function () {

  },
  getEditUser : function(event){
    console.log("event is ",event);
    let dataSet = event.currentTarget.dataset;
    if(dataSet.user === ''){
        //编辑用户信息
        let value = event.detail.value;
        this.data.currentAdd.recipient = value;
    }else{
        //添加新用户信息
        this.data.username = event.detail.value;
        console.log("在getEditUser中username is ",this.data.username);
    }
  },
  getEditPhone : function(event){
    let dataSet = event.currentTarget.dataset;
    if(dataSet.user === ''){
        let value = event.detail.value;
        this.data.currentAdd.phone = value;
    }else{
        //添加用户电话
        this.data.phoneNumber = event.detail.value;
        console.log("在getEditUser中username is ",this.data.phoneNumber);
    }
    
  },
//   getEditAddress : function(event){
//     let value = event.detail.value;
//     this.data.currentAdd.district = value;
//     this.setData({
//         currentAdd : this.data.currentAdd
//     });
//   },
  getEditAddressDetail : function(event){
    let dataSet = event.currentTarget.dataset;
    if(dataSet.user === ''){
        console.log("点击详细地址的时候currentAdd is ",this.data.currentAdd);
        let value = event.detail.value;
        this.data.currentAdd.detaildistrict = value;
        this.setData({
            currentAdd : this.data.currentAdd
        })
    }else{
        //添加用户详细地址
        this.data.detailDistrict = event.detail.value;
        console.log("详细地址是：",this.data.detailDistrict);
    }
   
  },
  commit : function(event){
    //得到当前的地址
    // let addressString = this.data.province + this.data.city + this.data.county;
    // this.data.currentAdd.district = addressString;
    // this.data.currentAdd = this.data.address.province + this.data.address.city+this.data.address.street;
    this.setData({
        currentAdd : this.data.currentAdd
    });
  },
  //设置默认地址
    setDefault : async function(event){
        console.log("event is ",event);
        let dataSet = event.currentTarget.dataset;
        let isDefaultAdd = dataSet.tag;
        this.data.state = (isDefaultAdd === 'true' ? true : false);
        //编辑地址的时候
        if(!this.data.isAddress){
            this.data.currentAdd.state = (isDefaultAdd === 'true' ? 0 : 1);
            //向服务器发送设置改地址为默认地址
            let aid = this.data.currentAdd.aid;
            console.log("aid is ",aid);
            let uid = app.uid;
            //将用户id和收货地址id发送给服务器改变默认值
            let url = app.host + 'Data/EditState';
            let data = {
                aid   : aid,
                uid   : uid,
                state : this.data.currentAdd.state 
            }
            console.log("data is ",data);
            let req = new Request(url, data, "POST", 'text');
            let res = await req.sendRequest();
            console.log("in changeEvent res is ", res);
            if (res.data.encode === 0) {
                console.log("adfadfasd");
            }
            this.setData({
                currentAdd : this.data.currentAdd,
            })
        }else{
            console.log("state is ",this.data.state);
            //增加地址的时候
            this.setData({
                state : this.data.state
            })
        }
    },
    getDefault : function(event){
        console.log("event is ",event.detail.value);
        this.data.state = event.detail.value;
    },
    deleteAdd: async function (event) {
        //向服务器发送删除请求
        let aid = this.data.currentAdd.aid;
        let url = app.host + 'Data/DeleteAddress';
        let data = {
            aid: aid,
            uid: app.uid
        }
        console.log("删除地址时候的data is ",data);
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("res is ", res);
        if (res.data.encode === 0) {
            //删除地址成功
            wx.showToast({
                title: `${res.data.msg}`,
            });
            wx.redirectTo({
                url: '../address/address',
            })

        }
    },
  //保存修改后的地址
  saveEditAdd :async function(event){
      let dataSet = event.currentTarget.dataset;
      let id = dataSet.id;
      let self = this;
      //编辑地址
      if(dataSet.user === ''){
        console.log("保存的时候地址数据是：",this.data.currentAdd);
        if(this.data.address !== undefined){
            this.data.currentAdd.district = this.data.address.province + this.data.address.city + this.data.address.district;
        }
        let newAdd = this.data.currentAdd;
        console.log("currentAdd is ",this.data.currentAdd);
        let url = app.host + 'Data/EditAddress';
        console.log("state is ",newAdd.state);
        let dzType = this.data.dzleixing.id;
        console.log("dzType is ",dzType);
        if(newAdd.recipient !== '' && newAdd.district !== '' && newAdd.detailDistrict !== '' && newAdd.phone !== ''){
            let data = {
                address : {
                    aid : newAdd.aid,
                    uid : app.uid,
                    phone : newAdd.phone,
                    district : newAdd.district,
                    detaildistrict : newAdd.detaildistrict,
                    recipient : newAdd.recipient,
                    state : newAdd.state,
                    "type" : dzType
                }
            }
            console.log("编辑地址时候发送到服务器的数据 data is ",data);
            let req = new Request(url,data,'POST','text');
            let res = await req.sendRequest();
            console.log(res);
            if(res.data.encode === 0){
                await wx.showToast({
                    title : `${res.data.msg}`,
                });
                wx.navigateTo({
                    url: '../address/address',
                })
            }
        }
      }else{
        //添加地址
        console.log("username is ",this.data.username);
        console.log("phoneNumber is ",this.data.phoneNumber);
        console.log("district is ",this.data.district);
        console.log("detailDistrict is ",this.data.detailDistrict);
        console.log("state is ",this.data.state);
        console.log("地址类型是：", this.data.dzleixing);
        let dzType = 0;
        switch(this.data.dzleixing.text){
            case '公司':
                dzType = 1;
                break;
            case '住宅':
                dzType = 2;
                break;
            case '学校':
                dzType = 3;
                break;
            case '其他':
                dzType = 4;
                break;
        }
        if(this.data.username !== '' && this.data.phoneNumber !== '' && this.data.district !== '' && this.data.detailDistrict !== ''){
            let url = app.host + 'Data/AddAddress'
            let data = {
                address : {
                    recipient      : this.data.username,
                    phone          : this.data.phoneNumber,
                    district       : this.data.address.province + this.data.address.city + this.data.address.district,
                    detaildistrict : this.data.detailDistrict,
                    uid            : app.uid,
                    state          : this.data.state ? 0 : 1,
                    "type"         : dzType
                }
            }
            console.log("data is ",data);
            let req = new Request(url,data,"POST",'text');
            let res = await req.sendRequest();
            console.log("in addAddress res is ",res);
            if(res.data.encode === 0){
                console.log("添加成功：",`${res.data.msg}`);
                wx.showToast({
                    title : `${res.data.msg}`,
                    success : function(){
                        if(self.data.isAddress && self.data.order_address){
                            //返回地址列表页
                            wx.redirectTo({
                                url: '../orderAddress/orderAddress',
                                success: function (res) {
                                    // success
                                },
                            });
                        }else if(self.data.isAddress && !self.data.order_address){
                            //返回地址列表页
                            wx.redirectTo({
                                url: '../address/address',
                                success: function(res){
                                    // success
                                },
                            });
                        }
                    }
                })
            }
        }else{
            console.log("信息不完善");
            wx.showToast({
                title : '请完善相关信息！',
                icon : 'none'
            })
        }
      }
    },
    //检查收货人是否添加了
    checkName : function(event){
        console.log("event is ",event);
        let dataSet = event.currentTarget.dataset;
        //添加地址的时候检查用户名是否添加
        if(dataSet.user === 'add'){
            if(this.data.username === ''){
                this.data.errorObj.infoError = true;
                this.data.errorObj.errorMsg = '用户名不能为空!';
                //收货人信息错误
                this.setData({
                    errorObj : this.data.errorObj
                });
            }else{
                this.data.errorObj.infoError = false;
                this.setData({
                    errorObj : this.data.errorObj
                });
            }
        }
    },
    //电话号码栏失去焦点之后检查电话号码是否正确
  checkNumber : function(event){
    console.log("in checkNumber's event is ",event);
    let dataSet = event.currentTarget.dataset;
    if(dataSet.user === 'add'){
        let pnumber = event.detail.value;
        let reg = /^1[0-9]{10}$/;
        let isRightNum = reg.test(pnumber);
        console.log("isRightNum is ",isRightNum);
        if(!isRightNum){
            this.data.errorObj.infoError = true;
            this.data.errorObj.errorMsg = '电话号码不合法!';
            this.setData({
                errorObj : this.data.errorObj
            })
        }else{
            this.data.errorObj.infoError = false;
            this.setData({
                errorObj : this.data.errorObj
            })
        }
    }
  },
  //选择地址类型-张超伟
  dzleixing2(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    console.log(JSON.parse(e.currentTarget.id));
    this.setData({
      dzleixing: {
          text : JSON.parse(e.currentTarget.id).lx,
          id   : parseInt(id)
      }
    })
  },
})