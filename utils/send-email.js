import {emailTemplates} from './email-template.js'
import dayjs from 'dayjs'
import transporter from '../config/nodemailer.js'
import {EMAIL_ACCOUNT} from "../config/env.js";

export const sendReminderEmail = async ({to, type, booking}) => {
    if (!to || !type) throw new Error('Missing required parameters');

    const template = emailTemplates.find((t) => t.label === type);

    if (!template) throw new Error('Invalid email type');

    const mailInfo = {
        userName: booking.user.name,
        bookingName: booking.name,
        renewalDate: dayjs(booking.renewalDate).format('MMM D, YYYY'),
        planName: booking.name,
        price: `${booking.currency} ${booking.price} (${booking.frequency})`,
        paymentMethod: booking.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: EMAIL_ACCOUNT,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending email');

        console.log('Email sent: ' + info.response);
    })
}