const User = require('./../models/userModel')
const {
  validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('./../config/index')

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body
    // แบบ save()
    /*
    let user = new User()
    user.name = name
    user.email = email
    user.password = password
  
    await user.save()
    */
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {

      const error = new Error('ข้อมูลที่ส่งมาไม่ถูกต้อง') // เป็น error message
      error.statusCode = 422
      error.validation = errorValidation.array()

      throw error
    }
    const existEmail = await User.findOne({
      email
    })

    if (existEmail) {
      const error = new Error('Email ซ้ำ') // เป็น error message
      error.statusCode = 400

      throw error
    }

    const doc = await User.create({
      name,
      email,
      password
    })
    res.status(201).json({
      status: 'success',
      data: doc
    })
  } catch (err) {
    next(err) // จะวิ่งไปที่ middleware/errorHandler ให้ auto
  }
}

exports.login = async (req, res, next) => {

  try {
    const {
      email,
      password
    } = req.body

    if (!email || !password) {
      const error = new Error('กรุณากรอก Email และ Password') // เป็น error message
      error.statusCode = 403

      throw error
    }

    const user = await User.findOne({
      email
    })
    if (!user) {
      const error = new Error('There have no user')
      error.statusCode = 404
      throw error
    }
    const isValid = await user.validPassword(password)
    if (!isValid) {
      const error = new Error('Invalid Password')
      error.statusCode = 401
      throw error
    }
    // Json Web Token (JWT) Generate
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, {
      expiresIn: '5 days'
    })

    const expired_in = jwt.decode(token)

    res.status(200).json({
      status: 'success',
      access_token: token,
      expires_in: expired_in.exp,
      token_type: 'Bearer',
      data: user
    })

  } catch (err) {
    next(err)
  }
}

exports.me = (req, res, next) => {
  // ในส่วนนี้ สามารถนำ id ไป query ต่อได้ หรือ user populate etc ได้ ถ้ามี logic อื่นๆ 
  res.status(200).json({
    user: {
      id: req.user.id, // มาจาก passport (middleware/passwordJWT.js) ในส่วนของ user ที่ส่งออกมา
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  })
}

exports.index = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: [{
        id: 1,
        name: 'John'
      },
      {
        id: 2,
        name: 'Bob'
      }
    ]
  })
}

exports.show = (req, res, next) => {
  /*
    const id = req.params.id
    const name = req.params.name
  */
  // Destructuring req.params
  const {
    name,
    email,
    password
  } = req.params
  console.log(req.params)
  return res.status(200).json({
    name,
    email,
    password
  })
}

exports.showQuery = (req, res, next) => {
  const {
    id,
    name
  } = req.query
  console.log(req.query)

}