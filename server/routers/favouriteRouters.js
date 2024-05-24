const express = require('express');
const authentication = require('../middleware/authentication');
const MainController = require('../controllers/MainController');
const authorization = require('../middleware/authorization');
const router = express.Router();

router.get('/', authentication, MainController.fetchFavourites);
router.get('/:id', authentication, MainController.fetchFavbyId)
router.post('/:bookId', authentication, MainController.addFavourite);
router.put('/:id', authentication, MainController.updateFavourite);
router.delete('/:bookId', authentication, MainController.deleteFavourite);


module.exports = router;