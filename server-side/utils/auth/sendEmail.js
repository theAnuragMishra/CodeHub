const nodemailer = require("nodemailer")

async function SendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSCODE,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: text,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: " + error);
    }
}

module.exports = SendEmail;
