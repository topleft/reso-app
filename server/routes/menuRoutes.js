var express = require('express');
var router = express.Router();
var crud = require("../logic/menuCrud.js");
var db = require("../database.js")
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


router.get('/menu/:userId', function(req, res, next) {
	crud.handleGetEventMenu(res, req.params.userId);
	// db.User.find({_id: userId})
	// .populate('events')
	// 	.exec(function(err, user){ 
	// 			if(err){
	// 				res.json(err);
	// 			}
	// 			else {
	// 				res.json(user.events);
	// 			}
	// 	});
});

router.get('menu/bevs', function(req, res, next) {
	crud.handleGetBevs(res);
});

router.get('menu/bevs/:id', function(req, res, next) {
	crud.handleGetOneBev(res, req.params.id);
});

router.post('menu/bevs', function(req, res, next) {
	crud.handlePostBev(res, req.body.item, req.body.type, req.body.servingSize, req.body.menuPrice, req.body.costPerServing);
});

router.put('menu/bevs/:id', function(req, res, next) {
	crud.handlePutBev(res, req.params.id, req.body.item, req.body.type, req.body.servingSize, req.body.menuPrice, req.body.costPerServing);
});

router.delete('menu/bevs/:id', function(req, res, next) {
	crud.handleDeleteBev(res, req.params.id);
});


module.exports = router;