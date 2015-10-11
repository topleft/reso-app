process.env.NODE_ENV = 'test';

var chai = require("chai");
var chaiHttp = require('chai-http');
var server = require("../server/app");
var db = require("../server/database.js");
var should = chai.should();
var mongoose = require('mongoose-q')(require('mongoose'));
// var testEvent = require('./test-seed.js');
chai.use(chaiHttp);
 

//////////////////////////
/////////////////////////
//    bevItem         //
///////////////////////
//////////////////////

describe("Reso Bev API", function(){
	db.BevItem.collection.drop();
	var id = "";

// setup and teardown ------------------- //

	beforeEach(function(done){
		id = "";
		var newBevItem = new BevItem({item: "London Pride", type: 'beer', servingSize: 20, menuPrice: 6.00, costPerServing: 1.33, quantity: 0});
		id = newBevItem._id;
		newBevItem.save(function(err){	
			done(err);
		});
	});

	afterEach(function(done){
		db.BevItem.collection.drop();
		done();
	});

// it shoulds ------------------- //

	it("should get all BevItems from DB", function(done){
		chai.request(server)
			.get('/api/v1/bevs')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.be.a('object');
				res.body[0].item.should.equal('London Pride');
				res.body[0].type.should.equal('beer');
				res.body[0].menuPrice.should.be.a('number');
				done();
			});
	});

	it("should get one bevItem from DB", function(done){
		chai.request(server)
			.get('/api/v1/bevs/'+id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.equal(1);
				res.body[0].should.be.a('object');
				res.body[0].item.should.equal('London Pride');
				res.body[0].type.should.equal('beer');
				res.body[0].menuPrice.should.be.a('number');
				res.body[0].quantity.should.equal(0);
				done();
			});	
	});

	it("should post bevItem to DB", function(done){
		chai.request(server)
			.post('/api/v1/bevs')
			.send({item: "Rochefort 10", type: 'beer', servingSize: 11.33, menuPrice: 8.00, costPerServing: 2.50, quantity: 3})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.item.should.equal('Rochefort 10');
				res.body.type.should.equal('beer');
				res.body.menuPrice.should.be.a('number');
				res.body.quantity.should.equal(3);
				done();		
			});
	});

	it("should update an bevItem in the DB", function(done){
		chai.request(server)
			.put('/api/v1/bevs/'+id)
			.send({item: "London Pride", type: 'beer', servingSize: 16, menuPrice: 5.00, costPerServing: 1.33, quantity: 4})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.item.should.equal('London Pride');
				res.body.type.should.equal('beer');
				res.body.menuPrice.should.equal(5);
				res.body.quantity.should.equal(4);
				done();
			});		
	});

	it("should delete an bevItem from DB", function(done){
		chai.request(server)
			.delete('/api/v1/bevs/'+id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.message.should.equal("Bev Item Deleted");
				done();
			});	
	});

//close describe
});

/////////////////////////////
////////////////////////////
//    foodItem         ////
//////////////////////////
/////////////////////////

describe("Reso FoodItem API", function(){
	db.FoodItem.collection.drop();
	var id = "";


	beforeEach(function(done){
		id = "";
		var newFoodItem = new db.FoodItem ({
			item: "Steak", 
			course: "main", 
			menuPrice: 18, 
			costPerServing: 5, 
			quantity: 5});
		id = newFoodItem._id;
		newFoodItem.save(function(err){	
			done(err);
		});
	});

	afterEach(function(done){
		db.FoodItem.collection.drop();
		done();
	});

// it shoulds ------------------- //

	it("should get all FoodItems from DB", function(done){
		chai.request(server)
			.get('/api/v1/food')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.be.a('object');
				res.body[0].item.should.equal('Steak');
				res.body[0].course.should.be.a('string');
				res.body[0].menuPrice.should.equal(18);
				res.body[0].costPerServing.should.equal(5);
				res.body[0].quantity.should.equal(5);
				done();
			});
	});

	it("should get one Food Item from DB", function(done){
		chai.request(server)
			.get('/api/v1/food/'+id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.be.a('object');
				res.body[0].item.should.equal('Steak');
				res.body[0].course.should.be.a('string');
				res.body[0].menuPrice.should.equal(18);
				res.body[0].costPerServing.should.equal(5);
				res.body[0].quantity.should.equal(5);
				done();
			});	
	});

	
	it("should update a Food Item in the DB", function(done){

		chai.request(server)
			.put('/api/v1/food/'+id)
			.send({item: "Greens", course: "salad", menuPrice: 8, costPerServing: 2, quantity: 4})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.item.should.equal('Greens');
				res.body.course.should.be.a('string');
				res.body.menuPrice.should.equal(8);
				res.body.costPerServing.should.equal(2);
				res.body.quantity.should.equal(4);
				done();
			});		
	});

	it("should delete an foodItem from DB", function(done){
		chai.request(server)
			.delete('/api/v1/food/'+id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.message.should.equal("FoodItem Deleted");
			});

		chai.request(server)
			.get('/api/v1/food')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.equal(0);
				done();
			});
	});
