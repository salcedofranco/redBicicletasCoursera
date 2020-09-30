const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;

const getMailTransport = ( environment ) => {
if ( environment === 'production'){
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    }
    return nodemailer.createTransport(sgTransport(options)); 
  }
  
  if (environment === 'staging' ){
     
      const options = {
        auth: {
          api_key: process.env.SENDGRID_API_KEY
        }
      }
      return nodemailer.createTransport(sgTransport(options)); 
  
    } 
      // all emails are catched by ethereal.email
      mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PWD
        }
      }
      return nodemailer.createTransport(mailConfig);
    }
  

module.exports = getMailTransport(process.env.NODE_ENV);

/*
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;

if (process.env.NODE_ENV === 'production') {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_KEY
        }
    }

    mailConfig = sgTransport(options);

} else {
    if (process.env.NODE_ENV === 'staging') {
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_KEY
            }
        }

        mailConfig = sgTransport(options);

    } else {
        // Development
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

*/