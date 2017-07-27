var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbUrl = 'mongodb://localhost/books';

mongoose.connect(dbUrl , function (err) {
    if (err) {
        console.log(err)
    } else{    
        console.log('mongodb connect at ' + dbUrl)
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img/icon/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//文件上传
// var multer = require('multer');

//session 
var session = require('express-session');

app.use(session({
    secret: 'xin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));

//pre handle user
app.use(function(req, res, next) {

    var _user = req.session.user

    app.locals.user = _user

    return next()
});

//引入路由
require('./router/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});

app.locals.moment = require('moment');

app.listen(port, function() {
    console.log('app started on port ' + port)
});

module.exports = app;
