const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  photo: String,
  location: {
    lat: Number,
    lgn: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date
})

module.exports = mongoose.model('Shop', schema)