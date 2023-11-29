const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, 
        required: [true, 'En titlel måste finnas!']
    }, 
    content: {
        type: String, 
        required: [true, 'Text måste finnas!']
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"users", 
        required: true
    }, 
    comments: [{
        _id: {type: mongoose.Schema.Types.ObjectId, ref:'comments'}, 
        author: String, 
        content: String
    }]
}, { timestamps: true }) // Lägger till datum för posten (Tillagd och uppdaterad)

module.exports = mongoose.model('Post', postSchema)