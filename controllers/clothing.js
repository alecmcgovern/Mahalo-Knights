var express = require('express');
var Clothing = require('../models/clothing');
var router = express.Router();


router.route('/')
  .get(function(req, res) {
    Clothing.find(function(err, items) {
      if (err) return res.status(500).send(err);
      res.send(items);
    });
  })
  .post(function(req, res) {
    Clothing.create(req.body, function(err, item) {
      if (err) return res.status(500).send(err);
      res.send(item);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Clothing.findById(req.params.id, function(err, item) {
      if (err) return res.status(500).send(err);
      res.send(item);
    });
  })
  .put(function(req, res) {
    Clothing.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Clothing.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;