const express = require('express')
const router = express.Router()

const shopController = require('./../controllers/shopController')

router.route('/')
  .get(shopController.index)
  .post(shopController.store)

router.get('/menu', shopController.menu)
router.get('/:id', shopController.getShopWithMenu)

module.exports = router