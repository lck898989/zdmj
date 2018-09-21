
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// //与服务器断链接发送请求
// ShortConnect(url1, data1, state) {
//   var self = this;
//   //发起网络请求
//   wx.request({
//     url: url1,
//     data: data1,
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     method: "POST",
//     success: function (res) {
//       console.log("11111111111111111" + JSON.stringify(res));
//       switch (state) {
//         case "code":
//           self.openid = res.data.username;
//           self.GetUserInfo(res);
//           break;
//         case "shop":
//           self.ShowShopDate(res);
//           break;
//         case "userInfo":
//           self.ShortConnect(self.url + "/commodity/ShowAllCommodity", {}, "shop");
//           break;
//       }
//     },
//   })
// },

module.exports = {
  formatTime: formatTime
}
