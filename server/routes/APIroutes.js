var express = require('express');
var router = express.Router();
var crud = require("../logic/crud.js");
// var db = require('../database.js');

router.get('/events', function(req, res, next) {
	crud.handleGet(res);
});

router.get('/events/:id', function(req, res, next) {
	crud.handleGetOne(res, req.params.id);
});

router.post('/events/:name/:type', function(req, res, next) {
	crud.handlePost(res, req.params.name, req.params.type);
});

router.put('/events/:id/:name/:type', function(req, res, next) {
	crud.handlePut(res, req.params.id, req.params.name, req.params.type);
});

router.delete('/events/:id', function(req, res, next) {
	crud.handleDelete(res, req.params.id);
});



module.exports = router;
