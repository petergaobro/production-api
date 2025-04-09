import nodemailer from "nodemailer";
import {EMAIL_ACCOUNT, EMAIL_PWD} from "./env.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PWD,
    }
})

export default transporter;
