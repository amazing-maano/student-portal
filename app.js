const express = require('express');
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/students');
const classRouter = require('./routes/class');

const app = express();

const passport = require('passport');
require('./config/passport')(passport);
// ----------------mongodb atlas start---------------------------------
const uristring = process.env.MONGODB_URI || 'mongodb+srv://maano:qwerty01@cluster0-k2dog.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(
        uristring, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
    )
    .then(() => console.log('DB Connected'))
mongoose.connection.on('error', err => {
    console.log('DB connection error: ${err.message}')
});
// -----------------mongodb atlas end------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport-middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', indexRouter);
app.use('/students', studentRouter);
app.use('/class', classRouter);

module.exports = app;