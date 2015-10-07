var FoodItem = require("./../database.js").FoodItem;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});



function handleGetFood(res) {
	FoodItem.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOneFood(res, id) {
	FoodItem.findQ({_id: id})
		.then(function(response){ 
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePostFood(res, item, course, menuPrice, costPerServing) {
	newEvent = new FoodItem({item: item, course: course, menuPrice: menuPrice, costPerServing: costPerServing});
	newEvent.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutFood(res, id, item, course, menuPrice, costPerServing) {
	var query = {_id: id};
	var update = {item: item, course: course, menuPrice: menuPrice, costPerServing: costPerServing};
	var option = {new: true};
	FoodItem.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDeleteFood(res, id) {
	FoodItem.removeQ({_id: id})
		.then(function(response){ res.json({message: "FoodItem Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGetFood: handleGetFood,
	handleGetOneFood: handleGetOneFood,
	handlePostFood: handlePostFood,
	handlePutFood: handlePutFood,
	handleDeleteFood: handleDeleteFood
};