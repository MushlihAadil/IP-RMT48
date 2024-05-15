const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User Router
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Main Router
router.use('/books', require('./bookRouters'));
router.use('/favourites', require('./favouriteRouters'));

module.exports = router;