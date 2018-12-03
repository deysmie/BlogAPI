var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
let blogArray = [];
let  id = 1;

router.post('/create', function(req, res, next) {
	let blog = req.body;
	//blog.id =blog.id;
	id+=1;
	blogArray.push(blog);
	console.log(blogArray);
  res.send('Post created succesfully!');
});
router.get('/read/:id', function(req, res, next) {
	let blogid = req.params.id;
	let result = blogArray.find(item=>item.id==blogid);
	console.log(result);
  res.send(result);
});

router.put('/update', function(req, res, next) {
	let update_id = req.body.id;
	updated = blogArray[update_id-1]=req.body;
  res.send(updated);
});

router.delete('/delete/:id', function(req, res, next) {
	// let blogid = req.params.id;
	// console.log(blogid);
	// let result = blogArray.splice(blogid-1);
	// updated = blogArray[update_id-1]=req.body;
  res.send('Delete Here');
});
router.get('/all', function(req, res, next) {
	let result = blogArray
  res.send(result);
});


module.exports = router;
