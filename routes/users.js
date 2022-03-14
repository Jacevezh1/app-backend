// 1. Importaciones
const express = require('express')
const router = express.Router()


const userController = require('./../controllers/userController')
const authorization = require('./../middlewares/authorization')


// 2. Rutas

router.use('/create', userController.create)






// 3. Exportacion
module.exports = router;