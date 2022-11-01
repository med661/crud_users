var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose  = require('mongoose');
require('dotenv').config()
//var cors = require('cors')
var cors = require('cors');

const routerUsers=require('./routes/users.route')
var app = express();
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGO_URI).then(()=>{
console.log("connected")
}).catch((err)=>{
    console.log("err"+err);
})
app.use('/api',routerUsers)
module.exports = app;
