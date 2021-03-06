"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const channelRouter = require('./routes/channel');
const moyoRouter = require('./routes/moyo');
const userChannelRouter = require('./routes/user-channel');
const userMoyoRouter = require('./routes/user-moyo');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// point to front end build folder
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('', indexRouter);
/*app.use('/user', usersRouter);
app.use('/channel', channelRouter);
app.use('/moyo', moyoRouter);
app.use('/user-channel', userChannelRouter);
app.use('/user-moyo', userMoyoRouter);*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
