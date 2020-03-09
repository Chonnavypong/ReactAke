const dotenv = require('dotenv')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingRouter = require('./routes/setting');
const shopRouter = require('./routes/shop');

dotenv.config({
  path: './config.env'
})
const app = express();


// Database Connection
const DB = process.env.DATABASE_URL
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log(`DB is connected`))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/setting', settingRouter);
app.use('/api/shop', shopRouter);

app.all('*', (req, res, next) => {
  res.status(404).json(`There have no " ${req.originalUrl} " route on this server`)
  next()
})

module.exports = app;