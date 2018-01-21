const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session');
const db = require('./config/db');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 8080;
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
  store: new MongoStore({url : "mongodb://heroku_bvpclbgh:s2j4i2398tvpimnv21dr6nnn93@ds111138.mlab.com:11138/heroku_bvpclbgh"})
}));

db.connect(function(err){
	if(err){
		console.log("Connection to db failed");
	}else{
		// console.log("Connected to db");
		app.listen(port,function(){
			console.log("Express server listening on port 5000");
		});
	}
})

app.use('/',require('./controllers/index'));
app.use('/deck',require('./controllers/deck'));


module.exports = app;