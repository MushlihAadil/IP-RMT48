const { User } = require("../models/");
const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber } = req.body;
            const user = await User.create({username, email, password, phoneNumber});
            
            res.status(201).json({
                username: user.username,
                email: user.email,
                role: user.role
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, email, password } = req.body;
            if (!email && !username || !password) throw {name: 'LoginBadRequest'}
            if (password.length < 8) throw {name: 'PasswordTooShort'}

            let user;
            if (email) {
                user = await User.findOne({where: {email}});
            } else if (username) {
                user = await User.findOne({where: {username}});
            }
            
            if (!user) throw {name: 'InvalidUserInput'}

            let comparedPassword = comparePassword(password, user.password);
            if (!comparedPassword) throw {name: 'InvalidUserInput'}
            
            let token = createToken({
                id : user.id,
            });

            res.status(200).json({
                access_token: token,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;