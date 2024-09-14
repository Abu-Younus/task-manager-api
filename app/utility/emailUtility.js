import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from "../config/config.js";

const SendEmail = async (emailTo, emailText, emailSubject) => {
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURITY,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        form: "Task Manager MERN <info@teamrabbil.com>",
        to: emailTo,
        subject: emailSubject,
        text: emailText
    }

    return await transporter.sendMail(mailOptions)
}

export default SendEmail