var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AdminSchema = mongoose.Schema({
	email: String,
	password: String
});

AdminSchema.set('toJSON', {
	transform: function(doc, ret, options){
		var returnJson = {
			id: ret._id,
			email: ret.email,
		};
		return returnJson;
	}
});


AdminSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

AdminSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});


module.exports = mongoose.model('Admin', AdminSchema);





