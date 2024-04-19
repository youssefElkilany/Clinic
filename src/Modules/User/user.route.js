const { Router } = require ("express")
const   userController  = require('./Controller/user.js')
const { auth } = require("../../middelware/Auth.js")
const { roles } = require("../../middelware/validation.js")
const router = Router()

router.get("/",auth(roles.admin),userController.getUsers)
router.get('/all',auth(roles.admin),userController.allUsers) // kolo lazm admin
router.get('/doctors',auth(roles.admin),userController.getdoctors)

module.exports = router

