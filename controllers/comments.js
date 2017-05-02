const express = require('express');
var router = express.Router();
var db = require('../config/db');
var Comment = require('../model/comments');


router.get('/',function(req,res){
	if(req.session.views)	
		res.render('comments');
	else
		res.render('index');
})



module.exports = router;