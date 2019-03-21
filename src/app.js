//To create a path which is readable by both linux and windows
const path = require('path');
//Indicating a use of Express within the project
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// connection to db
mongoose.connect('mongodb://localhost/crud-mongo')
//Checking with promise whether is connected to the database returning a message or err
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

//importing routes
//Calling the index file within routes folder
const indexRoutes = require('./routes/index')


//settings
//Setting the server to listen to any port that may be used by the app
app.set('port', process.env.PORT || 3000);
//Using path for compatibility with windows and linux since linux uses "/" for fodlers and windows uses "\"
app.set('views', path.join(__dirname, 'views'));
//Template engine which adds a little "kick me up" (extra functionality) to the html
app.set('view engine', 'ejs');


//middlewares
//showing the routes before going to routes by console to make sure everything's working
app.use(morgan('development'));
//Understands the data from html extended:false indica que recibira texto mas no imagenes, etc
app.use(express.urlencoded({extended: false}))

// routes
//Defining where the routes are for index
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
	//Getting the info of the port whichever it shall be
	console.log(`server on port ${app.get('port')}`);
});