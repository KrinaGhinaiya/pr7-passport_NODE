const express = require('express');
const { registerPage, registerrecord, loginPage, loginrecord, dashboardPage, logout } = require('../controller/authController');
const routes = express.Router();
const passport = require('passport');

// signup
routes.get('/register', registerPage);
routes.post('/registerrecord', registerrecord);

// login
routes.get('/', loginPage);
routes.post('/loginrecord', loginrecord);

routes.get('/dashboard', dashboardPage);
routes.get('/logout', logout);


module.exports = routes