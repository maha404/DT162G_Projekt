require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
const express = require('express');
const blogController = require('../controllers/blogController'); // Include of blogcontroller
const userController = require('../controllers/userController'); // include of usercontroller
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

//          Post Routes 

// Post a post to database
router.post('/posts', verifyToken, blogController.blog_create_post);

// Get all the posts from database
router.get('/posts', verifyToken, blogController.blog_get_post);

// Get specific post from database by id
router.get('/posts/:id', verifyToken, blogController.blog_get_single);

// Update specific post in database
router.put('/posts/:id', verifyToken, blogController.blog_update_post);

// Get the most recent post from database by date/time
router.get('/most-recent', verifyToken, blogController.blog_get_recent);

// Delete a post from the database and the associated comments from comment document
router.delete('/posts/:id', verifyToken, blogController.blog_delete_post);

//          Comments Routes
// Add a comment to a post
router.post('/posts/:id/comments', verifyToken, blogController.blog_post_comment);

//          Users Routes
// Login the user, no middleware
router.post('/login', userController.user_login);

// Register a new user, no middleware 
router.post('/register', userController.user_register);

// Logout user
router.post('/logout', verifyToken, userController.user_logout);

// Middleware for tokens
function verifyToken (req, res, next) {
    const token = req.cookies.jwt; // require the jwt from cookies
    if(token) { // Check if the token exists in cookies
        jwt.verify(token, secretKey, async (err, decoded) => {
            if(err) {
                return res.json({error: "Token är tokig"})
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } else {
        res.sendStatus(403); // Forbidden
    }
}

module.exports = router