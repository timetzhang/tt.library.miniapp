//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    keyword: ''
  },

  bindSearchTap: function(e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '../list/list?keyword=' + e.detail.value
    })
  },
  
  onLoad: function () {
  }
})
