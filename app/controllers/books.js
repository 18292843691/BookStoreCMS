var mongoose = require('mongoose')

var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema, 'users')

var BookSchema = require('../schemas/books')
var Book = mongoose.model('Book', BookSchema, 'books')

var CategorySchema = require('../schemas/category')
var Category = mongoose.model('Category', CategorySchema, 'categories')

var CommentSchema = require('../schemas/comment')
var Comment = mongoose.model('Comment', CommentSchema)

var _ = require('underscore')
var fs = require('fs')
var path = require('path')

// detail page
exports.detail = function(req, res) {

    var id = req.params.id

    console.log(req.params.id)

    Book.find({ _id: id })
        .populate('category', 'name')
        .exec(function(err, books) {
            if (err) {
                console.log(err)
            }
            //console.log(books[0].category)
            res.render('detail', {
                title: '详情页',
                books: books || {}
                // comments: comments
            })
        })
}

// admin new page
exports.new = function(req, res) {
    Category.find({}, function(err, categories) {
        res.render('admin', {
            title: '后台添加页',
            book: {}
        })
    })
}

// admin update page
exports.update = function(req, res) {

    var id = req.params[0]
    console.log(req.params)

    if (id) {
        Book.findById(id, function(err, book) {

            res.render('admin', {
                title: '图书管理页',
                book: book
            })
        })
    }
}

// admin post book
exports.save = function(req, res) {
    var id = req.body.id,
        _category = req.body.categoryname,
        _title = req.body.title,
        _author = req.body.author,
        _publisher = req.body.publisher,
        _price = req.body.price,
        _repertory = req.body.repertory,
        _img = req.body.uploadImg || {},
        _imageName = req.body.imageName,
        _summary = req.body.summary;

    var bookObj = {
        category: _category,
        title: _title,
        author: _author,
        publisher: _publisher,
        price: _price,
        repertory: _repertory,
        image: _img,
        summary: _summary,
        imageName: _imageName
    }

    if (id) {
        Book.findById(id, function(err, book) {
            if (err) {
                console.log(err)
            }
            if (id) {

            }

            _book = _.extend(book, bookObj)
            _book.save(function(err, book) {
                if (err) {
                    console.log(err)
                }
                // res.redirect('/book/' + book._id)
                res.redirect('/admin/book/new')
            })
        })
    } else {

        _book = new Book(bookObj)
            // console.log('_book: ' + _book)

        var categoryName = bookObj.category

        var _category = new Category({
            name: categoryName,
            books: _book._id
        })
        //console.log(_category)

        Category.findOne({ name: categoryName }, function(err, category) {
            if (category) {
                console.log(category)
                category.books.push(_book._id)
                res.redirect('/admin/book/new')
            } else {
                _category.save(function(err, category) {
                    _book.category = category._id
                    _book.save(function(err, book) {
                        // res.redirect('/book/' + book._id)
                        console.log(book)
                        res.redirect('/admin/book/new')
                    })
                })
            }
        })
    }
}

// list page
exports.list = function(req, res) {

    Book.find({})
        .populate('category','name')
        .exec(function(err, books) {
            if (err) {
                console.log(err)
            }
            console.log(books)
            res.render('list', {
                title: '图书管理页',
                books: books
            })
        })
}

// list page
exports.del = function(req, res) {
    var id = req.params[0];

    if (id) {

        Book.remove({ _id: id }, function(err, book) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            } else {
                res.json({ success: 1 })
            }
        })
    }
}
