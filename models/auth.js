var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var authSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  token : {
    type : String,
    required : true
  }
},{
  timestamps : true
});

var authentication = mongoose.model("authentication", authSchema);

module.exports = authentication;
