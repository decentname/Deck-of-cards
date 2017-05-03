const express = require('express');
var router = express.Router();
var db = require('../config/db');
var deck = require('../model/deck');


router.get('/',function(req,res){
	// if(req.session.email)	
		res.render('deck');
	// else
		// res.render('index');
})


router.get('/logout',function(req,res){
	req.session.destroy(function(){
		res.redirect('/');		
	});	
})


router.get('/getDeck',function(req,res){
	// if(req.session.email){
		Deck.display(function(err,rep){
			if(err){
				res.send("Error");
			}
			else{
				res.send(rep);	
			}
		})
	// }else{
		// res.send("User must be logged in");
	// }
})


// router.post('/add',function(req,res){
// 	if(req.session.email){
// 		var text = req.body.text;
// 		console.log(text);
// 		Comment.create(req.session.email,text,function(err,rep){
// 			if(err){
// 				res.send("Could not add to db");
// 			}
// 			else{
// 				res.send(rep.ops);
// 			}
// 		})
// 	}
// })

module.exports = router;