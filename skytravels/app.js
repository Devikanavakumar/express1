const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const homeRoutes = require('./routes/home');
const destinationRoutes = require('./routes/destinations');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/', homeRoutes);
app.use('/destinations', destinationRoutes);
app.use('/contact', contactRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
module.exports=app;