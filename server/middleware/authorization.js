const { Favourite } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.user
    const { bookId } = req.params;
    let favourite = await Favourite.findOne({
      where: {
        bookId: bookId,
      },
    });
    if (!favourite) throw { name: "FavouriteNotFound" };

    if (favourite.userId === id) {
      next();
    } else if (favourite.userId !== id) {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
