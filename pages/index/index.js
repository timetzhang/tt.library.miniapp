//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    keyword: ''
  },

  bindSearchTap: function (e) {
    if (e.detail.value) {
      wx.navigateTo({
        url: '../list/list?keyword=' + e.detail.value
      })
    }
  },

  btnAddBook: function () {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../add/add?keyword=' + res.result
        })
      }
    })
  },

  onLoad: function () {
  }
})
