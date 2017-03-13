var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var authentication = require('../models/auth');

var authRouter = express.Router();
authRouter.use(bodyParser.json());


authRouter.route('/')
.get(function(req, res, next){
  //Get the token from database validate with the req token return the token
})
.post(function(req,res,next){
  //Take username and password in the params.
  req.body.token = "token";
  authentication.create(req.body, function(err, auth){
    //Added user to database
    if(err) throw err;
    res.end("User " + auth.username + " " + auth.password + " " + auth.token);
  });
  //Add it to the database and generate a token
})
.put(function(req,res,next){
  //Validate with token, then update the existing user and pass if existing
});


module.exports = authRouter;
