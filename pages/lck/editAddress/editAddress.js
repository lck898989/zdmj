// pages/lck/editAddress/editAddress.js
import tcity from '../../../utils/city.js';
import Request from '../../../utils/Request.js';
import Host from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //当前修改的地址
     currentAdd : null,
     provinces: [],
     province: "", 
     citys: [],
     city: "",
     countys: [],
     county: '',
     value: [0, 0, 0],
     values: [0, 0, 0],
     condition : false,
     //是否显示默认地址
     isShowDefault : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("options is ",options);
      //传递过来的地址对象
    //   this.data.currentAdd = options.currentAdd;
      this.setData({
          currentAdd : JSON.parse(options.currentAdd)
      });
      console.log("currentAdd is ",this.data.currentAdd);
      wx.showLoading({
        title:'数据加载中',
    })
    console.log("onLoad");
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    console.log("cityData is ",cityData);
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
        provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
        citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
        countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
        'provinces': provinces,
        'citys': citys,
        'countys': countys,
        'province': cityData[0].name,
        'city': cityData[0].sub[0].name,
        'county': cityData[0].sub[0].sub[0].name
    })
    // this.data.currentAdd.district = cityData[0].name + cityData[0].sub[0].name + cityData[0].sub[0].sub[0].name;
    this.setData({
        currentAdd : this.data.currentAdd
    })
    wx.hideLoading({
    })
},
   open : function(){
    //点击地址选项的时候默认地址消失
    this.setData({
        isShowDefault : false,
        condition : !this.data.condition
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
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    if(val[0] != t[0]){
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys:citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('city no');
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
    

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getEditUser : function(event){
    console.log("event is ",event);
    //具体的值
    let value = event.detail.value;
    this.data.currentAdd.recipient = value;
    
  },
  getEditPhone : function(event){
    let value = event.detail.value;
    this.data.currentAdd.phone = value;
    
  },
//   getEditAddress : function(event){
//     let value = event.detail.value;
//     this.data.currentAdd.district = value;
//     this.setData({
//         currentAdd : this.data.currentAdd
//     });
//   },
  getEditAddressDetail : function(event){
    let value = event.detail.value;
    this.data.currentAdd.detaildistrict = value;
   
  },
  commit : function(event){
    //关闭地址选择器
    this.setData({condition : !this.data.condition});
    //得到当前的地址
    let addressString = this.data.province + this.data.city + this.data.county;
    this.data.currentAdd.district = addressString;
    this.setData({
        currentAdd : this.data.currentAdd
    });
    console.log("省市区是",this.data.currentAdd.district);
  },
  saveEditAdd :async function(event){
      console.log("保存的时候地址数据是：",this.data.currentAdd);
      let newAdd = this.data.currentAdd;
      let url = Host.host + 'Data/EditAddress';
      let data = {
          address : {
              aid : newAdd.aid,
              uid : 1,
              phone : newAdd.phone,
              district : newAdd.district,
              detaildistrict : newAdd.detaildistrict,
              recipient : newAdd.recipient
          }
      }
      let req = new Request(url,data,'POST','text');
      let res = await req.sendRequest();
      console.log(res);
      if(res.data.encode === 0){
          await wx.showToast({
              title : `${res.data.msg}`
          });
          wx.navigateTo({
              url: '../address/address',
              
          })
      }
  }
})