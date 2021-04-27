const multer= require('multer') // 引入上传插件
const path = require('path')
const { backData } = require('../utils') // 引入工具函数


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../public/images'))
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

var folder = multer({ dest: 'public/resource' }).single('file')

const commonController = {
  upload(req, res, next) {
    folder(req, res, err => {
      if(err) {
        next(err)
        return
      } else if (!req.file) {
        next({status: 200, message: '文件错误'})
        return
      }
      console.log(req.file);
      res.json(backData({data: `/resource/${req.file.filename}`}))
    })
  }
}

module.exports = commonController