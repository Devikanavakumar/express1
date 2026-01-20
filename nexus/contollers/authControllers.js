// controllers/auth.js
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('Passwords do not match');
  }

  const user = await User.create({ username, email, password });

  req.session.user = {
    _id: user._id,
    username: user.username,
    email: user.email
  };

  res.redirect('/mainpage');
};
exports.showNotes = async (req, res) => {
  res.render('mainpage', { 
    user: req.session.user || null, // Pass user here
    notes: [] 
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.send('Invalid credentials');
  }

  req.session.user = {
    _id: user._id,
    username: user.username,
    email: user.email
  };

  res.redirect('/mainpage');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};