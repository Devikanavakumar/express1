const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");
const User = require("../models/User");

const Product = require("../models/stuff");
const validateProduct = require("../middleware/validateProduct");

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", {
    errors: [],
    success: null,
    username: "",
    email: ""
  });
});

router.post("/login", validateUser, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.render("login", {
      errors: [],
      success: "Registration Successful",
      username: "",
      email: ""
    });
  } catch (err) {
    console.error(err);
    res.render("login", {
      errors: ["Database error"],
      success: null,
      username,
      email
    });
  }
});

router.get("/logincard", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("logincard", { users });
  } catch (err) {
    console.error(err);
    res.render("logincard", { users: [] });
  }
});

router.get("/product", (req, res) => {
  res.render("product", {
    errors: [],
    success: null,
    name: "",
    quantity: "",
    price: ""
  });
});

router.post("/products", validateProduct, async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const newProduct = new Product({ name, quantity, price });
    await newProduct.save();

    res.render("product", {
      errors: [],
      success: "Product added successfully!",
      name: "",
      quantity: "",
      price: ""
    });
  } catch (err) {
    console.error(err);
    res.render("product", {
      errors: ["Database error"],
      success: null,
      name,
      quantity,
      price
    });
  }
});

router.get("/productcard", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("productcard", { products });
  } catch (err) {
    console.error(err);
    res.render("productcard", { products: [] });
  }
});

module.exports = router;