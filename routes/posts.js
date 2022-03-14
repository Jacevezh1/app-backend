// 1. Imports
const express = require('express');
const router = express.Router();

const postController = require('./../controllers/postController');


// 2. Routes
router.post("/create", postController.create);

router.get('/readall', postController.readAll);

router.get('/readone/:id', postController.readOne);

router.put('/edit/:id', postController.edit)

router.delete('/delete/:id', postController.delete)


module.exports = router;