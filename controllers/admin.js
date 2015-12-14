var express = require('express');
var Admin = require('../models/admin');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Admin.find(function(err, admins) {
      if (err) return res.status(500).send(err);
      res.send(admins);
    });
  })
  .post(function(req, res) {
    Admin.create(req.body, function(err, admin) {
      if (err) return res.status(500).send(err);
      res.send(admin);
    });
  });

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, admin) {
    if (err) return res.status(500).send(err);
    res.send(admin);
  });
});






module.exports = router;