const express=require('express')
const router=express.Router()
const UserController=require('../controllers/users.controller')



/**add user */
router.post('/users',UserController.AddUser)

/**find all user */
router.get('/users',UserController.FindAllUsers)

/**find singel user */
router.get('/users/:id',UserController.findSingleUser)

/**udate singel user */
router.put('/users/:id',UserController.updateUser)
/**delete singel user */

router.delete('/users/:id',UserController.deleteUser)


module.exports=router