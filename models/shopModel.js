const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    default: 'nopic.png'
  },
  location: {
    lat: Number,
    lgn: Number
  }
}, {
  timestamps: true,
  collection: 'shops' // เอาไว้ custom เปลี่ยนชื่อตามรางตามต้องการ ปรกติจะ map auto shop กับ shops ใน mongoDB
})

module.exports = mongoose.model('Shop', schema)