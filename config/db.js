const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017/userData";
var db = null;

exports.connect = function(done){
	if(db) return done();
	MongoClient.connect(url,function(err,mongodb){
		if(err) return done(err);
		db = mongodb;
		done();	
	})
}

exports.get = function(){
	return db;
}

exports.close = function(done){
	if(db){
		db.close(function(err,res){
			if(err) return done(err);
			db = null;
			done();
		})
	}
}
