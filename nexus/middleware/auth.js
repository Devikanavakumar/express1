module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.session.user) {
            return next();
        }
        // If not logged in, redirect to auth page with a flash message
        req.flash('error_msg', 'Please login to access the File Explorer.');
        res.redirect('/auth');
    }
};// middleware/validateEmail.js

module.exports = function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.send('Email is required');
  }

  // Basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.send('Invalid email format');
  }

  next(); // Email is valid, move to next middleware/controller
};