var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mahalo-knights');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/clothing', require('./controllers/clothing'));
app.use('/api/admins', require('./controllers/admin'));

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, "public/index.html"));
});









app.listen(process.env.PORT || 3000);