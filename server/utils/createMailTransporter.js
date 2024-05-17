const nodemailer = require('nodemailer');
require('dotenv').config();

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mmushlih.alaadil29@gmail.com",
            pass:  process.env.EMAIL_PASSWORD
        }
    });
}

module.exports = createMailTransporter;
