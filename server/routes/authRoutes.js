var express = require('express');
var router = express.Router();
var db = require('../database.js');
var user = require('../database.js').User;
var passport = require('passport');
var local = require('passport-local');

// { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone, company: req.body.company, password: req.body.pas }


router.post('/register', function(req, res) {
  db.User.register(new db.User({ username: req.body.username, password: req.body.password }), function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
	    return res.status(200).json({status: 'Login succesful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
