import nodeMailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
      const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMPT_MAIL,
        to: email,
        subject: subject,
        text: text,
      });
};

export default sendEmail;
