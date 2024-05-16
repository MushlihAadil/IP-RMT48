function errorHandler (err, req, res, next) {

    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: err.errors[0].message});
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({message: err.errors[0].message});
    } else if (err.name === 'LoginBadRequest') {
        res.status(400).json({message: `Username, Email or Password is required`});
    } else if (err.name === 'PasswordRequired') {
        res.status(400).json({message: `Password is required`});
    } else if (err.name === 'PasswordTooShort') {
        res.status(400).json({message: `Password must be at least 8 characters`});
    } else if (err.name === 'InvalidUserInput') {
        res.status(400).json({message: `Username, Email or Password is invalid`});
    } else if (err.name === 'AlreadyFavourite') {
        res.status(400).json({message: `This book is already in your favourites`});
    } else if (err.name === 'ImageIsRequired') {
        res.status(400).json({message: `Please upload an image file!`});
    } else if (err.name === 'InvalidToken') {
        res.status(401).json({message: `Unauthenticated User`});
    } else if (err.name === 'Unauthorized') {
        res.status(403).json({message: `Unauthorized User`});
    } else if (err.name === 'UserNotFound') {
        res.status(404).json({message: `User you're looking for doesn't exist`});
    } else if (err.name === 'BookNotFound') {
        res.status(404).json({message: `Book you're looking for doesn't exist`});
    } else if (err.name === 'FavouriteNotFound') {
        res.status(404).json({message: `Favourite you're looking for doesn't exist`});
    } else {
        res.status(500).json({message: `Internal Server Error`});
        console.log(err);
    }
}

module.exports = errorHandler;
