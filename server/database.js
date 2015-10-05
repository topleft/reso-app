var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//////////////////
// user       //
////////////////

var userSchema = new Schema ({
	firstName: String,
	lastName: String,
	phoneNumber: Number,
	email: String,
	company: String || null,
	hasEventBooked: Boolean,
	hasBookingPending: Boolean,
	totalEventsBooked: Number,
	totalBalance: Number,
	totalPaid: Number
});

//////////////////
// event       //
////////////////

var foodItemSchema = new Schema ({
	item: String,
	course: String,
	costPerServing: Number,
	totalNeeded: Number
});

var bevItemSchema = new Schema ({
	item: String,
	servingSize: Number,
	costPerServing: Number,
	totalNeeded: Number
});

var foodMenuSchema = new Schema ({
	hasDietRestrictions: Boolean,
	dietRestrictions: String,
	items: [foodMenuItemSchema],

});

var bevMenuSchema = new Schema ({
	serviceStyle: String, // selfserve or server
	beer: [bevItemSchema],
	wine: [bevItemSchema],
	cocktail: [bevItemSchema],
	NA: [bevItemSchema]
});

var menuSchema = new Schema ({
	serviceStyle: String, // self service, table, cocktail
	type: String, //pairing, casual, courses
	food: [foodMenuSchema],
	bev: [bevMenuSchema]
});


var eventOwner = new Schema ({
	owner: [userSchema]
});

var eventSchema = new Schema ({

});


var itemSchema = new Schema ({
	name: String,
	type: String
});

var eventSchema = ({
	owner: [eventOwner],
	location: String,
	date: Date,
	duration: Number, //hrs
	totalGuests: Number, 
	hasMinors: Boolean,
	menu: [menuSchema],
	isConfirmed: Boolean, // down payment recieved
	totalCost: Number,
	totalPaid: Number,
	ownerNotes: String,
	prepNotes: String,
	completionReport: String
});

var userSchema = new Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

var Item = mongoose.model("items", itemSchema);
var User = mongoose.model("users", userSchema);



module.exports = {
	Item: Item,
	User: User
}