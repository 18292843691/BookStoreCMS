var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Book = require('../app/controllers/books')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')
var Cart = require('../app/controllers/cart')
var Order = require('../app/controllers/order')

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart() 

module.exports = function(app) {

  // pre handle user
  app.use(function(req, res, next) {
    var _user = req.session.user

    app.locals.user = _user

    next()
  })


  // Index
  app.get('/', Index.index)

  // User
  app.post('/user/istrue', User.istrue)
  app.post('/user/register', User.register)
  app.post('/user/login', User.login)
  app.get('/login', User.showLogin)
  app.get('/register', User.showRegister)
  app.get('/logout', User.logout)
  app.get('/user/aboutme', User.signinRequired, User.showAboutme)
  app.get('/user/aboutme/new', User.signinRequired, User.newAboutme)


  //支付页面
  app.get('/user/pay/*', User.signinRequired, User.showPay)

  //user order
  app.get('/user/order', User.signinRequired, Order.showOrderList)
  app.delete('/user/order/delete/*', User.signinRequired, Order.delete)
  app.post('/user/order/finishedpay/*',User.signinRequired, Order.finishedpay)
  app.post('/user/cart/pay/*', User.signinRequired, Order.new)
  app.post('/user/detail/pay/*', User.signinRequired, Order.new)
  app.post('/user/index/pay/*', User.signinRequired, Order.new)

  //admin order
  app.get('/admin/order', User.signinRequired, User.adminRequired, Order.showAdminOrderList)
  app.post('/admin/order/finished', User.signinRequired, User.adminRequired, Order.finished)
  app.post('/admin/order/alert/',User.signinRequired, User.adminRequired, Order.alert)
  app.delete('/admin/order/delete/*', User.signinRequired, User.adminRequired, Order.delete)
  app.post('/admin/order/send/',  User.signinRequired, User.adminRequired, Order.finished)
  //cart
  app.get('/user/cart', User.signinRequired, Cart.showCartList)
  app.post('/user/cart/new/*', User.signinRequired, Cart.new)
  app.delete('/admin/book/cart/delete/*', User.signinRequired, Cart.delete)

  //admin
  app.get('/admin/user/list', User.signinRequired, User.supAdminRequired, User.list)
  app.delete('/admin/user/list/delete/*', User.signinRequired, User.adminRequired, User.delete)
  app.post('/admin/user/list/update/*', User.signinRequired, User.adminRequired, User.update)
  app.delete('/admin/book/list/delete/*', User.signinRequired, User.adminRequired, Book.del)
  // Book
  app.get('/book/:id', Book.detail)
  app.get('/admin/book/new', User.signinRequired, User.adminRequired, Book.new)
  app.post('/admin/book/new/add', User.signinRequired, User.adminRequired, Book.save)
  app.get('/admin/book/list', User.signinRequired, User.adminRequired, Book.list)
  app.get('/admin/book/new/*', User.signinRequired, User.adminRequired, Book.update)
  app.delete('/admin/category/delete/*', User.signinRequired, User.adminRequired, Book.del)

  // Comment
  app.post('/user/comment', User.signinRequired, Comment.save)

  // Category
  app.get('/admin/category', User.signinRequired, User.adminRequired, Category.new)
  app.post('/admin/category/new/add', User.signinRequired, User.adminRequired, Category.save)
  app.delete('/admin/category/delete/*', User.signinRequired, User.adminRequired, Category.delete)

  // results
  app.get('/results', Index.search)
}