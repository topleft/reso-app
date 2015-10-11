db = require("./../database.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

// function deepPopulate(){
// 	return populatedObj
// }

function handleGetEventMenuDeep(res, userId){

	db.User.find({_id: userId})
		.deepPopulate('events.menu.bevs.items events.menu.food.items')
			.exec(function(err, result){
				if(err){
					console.log("ERROR: ",err);	
					res.json(err);
				}
				else {
					console.log('Event in CRUD: ', result[0].events.menu.bevs.items);
					res.json(result[0].events.menu);	
				}
			});
}

// post single bev item to user.events.menu.bevs
// post single food item to user.events.menu.food
// update quantity of single bev item to user.events.menu.bevs
// update quantity of single food item to user.events.menu.food
// remove single bev item from user.events.menu.bevs
// remove single food item from user.events.menu.food
// remove all bevs items from user.events.menu.bevs
// remove all food items from user.events.menu.food


function handleGetEventMenu(res, userId) {
	console.log(userId);
	db.User.find({_id: userId})
	.populate('events')
		.exec(function(err, user){ 
				if(err){
					res.json(err);
				}
				else {
					console.log('USER: ', user);
					db.Event.populate(
						user[0], 
						{path: 'events.menu', model: db.Menu}, 
    				function(err, userNext){
							if(err){
								console.log("ERROR: ",err);	
								res.json(err);
							}
							else {
								console.log('EVENT in CRUD: ', userNext.events.menu);
								db.Menu.populate(
								user[0], 
								{path: 'events.menu.bevs', model: db.BevMenu}, 
		    				function(err, lastUser){
									if(err){
										console.log("ERROR: ",err);	
										res.json(err);
									}
									else {
										console.log('MENU in CRUD: ', lastUser.events.menu.bevs);
										res.json(lastUser.events.menu.bevs);
										
									}
							
								})
							}
						})
				}
		});
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
	handleGetEventMenu: handleGetEventMenu,
	handleGetEventMenuDeep: handleGetEventMenuDeep
	// handleGetOne: handleGetOne,
	// handlePostMenu: handlePostMenu,
	// handlePut: handlePut,
	// handlePutMenu: handlePutMenu,
	// handleDelete: handleDelete
};