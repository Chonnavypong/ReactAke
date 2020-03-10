const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

// Virtual Fields ที่ไม่มีอยู่จริงในฐานข้อมูล
let virtual = schema.virtual('name_price')
virtual.get(function (value, virtual, doc) {
    return this.name + ' ' + this.price
  }),

  schema.virtual('VAT').get(function () {
    return (this.price * 0.07).toFixed(2)
  })

schema.virtual('Total Price').get(function () {
  return (this.price * 1.07).toFixed(2)
})

module.exports = mongoose.model('Menu', schema)