var mongoose = require('mongoose');

var ClothingSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String
});



module.exports = mongoose.model('Clothing', ClothingSchema);