// middleware/validatePassword.js

module.exports = function (req, res, next) {
  const { password, confirmPassword } = req.body;

  if (!password) {
    return res.send('Password is required');
  }

  // Password length check
  if (password.length < 6) {
    return res.send('Password must be at least 6 characters');
  }

  // For signup, check confirmPassword
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return res.send('Passwords do not match');
  }

  next(); // Password is valid
};