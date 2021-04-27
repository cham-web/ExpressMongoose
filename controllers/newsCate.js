const Model = require('../model')
const { Newscategory } = Model
const { backData } = require('../utils') // 引入工具函数

const categoryController = {
  query(req, res, next) {
    
    const pageIndex = req.query.pageIndex && (req.query.pageIndex - 1) * req.query.pageSize || 0
    const pageSize = parseInt(req.query.pageSize) || 10
    let params = {}
    for (const key in req.query) {
      if(req.query[key]) {
        params[key] = {$regex: new RegExp(req.query[key])}
      }
    }
    Newscategory.find(params)
      .skip(pageIndex)
      .limit(pageSize)
      .sort({addTime: -1})
      .exec((err, users) => {
        console.log(users);
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
    console.log(Newscategory, '7---------');
    const requestBody = req.body
    const Newscategorys = new Newscategory(requestBody)
    Newscategorys.save((err, saved) => {
      if(err) {
        next(err)
        return
      }
      res.json(backData({data: saved}))
    })
  },
  edit(req, res, next) {
    console.log(req.body);
  },
  del(req, res, next) {
    const {id} = req.body
    Newscategory.remove({id},(err, removed) => {
      if(!removed.deletedCount) {
        next({status: 200, message: '未找到数据'})
        return
      }
      res.json(backData({data: removed}))
    })
  }
}

module.exports = categoryController