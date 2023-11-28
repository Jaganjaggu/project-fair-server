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

// get User Projects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

// get all projects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

// get home Projects
router.get('/projects/home-projects',projectController.getHomeProjects)

// editProject
router.put('/projects/edits/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController)

// deleteProject
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

// updateUser
router.put('/user/edit/',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

// export router
module.exports = router
