var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./utils/Passport')(passport);






// var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
// DB connection
const sequelize = require('./config/connection');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// bootstrap js and query node modules static
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret : 'secret',
  resave : false,
  saveUninitialized : false,
}));
// connect flash
app.use(flash());
// local variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error')
  next();
})


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(cookieParser());



app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
