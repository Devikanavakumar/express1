const express = require('express');
const router = express.Router();

// About Page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Nexus' }); // Renders views/about.ejs
});

// Error Page (Manual trigger for testing)
router.get('/error', (req, res) => {
    res.render('error', { title: 'An Error Occurred' }); // Renders views/error.ejs
});

module.exports = router;