const express = require('express');
const router = express.Router();
const passportJWT = require('./../middleware/passportJWT')

const userController = require('./../controllers/userController')
const {
  body
} = require('express-validator')

/* GET users listing. */
router.get('/', userController.index);
router.get('/:id/fullname/:name', userController.show);
router.post('/register', [
  body('name').not().isEmpty().withMessage('กรุณากรอกชื่อด้วย'),
  body('email').not().isEmpty().withMessage('กรุณากรอก Email').isEmail().withMessage('กรุณากรอกเฉพาะ Email เท่านั้นน'),
  body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({
    min: 3
  }).withMessage('รหัสผ่านต้องไม่ต้อยกว่า 3 ตัวอักษร')
], userController.register)
router.post('/login', userController.login)
router.get('/me', passportJWT.isLogin, userController.me)

module.exports = router;