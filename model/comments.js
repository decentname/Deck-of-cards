
exports.create = function(user,text,db,cb){
	var timestamp = + new Date();
	db.get().collection('comments').insertOne({'user':user,'comment':text,'timestamp':timestamp},function(err,res){
		if(err) return cb(err,null);
		cb(null,res);
	})
}

exports.display = function(user,db,cb){
	db.get().collection('comments').find().toArray(function(err,res){
		if (err) return cb(err,null);
		cb(null,res);
	})
}

exports.byUser = function(user,db,cb){
	db.get().collection('comments').find({'user':user}).toArray(function(err,res){
		if (err) return cb(err,null);
		cb(null,res);
	})	
}