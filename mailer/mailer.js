const nodemailer = require("nodemailer");

//configuramos el objeto
const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lowell.kunde28@ethereal.email',
        pass: '5GPNfRQmzp8weFFtk1'
    }
};

module.exports = nodemailer.createTransport(mailConfig);