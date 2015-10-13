var express = require('express');
var router = express.Router();
var crud = require("../logic/userEventCrud.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


// post event basics which creates a new event object
router.post('/events/create', function(req, res, next) {
console.log("In routes: ", req.user)
	crud.handlePostEventBasics(res, req.user._id, req.body.date, req.body.start, req.body.end, req.body.totalGuests, req.body.isSurprise);
});

router.get('/user/populated', function(req, res, next) {
console.log("In routes: ", req.user)
	crud.getPopulatedUser(res, req.user._id);
});

	// router.post('/events/create/test/test', function(req, res, next) {
	// 	// console.log(req.body.date, req.body.start, req.body.end, req.body.totalGuests, req.body.isSurprise);

	// 	crud.createEvent(res, req.body.date, req.body.start, req.body.end, req.body.totalGuests, req.body.isSurprise);
	// });


// get a populated user event
// update user event 

module.exports = router;