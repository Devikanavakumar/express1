var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var storeName = "My Book Store";
  var books = [
    { title: 'Alchemist', author: 'Paulo Coelho' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ];

  res.render("index", { 
    storeName: storeName,
    books: books 
  });
});

module.exports = router;