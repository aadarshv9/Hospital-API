// requiring nodemailer to send mail
const nodemailer = require("nodemailer");
require('dotenv').config();

// creating nodemailer transporter to send mail using smtp service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.user_id, // put your id
        pass: process.env.user_password // put your id_password
    }
});


module.exports = {
    transporter: transporter
}