var db = require('../config/db');

exports.create = function(user,text,cb){
	var timestamp = + new Date();
	db.get().collection('comments').insertOne({'user':user,'comment':text,'timestamp':timestamp},function(err,res){
		if(err) return cb(err,null);
		cb(null,res);
	})
}

exports.display = function(user,cb){
	db.get().collection('comments').find().toArray(function(err,res){
		if (err) return cb(err,null);
		cb(null,res);
	})
}

exports.byUser = function(user,cb){
	db.get().collection('comments').find({'user':user}).toArray(function(err,res){
		if (err) return cb(err,null);
		cb(null,res);
	})	
}	