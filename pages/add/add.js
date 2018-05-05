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
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000,
              success: ()=>{
                setTimeout(()=> {
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }, 1000)
              }
            })
          }
          else{
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: ()=>{
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
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
