const express = require('express');
const authentication = require('../middleware/authentication');
const MainController = require('../controllers/MainController');
const authorization = require('../middleware/authorization');
const router = express.Router();

router.get('/', authentication, MainController.fetchFavourites);
router.get('/:id', authentication, authorization, MainController.fetchFavbyId)
router.post('/:bookId', authentication, MainController.addFavourite);
router.put('/:id', authentication, authorization, MainController.updateFavourite);
router.delete('/:id', authentication, authorization, MainController.deleteFavourite);


module.exports = router;