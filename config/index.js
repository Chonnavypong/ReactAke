const dotenv = require('dotenv').config()

// NOTE: NODE_ENV เป็นของ node เองเลย ดังนั้น ไม่ต้อง export ก็จะใช้เองอัตโนมัติ
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_PORT: process.env.NODE_PORT,
  DOMAIN: process.env.DOMAIN,
  SALT: process.env.SALT,
  JWT_SECRET: process.env.JWT_SECRET
}