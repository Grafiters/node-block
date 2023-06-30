require('dotenv').config();
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const transporterMailer = require('../config/mailer.config')

const { APP_URL } = process.env

async function registerMailer(data, subject) {
    const templatePath = path.join(__dirname, 'mailerTemplate', 'register.html')
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(templateContent)

    const compileTemplate = template({
        user: data,
        email: data.email,
        token: `${APP_URL}/api/auth/activate-email/${data.email_verification_token}`
    })

    const configValue = {
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: subject,
        html: compileTemplate,
    }

    const transporter = nodemailer.createTransport(transporterMailer);

    try {
        const info = transporter.sendMail(configValue)
        console.log(info);
        return data
    } catch (error) {
        console.log(error);
        return false
    }
}

async function resendRegisterMailer(data, subject) {
    const templatePath = path.join(__dirname, 'mailerTemplate', 'resend_register.html')
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(templateContent)

    const compileTemplate = template({
        user: data,
        email: data.email,
        token: `${APP_URL}/api/auth/activate-email/${data.email_verification_token}`
    })

    const configValue = {
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: subject,
        html: compileTemplate,
    }

    const transporter = nodemailer.createTransport(transporterMailer);

    try {
        const info = transporter.sendMail(configValue)
        console.log(info);
        return data
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    registerMailer,
    resendRegisterMailer
}