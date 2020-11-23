const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    text: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema);