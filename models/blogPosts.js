const mongoose = require('mongoose');

// DB Schema? "The Plan/layout for the data model"
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model "puts the Schema into the Model"
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;


/*                 "PREVIOUS SAMPLE DATA USED FOR LEARNING"
// Saving data to the database "puts the data entry into the model"
const data = {
    title: 'Welcome to the M.Proven.Portfolio',
    body: 'I made the database with Mongoose/MongoDB, the View with React, and tied it all together with Node.js'
};

const newBlogPost = new BlogPost(data); // instance of the data


// save sample data
newBlogPost.save((error) => {
    if (error) {
        console.log('Error messages???');
    } else {
        console.log('Data has been saved!!!')
    }
});
// .save();

*/