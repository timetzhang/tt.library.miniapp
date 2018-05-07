//index.js
//获取应用实例
import index from "../index/index.js"
const app = getApp()

Page({
  data: {
    book: {
    }
  },

  onLoad: function (options) {
    var self = this;
    
    //通过扫描的ISBN查询书籍
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
        success: (res) => {
          if (res.data.affectedRows > 0) {
            wx.showModal({
              title: '添加成功',
              content: '是否继续添加?',
              success: function(resModal){
                if(resModal.confirm){
                  //再一次进行扫码添加书籍
                  wx.scanCode({
                    success: (resScanCode) => {
                      wx.request({
                        url: 'https://www.zhangtt.cn/library/searchBook?search=' + resScanCode.result,
                        success: function (resRequest) {
                          if (resRequest.data.length > 0) {
                            wx.showModal({
                              title: '本书已存在',
                              content: '是否继续添加?',
                              success: function (resModal) {
                                if (resModal.confirm) {
                                  wx.redirectTo({
                                    url: '../add/add?keyword=' + resScanCode.result
                                  })
                                }
                                else {
                                  wx.redirectTo({
                                    url: '../index/index'
                                  })
                                }
                              }
                            })
                          }
                          else {
                            wx.redirectTo({
                              url: '../add/add?keyword=' + resScanCode.result
                            })
                          }
                        }
                      })
                    }
                  })

                }
              }
            })
          }
          else{
            wx.showModal({
              title: '上传失败',
              content: res.data.sqlMessage,
            })
          }
        },
        fail: ()=>{
          wx.showModal({
            title: '上传失败',
            content: '数据请求失败, 请检查网络连接。',
          })
        }
      });
    }
  },

  inputUpdate: function(e){
    var tempBook = this.data.book
    tempBook[e.currentTarget.dataset.id] = e.detail.value
    this.setData({
      book: tempBook
    })
  }
})
