var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/shopDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model("Product", productSchema);


router.get('/', function(req, res) {
  res.render('index', { message: null });
});


router.post('/add-product', async function(req, res) {
  const { name, price, description } = req.body;

  await Product.create({
    name,
    price,
    description
  });

  res.render('index', { message: "Product saved successfully!" });
});

module.exports = router;