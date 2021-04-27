const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model.bind(mongoose)
const ObjectId = mongoose.Schema.Types.ObjectId

// 用户
const usersSchema = Schema({
  id: ObjectId,
  loginNo: {
    type: String,
    unique: true,
    required: [true, '不能为空']
  },
  password: {
    type: String,
    required: [true, '不能为空']
  },
  addTime: {
    type: Date,
    default: Date.now
  }
})
// 新闻
const newsSchema = Schema({
  title: {
    type: String,
    required: [true, '产品不能为空']
  },
  desc: {
    type: String,
    default: null
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  classId: { type: ObjectId, ref: 'newscategory', required: [true, '分类不能为空'] }
})
// 新闻分类
const newscategorySchema = Schema({
  id: ObjectId,
  pic: {
    type: String,
    default: null
  },
  title: {
    type: String,
    unique: true,
    required: [true, '名称不能为空']
  },
  addTime: {
    type: Date,
    default: Date.now 
  }
});
// 用户
const Users = model('user', usersSchema)
// 新闻
const News = model('new', newsSchema)

const Newscategory = model('newscategory', newscategorySchema);

module.exports = {Users, News, Newscategory}