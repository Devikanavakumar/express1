const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('destinations', { title: 'Destinations' });
});

module.exports = router;