// close describe
});


/////////////////////////////
////////////////////////////
//    Menu            /////
//////////////////////////
/////////////////////////

describe("Reso Event Menu API", function(){
	db.FoodItem.collection.drop();
	var bevItemId = "";
	var foodItemId = "";
	var bevMenuId = "";
	var foodMenuId = "";
	var menuId = "";
	var eventId = "";
	var UserId = "";


	beforeEach(function(done){
		id = "";

		var newBevItem = new db.BevItem({
			item: "London Pride", 
			type: 'beer', 
			servingSize: 20, 
			menuPrice: 6.00, 
			costPerServing: 1.33, 
			quantity: 5	
		});
		bevItemId = newBevItem._id;
		newBevItem.save();

		var newBevItem2 = new db.BevItem({
			item: "Plum Creek", 
			type: 'wine', 
			servingSize: 5, 
			menuPrice: 8.00, 
			costPerServing: 2.50, 
			quantity: 5	
		});
		bevItemId2 = newBevItem2._id;
		newBevItem2.save();

		
		var newFoodItem = new db.FoodItem ({
			item: "Steak", 
			course: "main", 
			menuPrice: 18, 
			costPerServing: 5, 
			quantity: 5
		});
		foodItemId = newFoodItem._id;
		newFoodItem.save();

		var newFoodItem2 = new db.FoodItem ({
			item: "Greens", 
			course: "salad", 
			menuPrice: 9, 
			costPerServing: 2, 
			quantity: 10
		});
		foodItemId2 = newFoodItem2._id;
		newFoodItem2.save();

		var newBevMenu = new db.BevMenu ({
			items: [newBevItem._id]
		});
		bevMenuId = newBevMenu._id;
		newBevMenu.save();

		var newFoodMenu = new db.FoodMenu ({
			items: [newFoodItem._id] 
		});
		foodMenuId = newFoodMenu._id;
		newFoodMenu.save();

		var newMenu = new db.Menu ({
			food: newFoodMenu._id ,
			bevs: newBevMenu._id
		});
		menuid = newMenu._id;
		newMenu.save();


		var newEvent = new db.Event ({
			location: "The Shed",
			date: null,
			duration: 4, //hrs
			totalGuests: 10, 
			hasMinors: false,
			menu: newMenu._id,
			isConfirmed: false, 
			totalCost: 0,
			totalPaid: 0,
			ownerNotes: null,
			prepNotes: null,
			completionReport: null
		});
		eventId = newEvent._id
		newEvent.save();


		var newUser = new db.User ({
			username: 'test@test.com',
			password: 'test',
			firstName: 'John',
			lastName: 'Coltrane',
			phoneNumber: 5555555555,
			company: 'Blue Note',
			events: newEvent._id,
			hasEventBooked: false,
			hasBookingPending: 0,
			totalEventsBooked: 0,
			totalBalance: 0,
			totalPaid: 0
		});
		userId = newUser._id;
		newUser.save();

		done();	
	});

	afterEach(function(done){
		db.BevItem.collection.drop();
		db.FoodItem.collection.drop();
		db.BevMenu.collection.drop();
		db.FoodMenu.collection.drop();
		db.Menu.collection.drop();
		db.Event.collection.drop();
		db.User.collection.drop();
		done();
	});

// it shoulds ------------------- //

	it("should get event object", function(done){
		chai.request(server)
			.get('/api/v1/events/' + eventId)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body[0].should.be.a('object');
				res.body[0].location.should.be.a('string');
				res.body[0].totalCost.should.be.a('number');
				done();
			});
	});

	it("should get User's menu object", function(done){

		chai.request(server)
			.get('/api/v1/menu/' + userId)
			.end(function(err, res){
				// console.log("MENU: ",res.body)
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('food');
				res.body.should.have.property('bevs');
				res.body.food.items.should.be.a('array');
				res.body.bevs.items.should.be.a('array');
				done();
			});
	});

	it("should get menu with populated bev menu", function(done){
		chai.request(server)
			.get('/api/v1/menu/' + userId)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.bevs.items.should.be.a('array');
				res.body.bevs.items[0].should.be.a('object');
				res.body.bevs.items[0].should.have.property('item');
				res.body.bevs.items[0].should.have.property('type');
				res.body.bevs.items[0].should.have.property('menuPrice');
				res.body.bevs.items[0].should.have.property('quantity');
				res.body.bevs.items[0].should.have.property('costPerServing');
				res.body.bevs.items[0].menuPrice.should.be.a('number');
				res.body.bevs.items[0].costPerServing.should.be.a('number');
				res.body.bevs.items[0].quantity.should.be.a('number');
				done();
			});	
	});

	
	it("should get menu with populated food menu", function(done){
		chai.request(server)
			.get('/api/v1/menu/' + userId)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.food.items.should.be.a('array');
				res.body.food.items[0].should.be.a('object');
				res.body.food.items[0].should.have.property('item');
				res.body.food.items[0].should.have.property('course');
				res.body.food.items[0].should.have.property('menuPrice');
				res.body.food.items[0].should.have.property('quantity');
				res.body.food.items[0].should.have.property('costPerServing');
				res.body.food.items[0].menuPrice.should.be.a('number');
				res.body.food.items[0].costPerServing.should.be.a('number');
				res.body.food.items[0].quantity.should.be.a('number');
				done();
			});	
	});

	it("should add a Bev Item to Bev Menu", function(done){
		chai.request(server)
			.post('/api/v1/menu/'+bevMenuId+'/bev'	)
			.send({id: bevItemId2})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.items[1].item.should.equal('Plum Creek');
				res.body.items[1].type.should.be.a('string');
				res.body.items[1].servingSize.should.equal(5);
				res.body.items[1].menuPrice.should.equal(8);
				res.body.items[1].costPerServing.should.equal(2.50);
				res.body.items[1].quantity.should.equal(5);
				done();
			});		
	});

	it("should add a Food Item to Food Menu", function(done){
		chai.request(server)
			.post('/api/v1/menu/'+foodMenuId+"/food")
			.send({id: foodItemId2})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.items[1].item.should.equal('Greens');
				res.body.items[1].course.should.be.a('string');
				res.body.items[1].menuPrice.should.equal(9);
				res.body.items[1].costPerServing.should.equal(2);
				res.body.items[1].quantity.should.equal(10);
				done();
			});		
	});

	it("should update a Bev Item Quantity in user.events.menu.bevs", function(done){
		chai.request(server)
			.put('/api/v1/menu/'+bevMenuId+'/bev')
			.send({bevId: bevItemId, quantity: 20})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.item.should.equal('London Pride');
				res.body.type.should.be.a('string');
				res.body.servingSize.should.equal(20);
				res.body.menuPrice.should.equal(6);
				res.body.costPerServing.should.equal(1.33);
				res.body.quantity.should.equal(20);
				done();
			});
		});	

	it("should update a Food Item Quantity food menu", function(done){
		chai.request(server)
			.put('/api/v1/menu/'+foodMenuId+"/food")
			.send({foodId: foodItemId, quantity: 10})
			.end(function(err, res){
				console.log(res.body);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.item.should.equal('Steak');
				res.body.course.should.be.a('string');
				res.body.menuPrice.should.equal(18);
				res.body.costPerServing.should.equal(5);
				res.body.quantity.should.equal(10);
				done();
			});		
	});




	it("should delete a Bev Item from user.events.menu.bevs", function(done){
		chai.request(server)
			.delete('/api/v1/menu/'+userId +'/bev/'+ bevItemId2)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.message.should.equal("Bev Item Deleted from Menu");
			});
		});

	it("should delete a Food Item from user.events.menu.bevs", function(done){
		chai.request(server)
			.delete('/api/v1/menu/'+userId +'/food/'+ bevItemId2)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.message.should.equal("Food Item Deleted from Menu");
			});
		});

	// 	chai.request(server)
	// 		.get('/api/v1/food')
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('array');
	// 			res.body.length.should.equal(0);
	// 			done();
	// 		});
	// });

