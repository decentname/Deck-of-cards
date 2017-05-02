const express = require('express');
var router = express.Router();
var db = require('../config/db');
var index = require('../model/index');
router.all('/',function(req,res){
	if(req.session.views) {
		res.redirect('/comments');
	}
	else{
		res.render('index');
	}
})

router.post('/login',function(req,res){
	// console.log(req.body);
	// console.log(req);
	// res.redirect('comments');
	var email = req.body.email;
	var password = req.body.password;
	index.authenticate(email,password,function(err,resp){
		if(err){ 
			// console.log(err);
			backURL=req.header('Referer') || '/';
  			res.redirect(backURL);
  		}
  		else{
	  		if(req.session.views) ++req.session.views;
  			req.session.views = 1;
  			res.redirect('/comments');  			
  		}

	})
})

router.post('/signup',function(req,res){
	// console.log("signup");
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	// console.log(req.body);
	index.create(firstname,lastname,email,password,function(err,resp){
		if(err){
			// console.log(err);
			backURL=req.header('Referer') || '/';
  			res.redirect(backURL);
		}
		else{
			if(req.session.views) ++req.session.views;
  			req.session.views = 1;
			res.redirect('/comments');
		}
	})
})



module.exports = router;	