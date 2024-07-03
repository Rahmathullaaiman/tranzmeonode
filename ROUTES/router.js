const express = require('express')
const jwtmiddleware = require('../MIDDLEWARES/Jwtconfig')

const router = new express.Router()


//Controller
const Usercontroller = require("../CONTROLLER/usercontrol") 


//Routes

//1)Register
router.post('/user/register',Usercontroller.register)

//2)login
router.post('/user/login',Usercontroller.login)

//3) Get all user
router.get('/user/get',jwtmiddleware,Usercontroller.getAllUsers)

//4)get user details
router.get('/user/get/:id',jwtmiddleware,Usercontroller.getUser)





module.exports = router