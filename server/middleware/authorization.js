const { verifyToken } = require("../helper/jwt");
const { Favourite, User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "InvalidToken" };

    let tokenSplit = access_token.split(" ");
    let [bearer, token] = tokenSplit;
    if (bearer !== "Bearer") throw { name: "InvalidToken" };

    let payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "InvalidToken" };

    const { bookId } = req.params;
    let favourite = await Favourite.findOne({
      where: {
        bookId: bookId,
      },
    });
    if (!favourite) throw { name: "FavouriteNotFound" };

    if (favourite.userId == user.id) {
      next();
    } else if (favourite.userId != user.id) {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
