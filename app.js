const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const product = require('./routes/product.route');

const app = express();
let dev_db_url = 'mongodb://roismuslim7:tsani888@ds139950.mlab.com:39950/gbootcamp';
const mongoDB = process.env.MONGODB_URI||dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MOngo DB connection error: '));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 1234;

app.listen(port, ()=>{
	console.log('Server is up');
})