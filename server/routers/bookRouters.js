const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const authentication = require('../middleware/authentication');

router.get('/', authentication, MainController.fetchBooks);
router.get('/:id', authentication, MainController.fetchBookbyId)

module.exports = router;