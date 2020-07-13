const nodeMailer = require('../config/nodemailer');
require('dotenv').config();

exports.patientPassword = (patient) => {

    // using transporter of nodemail to send mail
    nodeMailer.transporter.sendMail({
       from: process.env.user_id,  // fetching user_id from .env file 
       to: patient.email,          // sending mail to provided id
       subject: "Use this Password to check Reports!",
       html: `<h1>${patient.password}</h1>`
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}