const express = require('express');
const router = express.Router();
const PostSchema = require('./schema');
const { findUser } = require('../user/service');

const { authenticationCheck } = require('./midlleware');
const { getPostById, deleteOnePost, getPosts } = require('./service');


router.post('/',  authenticationCheck, async (req, res) => {
    try {
        const postData = req.body;
        const author = await findUser(req.username);
        postData.author = author._id;
        const newPost = new PostSchema(postData);
        await newPost.save();
        return res.status(201).json({message: 'Post has been saved'});
    } catch(error) {
        console.log(error)
        return res.status(500).json('Some servers error' );
    }    
})

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await getPostById(postId);
        return res.status(200).json(post);
    } catch (error) {   
        return res.status(500).json('Some servers error');
    }
})

router.delete('/:id', authenticationCheck, async (req, res) => {
    try {
        const postId = req.params.id;
        await deleteOnePost(postId);
        return res.status(200).json({message: 'Post has been deleted'});
    } catch (error) {
        return res.status(500).json({message: 'Some servers error'});       
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts(req.query);
    } catch (error) {
        
    }
})

module.exports = router;
