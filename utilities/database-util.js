var authentication = require('../models/auth');


exports.getToken = function(callback) {
    authentication.findOne({}, function(err, user) {
        if (err) callback(err, null);
        var token = user.token;
        console.log(user._id)
        callback(null, token);
    });
}
