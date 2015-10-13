db = require("../database.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});



// post event basics which creates a new event object
function handlePostEventBasics(res, userId, date, start, end, totalGuests, surprise){
	var newBevMenu = new db.BevMenu();
	newBevMenu.save();
	var newFoodMenu = new db.FoodMenu();
	newFoodMenu.save();
	var newMenu = new db.Menu({bevs: newBevMenu._id, food: newFoodMenu._id}); // add food and bev menus 
	newMenu.save();

	var newEvent = new db.Event ({
		date: null,
		start: start,
		end: end,
		totalGuests: totalGuests, 
		isSurprise: surprise,
		menu: newMenu._id,
	});
	newEvent.save();
	console.log("USER ID ", userId);
	
	db.User.findByIdAndUpdate(userId, { events: newEvent._id }, { new : true })
		.deepPopulate('events.menu.bevs.items events.menu.food.items ')
		.exec(function(err, user){
			if (err) {
				res.json(err);
			}
			else {
				// console.log(user)
				res.json({user: user, message: "in the event route"});
			}
		});
 
}
// get a populated user event
function getPopulatedUser(res, userId){
	db.User.findById(userId)
	.deepPopulate('events.menu.bevs.items events.menu.food.items')
	.exec(function(err, user){
		if (err) {
			res.json(err);
		}
		else {
			console.log("WTF", user)
			res.json(user);
		}
	})

}
// update user event 


module.exports = {
	handlePostEventBasics: handlePostEventBasics,
	getPopulatedUser: getPopulatedUser

};