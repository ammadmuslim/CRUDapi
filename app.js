const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const product = require('./routes/product.route');
const app = express();

//setting mongodb
let dev_db_url = 'mongodb://roismuslim7:tsani888@ds139950.mlab.com:39950/gbootcamp';
const mongoDB = process.env.MONGODB_URI||dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MOngo DB connection error: '));

//setting bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

// set CORS to allow access from any server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

let port = process.env.PORT||3000;

app.listen(port, ()=>{
	console.log('Server is up');
})