const { Favourite } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)
    let favourite = await Favourite.findOne({
      where: {
        id: id,
      },
    });
    // console.log(favourite, "<<<<<< ini authorizatation");
    if (!favourite) throw { name: "FavouriteNotFound" };
    // console.log(req.user, "<<<<<<< isi req user")

    if (favourite.userId === req.user.id) {
      next();
    } else if (favourite.userId !== req.user.id) {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
