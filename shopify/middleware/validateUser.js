module.exports = function (req, res, next) {
  const { username = "", email = "", password = "" } = req.body;
  const errors = [];

  const isUsernameEmpty = username.trim() === "";
  const isEmailEmpty = email.trim() === "";
  const isPasswordEmpty = password.trim() === "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  // 1️⃣ All empty
  if (isUsernameEmpty && isEmailEmpty && isPasswordEmpty) {
    errors.push("All fields are required");
  }

  // 2️⃣ Username filled, others empty
  else if (!isUsernameEmpty && isEmailEmpty && isPasswordEmpty) {
    errors.push("Please enter the email and password");
  }

  // 3️⃣ Password empty only
  else if (!isUsernameEmpty && !isEmailEmpty && isPasswordEmpty) {
    errors.push("Please enter the password");
  }

  // 🔴 STOP HERE if basic errors exist
  if (errors.length > 0) {
    return res.render("login", {
      errors,
      success: null,
      username,
      email
    });
  }

  // 4️⃣ Username length
  if (username.length < 3) {
    errors.push("Username must be 3 characters");
  }

  // 5️⃣ Email format
  if (!emailRegex.test(email)) {
    errors.push("Invalid Email Address");
  }

  // 6️⃣ Password format
  if (!passwordRegex.test(password)) {
    errors.push(
      "Password must be 8+ chars, include uppercase, lowercase, number & symbol"
    );
  }

  // ❌ Format errors
  if (errors.length > 0) {
    return res.render("login", {
      errors,
      success: null,
      username,
      email
    });
  }

  // ✅ All validations passed
  next();
};