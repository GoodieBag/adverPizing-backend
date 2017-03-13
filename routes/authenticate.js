var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var authentication = require('../models/auth');
var token = require('../utilities/token-generator')
var savedUserToken = require('../utilities/database-util')
var authRouter = express.Router();
authRouter.use(bodyParser.json());


authRouter.route('/')
    .get(function(req, res, next) {
        //Checks authentication
        var token = req.get("token");
        savedUserToken.getToken(function(err, userToken) {
            if (token != userToken) {
                res.end("Authentication failed.");
            } else {
                res.end("User is authenticated.");
            }
        });
    })
.post(function(req, res, next) {
        //Take username and password in the params.
        req.body.token = token();
        //Added user to database
        authentication.remove(function(err, resp) {
            if (err) throw err;
            console.log("Authentication db cleared" + resp);
        });
        authentication.create(req.body, function(err, auth) {
            if (err) throw err;
            //Send the token back to the user.
            res.json({
                token: req.body.token,
                message: req.body.username + " has logged in."
            });
        });
    })
    .put(function(req, res, next) {
        //Validate with token, then update the existing user and pass if existing
    });


module.exports = authRouter;
