var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();


var secret = 'mahaloknightssecretpassphrase';

var mongoose = require('mongoose');
var Admin = require('./models/admin');
var Clothing = require('./models/clothing');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mahalo-knights');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
	'/api/clothing', 
	expressJWT({secret: secret}).unless(
		{
			path: ['/api/clothing'],
			method: ["GET", "PUT"]
		}
	)
);

// app.use(
//   '/api/clothing/:id', 
//   expressJWT({secret: secret}).unless(
//     function(req) {
//       console.log(req.method);
//       return true;
//     }
//   )
// );

app.use('/api/admin', 
  expressJWT({secret: secret}).unless(
    {
      path: ['/api/admin'], 
      method: 'POST'
    }
  )
);


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'});
  }
});

app.use('/api/clothing', require('./controllers/clothing'));
app.use('/api/admin', require('./controllers/admin'));


app.post('/api/auth', function(req, res) {
  Admin.findOne({email: req.body.email}, function(err, admin) {
    if (err || !admin) return res.send({message: 'Admin not found'});
    admin.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.send({message: 'Admin not authenticated'});
      var token = jwt.sign(admin, secret);
      res.send({admin: admin, token: token});
    });
  });
});

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT || 3000);