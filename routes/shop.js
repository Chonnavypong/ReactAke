const express = require('express')
const router = express.Router()

const shopController = require('./../controllers/shopController')

router.route('/')
  .get(shopController.index)
  .post(shopController.createShop)

module.exports = router