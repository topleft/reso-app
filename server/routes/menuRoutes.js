var express = require('express');
var router = express.Router();
var crud = require("../logic/menuCrud.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

// get menu from user.events.menu
router.get('/menu/:userId', function(req, res, next) {
	crud.handleGetEventMenuDeep(res, req.params.userId);
});


// post single bev item to user.events.menu.bevs
// post single food item to user.events.menu.food
// update quantity of single bev item to user.events.menu.bevs
// update quantity of single food item to user.events.menu.food
// remove single bev item from user.events.menu.bevs
// remove single food item from user.events.menu.food
// remove all bevs items from user.events.menu.bevs
// remove all food items from user.events.menu.food



router.get('menu/bevs', function(req, res, next) {s

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