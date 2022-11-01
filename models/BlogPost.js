const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true,'Please provide a title'],
    },
    body: {
        type: String,
        required: [true,'Please provide a body'],
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },/* can declare property type with an object like this because we need 'default' */
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date()
    },
    image: {
        type: String,
        required: [true,'Please provide an image'],
    }
});
BlogPostSchema.plugin(uniqueValidator); // for errors related to mongoose like duplicated elements
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost