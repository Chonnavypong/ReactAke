const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  role: {
    type: String,
    default: 'member'
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

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
})

schema.methods.correctPassword = async function (dbPassword, inputPassword) {
  return await bcrypt.compare(dbPassword, inputPassword)
}

module.exports = mongoose.model('User', schema)