// close describe
});


///////////////////////////
//////////////////////////
//   User Event        //
////////////////////////
///////////////////////

///////////////////////////
//////////////////////////
//   User Profile      //
////////////////////////
///////////////////////


///////////////////////////
//////////////////////////
//   Admin Event       //
////////////////////////
///////////////////////

// describe("Reso Event API", function(){
// 	db.Event.collection.drop();
// 	var id = "";

// // setup and teardown ------------------- //

// 	beforeEach(function(done){
// 		id = "";
// 		var newEvent = testEvent;
// 		id = newEvent._id;
// 		newEvent.save(function(err){	
// 			done(err);
// 		});
// 	});

// 	// afterEach(function(done){
// 	// 	db.Event.collection.drop();
// 	// 	done();
// 	// });

// // it shoulds ------------------- //

// 	it("should get all Events from DB", function(done){
// 		chai.request(server)
// 			.get('/api/v1/events')
// 			.end(function(err, res){
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.a('array');
// 				res.body[0].should.be.a('object');
// 				res.body[0].owner[0].firstName.should.equal('Jose');
// 				res.body[0].owner[0].totalBalance.should.be.a('number');
// 				res.body[0].menu[0].type.should.be.a('string');
// 				res.body[0].hasMinors.should.equal(false);
// 				done();
// 			});
// 	});

