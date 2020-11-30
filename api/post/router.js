const express = require('express');
const router = express.Router();

const PostSchema = require('./schema');
const { findUser } = require('../user/service');

const { authenticationCheck } = require('../user/midlleware');
const { getFormData } = require('./midlleware');
const { getPostById, deleteOnePost, getPosts } = require('./service');


router.post('/', authenticationCheck, getFormData, async (req, res, next) => {
    try {
        const author = await findUser(req.username);
        
        const postData = {
            text: req.userTextToPost,
            author: author.id,
            url: req.imageMediaUrl,
        }

        const newPost = new PostSchema(postData);
        await newPost.save();
        return res.status(201).json({message: 'Post has been saved'});
    
    } catch(error) {
        return next(error);
    }    
})

router.get('/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await getPostById(postId);
        return res.status(200).json(post);
    } catch (error) {   
        return next(error);
    }
})

router.delete('/:id', authenticationCheck, async (req, res, next) => {
    try {
        const postId = req.params.id;
        await deleteOnePost(postId);
        return res.status(200).json({message: 'Post has been deleted'});
    } catch (error) {
        return next(error);      
    }
})

router.get('/', async (req, res, next) => {
    try {
        const posts = await getPosts(req.query);
        return res.status(200).json(posts);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;
