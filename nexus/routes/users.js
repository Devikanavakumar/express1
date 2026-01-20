const express = require('express');
const router = express.Router();
const authController = require('../contollers/authControllers');

// Display Login Page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Nexus Login' }); // Renders views/login.ejs
});

// Display Signup Page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Create Nexus Account' }); // Renders views/signup.ejs
});

// Handle Signup Logic
router.post('/signup', authController.signup);

// Handle Login Logic
router.post('/login', authController.login);

// Handle Logout Logic
router.post('/logout', authController.logout);

module.exports = router;