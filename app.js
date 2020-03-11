const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit")

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

// Config
const config = require('./config/index')

// Router
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const settingRouter = require('./routes/setting')
const shopRouter = require('./routes/shop')
const menuRouter = require('./routes/menu')

// Import Middleware
const errorHandler = require('./middleware/errorHandler')
const passportJWT = require('./middleware/passportJWT')

// Application
const app = express()

// อนุญาติให้ domain ไหนเข้ามาใช้ข้อมูลของเราได้ ( ถ้าได้ทั้งหมดไม่ต้องใส่ options )
app.use(cors())

// Security
app.use(helmet())

//---Rate Limit----

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

//  apply to all requests
app.use(limiter)

// Database Connection
const DB = config.MONGODB_URI
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log(`DB is connected`))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Use passport for authentication
app.use(passport.initialize())

// Route
app.use('/', indexRouter)
app.use('/api/user', usersRouter)
app.use('/api/setting', passportJWT.isLogin, settingRouter)
app.use('/api/shop', shopRouter)
app.use('/api/menu', menuRouter)

app.all('*', (req, res, next) => {
  res.status(404).json(`There have no " ${req.originalUrl} " route on this server`)
  next()
})

app.use(errorHandler)

module.exports = app