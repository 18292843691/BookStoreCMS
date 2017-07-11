var mongoose = require('mongoose')

var CommentSchema = require('../schemas/comment')
var Comment = mongoose.model('Comment', CommentSchema)

// comment
exports.save = function(req, res) {
    var comment = req.body.comment
    var _comment = {
        content: req.body.commentcotent,
        from: req.body.commentfrom,
        tid: req.body.tid
    }
    var bookId = _comment.book

    if (_comment.cid) {
        Comment.findById(_comment.cid, function(err, comment) {
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }

            comment.reply.push(reply)

            comment.save(function(err, comment) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/book/' + bookId)
            })
        })
    } else {
        var comment = new Comment(_comment)

        comment.save(function(err, comment) {
            if (err) {
                console.log(err)
            }

            res.redirect('/book/' + bookId)
        })
    }
}
