var User = require("./../database.js").User;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});



function handleGetAllUser(res) {
	User.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOneUser(res, id) {
	User.findQ({_id: id})
		.then(function(response){ 
			res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePostUser(res, user) {
	User = new User(user);
	User.saveQ()
		.then(function(response){ res.json(response); })
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePutUser(res, id, user) {
	var query = {_id: id};
	var update = user;
	var option = {new: true};
	User.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDeleteUser(res, id) {
	User.removeQ({_id: id})
		.then(function(response){ res.json({message: "Users Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGetUsers: handleGetUsers,
	handleGetOneUser: handleGetOneUser,
	handlePostUser: handlePostUser,
	handlePutUser: handlePutUser,
	handleDeleteUser: handleDeleteUser
};