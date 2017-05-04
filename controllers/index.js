const express = require('express');
var router = express.Router();
var db = require('../config/db');
var index = require('../model/index');
router.get('/',function(req,res){
	if(req.session.email) {
		// console.log("comments");
		res.redirect('deck');
	}
	else{
		// console.log("index");
		res.render('index');
	}
})

router.post('/login',function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	index.authenticate(email,password,function(err,resp){
		if(err){ 
			// console.log(err);
			backURL=req.header('Referer') || '/';
  			res.redirect(backURL);
  		}
  		else{
	  		if(req.session.email){ 
	  			
	  		}
	  		else{
	  			req.session.email = email;
  				res.redirect('deck');	
	  		}
  			  			
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
			if(req.session.email){
				
			}
			else{
				req.session.email = email;
				res.redirect('deck');	
			}
  			
		}
	})
})



module.exports = router;	