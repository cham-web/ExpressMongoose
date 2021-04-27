var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs') // 引入ejs
const cors = require('cors')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose')
const { backData } = require('./utils') // 引入工具函数

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const api = require('./routes/api');



var app = express();


// 使用ejs模板引擎
app.engine('.html', ejs.__express)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 连接数据库
mongoose.connect(`mongodb://localhost:27017/mall`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

app.use(cors())

app.use(expressJwt({
  secret: 'test',  // 签名的密钥 或 PublicKey
  algorithms: ['HS256'],
}).unless({
  path: [/\//, '/api/v1/login', /\/resource\//]  // 指定路径不经过 Token 解析
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(res);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  if(err.name === 'UnauthorizedError') {
    
    res.json(backData({code: 5, message: 'token 过期'}))
    return
  }
  res.json(backData({code: 2, message: err.message}))
});

module.exports = app;
