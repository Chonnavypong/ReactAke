const Setting = require('./../models/setting')

exports.index = async (req, res, next) => {
  console.log(Setting)
  const company = await Setting.find()
  console.log(company)
  res.status(200).json({
    data: company
  })
}

exports.createSetting = async (req, res, next) => {
  const doc = await Setting.create(req.body)
  res.status(200).json({
    data: doc
  })
}