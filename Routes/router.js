const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/uerController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


// register API
router.post('/user/register', userController.register)

// login API
router.post('/user/login',userController.login)

// add project
// router specific middleware
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addprojects)

// export router
module.exports = router

