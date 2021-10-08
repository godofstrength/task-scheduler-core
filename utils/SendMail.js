const nodemailer = require('nodemailer');

const sendMail = async(email, subject, html, callback) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp@mailtrap.io',
            port: 2525,
            auth : {
                user: "3cff062ac963ac",
                pass: "57a05936fe0a3c"
            }
        })

     transporter.sendMail({
            from: 'info@task_sheduler_core',
            to: email,
            subject: subject,
            html: html
        }, callback)
    } catch (error) {
        console.log(error.msg)
    }
}
module.exports = sendMail