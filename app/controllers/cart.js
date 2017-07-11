var mongoose = require('mongoose')

var CartSchema = require('../schemas/cart')
var Cart = mongoose.model('Cart', CartSchema, 'carts')

var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema, 'users')

// var RandomSchema = require('../schemas/random')
// var Random = mongoose.model('Random', RandomSchema, 'randoms')

var BookSchema = require('../schemas/books')
var Book = mongoose.model('Book', BookSchema, 'books')

exports.showCartList = function(req, res) {

    var userId = req.session.user._id;

    Cart
        .find({ users: userId })
        .populate('books', 'title price')
        .exec(function(err, cart) {
            if (err) {
                console.log(err)
            }
            // console.log(cart.books)
            res.render('cart', {
                title: '我的购物车',
                cart: cart || {}
                    // books: books || {}
            })
        })
}

exports.new = function(req, res) {

    if (!req.cookies.user) {
        res.redirect('/login')

    } else {
        var _bookId = req.body.bookId,
            _userId = req.session.user._id,
            _price = req.body.price,
            _count = req.body.count;

        var _cart = {
            books: _bookId,
            price: _price,
            count: _count,
            users: _userId
        }

        var cart = new Cart(_cart)

        console.log('NEW CART ：' + cart)

        cart.save(function(err, cart) {
            if (err) {
                console.log(err)
                res.json({ error: 1, mes: '添加失败，请稍后再试' })
            }
            // console.log(cart)
            res.json({ success: 1, mes: '添加到购物车成功' })
                // res.redirect(back)
        })
    }
}

exports.delete = function(req, res) {
    var id = req.params[0];
    // console.log(req.params[])
    if (id) {

        Cart.remove({ _id: id }, function(err, book) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            } else {
                res.json({ success: 1 })
            }
        })
    }
}
