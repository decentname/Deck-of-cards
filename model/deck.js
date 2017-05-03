var db = require('../config/db');

exports.create = function(email,text,cb){
	var timestamp = + new Date();
	
}

exports.display = function(email,cb){
	db.get().collection('deck').find({'email':email}).toArray(function(err,res){
		if (err){
			return cb(err,null);	
		}
		else{
			if(res.length==0){
				//create first
				db.get().collection('deck').insertOne({'email':email,
					'deck':[{},{},{},{},{},{},{},{},{},{},{},{},
					{},{},{},{},{},{},{},{},{},{},{},{}]},function(err,res){
					if(err){
						return cb(err,null);	
					}
					else{
						cb(null,res);	
					} 
					
				})
			}
			else{
				return cb(null,res);
			}	
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