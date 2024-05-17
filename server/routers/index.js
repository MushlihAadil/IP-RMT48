const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middleware/authentication');

// Body-parser for image upload
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage
});

// User Router
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.patch('/profile-picture', authentication, upload.single('profile_picture'), UserController.patchUserProfilePicture)
router.post('/google-login', UserController.googleLogin);

// Main Router
router.use('/books', require('./bookRouters'));
router.use('/favourites', require('./favouriteRouters'));

module.exports = router;