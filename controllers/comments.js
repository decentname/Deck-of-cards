const express = require('express');
var router = express.Router();
var db = require('../config/db');
var Comment = require('../model/comments');


router.get('/',function(req,res){
	
	res.render('comments');
})



module.exports = router;