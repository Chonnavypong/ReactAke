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
    id,
    name
  } = req.params
  console.log(req.params)
  return res.status(200).json({
    id: id,
    name: name
  })
}

exports.showQuery = (req, res, next) => {
  const { id, name } = req.query
  console.log(req.query)

}