const config = require('./../config/index')
const Shop = require('./../models/shopModel')
const Menu = require('./../models/menuModel')

exports.index = async (req, res, next) => {

  try {
    const docs = await Shop.find()
      .select('name photo location')
      .sort({
        _id: -1
      }) // sort ต้องอยู่หลังสุด
    // console.log(doc)
    // photo ใส่ url
    const shopWithPhoto = await docs.map((shop, index) => {
      return {
        id: shop._id,
        name: shop.name,
        photo: `${config.DOMAIN}/images/${shop.photo}`,
        location: shop.location
      }
    })

    // console.log(shopWithPhoto)

    res.status(200).json({
      lenght: shopWithPhoto.length,
      data: shopWithPhoto
    })

  } catch (err) {
    res.send(404).json({
      status: 'Error',
      message: err.message
    })
  }
}

exports.menu = async (req, res, next) => {
  try {
    // const doc = await Menu.find().select(['name', 'price', '-_id'])
    // const doc = await Menu.find({
    //   price: {
    //     $gte: 50,
    //     $lte: 150
    //   }
    // })
    const doc = await Menu.find().populate('shop', 'name location').sort('-_id') // shop คือ ref ใน menuModel ต้องชื่อเหมือนกัน โดยเลือกเฉพาะ fields name และ location เขียนได้อีกแบบคือ ['name', 'location']

    // console.log(doc)
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

exports.getShopWithMenu = async (req, res, next) => {
  const {
    id
  } = req.params

  // findOne with path ใน populate
  // const doc = await Shop.findOne({
  //   _id: id
  // }).populate({
  //   path: 'menus'
  // })

  const doc = await Shop.findById(id).populate('menus')
  res.status(200).json({
    data: doc
  })

}

// Insert Shop
exports.store = async (req, res, next) => {
  try {
    // console.log(req.body)
    // แบบ create
    // const doc = await Shop.create(req.body)

    // แบบ save
    const doc = new Shop(req.body)
    await doc.save()

    // แบบ save destructuring save เฉพาะบาง fields
    /*
    const { name, location } = req.body
    const shop = new Shop({
      name: name,
      location: location
    })
    await shop.save()
    */

    res.status(201).json({
      status: 'success',
      data: doc
    })
  } catch (err) {
    res.send(404).json({
      status: 'Error',
      message: err.message
    })
  }
}