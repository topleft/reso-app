process.env.NODE_ENV = 'test';

var chai = require("chai");
var chaiHttp = require('chai-http');
var server = require("../server/app");
var Event = require("../server/database.js").Event;
var should = chai.should();
// var testEvent = require('./test-seed.js');
// console.log("Test" , testEvent);
chai.use(chaiHttp);


describe("Reso API", function(){
	Event.collection.drop();
	var id = "";
	var count = 0;

// setup and teardown ------------------- //

	beforeEach(function(done){
		id = "";
		var newEvent = require('./test-seed.js');
		console.log("Count ", count++);
		id = newEvent._id;
		newEvent.save(function(err){	
		// console.log("New Event ",newEvent);
			done(err);
		});
	});

	// afterEach(function(done){
	// 	Event.collection.drop();
	// 	done();
	// });

// it shoulds ------------------- //

	it("should get all Events from DB", function(done){
		chai.request(server)
			.get('/api/v1/events')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.be.a('object');
				res.body[0].owner[0].firstName.should.equal('Jose');
				res.body[0].owner[0].totalBalance.should.be.a('number');
				res.body[0].menu[0].type.should.be.a('string');
				res.body[0].hasMinors.should.equal(false);
				done();
			});
	});

	it("should get one Event from DB", function(done){
		console.log("Id ", id);
		chai.request(server)
			.get('/api/v1/events/'+id)
			.end(function(err, res){
				console.log({res:res})
				console.log(id)
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.equal(1);
				res.body[0].should.be.a('object');
				res.body[0].owner[0].firstName.should.equal('Jose');
				res.body[0].owner[0].totalBalance.should.be.a('number');
				res.body[0].menu[0].type.should.be.a('string');
				res.body[0].hasMinors.should.equal(false);
				done();
			});	
	});

	// it("should post Event to DB", function(done){
	// 	chai.request(server)
	// 		.post('/api/v1/events/'+"new thing/"+"more stuff")
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('array');
	// 			res.body[0].should.be.a('object');
	// 			res.body[0].owner.firstName.should.equal('Jose');
	// 			res.body[0].menu.type.should.be.a('string');
	// 			res.body[0].totalBalance.should.be.a('number');
	// 			res.body[0].hasMinors.should.equal(false);
	// 			done();		
	// 		});
	// });
	// it("should update an Event in the DB", function(done){
	// 	chai.request(server)
	// 		.put('/api/v1/events/'+id+"/new thing/"+"more stuff")
	// 		.end(function(err, res){
	// 			res.should.have.status(200);
	// 			res.should.be.json;
	// 			res.body.should.be.a('object');
	// 			res.body.should.be.a('object');
	// 			res.body.name.should.be.a('string');
	// 			res.body.name.should.equal('new thing');
	// 			res.body.type.should.be.a('string');
	// 			res.body.type.should.equal('more stuff');
	// 			done();
	// 		});		
	// });
	it("should delete an Event from DB", function(done){
		chai.request(server)
			.delete('/api/v1/events/'+id)
			.end(function(err, res){
				console.log(res.body);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.message.should.equal("Event Deleted");
				done();
			});	
	});




//close describe
});