const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 5,
        required: true
    },
    tags: [{ type: String, maxlength: 10 }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
        type: String
    },
    photo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})
const blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel;