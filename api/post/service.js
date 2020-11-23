const { query } = require('express');
const PostSchema = require('./schema');

const getPostById = async id => {
    const post = await PostSchema.findById(id);
    if(post == null) {
        throw new Error('Post didnt find');
    }

    return post;
}

const deleteOnePost = async id => {
    return await PostSchema.findByIdAndDelete(id);
}

const getPosts = async query => {
    const { author, page, limit } = query; 
    return await PostSchema.find({ author }, null, { skip: (page - 1) * limit, limit });
}

module.exports = {
    getPostById,
    deleteOnePost

}