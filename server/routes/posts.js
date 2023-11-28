const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const Comment = require('../models/CommentModel');

const router = express.Router();
router.use(express.json());

//POSTS

// Post a post to database
router.post('/posts', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secret', (err) => {
        if(err) {
            res.sendStatus(403)
        } 
    })
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

// Delete a post from the database
router.delete('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Post.findByIdAndDelete(id);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
})

//COMMENTS
router.post('/posts/:id/comments', (req, res) => {
    res.json({msg: 'Lägger till kommentar på specifik post!'})
})

// USERS
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        // Check if user is in the database
        const user = await User.findOne({ username })

        // If user can't be found an error message will be sent
        if(!user) {
            res.status(404).send("Användaren kunde inte hittas!")
        }
        // Check if the password is the same as in the database
        const validPassword = await bcrypt.compare(password, user.password)

        // If password is not valid a error message will be sent
        if (!validPassword) {
            res.status(401).send('Lösenordet är felaktigt!')
        }

        // Generate token
        jwt.sign({ user: user }, 'secret', (err, token) => {
            res.json({
                token
            })
        });

    } catch (error) {

    }
})

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashed password saved in variable
        const user = await User.create({
            username: req.body.username, 
            password: hashedPassword
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = router