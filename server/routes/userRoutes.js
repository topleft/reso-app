var express = require('express');
var router = express.Router();
var crud = require("../logic/bevMenuCrud.js");

router.get('/users', function(req, res, next) {
	crud.handleGetBevs(res);
});

router.get('/users/:id', function(req, res, next) {
	crud.handleGetOneBev(res, req.params.id);
});

router.post('/users', function(req, res, next) {
	crud.handlePostBev(res, req.body.item, req.body.type, req.body.servingSize, req.body.menuPrice, req.body.costPerServing);
});

router.put('/users/:id', function(req, res, next) {
	crud.handlePutBev(res, req.params.id, req.body.item, req.body.type, req.body.servingSize, req.body.menuPrice, req.body.costPerServing);
});

router.delete('/users/:id', function(req, res, next) {
	crud.handleDeleteBev(res, req.params.id);
});


module.exports = router;