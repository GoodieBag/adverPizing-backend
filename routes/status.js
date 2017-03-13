var express = require('express');

var statusRouter = express.Router();

statusRouter.route('/')
    .get(function(req, res, next) {
        //Return device status and details
        res.json({
          "status" : "online",
        "name" : "Raspberry-pi"
      });
    });

statusRouter.route('/online')
    .get(function(req, res, next) {
        res.json({
            "status": "online"
        });
    });

module.exports = statusRouter;
