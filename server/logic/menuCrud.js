db = require("./../database.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


function handleGetEventMenuDeep(res, userId){
	db.User.find({_id: userId})
		.deepPopulate('events.menu.bevs.items events.menu.food.items')
			.exec(function(err, result){
				if(err){
					console.log("ERROR: ",err);	
					res.json(err);
				}
				else {
					res.json(result[0].events.menu);	
				}
			});
}

// post single bev item to user.events.menu.bevs
function handlePostBevItem(res, bevMenuId, bevId){
	var newBevId = '';
	console.log("in handlePostBev")
	//retreive bev item and create copy
	db.BevItem.findByIdQ(bevId)
     .then(function(item){
      db.BevMenu.findByIdAndUpdate(bevMenuId, {$push: {items: item}}, {new: true})
      	.deepPopulate('items')
      	.exec(function(err, bevMenu){
      		console.log(bevMenu);
      		res.json(bevMenu);
      	})
     	}).done();
};


// post single food item to user.events.menu.food
function handlePostFoodItem(res, foodMenuId, foodId){
	var newFoodId = '';
	//retreive food item and create copy
	db.FoodItem.findByIdQ(foodId)
		.then(function(item){
		  item._id = mongoose.Types.ObjectId();
		  newFoodId = item._id;
      item.isNew = true; //<--------------------IMPORTANT
      return item.save();
     })
     .then(function(item){
      db.FoodMenu.findByIdAndUpdate(foodMenuId, {$push: {items: item}}, {new: true})
      	.deepPopulate('items')
      	.exec(function(err, foodMenu){
      		res.json(foodMenu);
      	})
     	}).done();
};

// update quantity of single bev item to user.events.menu.bevs
function handleUpdateBevItemQuantity(res, bevMenuId, bevId, quantity){
	db.BevMenu.findById(bevMenuId)
		.deepPopulate('items')
		.exec(function(err, menu){
			db.BevItem.findByIdAndUpdate(bevId, {quantity: quantity}, {new: true})
				.exec(function(err, item){
					res.json(item);
				})
		})
};

// update quantity of single food item to user.events.menu.food
function handleUpdateFoodItemQuantity(res, foodMenuId, foodId, quantity){
	db.FoodMenu.findById(foodMenuId)
		// .deepPopulate('items')
		.exec(function(err, menu){
			db.FoodItem.findByIdAndUpdate(foodId, {quantity: quantity}, {new: true})
				.exec(function(err, item){
					res.json(item);
				});
		});
}

// remove single bev item from user.events.menu.bevs
function handleDeleteBevItem(res, bevMenuId, bevId){
	console.log("PIGS: ", bevMenuId, bevId)
	db.BevMenu.findById(bevMenuId)
		.exec(function(err, menu){
					if (err){
						console.log("Can't Delete Item");
						res.json(err);
					}
					else {
						var bevs = menu.items
						for(i=0; i< menu.items.length; i++) {
							var bev = bevs[i]
							if ((bev+"")  === bevId){
								menu.items.splice(i, 1);
							}
						}
						db.BevMenu.findByIdAndUpdate(bevMenuId, {items: menu.items}, {new: true})
							.exec(function(result){
								res.json(result);
							});
						// res.json({message: "Bev Item Deleted from Menu"});
					}
		});
};

// remove single food item from user.events.menu.food
function handleDeleteFoodItem(res, foodMenuId, foodId, quantity){
	db.FoodMenu.findById(foodMenuId)
		.exec(function(err, menu){
			db.FoodItem.findByIdAndRemove(foodId)
				.exec(function(err, item){
					if (err){
						console.log("Can't Delete Item");
						res.json(err);
					}
					else {
					res.json({message: "Food Item Deleted from Menu"});
					}
				})
		})
};
// remove all bevs items from user.events.menu.bevs
// remove all food items from user.events.menu.food


// function handleGetEventMenu(res, userId) {
// 	console.log(userId);
// 	db.User.find({_id: userId})
// 	.populate('events')
// 		.exec(function(err, user){ 
// 				if(err){
// 					res.json(err);
// 				}
// 				else {
// 					console.log('USER: ', user);
// 					db.Event.populate(
// 						user[0], 
// 						{path: 'events.menu', model: db.Menu}, 
//     				function(err, userNext){
// 							if(err){
// 								console.log("ERROR: ",err);	
// 								res.json(err);
// 							}
// 							else {
// 								console.log('EVENT in CRUD: ', userNext.events.menu);
// 								db.Menu.populate(
// 								user[0], 
// 								{path: 'events.menu.bevs', model: db.BevMenu}, 
// 		    				function(err, lastUser){
// 									if(err){
// 										console.log("ERROR: ",err);	
// 										res.json(err);
// 									}
// 									else {
// 										console.log('MENU in CRUD: ', lastUser.events.menu.bevs);
// 										res.json(lastUser.events.menu.bevs);
										
// 									}
							
// 								})
// 							}
// 						})
// 				}
// 		});
// 	}


// function handleGetOneMenu(res, menuId) {
// 	Menu.findQ({_id: menuId}) // needs to find Id within  menu !!!not ready!!!
// 		.then(function(response){ 
// 			res.json(response); })
// 		.catch(function(err){ res.json(err);})
// 		.done();
// }

// function handlePostMenu(res, Menu) {
// 	newMenu = new Menu(Menu);
// 	newMenu.saveQ()
// 		.then(function(response){ res.json(response);})
// 		.catch(function(err){ res.json(err);})
// 		.done();
// }

// function handlePut(res, menuId, Id, quantity) {
// 	var query = {_id: id}; // needs to find Id within menu to update !!!not ready!!!
// 	var update = {quantity: quantity};
// 	var option = {new: true};
// 	Menu.findOneAndUpdateQ(query, update, option)
// 		.then(function(response){ res.json(response);})
// 		.catch(function(err){ res.json(err);})
// 		.done();
// }

// function handlePutMenu(res, menuId, Id, quantity) {
// 	var query = {_id: id}; // needs to find Id within menu to update !!!not ready!!!
// 	var update = {quantity: quantity};
// 	var option = {new: true};
// 	Menu.findOneAndUpdateQ(query, update, option)
// 		.then(function(response){ res.json(response);})
// 		.catch(function(err){ res.json(err);})
// 		.done();
// }


// function handleDelete(res, menuId, Id) {
// 	Menu.removeQ({_id: id}) // needs to find Id within menu to update !!!not ready!!!
// 		.then(function(response){ res.json({message: " Item Deleted"});})
// 		.catch(function(err){ res.json(err);})
// 		.done();
// }

module.exports = {
	// handleGetEventMenu: handleGetEventMenu,
	handleGetEventMenuDeep: handleGetEventMenuDeep,
	handlePostBevItem: handlePostBevItem,
	handlePostFoodItem: handlePostFoodItem,
	handleUpdateBevItemQuantity: handleUpdateBevItemQuantity,
	handleUpdateFoodItemQuantity: handleUpdateFoodItemQuantity,
	handleDeleteBevItem: handleDeleteBevItem,
	handleDeleteFoodItem: handleDeleteFoodItem
	// handleGetOne: handleGetOne,
	// handlePostMenu: handlePostMenu,
	// handlePut: handlePut,
	// handlePutMenu: handlePutMenu,
	// handleDelete: handleDelete
};