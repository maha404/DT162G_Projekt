const express = require('express');
const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const Comment = require('../models/CommentModel');

const router = express.Router();
router.use(express.json());

//POSTS

// Post a post to database
router.post('/posts', async (req, res) => {
    const {title, content, author} = req.body
    try {
        const post = await Post.create({title, content, author})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Get all the posts from database
router.get('/posts', async (req, res) => {
    try {
        const result = await Post.find({})
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
})

// Get specific post from database by id
router.get('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Post.find({ _id: `${id}`})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Update specific post in database
router.put('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const update = await Post.findByIdAndUpdate(id, req.body)
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

})

// Get the most recent post from database by date/time
router.get('/most-recent', async (req, res) => {
    try {
        const recentPost = await Post.find().sort({createdAt:-1})
        res.status(200).json(recentPost)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

//COMMENTS
router.post('/posts/:id/comments', (req, res) => {
    res.json({msg: 'Lägger till kommentar på specifik post!'})
})

// USERS
router.post('/login', (req, res) => {
    res.json({msg: 'Användare inloggad!'})
})

router.post('/register', (req, res) => {
    res.json({msg: 'Användare registrerad!'})
})

module.exports = router