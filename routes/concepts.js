const express = require('express');
const router = express.Router();

const conceptController = require('./../controllers/conceptController');

// Routes

router.post("/create", conceptController.create);

router.get('/readall', conceptController.readAll);

router.get('/readone/:id', conceptController.readOne);

router.put('/edit/:id', conceptController.edit);

router.delete('/delete/:id', conceptController.delete)

module.exports = router;