//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    book: {
    }
  },

  onLoad: function (options) {
    var self = this;

    wx.request({
      url: 'https://www.zhangtt.cn/library/searchOnlineBook?search=' + options.keyword,
      success: function (res) {
        if (res.data) {
          self.setData({
            book: res.data
          });
        }
      }
    })
  },

  bindTapAdd: function () {
    var self = this;
    var valid = true; //检查data

    if (self.data.book.name == '' && self.data.book.name == null) {
      valid = false;
    }
    if (self.data.book.author == '' && self.data.book.author == null) {
      valid = false;
    }
    if (self.data.book.place == '' && self.data.book.author == place) {
      valid = false;
    }

    if (valid) {
      wx.request({
        url: 'https://www.zhangtt.cn/library/newBook',
        data: self.data.book,
        method: 'POST',
        success: function (res) {
          if (res.data) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        }
      });
    }
  }
})
