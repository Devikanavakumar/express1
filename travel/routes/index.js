var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var welcomeMessage = "Welcome to the Travel Explorer!";
  var travelPlaces = [
    { name: 'Paris', country: 'France', isPopular: true },
    { name: 'Kyoto', country: 'Japan', isPopular: true },
    { name: 'Reykjavik', country: 'Iceland', isPopular: false }
  ];

  // Pass BOTH variables into the view
  res.render("index", { 
    welcomeMessage: welcomeMessage,
    travelPlaces: travelPlaces 
  });
});

module.exports = router;