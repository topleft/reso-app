var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//////////////////
// user        //
////////////////

var userSchema = new Schema ({
	username: String,
	password: String,
	details: {type: Schema.Types.ObjectId, ref: 'userDetails' }
});

var userDetailsSchema = new Schema ({
	firstName: String,
	lastName: String,
	phoneNumber: Number,
	company: String || null,
	events: {type: Schema.Types.ObjectId, ref: 'events'},
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
	menuPrice: Number,
	costPerServing: Number,
	quantity: 0
});

var bevItemSchema = new Schema ({
	item: String,
	type: String,
	servingSize: Number,
	menuPrice: Number,
	costPerServing: Number,
	quantity: 0
});

var foodMenuSchema = new Schema ({
	items: {type: Schema.Types.ObjectId, ref: 'foodItems'}
});

var bevMenuSchema = new Schema ({
	items: {type: Schema.Types.ObjectId, ref: 'bevItems'}
});

var menuSchema = new Schema ({
	food: {type: Schema.Types.ObjectId, ref: 'foodMenus'},
	bevs: {type: Schema.Types.ObjectId, ref: 'bevMenus'}
});


var eventSchema = ({
	owner: {type: Schema.Types.ObjectId, ref: 'users'},
	location: String,
	date: Date,
	duration: Number, //hrs
	totalGuests: Number, 
	hasMinors: Boolean,
	menu: {type: Schema.Types.ObjectId},
	isConfirmed: Boolean || false, // down payment recieved
	totalCost: Number,
	totalPaid: Number,
	ownerNotes: String,
	prepNotes: String,
	completionReport: String
});


userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("users", userSchema);
var UserDetails = mongoose.model("userDetails", userDetailsSchema);
var Event = mongoose.model("events", eventSchema);
var FoodItem = mongoose.model("foodItems", foodItemSchema);
var BevItem = mongoose.model("bevItems", bevItemSchema);
var FoodMenu = mongoose.model("foodMenus", foodMenuSchema);
var BevMenu = mongoose.model("bevMenus", bevMenuSchema);
var Menu = mongoose.model("menus", menuSchema)

module.exports = {
	// Event: Event,
	User: User,
	FoodItem: FoodItem,
	BevItem: BevItem,
	// FoodMenu: FoodMenu,
	BevMenu: BevMenu,
	// Menu: Menu
};