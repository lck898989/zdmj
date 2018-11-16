// pages/lck/address/address.js
import Request from  '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     add : '',
     isChecked : true,
     editor    : false,
     add       : false,
     username : '',
     phoneNumber : '',
     address : '',
     addressDetail : '',
     //模拟服务器送来的数据
      user : [],
     //将要发送到服务器的收货地址
     inputError : false,
     //用户名没有输入
     nameError : false,
     //输入的地址是否有误
     numberError : false,
     provinces: [],
     province: "", 
    //  citys: [],
    //  city: "",
    //  countys: [],
    //  county: '',
    //  value: [0, 0, 0],
    //  values: [0, 0, 0],
     condition: false,
     choosedAddColor : '#ec0023',
     unChoosedAddColor : '#eee',
     choosedAdd : null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      /**
       * 
       * 初始化城市信息
       */
      wx.showLoading({
          title:'数据加载中',
      })
      console.log("onLoad");
      this.getAddressList();
      
      let pageArr = getCurrentPages();
      console.log("页面栈是：",pageArr);

  },
  getAddressList : async function(){
      //请求所有收货地址的数据
      let url = app.host + 'Data/getAddressByUid';
      console.log("uid is ", app.uid);
      let data = {
          uid: app.uid
      }
      let req = new Request(url, data, "POST", 'text');
      let res = await req.sendRequest();
      //不显示数据加载中
      wx.hideLoading({

      })
      console.log("res is ", res.data.address);
      this.setData({
          user: res.data.address
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
  onShow: function (event) {
      console.log("in onShow user is ",this.data.user);
      console.log("event is ",event);
      this.getAddressList();
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
  stopEvent : function(event){
      console.log("in stop event is ",event);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addChanged : function(event){
    console.log("in addChanged event is ",event);
  },
  //添加新地址
  addAdd : function(){
      //跳转到编辑界面
      //转向编辑界面
      wx.navigateTo({
          url: '../editAddress/editAddress?currentAdd=addNew_order'
      })
  },
  //获得收货人姓名信息
  getGoods_user : function(event){
    console.log("event is ",event);
    console.log("add is ",this.data.add);
    let eventData = event.detail.value;
    if(this.data.add){
        this.setData({
            username : eventData
        });
        console.log("username is ",this.data.username);
    }else if(this.data.editor){
        let id_s = event.currentTarget.id;
        console.log("id is ",id_s);
        // this.data.user.username = eventData;
        this.data.user[id_s].username = eventData;
        console.log("username is ",this.data.user[id_s].username);
    }
  },
  //电话号码聚焦的时候检查用户名是否输入
  checkName : function(event){
      if(this.data.username === ''){
          this.setData({
              inputError : true,
              nameError  : true
          })
      }else{
          this.setData({
              inputError : false
          })
      }
  },
  //获得电话号码
  getPhoneNumber : function(event){
    let phoneNumber = event.detail.value;
    if(this.data.add){
        this.setData({
            phoneNumber : phoneNumber
        });
        console.log("phoneNumber is ", this.data.phoneNumber);
    }else if(this.data.editor){
        let id = event.currentTarget.id;
        console.log("id is ",id);
        this.data.user[id].phoneNumber = phoneNumber;
        console.log("phoneNumber is ",this.data.user[id].phoneNumber);
        // this.data.user[]
    }
  },
  //电话号码栏失去焦点之后检查电话号码是否正确
  checkNumber : function(event){
      console.log("in checkNumber's event is ",event);
      let pnumber = event.detail.value;
      let reg = /^1[0-9]{10}$/;
      let isRightNum = reg.test(pnumber);
      if(isRightNum){
          this.setData({
              inputError : false,
              numberError : false
          })
      }else{
          this.setData({
              inputError : true,
              numberError : true
          })
      }
    },
    //获得收货地址所在的地区
    getAddress: function (event) {
       let address = event.detail.value;
       if(this.data.add){
            this.setData({
                address : address
            });
            console.log("address is ", this.data.address);
       }else if(this.data.editor){
           //获取到id信息就是收货地址的id信息
           let id = event.currentTarget.id;
           this.data.user[id].address = address;
           console.log("address is ",this.data.user[id].address);
       }
    },
    //获得收货地址的详细信息
    getAddressDetail: function (event) {
        let addressDetail = event.detail.value;
        if(this.data.add){
            this.setData({
                addressDetail : addressDetail
            });
            console.log("addressDetail is ", this.data.addressDetail);
        }else if(this.data.editor){
            let id = event.currentTarget.id;
            this.data.user[id].addressDetail = addressDetail;
            console.log("addressDetail is ", this.data.user[id].addressDetail);
        }
    },
    startAdd : function(){
      if (this.data.user.phoneNumber === '') {
          this.setData({
              inputError: true,
              numberError: true
          });
      }
    },
    commit : function(event){
        this.setData({condition : !this.data.condition});
        let addressString = this.data.province + this.data.city + this.data.county;
        console.log("this.user is  ",this.data.user);
        if(this.data.add){
            this.setData({
                address : addressString
            });
            console.log("this.data is ",this.data);
        }else if(this.data.editor){
            console.log("in editor event is ",event);
            let id = event.currentTarget.id;
            console.log("id is ",id);
            this.data.user[id].address = addressString;
            console.log("address is ",this.data.user[id].address);
        }
    },
    over : function(event){
        let userDetail = this.data.user;
        this.setData({
            user: userDetail,
        });
        //设置用户信息
        console.log("this.data.user is ", this.data.user);
    },
    closeCityList : function(event){
        console.log("event is ",event);
        this.commit(event)
        this.setData({
            condition : false,
        })
    },
    //保存地址并将该地址信息发送到服务器
    saveAdd : async function(event){
        if(this.data.add){
            if(this.data.username !== '' && this.data.phoneNumber !== '' &&
            this.data.address !== '' && this.data.addressDetail !== ''){
                //发送请求
                console.log("enter the savaAdd ");
                let url = Host.host + 'Data/AddAddress'
                let addInfo = {
                    address : {
                        recipient: this.data.username,
                        phone: this.data.phoneNumber,
                        district: this.data.address,
                        detaildistrict: this.data.addressDetail,
                        uid: app.uid
                    }
                }
                let req = new Request(url,addInfo,"POST",'text');
                let res = await req.sendRequest();
                if(res.data.encode === 0){
                    wx.showToast({
                        title: `${res.data.msg}`,
                    });
                    let url = Host.host + 'Data/getAddressByUid';
                    let data = {
                        uid: app.uid
                    }
                    let req = new Request(url, data, "POST", 'text');
                    let result = await req.sendRequest();
                    console.log("result is ", result.data.address);
                    this.setData({
                        isChecked: !this.data.isChcked,
                        add: !this.data.add,
                        user: result.data.address
                    });
                    // //请求之后显示全部地址
                    // this.setData({
                    //     isChecked : !this.data.isChcked,
                    //     add : !this.data.add,
                    //     user : this.data.user
                    // });
                }
            }else{
                console.log("信息不完整");
                wx.showToast({
                    title: '信息不完整，请补充完整',
                    icon:'none'
                })
            }
        }else if(this.data.editor){
            console.log("保存编辑内容");
            let id = event.currentTarget.id;
            console.log("in sava user ",this.data.user[id]);
        }
        // let req = new Request();

    },
    //添加收货地址和编辑收货地址时候出发的返回事件
    back : function(){
        this.setData({
            add : false,
            editor : false,
            condition : false,
            isChecked : true,
            inputError : false,
        });
    },
    
    getAddressById : function(aid){
        let len = this.data.user.length;
        let findAdd = null;
        aid = Number(aid);
        console.log("len is ",len,"id is ",aid);
        for(let i = 0;i < len;i++){
            if(aid === this.data.user[i].aid){
                //其他的设为非默认地址
                this.data.user[i].state = 0;
                findAdd = this.data.user[i];
            }else{
                this.data.user[i].state = 1;
            }
        }
        this.setData({
            user : this.data.user
        });
        return findAdd;
    },
    getAddressByAid : function(aid){
        let len = this.data.user.length;
        let findAdd = null;
        aid = Number(aid);
        console.log("len is ",len,"id is ",aid);
        for(let i = 0;i < len;i++){
            if(aid === this.data.user[i].aid){
                return this.data.user[i];
            }
        }
    },
    getUsername : function(event){
        let aid = this.getAid(event);
        console.log("aid is ",aid);
        // let address = this.getAddressById(aid);
        // console.log("address is ",address);

    },
    stopEvent : function(event){
        console.log("in stopEvent event is ",event);
        
    },
    radioChange: function (event) {
        console.log("event is ", event);
        console.log("event.detail.value is ", event.detail.value);
        let aid = event.detail.value;
        console.log("user is ",this.data.user);
        aid = Number(aid);
        let add = this.getAddByAid(aid);
        console.log("该地址为：",add);
        this.setData({
            choosedAdd : add
        })
    },
    //确定选择该地址
    ensure : function(event){
        console.log("event is ",event);
        console.log("choosedAdd is ",this.data.choosedAdd);
        wx.setStorageSync('choosedAdd', this.data.choosedAdd);
        wx.navigateTo({
            url: '../order/order',
        })
    },
    getAddByAid : function(aid){
        let add = null;
        let userLen = this.data.user.length;
        for(let i = 0;i < userLen;i++){
            if(this.data.user[i].aid === aid){
                add = this.data.user[i];
                return add;
            }
        }
        return add;
    }

})