var Event = require("./../database.js").Event;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});



function handleGet(res) {
	Event.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOne(res, id) {
	Event.findQ({_id: id})
		.then(function(response){ 
			console.log("Response ", response);
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePost(res, name, type) {
	newEvent = new Event({name: name, type: type});
	newEvent.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePut(res, id, name, type) {
	var query = {_id: id};
	var update = {name: name, type: type};
	var option = {new: true};
	Event.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDelete(res, id) {
	Event.removeQ({_id: id})
		.then(function(response){ res.json({message: "Event Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGet: handleGet,
	handleGetOne: handleGetOne,
	handlePost: handlePost,
	handlePut: handlePut,
	handleDelete: handleDelete
};