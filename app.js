var express = require('express');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser');

var path = require('path');

var fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// DATABASE CONFIGURATION
mongoose.connect('mongodb://localhost/scraper');
const db = mongoose.connection;

db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

db.once('openUri', function() {
    console.log('Mongoose connection successful.');
});


// Set Handlebars as the default templating engine.  Mains main.handlebars the default layout
var exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ 
    defaultLayout: "main" 
}));

var index = require('./routes/index.js');
app.use('/', index);

// GET PORT FROM ENVIORNMENT AND STORE IN EXPRESS.
// const port = process.env.PORT || 3000;
const port = 3000;
// app.set('port', port);



// CATCH 404 AND FOWARD TO THE ERROR HANDLER.
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.listen(port, function() {
  console.log("App running on port " + port);
});