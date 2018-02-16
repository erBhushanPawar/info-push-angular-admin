var mongoose = require('mongoose');

var Promise = require("bluebird");
// promise to mongoose
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
// create schema less model
var categorySchema = new Schema({/* mention schema here */}, { strict: false });
var product = mongoose.model('category', categorySchema);

// make this available to our users in our Node applications
module.exports = product; 

