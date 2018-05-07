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
      success: (resScanCode) => {
        
        wx.request({
          url: 'https://www.zhangtt.cn/library/searchBook?search=' + resScanCode.result,
          success: function (resRequest) {
            if (resRequest.data.length > 0) {
              wx.showModal({
                title: '本书已存在',
                content: '是否继续添加?',
                success: function(resModal){
                  if (resModal.confirm){
                    wx.navigateTo({
                      url: '../add/add?keyword=' + resScanCode.result
                    })
                  }
                  else{
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  }
                }
              })
            }
            else{
              wx.navigateTo({
                url: '../add/add?keyword=' + resScanCode.result
              })
            }
          }
        })
        
      }
    })
  },

  onLoad: function () {
  }
})
