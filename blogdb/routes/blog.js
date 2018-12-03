// connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blog_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// console.log(db);

//define schema
let Schema = mongoose.Schema;

let blogModelSchema = new Schema({
	title: String, 
	author: String, 
	content: String
});

//create model
let blogModel = mongoose.model('blogModel', blogModelSchema);

//creating schema field types
let article = new Schema({
	title:{ 
		type: String
	}, 
	author:{
		type: String
	}, 
	content:{
		type: String
	},
	updated:{ 
		type: Date, default: Date.now
	}
});

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/create', function(req, res, next) {
	let createArticle = new blogModel({
		title: req.body.title,
		author: req.body.author,
		content: req.body.content
	});
	createArticle.save(function (err, result) {
		if (err) return handleError(err);
		res.status(200).send(result);
	})
  
});


router.get('/read/:id', function(req, res, next) {
	let id = req.params.id;
	blogModel.findById(id,( function(err,result){
		if (err) throw err; 
		// console.log(result);
  		res.send(result);
	}));


});


router.put('/update', function(req, res, next) {
	let myquery = req.body.id ;
	blogModel.findOneAndUpdate({_id:req.body.id},req.body,{new:true}, function(err,result){
		if(err)
			res.send(err);
		res.send('Update Successful');
	});
});


router.delete('/delete', function(req, res, next) {
	blogModel.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});



router.get('/all', function(req, res, next) {
	db.collection('blogmodels').find().toArray( function(err,result){
		if (err) throw err; 
  res.send(result);
});
});



module.exports = router;
