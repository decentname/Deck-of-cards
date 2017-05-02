const express = require('express');
var router = express.Router();
var db = require('../config/db');
var index = require('../model/index');
router.all('/',function(req,res){
	res.render('index')
})

router.post('/login',function(req,res){
	console.log(req.body);
	// console.log(req);
	// res.redirect('comments');
	var email = req.body.email;
	var password = req.body.password;
	index.authenticate(email,password,function(err,resp){
		if(err){ 
			console.log(err);
			backURL=req.header('Referer') || '/';
  			res.redirect(backURL);
  		}
	})
})

router.post('/signup',function(req,res){
	console.log("signup");
})



module.exports = router;