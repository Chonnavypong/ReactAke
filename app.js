const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

// Config
const config = require('./config/index')

// Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingRouter = require('./routes/setting');
const shopRouter = require('./routes/shop');
const menuRouter = require('./routes/menu');

// Application
const app = express();


// Database Connection
const DB = config.MONGODB_URI
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

// Route
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/setting', settingRouter);
app.use('/api/shop', shopRouter);
app.use('/api/menu', menuRouter);

app.all('*', (req, res, next) => {
  res.status(404).json(`There have no " ${req.originalUrl} " route on this server`)
  next()
})

module.exports = app;