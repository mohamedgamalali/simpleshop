const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const shopRoute = require('./routes/shop');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI ;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/shop', shopRoute) ;

//error handle meddlewere
app.use((error,req,res,next)=>{
    const status    = error.statusCode || 500 ;
    const message   = error.message           ;
    const data      = error.data              ;
    
    res.status(status).json({state:0,message:message,data:data});
});


mongoose
    .connect(
        MONGODB_URI, {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    }
    )
    .then(result => {
        const server = app.listen(3000);

        console.log('losten to port 3000');
    })
    .catch(err => {
        console.log(err);
    });