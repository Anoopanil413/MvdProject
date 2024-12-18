import nodemailer from 'nodemailer';
const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
};

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(emailConfig.smtp);
    }
    async senEmail(email){
        try {

            const emailOptions = {
                from: email.from,
                to: email.to,
                subject: email.subject,
                html: email.content,
                attachments: email.attachments
            }

            const result = await this.transporter.sendMail(mailOptions);
            return result;
            
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);

            
        }
    }
};


export default new EmailService();