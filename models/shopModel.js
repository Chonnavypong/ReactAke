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
  collection: 'shops', // เอาไว้ custom เปลี่ยนชื่อตามรางตามต้องการ ปรกติจะ map auto shop กับ shops ใน mongoDB
  toJSON: {
    virtuals: true
  }, // Virtual Pนpulate ต้องใส่ Option นี้ด้วย
  toObject: {
    virtuals: true
  } // Virtual Pนpulate ต้องใส่ Option นี้ด้วย ถ้า ข้อมูลเป็น Object
})

// สร้าง Virtual Field แบบ Reference
// menus คือ virtual fields ใน shop model
// PK _id ของ shop ที่ถูกอ้างอิงใน menu model ที่มี field ชื่อ shop
schema.virtual('menus', {
  ref: 'Menu', // เป็น populate virtual ต้องการอ้างอิงไปยัง model ปลายทาง mongoose.model('Menu', schema)
  localField: '_id', // ( primary key (PK) ของ shop ) ( field _id ของ shop model )
  foreignField: 'shop' // ( foreign key (FK) ที่เรา referance ไปหา ใน Menu model )
}) // เมื่อทำ virtual เสร็จแล้ว ต้องไปสั่ง populate ใน controller ด้วย ใน shopController function getShopWithMenu

module.exports = mongoose.model('Shop', schema)