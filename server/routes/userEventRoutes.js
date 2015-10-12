var express = require('express');
var router = express.Router();
var crud = require("../logic/userEventCrud.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


// post event basics which creates a new event object
router.post('/events/:userId', function(req, res, next) {
	crud.handlePostEventBasics(res, req.params.userId, req.body.date, req.body.start, req.body.end, req.body.totalGuests, req.body.isSurprise);
});


// get a populated user event
// update user event 

module.exports = router;