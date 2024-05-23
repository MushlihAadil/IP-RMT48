const { Model, where } = require('sequelize');
const { User, Book, Favourite } = require('../models');

class MainController {
    // Books Controller
    static async fetchBooks(req, res, next) {
        try {
            const books = await Book.findAll();

            res.status(200).json(books);
        } catch (err) {
            next(err);
        }
    }

    static async fetchBookbyId(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id);
            if (!book) throw { name : 'BookNotFound'}

            res.status(200).json(book);
        } catch (err) {
            next(err);
        }
    }

    // Favourites Controller
    static async fetchFavourites(req, res, next) {
        try {
            const favourites = await Favourite.findAll({
                where: {
                    userId: req.user.id,
                },
                include: {
                    model: Book, attributes: {
                      exclude: ["createdAt", "updatedAt"]
                    }
                  }
            });

            res.status(200).json(favourites);
        } catch (err) {
            next(err);
        }
    }

    static async fetchFavouriteById(req, res, next) {
        try {
            const { id } = req.params;
            const favourites = await Favourite.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Book, attributes: {
                      exclude: ["createdAt", "updatedAt"]
                    }
                  }
            });

            res.status(200).json(favourites);
        } catch (err) {
            next(err);
        }
    }

    static async addFavourite(req, res, next) {
        try {
            let { bookId } = req.params;
            let book = await Book.findByPk(bookId);
            if (!book) throw { name : 'BookNotFound'}
            
            let findFavourite = await Favourite.findOne({
                where : {
                    bookId: bookId,
                }
            })

            if (findFavourite !== null) {
                throw { name : 'AlreadyFavourite'}
            }

            const { price } = book;
            let quantity = 1;
            let favourite = await Favourite.create({
                userId: req.user.id,
                bookId: bookId,
                quantity: quantity,
                totalPrice: quantity*price
            });

            res.status(201).json(favourite);
        } catch (err) {
            next(err);
        }
    }

    static async updateFavourite(req, res, next) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            let favourite = await Favourite.findOne({
                where: {
                    id: id
                }
            });
            if (!favourite) throw { name : 'FavouriteNotFound'}
            let book = await Book.findByPk(id);

            await favourite.update({
                quantity: quantity,
                totalPrice: quantity*book.price
            })

            res.status(200).json({ message: `Favourite with id ${id} has been Updated` });
        } catch (err) {
            next(err);
        }
    }

    static async deleteFavourite(req, res, next) {
        try {
            const { id } = req.params;
            let favourite = await Favourite.findOne({
                where: {
                    id: id
                }
            });
            if (!favourite) throw { name : 'FavouriteNotFound'}

            await favourite.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: `Favourite with id ${id} has been Deleted` });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MainController;