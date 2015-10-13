User = require("./../database.js").User;
BevMenu = require("./../database.js").BevMenu;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


function handleGetBevMenu(res, userId) {
	User.find({_id: userId})
		.populate('bevMenus')
		.exec(function(err, user) {
			if (err) {
				console.log(err, user);
			}
			else {
				res.json(user.bevMenus);
			}
		});
};

function handleGetOneBev(res, menuId, bevId) {
	BevMenu.findQ({_id: menuId}) // needs to find bevId within bev menu !!!not ready!!!
		.then(function(response){ 
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePostBevMenu(res, bevMenu) {
	newBevMenu = new BevMenu(bevMenu);
	newBevMenu.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutBev(res, menuId, bevId, quantity) {
	var query = {_id: id}; // needs to find bevId within menu to update !!!not ready!!!
	var update = {quantity: quantity};
	var option = {new: true};
	BevMenu.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutBevMenu(res, menuId, bevId, quantity) {
	var query = {_id: id}; // needs to find bevId within menu to update !!!not ready!!!
	var update = {quantity: quantity};
	var option = {new: true};
	BevMenu.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDeleteBev(res, menuId, bevId) {
	BevMenu.removeQ({_id: id}) // needs to find bevId within menu to update !!!not ready!!!
		.then(function(response){ res.json({message: "Bev Item Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGetBevMenu: handleGetBevMenu,
	handleGetOneBev: handleGetOneBev,
	handlePostBevMenu: handlePostBevMenu,
	handlePutBev: handlePutBev,
	handlePutBevMenu: handlePutBevMenu,
	handleDeleteBev: handleDeleteBev
};