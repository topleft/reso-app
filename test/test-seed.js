
var models = require("../server/database.js");

//////////////////
// user        //
////////////////

// var userSchema = new Schema ({
// 	firstName: String,
// 	lastName: String,
// 	phoneNumber: Number,
// 	email: String,
// 	company: String || null,
// 	hasEventBooked: Boolean,
// 	hasBookingPending: Boolean,
// 	totalEventsBooked: Number,
// 	totalBalance: Number,
// 	totalPaid: Number
// });

var jose = new models.User  ({
	firstName: 'Jose',
	lastName: 'Varga',
	phoneNumber: 1231231234,
	email: 'jose@jose.com',
	company: 'Pandora' || null,
	hasEventBooked: false,
	hasBookingPending: true,
	totalEventsBooked: 0,
	totalBalance: 0,
	totalPaid: 0
});

//////////////////
// event       //
////////////////

// var foodItemSchema = new Schema ({
// 	item: String,
// 	course: String,
// 	costPerServing: Number,
// 	totalNeeded: Number
// });

var fries = ({
	item: 'french fries',
	course: 'app',
	pricePerServing: 6,
	costPerServing: 1,
	totalNeeded: 10
});

var potpie = ({
	item: 'chicken pot pie',
	course: 'main',
	pricePerServing: 14,
	costPerServing: 3,
	totalNeeded: 10
});

var cake = ({
	item: 'chocolate cake',
	course: 'dessert',
	pricePerServing: 7,
	costPerServing: 2.5,
	totalNeeded: 10
});

var lindenBlack = ({
	item: "Linden Black Lager",
	servingSize: 20, // oz
	pricePerServing: 5,
	costPerServing: 1.25,
	totalNeeded: 10
});

var drakes1500 = ({
	item: "Drakes 1500 Pale",
	servingSize: 16, // oz
	pricePerServing: 5,
	costPerServing: 1,
	totalNeeded: 10
});

var foodMenu = ({
	hasDietRestrictions: false,
	dietRestrictions: null,
	items: [fries, potpie, cake],
});

var bevMenu = ({
	serviceStyle: String, // selfserve or server
	beer: [lindenBlack, drakes1500],
	wine: [null],
	cocktail: [null],
	NA: [null]
});

var menu = ({
	serviceStyle: String, // self service, table, cocktail
	type: String, //pairing, casual, courses
	food: [foodMenu],
	bev: [bevMenu]
});



 
var testEvent = new models.Event ({
	owner: [jose],
	location: "Gather",
	date: new Date(),
	duration: 4, //hrs
	totalGuests: 10, 
	hasMinors: false,
	menu: [menu],
	isConfirmed: false, // down payment recieved
	totalCost: 500,
	totalPaid: 0,
	ownerNotes: "Owner Notes",
	prepNotes: "Prep Notes",
	completionReport: "Completion Report"
});

module.exports = testEvent;
