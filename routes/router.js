const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddlware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()

//register :post request to http://localhost:3000/register
router.post('/register', userController.registerController)
//login :post request to http://localhost:3000/login
router.post('/login', userController.loginController)
//add project:post request http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single("projectimg"), projectController.addProjectController)

//home-projects:get request http://localhost:3000/home-projects
router.get('/home-projects',projectController.getHomeProjectsController)
//home-projects:get request http://localhost:3000/all-projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

//userprojects:get request http://localhost:3000/user-projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)


//remove-project:delete request http://localhost:3000/pid/remove-projects

router.delete('/:pid/remove-projects',jwtMiddleware,projectController.removeProjectController)


//edit-project:put request http://localhost:3000/pid/edit-projects

router.put('/:pid/edit-project',jwtMiddleware,multerMiddleware.single("projectimg"),projectController.editProjectController)


//edit-project:put request http://localhost:3000/user/edit


router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilepic"),userController.editProfileController)

//export router
module.exports = router








