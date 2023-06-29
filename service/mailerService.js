require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { transporterMailer } = require('../config/mailer.config')

async function registerMailer(data, subject) {
    const templatePath = path.join(__dirname, 'mailerTemplate', 'register.html')
    const template = fs.readFileSync(templatePath, 'utf8')

    const compileTemplate = template({
        user: data
    })

    const configValue = {
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: subject,
        html: compileTemplate,
    }

    try {
        const info = await transporterMailer.sendMail(configValue)

        console.log('Email Sent: ', info.value);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}