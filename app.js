const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./controllers/index'));
app.use('/comments',require('./controllers/comments'));

db.connect(function(err){
	if(err){
		console.log("Connection to db failed");
	}else{
		// console.log("Connected to db");
		app.listen(8000,function(){
			console.log("Express server listening on port 8000");
		});
	}
})

module.exports = app;