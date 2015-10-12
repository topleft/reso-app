db = require("./../database.js");
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});


// post event basics which creates a new event object
function handlePostEventBasics(res, userId, date, start, end, totalGuests, surprise){
	console.log("USER ID ",userId);
	newEvent = new db.Event({
		date: date,
		start: start,
		end: end,
		totalGuests: totalGuests, 
		isSurprise: surprise,
	});
	newEvent.save();
	console.log(newEvent);
	
	db.User.findByIdAndUpdate(userId, { 'events': newEvent._id}, { new : true })
		.exec(function(err, user){
			if (err) {
				res.json(err);
			}
			else {
				res.json(user);
			}
		});
 
}
// get a populated user event
// update user event 


module.exports = {
	handlePostEventBasics: handlePostEventBasics

}