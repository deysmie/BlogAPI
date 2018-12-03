// connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blog_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// console.log(db);

//define schema
let Schema = mongoose.Schema;

let userModelSchema = new Schema({
	email: String, 
	password: String, 
	name: String
});

//create model
let userModel = mongoose.model('userModel', userModelSchema);

//creating schema field types
let users = new Schema({
	name:{ 
		type: String
	}, 
	email:{
		type: String
	}, 
	password:{
		type: String
	},
	updated:{ 
		type: Date, default: Date.now
	}
});

var express = require('express');
var router = express.Router();


/* GET users listing. */
// router.post('/create', function(req, res, next) {
// 	let createArticle = new blogModel({
// 		title: req.body.title,
// 		author: req.body.author,
// 		content: req.body.content
// 	});
// 	createArticle.save(function (err) {
// 		if (err) return handleError(err);
// 	})
//   res.send('app saved');
// });


router.post('/signup', function(req, res, next) {
		let createUsers = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	createUsers.save(function (err) {
		if (err) return handleError(err);
	})
  res.send('Signup Successful!');
});


router.post('/login', function(req, res, next) {
	let user = {'name': req.body.name};
	db.collection('usermodels').find(user).toArray( function(err,result){
		if (err) throw err; 
		console.log(result);
		// db.close();
	});
  res.send('Login Successful');
});

module.exports = router;