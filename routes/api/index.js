const express = require('express');
const router = express.Router()
const usersController = require('../../controllers/users')
const newsController = require('../../controllers/news')
const newCatesController = require('../../controllers/newsCate')
const commonController = require('../../controllers/common')

router.post('/login', usersController.login)
router.post('/user/create', usersController.create)
router.get('/user/query', usersController.query)
router.post('/user/del', usersController.remove)

router.get('/news/query', newsController.query)
router.post('/news/edit', newsController.edit)
router.post('/news/create', newsController.create)
router.post('/news/del', newsController.del)

router.get('/newCates/query', newCatesController.query)
router.post('/newCates/edit', newCatesController.edit)
router.post('/newCates/create', newCatesController.create)
router.post('/newCates/del', newCatesController.del)

/**
 * 公众接口
 */
router.post('/common/upload', commonController.upload) // 上传文件

module.exports = router
