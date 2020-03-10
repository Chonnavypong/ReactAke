const config = require('../config/index')
const Menu = require('../models/menuModel')

exports.index = async (req, res, next) => {

  try {
    const menu = await Menu.find()

    res.status(200).json({
      lenght: menu.length,
      data: menu
    })

  } catch (err) {
    res.send(404).json({
      status: 'Error',
      message: err.message
    })
  }
}