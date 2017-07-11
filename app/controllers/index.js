var mongoose = require('mongoose')

var bookSchema = require('../schemas/books')
var Book = mongoose.model('Book', bookSchema,'books')

var CategorySchema = require('../schemas/category')
var Category = mongoose.model('Category', CategorySchema, 'categories')

// index page
exports.index = function(req, res) {

    if (req.cookies.user) {
        Category
            .find({})
            .populate({
                    path: 'books',
                    select: '_id title price imageName',
                    options:{limit:6}
                })
            .exec(function(err, categories) {
                if (err) {
                    console.log(err)
                }          

                // console.log(categories.books)    
                res.render('index', {
                    title: 'welcome here, just do it',
                    categories: categories || {},
                    username: req.cookies.user.username,
                    password: req.cookies.user.password
                })               
            })
    } else {
         Category
            .find({})
            .populate({
                    path: 'books',
                    select: '_id title price imageName',
                    options:{limit:6}
                })
            .exec(function(err, categories) {
                if (err) {
                    console.log(err)
                }          

                // console.log(categories[0].books)    
                res.render('index', {
                    title: 'welcome here, just do it',
                    categories: categories || {}                    
                })               
            })
    }
}

// search page
exports.search = function(req, res) {
    var catId = req.query.cat
    var q = req.query.q
    var page = parseInt(req.query.p, 10) || 0
    var count = 5
    var index = page * count

    if (catId) {
        Category
            .find({ _id: catId })
            .populate({
                path: 'books',
                select: 'title'
            })
            .exec(function(err, categories) {
                if (err) {
                    console.log(err)
                }
                var category = categories[0] || {}
                var books = category.books || []
                var results = books.slice(index, index + count)

                res.render('results', {
                    title: '结果列表页面',
                    keyword: category.name,
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(books.length / count),
                    books: results
                })
            })
    } else {
        Book
            .find({ title: new RegExp(q + '.*', 'g') })
            .exec(function(err, books) {
                if (err) {
                    console.log(err)
                }

                var results = books.slice(index, index + count)

                res.render('results', {
                    title: '结果列表页面',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(books.length / count),
                    books: results
                })
            })
    }
}
