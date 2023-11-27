const express = require('express');

const router = express.Router();

//POSTS

// Post a post to database
router.post('/posts', (req, res) => {
    res.json({msg: 'Post tillagd!'})
})

// Get all the posts from database
router.get('/posts', (req, res) => {
    res.json({msg: 'Alla poster hämtades!'})
})

router.get('/posts/:id', (req, res) => {
    res.json({msg: 'Specifik post hämtades!'})
})

router.put('/posts/:id', (req, res) => {
    res.json({msg: 'Specifik post uppdaterad!'})
})

router.get('/posts/mostrecent', (req, res) => {
    res.json({msg: 'Hämtar senaste posten!'})
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