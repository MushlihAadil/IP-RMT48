const { User } = require("../models/");
const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber } = req.body;
            if (!password) throw { name : 'PasswordRequired'}
            if (password.length < 8) throw {name: 'PasswordTooShort'}

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
            if (!email || !username && !password) throw {name: 'LoginBadRequest'}

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

    static async patchUserProfilePicture (req, res, next) {
        try {
            const { id } = req.user
            let user = await User.findByPk(id);
            if(!user) throw { name: 'UserNotFound' }
            if (!req.file) throw { name : 'ImageIsRequired'}

            const buffer = req.file.buffer.toString('base64');
            const base64 = `data:${req.file.mimetype};base64,${buffer}`;

            let result = await cloudinary.uploader.upload(
                base64, 
                { folder: "profilePictures" },
                function(error, result) { console.log(result, error); }
            );
            
            let updateUser = await user.update({profilePicture : result.secure_url});

            res.status(200).json({
                profilePicture : updateUser.profilePicture, 
                message : 'Your profile picture success to update'
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;