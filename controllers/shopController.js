const Shops = require('./../models/shopModel')

exports.index = async (req, res, next) => {

  console.log(Shops)

  try {
    const doc = await Shops.find().select(['-__v' ,'-createdAt'])
    console.log(doc)

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

    const doc = await Shops.create(req.body)
    res.status(200).json({
      status: 'success',
      data: doc
    })
  } catch (err) {
    res.send(404).json({
      status: 'Error'
    })
  }
}

/*

exports.index = async (req, res, next) => {
  const company = await Setting.findOne()
  console.log(company)
  return res.status(200).json({
    data: company
  })
}
*/