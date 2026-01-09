const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/groceryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import Product model
const Product = require("./models/Product");

// Routes
// Home page → form to add product
app.get("/", (req, res) => {
  res.render("index"); 
});

// Handle form submission → save product
app.post("/addProduct", async (req, res) => {
  const { name, quantity, price } = req.body;
  const product = new Product({ name, quantity, price });
  await product.save();
  res.redirect("/products");
});

// Products page → show 5 cheapest products (name + price only)
app.get("/products", async (req, res) => {
  const products = await Product.find().sort({ price: 1 }).limit(5);
  res.render("products", { products });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});