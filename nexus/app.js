const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

// View Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main-layouts');

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// 1. SESSION CONFIGURATION (MUST COME FIRST)
// This initializes the 'req.session' object
app.use(session({
  secret: 'nexus_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// 2. GLOBAL USER MIDDLEWARE (MUST COME AFTER SESSION)
// Now req.session exists, so we can safely read .user
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// Place this before your routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. IMPORT AND MOUNT ROUTES (AFTER MIDDLEWARE)
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const publicRoutes = require('./routes/public');

app.use('/', indexRoutes);  
app.use('/', usersRoutes);  
app.use('/', publicRoutes); 

app.listen(3000, () => console.log('Nexus Server running on port 3000'));