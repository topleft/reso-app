var express = require('express');
var router = express.Router();
var crud = require("../logic/menuCrud.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

// get menu from user.events.menu
router.get('/menu/:userId', function(req, res, next) {
	crud.handleGetEventMenuDeep(res, req.params.userId);
});

// add bev item to menu
router.post('/menu/:bevMenuId/bev', function(req, res, next) {
	crud.handlePostBevItem(res, req.params.bevMenuId, req.body.id);
});

// add item food to menu 
router.post('/menu/:foodMenuId/food', function(req, res, next) {
	crud.handlePostFoodItem(res, req.params.foodMenuId, req.body.id);
});

// update bev item quantity
router.put('/menu/:bevMenuId/bev', function(req, res, next) {
	crud.handleUpdateBevItemQuantity(res, req.params.bevMenuId, req.body.bevId, req.body.quantity);
});

// update food item quantity
router.put('/menu/:foodMenuId/food', function(req, res, next) {
	crud.handleUpdateFoodItemQuantity(res, req.params.foodMenuId, req.body.foodId, req.body.quantity);
});

// delete single bev item from menu
router.delete('/menu/:bevMenuId/bev/:bevId', function(req, res, next) {
	console.log(req.body.bevId)
	crud.handleDeleteBevItem(res, req.params.bevMenuId, req.params.bevId);
});

// delete single food item from menu
router.delete('/menu/:foodMenuId/food', function(req, res, next) {
	crud.handleDeleteFoodItem(res, req.params.foodMenuId, req.body.foodId);
});




// post single bev item to user.events.menu.bevs
// post single food item to user.events.menu.food
// update quantity of single bev item to user.events.menu.bevs
// update quantity of single food item to user.events.menu.food
// remove single bev item from user.events.menu.bevs
// remove single food item from user.events.menu.food
// remove all bevs items from user.events.menu.bevs
// remove all food items from user.events.menu.food



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