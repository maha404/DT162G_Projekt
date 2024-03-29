require('dotenv').config();
const secretKey = process.env.JWT_SECRET; // JWT secret key from .env file
const Post = require('../models/PostModel');
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const Comment = require('../models/CommentModel');

// Create a new post and add to db
const blog_create_post = (req, res) => {
    jwt.verify(req.cookies.jwt, secretKey, async (err) => { // Verification for JWT token in cookies
         if(err) {
            res.sendStatus(403) // Forbidden
            console.log(err)
        } else {
            const {title, content} = req.body
            const token = req.cookies.jwt
            const decoded = jwtDecode(token);
            const author_name = decoded.user.username;
            const author = decoded.user._id;
            try {
                const post = await Post.create({title, content, author, author_name})
                res.status(200).json(post)
            } catch (error) {
                res.status(400).json({msg: error.message})
            }
        }
    })
}

// Get all the posts in db
const blog_get_post = async (req, res) => {
    try {
        const result = await Post.find({})
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

// Get single post by id from db
const blog_get_single = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Post.find({ _id: id})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Get user post
const blog_get_userposts = (req, res) => {
    jwt.verify(req.cookies.jwt, secretKey, async (err) => {
        if(err) {
            res.sendStatus(403)
        } else {
            // Hämta alla poster beroende på user _id...
            const token = req.cookies.jwt
            const decoded = jwtDecode(token);
            const userId = decoded.user._id;
            const result = await Post.find({author: userId})
            res.status(200).json(result);

        }
    })
}

// Update an post with id in db
const blog_update_post = (req, res) => {
    jwt.verify(req.cookies.jwt, secretKey, async (err) => { // Verification for JWT token in cookies
        if(err) {
            res.sendStatus(403) // Forbidden
        } else {
            try {
                const id = req.params.id;
                const update = await Post.findByIdAndUpdate(id, req.body);
                res.status(200).json(update);
            } catch (error) {
                res.status(400).json({msg: error.message}); 
            }
        
        }
    })
}

// Get the most recent post by creation date/time in db
const blog_get_recent = async (req, res) => {
    try {
        const recentPost = await Post.find().sort({createdAt:-1})
        res.status(200).json(recentPost)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Delete a post in the db and comments
const blog_delete_post = (req, res) => {
    jwt.verify(req.cookies.jwt, secretKey, async(err) => { // Verification for JWT token in cookies
        if(err) {
            res.sendStatus(403) // Forbidden
        } else {
            let data = [];
            try {
                const id = req.params.id;
                const result = await Post.findByIdAndDelete(id);
                data['data1'] = result;
        
                const removeComments = await Comment.deleteMany({post: id}) // Only deletes all the comments connected to the post 
                data['data2'] = removeComments;
        
                return res.status(200).json(data)
            } catch (error) {
                res.status(404).json({msg: error.message})
            }
        }
    })
}

// Post a comment to a post
const blog_post_comment = (req, res) => {
    jwt.verify(req.cookies.jwt, secretKey, async (err) => { // Verification for JWT token in cookies
        if(err) {
            res.sendStatus(403) // Forbidden
        } else {
            const id = req.params.id;
            const post = req.params.id;
            const token = req.cookies.jwt
            const decoded = jwtDecode(token);
            const author = decoded.user.username;
            const {content} = req.body
            try {
                const comment = await Comment.create({ author, content, post})
                const updatedPost = await Post.findOneAndUpdate(
                    {_id: id}, 
                    {
                        $push: { comments: comment} 
                    },
                    {new: true}
                )
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(400).json({msg: error.message})
            }
        }
    })
}

// Export of all the modules
module.exports = {
    blog_create_post, 
    blog_get_post, 
    blog_get_single,
    blog_get_userposts, 
    blog_update_post, 
    blog_get_recent, 
    blog_delete_post, 
    blog_post_comment
}