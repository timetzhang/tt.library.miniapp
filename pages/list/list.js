//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    books: []
  },
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://www.zhangtt.cn/library/searchBook?search=' + options.keyword,
      success: function (res) {
        if (res.data.length > 0){
          self.setData({
            books: res.data
          });
        }
      }
    })
  }
})