// 	it("should get one Event from DB", function(done){
// 		chai.request(server)
// 			.get('/api/v1/events/'+id)
// 			.end(function(err, res){
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.a('array');
// 				res.body.length.should.equal(1);
// 				res.body[0].should.be.a('object');
// 				res.body[0].owner[0].firstName.should.equal('Jose');
// 				res.body[0].owner[0].totalBalance.should.be.a('number');
// 				res.body[0].menu[0].type.should.be.a('string');
// 				res.body[0].hasMinors.should.equal(false);
// 				done();
// 			});	
// 	});

// 	// it("should post Event to DB", function(done){
// 	// 	chai.request(server)
// 	// 		.post('/api/v1/events/'+"new thing/"+"more stuff")
// 	// 		.end(function(err, res){
// 	// 			res.should.have.status(200);
// 	// 			res.should.be.json;
// 	// 			res.body.should.be.a('array');
// 	// 			res.body[0].should.be.a('object');
// 	// 			res.body[0].owner.firstName.should.equal('Jose');
// 	// 			res.body[0].menu.type.should.be.a('string');
// 	// 			res.body[0].totalBalance.should.be.a('number');
// 	// 			res.body[0].hasMinors.should.equal(false);
// 	// 			done();		
// 	// 		});
// 	// });
// 	// it("should update an Event in the DB", function(done){
// 	// 	chai.request(server)
// 	// 		.put('/api/v1/events/'+id+"/new thing/"+"more stuff")
// 	// 		.end(function(err, res){
// 	// 			res.should.have.status(200);
// 	// 			res.should.be.json;
// 	// 			res.body.should.be.a('object');
// 	// 			res.body.should.be.a('object');
// 	// 			res.body.name.should.be.a('string');
// 	// 			res.body.name.should.equal('new thing');
// 	// 			res.body.type.should.be.a('string');
// 	// 			res.body.type.should.equal('more stuff');
// 	// 			done();
// 	// 		});		
// 	// });
// 	it("should delete an Event from DB", function(done){
// 		chai.request(server)
// 			.delete('/api/v1/events/'+id)
// 			.end(function(err, res){
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.a('object');
// 				res.body.message.should.equal("Event Deleted");
// 				done();
// 			});	
// 	});

