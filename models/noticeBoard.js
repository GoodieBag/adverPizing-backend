var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeBoardSchema = new Schema({
    date : {
        type : String,
    },
    title : {
        type : String
    },
    description : {
        type : String,
        required : true
    },
    deadline : {
        type : String
    },
    teacher : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

var noticeBoard = mongoose.model("noticeboard", noticeBoardSchema);

module.exports = noticeBoard;
