const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost:27017/movieApp");
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected");
})

app.engine('ejs', ejsMate);
app.set(path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('homepage');
})
app.use('/', routes);

app.listen(3000, () => {
    console.log("Server connected, Running on port 3000");
})