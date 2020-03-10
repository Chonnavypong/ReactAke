const User = require('./../models/userModel')

exports.register = async (req, res, next) => {
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
  const doc = await User.create({
    name,
    email,
    password
  })
  res.status(201).json({
    status: 'success',
    data: doc
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