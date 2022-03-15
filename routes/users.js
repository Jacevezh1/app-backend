// 1. Importaciones
const express = require('express')
const router = express.Router()


const userController = require('./../controllers/userController')
const authorization = require('./../middlewares/authorization')


// 2. Rutas

router.post('/create', userController.create)

router.post("/login", userController.login)

router.get("/verifytoken", authorization, userController.verifyToken)


// 3. Exportacion
module.exports = router;