// //close describe
// });


/////////////////////////////
////////////////////////////
//    User         ////
//////////////////////////
/////////////////////////

// describe("Reso User API", function(){
// 	db.User.collection.drop();
// 	var id = "";


// 	beforeEach(function(done){
// 		id = "";


// 		var newUser = new db.User ({
// 			username: 'test@test.com',
// 			password: 'test',
// 			firstName: 'John',
// 			lastName: 'Coltrane',
// 			phoneNumber: 5555555555,
// 			company: 'Blue Note',
// 			events: [],
// 			hasEventBooked: false,
// 			hasBookingPending: 0,
// 			totalEventsBooked: 0,
// 			totalBalance: 0,
// 			totalPaid: 0
// 		});
// 		newUser.save();
// 			done();
// 	});

// 	afterEach(function(done){
// 		db.User.collection.drop();
// 		done();
// 	});

// // it shoulds ------------------- //

// 	it("should get all Users from DB", function(done){
// 		chai.request(server)
// 			.get('/api/v1/users')
// 			.end(function(err, res){
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.a('array');
// 				res.body[0].should.be.a('object');
// 				res.body[0].username.should.equal('test@test.com');
// 				res.body[0].password.should.equal('test');
// 				res.body[0].firstName.should.be.a('John');
// 				res.body[0].lastName.should.be.a('Coltrane');
// 				res.body[0].phoneNumber.should.equal(5555555555);
// 				res.body[0].company.should.equal('Blue Note');
// 				res.body[0].hasEventBooked.should.equal(false);
// 				res.body[0].totalBalance.should.equal(0);
// 				res.body[0].totalPaid.should.equal(0);
// 				done();
// 			});
// 	});

	// it("should get one Food Item from DB", function(done){
	// 	chai.request(server)
	// 		.get('/api/v1/users/'+id)
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('array');
	// 			res.body[0].should.be.a('object');
	// 			res.body[0].username.should.equal('test@test.com');
	// 			res.body[0].password.should.equal('test');
	// 			res.body[0].firstName.should.be.a('John');
	// 			res.body[0].lastName.should.be.a('Coltrane');
	// 			res.body[0].phoneNumber.should.equal(5555555555);
	// 			res.body[0].company.should.equal('Blue Note');
	// 			res.body[0].hasEventBooked.should.equal(false);
	// 			res.body[0].totalBalance.should.equal(0);
	// 			res.body[0].totalPaid.should.equal(0);
	// 			done();
	// 		});	
	// });

	
	// it("should update a Food Item in the DB", function(done){

	// 	chai.request(server)
	// 		.put('/api/v1/food/'+id)
	// 		.send({item: "Greens", course: "salad", menuPrice: 8, costPerServing: 2, quantity: 4})
	// 		.end(function(err, res){
	// 			console.log(res.body);
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('object');
	// 			res.body.item.should.equal('Greens');
	// 			res.body.course.should.be.a('string');
	// 			res.body.menuPrice.should.equal(8);
	// 			res.body.costPerServing.should.equal(2);
	// 			res.body.quantity.should.equal(4);
	// 			done();
	// 		});		
	// });

	// it("should delete an Event from DB", function(done){
	// 	chai.request(server)
	// 		.delete('/api/v1/food/'+id)
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('object');
	// 			res.body.message.should.equal("FoodItem Deleted");
	// 		});

	// 	chai.request(server)
	// 		.get('/api/v1/food')
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('array');
	// 			res.body.length.should.equal(0);
	// 			done();
	// 		});
	// });
// close describe
// });