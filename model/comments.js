var db = require('../config/db');

exports.create = function(email,text,cb){
	var timestamp = + new Date();
	db.get().collection('comments').insertOne({'email':email,'comment':text,'timestamp':timestamp},function(err,res){
		if(err){
			return cb(err,null);	
		}
		else{
			cb(null,res);	
		} 
		
	})
}

exports.display = function(cb){
	db.get().collection('comments').find().toArray(function(err,res){
		if (err){
			return cb(err,null);	
		}
		else{
			cb(null,res);	
		} 
		
	})
}

exports.byUser = function(email,cb){
	db.get().collection('comments').find({'email':email}).toArray(function(err,res){
		if (err){
			return cb(err,null);	
		}
		else{
			cb(null,res);	
		} 
		
	})	
}	