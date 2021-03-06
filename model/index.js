var db = require('../config/db')
  , crypto = require('crypto')

hash = function(password) {
  return crypto.createHash('sha1').update(password).digest('base64')
}

exports.create = function(firstname,lastname,email, password, cb) {
  var user = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hash(password),
  }

  db.get().collection('users').insertOne(user,function(err,res){
    if(err) {
      cb(err,null);
    }
    else{
      cb(null,res);
    }
  })
}

exports.get = function(email, cb) {
  db.get().collection('users').find({'email':email}, function(err, docs) {
    if (err) return cb(err,null);
    cb(null, docs);
  })
}

exports.authenticate = function(email, password,cb) {
  db.get().collection('users').find({'email':email}).toArray(function(err, docs){

    if (err) return cb(err);
    if (docs.length === 0) return cb("No such user exist");
    var user = docs[0];

    if (user.password === hash(password)) {
      cb(null, docs[0])
    } else {
      cb('Wrong username/password');
    }
  }) 
}
