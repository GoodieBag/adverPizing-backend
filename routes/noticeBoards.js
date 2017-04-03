var express = require('express');
var Verify = require('./verify');
var NoticeBoards = require('../models/noticeBoard');
var bodyParser = require('body-parser');

var noticeBoardRouter = express.Router();
noticeBoardRouter.use(bodyParser.json());

noticeBoardRouter.route('/')
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        NoticeBoards.create(req.body, function(err, noticeBoard) {
            if (err) throw err;
            console.log("Information updated");
            var _id = noticeBoard._id;
            res.json({
                "message": noticeBoard,
                "id": _id
            });
        });
    })
    .get(function(req, res, next) {
        NoticeBoards.find({}, function(err, noticeBoards) {
            if (err) throw err;
            var _id = noticeBoards._id;
            res.json(noticeBoards);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        NoticeBoards.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

noticeBoardRouter.route('/firstTen')
.get(function(req,res,next){
    NoticeBoards.find({}).sort('-createdAt').limit(10).exec(function(err, docs) {
        if(err) throw err;
        res.json(docs);
    });
});

noticeBoardRouter.route('/:noticeBoardId')
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        NoticeBoards.findByIdAndUpdate(req.params.noticeBoardId, {
            $set: req.body
        }, {
            new: true
        }, function(err, noticeBoard) {
            if (err) throw err;
            res.json(noticeBoard);
        });
    })
    .get(function(req, res, next) {
        NoticeBoards.findById(req.params.noticeBoardId, function(err, noticeBoard) {
            if (err) throw err;
            res.json(noticeBoard);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        NoticeBoards.findByIdAndRemove(req.params.noticeBoardId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = noticeBoardRouter;
