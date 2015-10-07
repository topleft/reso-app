BevItem = require("./../database.js").BevItem;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


function handleGetBevs(res) {
	BevItem.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOneBev(res, id) {
	BevItem.findQ({_id: id})
		.then(function(response){ 
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePostBev(res, item, type, servingSize, menuPrice, costPerServing) {
	newEvent = new BevItem({item: item, type: type, servingSize: servingSize, menuPrice: menuPrice, costPerServing: costPerServing});
	newEvent.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutBev(res, id, item, type, servingSize, menuPrice, costPerServing) {
	var query = {_id: id};
	var update = {item: item, type: type, servingSize: servingSize, menuPrice: menuPrice, costPerServing: costPerServing};
	var option = {new: true};
	BevItem.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDeleteBev(res, id) {
	BevItem.removeQ({_id: id})
		.then(function(response){ res.json({message: "Bev Item Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGetBevs: handleGetBevs,
	handleGetOneBev: handleGetOneBev,
	handlePostBev: handlePostBev,
	handlePutBev: handlePutBev,
	handleDeleteBev: handleDeleteBev
};