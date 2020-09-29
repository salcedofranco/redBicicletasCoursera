const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;

if (process.env.NODE_ENV === 'production'){
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    }
    mailConfig = sgTransport(options);
  
  }else{
    if (process.env.NODE_ENV === 'staging' ){
      console.log('XXXXXXXXXXXXXXXXXXX');
      const options = {
        auth: {
          api_key: process.env.SENDGRID_API_KEY
        }
      }
      mailConfig = sgTransport(options);
  
    } else {
      // all emails are catched by ethereal.email
      mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PWD
        }
      };
    }
  }





module.exports = nodemailer.createTransport(mailConfig);