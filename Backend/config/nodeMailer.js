const nodeMailer = require('nodemailer');

const Transporter = nodeMailer.createTransport({
    host:"smtp.gmail.com" ,
    port: 587,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});

module.exports = Transporter;