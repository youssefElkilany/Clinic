const { Router } = require ("express")
const   slotsController  = require('./Controller/slots.js')
const { auth } = require("../../middelware/Auth.js")
const roles = require("../../middelware/validation.js")
const validation = require("../../middelware/validation.js")
const val = require("./slots.validation.js")
const router = Router()

router.get("/",auth(roles.roles.admin),slotsController.allSlots) // role admin
router.get("/:doctorid",slotsController.viewSlots) // azwd hena role admin
//router.get('/doctorslots/:userid',auth(roles.roles.patient),slotsController.viewDoctorSlots) // show slots by patient

router.post("/",auth(roles.roles.doctor),slotsController.addSlots)
//roles.validation(val.addSlots)
//auth(roles.roles.doctor)

router.delete("/",slotsController.deleteslots)



module.exports = router