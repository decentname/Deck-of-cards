const express = require('express');
var router = express.Router();
var db = require('../config/db');
var Deck = require('../model/deck');


router.get('/',function(req,res){
	if(req.session.email)	
		res.render('deck');
	else
		res.render('index');
})


router.get('/logout',function(req,res){
	req.session.destroy(function(){
		res.redirect('/');		
	});	
})


router.get('/getDeck',function(req,res){
	if(req.session.email){
		Deck.display(req.session.email,function(err,rep){
			if(err){
				res.send("Error");
			}
			else{
				res.send(rep);	
			}
		})
	}else{
		res.send("User must be logged in");
	}
})

router.post('/updateDeck',function(req,res){
	if(req.session.email){
		var card = req.body.val;
		// console.log(req.body.val);
		Deck.update(req.session.email,card,function(err,rep){
			// console.log(rep)
			res.send(rep[0]);
		})
	}
})

module.exports = router;