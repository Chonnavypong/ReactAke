const Shop = require('./../models/shopModel')

exports.index = async (req, res, next) => {

  try {
    const doc = await Shop.find().select(['-__v'])
    // console.log(doc)

    res.status(200).json({
      lenght: doc.length,
      data: doc
    })

  } catch (err) {
    res.send(404).json({
      status: 'Error',
      message: err.message
    })
  }
}

exports.createShop = async (req, res, next) => {
  try {
    console.log(req.body)

    const doc = await Shop.create(req.body)
    res.status(200).json({
      status: 'success',
      data: doc
    })
  } catch (err) {
    res.send(404).json({
      status: 'Error',
      message: err.message
    })
  }
}