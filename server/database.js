var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//////////////////
// user        //
////////////////

var userSchema = new Schema ({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	phoneNumber: Number,
	company: String,
	events: {type: Schema.Types.ObjectId, ref: 'events'},
	hasEventBooked: Boolean,
	hasBookingPending: Boolean,
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
	quantity: Number || 0
});

var bevItemSchema = new Schema ({
	item: String,
	type: String,
	servingSize: Number,
	menuPrice: Number,
	costPerServing: Number,
	quantity: Number
});	

var foodMenuSchema = new Schema ({
	items: [{type: Schema.Types.ObjectId, ref: 'foodItems'}]
});

var bevMenuSchema = new Schema ({
	items: [{type: Schema.Types.ObjectId, ref: 'bevItems'}]
});

// var foodMenuSchema = new Schema ({
// 	items: [{item: {type: Schema.Types.ObjectId, ref: 'foodItems'}, 
// 					 quantity: 0}]
// });

var menuSchema = new Schema ({
	food: {type: Schema.Types.ObjectId, ref: 'foodMenus'},
	bevs: {type: Schema.Types.ObjectId, ref: 'bevMenus'}
});


var eventSchema = new Schema ({
	// owner: {type: Schema.Types.ObjectId, ref: 'users'},
	location: String || 'CommonWealth',
	date: Date,
	start: Number,
	end: Number,
	totalGuests: Number, 
	isSurprise: Boolean,
	menu: {type: Schema.Types.ObjectId, ref:"menus"},
	isConfirmed: Boolean || false,
	totalCost: Number || 0,
	totalPaid: Number || 0,
	ownerNotes: String || "",
	prepNotes: String || "",
	completionReport: String || ""
});

eventSchema.plugin(deepPopulate);
bevMenuSchema.plugin(deepPopulate);
foodMenuSchema.plugin(deepPopulate);
menuSchema.plugin(deepPopulate);
userSchema.plugin(deepPopulate);
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("users", userSchema);
var Event = mongoose.model("events", eventSchema);
var FoodItem = mongoose.model("foodItems", foodItemSchema);
var BevItem = mongoose.model("bevItems", bevItemSchema);
var FoodMenu = mongoose.model("foodMenus", foodMenuSchema);
var BevMenu = mongoose.model("bevMenus", bevMenuSchema);
var Menu = mongoose.model("menus", menuSchema);

module.exports = {
	Event: Event,
	User: User,
	FoodItem: FoodItem,
	BevItem: BevItem,
	FoodMenu: FoodMenu,
	BevMenu: BevMenu,
	Menu: Menu
};