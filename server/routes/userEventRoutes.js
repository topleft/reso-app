var express = require('express');
var router = express.Router();
var crud = require("../logic/userEventCrud.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

// get menu from user.events.menu
router.get('/user/:userId/events', function(req, res, next) {
	crud.handleGetEventMenuDeep(res, req.params.userId);
});


// post event basics which creates a new event object
// get a populated user event
// update user event 