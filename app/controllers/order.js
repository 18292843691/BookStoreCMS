var mongoose = require('mongoose')

var CartSchema = require('../schemas/cart')
var Cart = mongoose.model('Cart', CartSchema, 'carts')

var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema)

const nodemailer = require('nodemailer');

var OrderSchema = require('../schemas/order')
var Order = mongoose.model('Order', OrderSchema, 'orders')

var mongoose = require('mongoose')

var CartSchema = require('../schemas/cart')
var Cart = mongoose.model('Cart', CartSchema, 'carts')

var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema, 'users')

var BookSchema = require('../schemas/books')
var Book = mongoose.model('Book', BookSchema, 'books')


// var transporter = nodemailer.createTransport({
//     host: 'smtp.qq.com',
//     port: 465,
//     secure: true, // secure:true for port 465, secure:false for port 587
//     auth: {
//         user: '1476792107@qq.com',
//         pass: 'haiyaozaiyiqi33'
//     }
// });

exports.showOrderList = function(req, res) {
    var userId = req.session.user._id;
    // console.log(userId)
    User.findById({ _id: userId }, function(err, user) {
        // console.log('userId: '+ user._id)
        //console.log(user)
        Order
            .find({ userId: user._id })
            .populate('user', 'username')
            .populate('book', 'title price')
            .exec(function(err, order) {
                if (err) {
                    console.log(err);
                }
                //console.log(order)
                res.render('order', {
                    title: '我的订单',
                    order: order,
                    user: user
                })
            })
    })
}

exports.showAdminOrderList = function(req, res) {

    Order.find({})
        .populate('user', 'username email address')
        .populate('books', 'title price repertory category')
        .exec(function(err, order) {
            if (err) {
                console.log(err)
            }
            //console.log(order)
            res.render('order', {
                title: '订单管理页',
                order: order,
                user: req.session.user
            })
        })
}

//完成付款
exports.finishedpay = function(req, res) {

    var orderId = req.body.orderId;

    Order.update({ orderId: orderId }, { $set: { isBuy: 1 } }, function(err, order) {
        if (err) {
            console.log(err)
            res.json({ error: 1, mes: '付款失败，更新失败' })
        }
        // console.log(order)        
        res.json({ success: 1, mes: '完成付款，请等待发货' })
    });   
}

//提醒付款
exports.alert = function(req, res) {
    var userId = req.body.userId;

    User.findById({ _id: userId }, function(err, user) {
        if(err) {
             return res.json({ error: 1, mes: '提醒失败,用户邮箱不存在' })
        }

        res.json({ success: 1, mes: '邮件发送成功' })
    })
}

// 完成发货
exports.finished = function(req, res) {
    var userId = req.body.userId;
    // var bookId = req.body.bookId;
    var orderId = req.body.orderId;
    Order.update({ _id: orderId }, {$set:{ isSend: 1}}, function(err, user) {
        if(err) {
            return res.json({ error: 1, mes: '发货失败' })
        }

        res.json({ success: 1, mes: '发货成功，已成功提醒用户' })
    })
}

//新订单生成
exports.new = function(req, res) {

    if (req.session.user._id == 'undefined') {
        res.redirect('/login')
    } else {

        var _bookId = req.body.bookId,
            _userId = req.session.user._id,
            _price = req.body.price,
            _count = req.body.count,
            _isBuy = req.body.isBuy || 0,
            _adminId = req.body.adminId || "593fb2022ae4dc0bc832303e",
            _isSend = 0;

        var _order = {
            book: _bookId,
            bookId: _bookId,
            user: _userId,
            userId: _userId,
            count: _count,
            price: _price,
            isBuy: _isBuy,
            admin: _adminId,
            isSend: _isSend || 0
        }

        var order = new Order(_order)

        //console.log(order)
        order.save(function(err, cart) {
            if (err) {
                console.log(err)
                return res.json({ error: 1, mes: '请求失败，请稍后再试' })
            }

            //Book.findById({_id: order.bookId}, {$set:{repertory: -1}});  //购买成功时，仓库内数量减一
            res.json({ success: 1, mes: '已成功生成订单,请尽快支付' })
        })
    }
}



exports.delete = function(req, res) {
    var id = req.params[0];
    // console.log(req.params[])
    var _id = req.body.id;
    if (id) {

        Order.remove({ _id: id }, function(err, book) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            } else {
                res.json({ success: 1 })
            }
        })
    } else if (_id) {
        Order.remove({ _id: _id }, function(err, book) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            } else {
                res.json({ success: 1 })
            }
        })
    }
}
