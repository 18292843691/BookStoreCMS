var mongoose = require('mongoose')

var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema, 'users')

var OrderSchema = require('../schemas/order')
var Order = mongoose.model('Order', OrderSchema, 'orders')

// signup
exports.showRegister = function(req, res) {
    res.render('register', {
        title: '注册页面'
    })
}

exports.showLogin = function(req, res) {
    res.render('login', {
        title: '登录页面'
    })
}

exports.showPay = function(req, res) {
    var user = req.session.user

    // console.log(req.params)
    var bookId = req.params[0]
    console.log(bookId)
    if (bookId) {
        Order.find({ bookId: bookId })
            .populate('user', 'username')
            .exec(function(err, order) {
                console.log(order);
                res.render('pay', {
                    title: '支付页面',
                    order: order
                })
            })
    }

}

//注册
exports.register = function(req, res) {

    var username = req.body.username,
        password = req.body.password;

    var _user = {
            username: username,
            password: password
        }
        // console.log(_user)
    User.findOne({ username: _user.username }, function(err, user) {

        if (err) {
            console.log(err)
        }
        if (user) {
            return res.redirect('/register')
        } else {
            user = new User(_user)
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                // return res.json({success: 1, mes: '注册成功'})
                return res.redirect('/')
            })
        }
    })
}

// signin
exports.login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // console.log(req.body)
    var _user = {
            username: username,
            password: password
        }
        // console.log(req.cookies)
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.json({ err: 1, mes: '该用户不存在' })
            res.redirect('/register')
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err)
            }

            if (isMatch) {
                if (req.body.checkpwd) {
                    if (req.cookies) {
                        res.cookie('user', { 'username': username, 'password': password }, { maxAge: 1000 * 60 * 60 });
                    }
                }

                req.session.user = user
                    // console.log(user)
                res.redirect('back')
            } else {
                return res.json({ err: 1, mes: '密码错误' })
            }
        })
    })
}

// logout
exports.logout = function(req, res) {
    delete req.session.user
        //delete app.locals.user
    res.redirect('/')
}

exports.showAboutme = function(req, res) {
    var user = req.session.user

    User.findOne({ username: user.username }, function(err, user) {
        if (err) {
            console.log(err)
        }
        //console.log(user)
        res.render('aboutme', {
            title: '个人信息',
            user: user
        })
    })
}

exports.newAboutme = function(req, res) {
    var user = req.body.user
    User.update({ _id: user._id }, { $set: {} }, function(err, user) {
        if (err) {
            console.log(err)
        }
        res.redirect('/user/aboutme')
    })
}


//istrue 判断用户名是否存在
exports.istrue = function(req, res) {
    var username = req.body.username;
    // console.log(username)
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.json({ error: 1, mes: '该用户不存在' })
        }

        res.json({ success: 1, mes: '正确' })
    })
}

// userlist page
exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err)
        }

        res.render('userlist', {
            title: '用户列表页',
            users: users || {}
        })
    })
}


exports.delete = function(req, res) {
    var id = req.body.id;
    console.log(id)
    if (id) {
        User.remove({ _id: id }, function(err, user) {
            if (err) {
                console.log(err)
                res.json({ success: 0 })
            } else {
                res.json({ success: 1 })
            }
        })
    }
}

exports.update = function(req, res) {

    var id = req.body.id;
    var role = req.body.role;
    // console.log(id)
    // console.log(role)
    if (id) {

        User.update({ _id: id }, { $set: { role: role } }, function(err, user) {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: 1 })
            }
        })
    }
}

// 权限判断
exports.signinRequired = function(req, res, next) {
    var user = req.session.user

    if (!user) {
        return res.redirect('/')
    }

    next()
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user

    if (user.role <= 10) {
        return res.redirect('/')
    }

    next()
}

exports.supAdminRequired = function(req, res, next) {
    var user = req.session.user

    if (user.role <= 50) {
        return res.redirect('/')
    }

    next()
}
