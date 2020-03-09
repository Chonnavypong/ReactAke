const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController')

/* GET users listing. */
router.get('/', userController.index);
router.get('/:id/fullname/:name', userController.show);

module.exports = router;