BevMenu = require("./../database.js").BevMenu;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

////// needs almost all refactoring

function handleGetMenus(res) {
	Menu.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOneMenu(res, menuId) {
	Menu.findQ({_id: menuId}) // needs to find Id within  menu !!!not ready!!!
		.then(function(response){ 
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePostMenu(res, Menu) {
	newMenu = new Menu(Menu);
	newMenu.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePut(res, menuId, Id, quantity) {
	var query = {_id: id}; // needs to find Id within menu to update !!!not ready!!!
	var update = {quantity: quantity};
	var option = {new: true};
	Menu.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutMenu(res, menuId, Id, quantity) {
	var query = {_id: id}; // needs to find Id within menu to update !!!not ready!!!
	var update = {quantity: quantity};
	var option = {new: true};
	Menu.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDelete(res, menuId, Id) {
	Menu.removeQ({_id: id}) // needs to find Id within menu to update !!!not ready!!!
		.then(function(response){ res.json({message: " Item Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGetMenu: handleGetMenu,
	handleGetOne: handleGetOne,
	handlePostMenu: handlePostMenu,
	handlePut: handlePut,
	handlePutMenu: handlePutMenu,
	handleDelete: handleDelete
};