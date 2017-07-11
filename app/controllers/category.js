var mongoose = require('mongoose')

var CategorySchema = require('../schemas/category')
var Category = mongoose.model('Category', CategorySchema, 'categories')

var BookSchema = require('../schemas/books')
var Book = mongoose.model('Book', BookSchema, 'books')

// admin new page
exports.new = function(req, res) {
    Category.fetch(function(err, categories) {
        if (err) {
            console.log(err)
        }

        res.render('category_admin', {
            title: '分类列表页',
            categories: categories || {}
        })
    })
}

// admin post movie
exports.save = function(req, res) {
    var _categoryname = req.body.categoryname

    var books = []
    var category = {
            name: _categoryname,
            books: books
        }
        // console.log(_categoryname)
    var _category = new Category(category)

    // Book.findOne({category: category.name}, function(err, book) {
    //     if(book) {
    //         console.log(book)
    //         category.books.push(book._id)
    //     }       
    // })
        // console.log(category)  
    Category.findOne({ name: category.name }, function(err, category) {
        if (err) {
            console.log(err)
        }
        if (category) {
            return res.json({error: 1, mes:'该分类已存在'})
        } else {
            _category.save(function(err, category) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/category')
            })
        }
    })
}

exports.delete = function(req, res) {
    var id = req.body.id;

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
