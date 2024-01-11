require('dotenv').config();
const secretKey = process.env.JWT_SECRET; // JWT secret key from .env file
const User = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const bcrypt = require('bcrypt');

// Logs in the user 
const user_login = async (req, res) => {
    const {username, password} = req.body;

    try {
        // Check if user is in the database
        const user = await User.findOne({ username })

        // If user can't be found an error message will be sent
        if(!user) {
            res.status(404).json({msg: "Användaren kunde inte hittas!"})
        }
        // Check if the password is the same as in the database
        const validPassword = await bcrypt.compare(password, user.password)

        // If password is not valid a error message will be sent
        if (!validPassword) {
            res.status(401).json({ msg: 'Lösenordet är felaktigt!'})
        }

        // Generate token and save it in cookies, token expires in 1h
        jwt.sign({ user: user }, secretKey, {expiresIn: "1h"}, (err, token) => {
            res.cookie('jwt', token, {httpOnly: true}); // Save to Cookies
            res.json({ token }) 
        });

    } catch (error) {
        console.log(error);
    }
}

// Register a user 
const user_register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashed password saved in variable
        const user = await User.create({ // Creates and saves the user to db 
            username: req.body.username, 
            password: hashedPassword
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Logout a user 
const user_logout = (req, res) => {
    
    res.clearCookie('jwt');
    res.json({ message: 'Logout successful' });
  
}

// Get username
const user_info = (req, res) => {
    const token = req.cookies.jwt
    const decoded = jwtDecode(token);
    const username = decoded.user.username;
    res.status(200).json(username);
}

// Export of the modules
module.exports = {
    user_login, 
    user_register, 
    user_logout, 
    user_info
}