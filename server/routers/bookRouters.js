const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const authentication = require('../middleware/authentication');

router.get('/', MainController.fetchBooks);
router.get('/:id', MainController.fetchBookbyId)

module.exports = router;