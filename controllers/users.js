const Model = require('../model')
const { Users } = Model
const { backData } = require('../utils') // 引入工具函数
const jwt = require('jsonwebtoken');

const loginController = {
  login(req, res, next) {
    const {loginNo, password} = req.body
    Users.findOne({loginNo}).exec((err, user) => {
      console.log(user);
      if(!user || password !== user.password) {
        next({status: 200, message: '账号密码错误'})
        return
      }
      const token = jwt.sign({
        _id: user._id,
        loginNo: user.loginNo
      }, 'test', {expiresIn: '1d'})
      res.json(backData({data: {...user._doc, token}}))
    })
  },
  query(req, res, next) {
    const pageIndex = req.query.pageIndex && (req.query.pageIndex - 1) * req.query.pageSize || 0
    const pageSize = parseInt(req.query.pageSize) || 10
    let params = {}
    console.log(req.query);
    for (const key in req.query) {
      if(req.query[key]) {
        params[key] = {$regex: new RegExp(req.query[key])}
      }
    }
    Users.find(params)
      .skip(pageIndex)
      .limit(pageSize)
      .sort({addTime: -1})
      .exec((err, users) => {
      if(err) {
        next(err)
      }
      res.json(backData({data: users}, {
        pageIndex: parseInt(req.query.pageIndex) || 1,
        pageSize: pageSize
      }))
    })
  },
  create(req, res, next) {
    const requestBody = req.body
    const newUser = new Users(requestBody)
    newUser.save((err, saved) => {
      if(err) {
        next(err)
        return
      }
      res.json(backData({data: saved}))
    })
  },
  remove(req, res, next) {
    const {loginNo} = req.body
    Users.remove({loginNo},(err, removed) => {
      if(!removed.deletedCount) {
        next({status: 200, message: '未找到数据'})
        return
      }
      res.json(backData({data: removed}))
    })
  }
}

module.exports = loginController