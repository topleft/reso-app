// *** main dependencies *** //
require("./database.js");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require("http");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var User = require('./database').User;

// *** routes *** //
var routes = require('./routes/index.js');
var adminEventRoutes = require('./routes/adminEventroutes.js');
var authRoutes = require('./routes/authRoutes.js');
var bevRoutes = require('./routes/bevRoutes.js');
var foodRoutes = require('./routes/foodRoutes.js');
var menuRoutes = require('./routes/menuRoutes.js');
var userEventRoutes = require('./routes/userEventRoutes.js');

// *** express instance *** //
var app = express();

// *** config file *** //
var config = require('./_config');

// *** database config *** //
mongoose.connect(config.mongoURI[app.settings.env],
  function(err, res){
    if (err){
      console.log("Failed to connect to DB: "+err);
    } else {
      console.log("Success. Connected to: "+config.mongoURI[app.settings.env]);
    }
  });


// *** view engine *** //
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client', '/public/')));



// *** main routes *** //
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/public/views/', 'layout.html'));
});
app.use('/', routes);
app.use('/api/v1/', adminEventRoutes);
app.use('/api/v1/', bevRoutes);
app.use('/api/v1/', foodRoutes);
app.use('/api/v1/', menuRoutes);
app.use('/api/v1/', userEventRoutes);
app.use('/users/', authRoutes);

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
