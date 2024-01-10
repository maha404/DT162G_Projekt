const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String, 
        required: true
    }, 
    author: {
        type: String, 
        ref: "users",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts", 
        required: true
    }
}, { timestamps: true } )

module.exports = mongoose.model('Comment', commentSchema);