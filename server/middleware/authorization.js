const { Favourite } = require('../models');

const authorization = async (req, res, next) => {
    try {
        const {id} = req.params;
        let favourite = await Favourite.findByPk(id);
        if(!favourite) throw { name : 'FavouriteNotFound' };

        if (favourite.userId == req.user.id) {
            next();
        } else if (favourite.userId != req.user.id) {
            throw { name : 'Unauthorized' };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;