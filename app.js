const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const product = require('./routes/product.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://toDo:toDo@cluster0.7gdk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; // todo добавить в env и прокидывать оттуда
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // todo если не может подключится, то сервер должен останавливаться и убрать bind

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', product);

let port = process.env.PORT || 4000;  // todo изменить на const
app.listen(port, () => {
    console.log('server', port);
})
