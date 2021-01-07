// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // dev check 1 o 3

const routes = require('./routes/api');

// DATABASES..."The Model" climb-the-hill-to-stay-alive      link connection for mongodb atlas
const MONGODB_URI = 'mongodb+srv://m-proven:climb-the-hill-to-stay-alive@cluster0.23le9.mongodb.net/<dbname>?retryWrites=true&w=majority';

// dev check 2 o 3
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/home_cooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected..?');
});
// saving data to a db, the schema, and models are in blogPosts.js

app.use(express.json());
app.use(express.urlencoded({ extended: false }));  // true for very deep and nested JSON

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);


// dev check 3 o 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));