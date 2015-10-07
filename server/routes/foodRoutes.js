var express = require('express');
var router = express.Router();
var crud = require("../logic/foodCrud.js");

router.get('/food', function(req, res, next) {
	crud.handleGetFood(res);
});

router.get('/food/:id', function(req, res, next) {
	crud.handleGetOneFood(res, req.params.id);
});

router.post('/food', function(req, res, next) {
	crud.handlePostFood(res, req.body.item, req.body.course, req.body.menuPrice, req.body.costPerServing);
});

router.put('/food/:id', function(req, res, next) {
	crud.handlePutFood(res, req.params.id, req.body.item, req.body.course, req.body.menuPrice, req.body.costPerServing);
});

router.delete('/food/:id', function(req, res, next) {
	crud.handleDeleteFood(res, req.params.id);
});



module.exports = router;