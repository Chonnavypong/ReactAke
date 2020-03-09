const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  postcode: Number,
  created: Date
})

module.exports = mongoose.model('setting', schema)