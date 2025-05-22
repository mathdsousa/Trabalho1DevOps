require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // para receber JSON no corpo do POST

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📬 Rota que o backend vai chamar
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erro ao enviar e-mail:', err);
      return res.status(500).json({ erro: 'Erro ao enviar e-mail' });
    }

    console.log('E-mail enviado:', info.response);
    return res.status(200).json({ mensagem: 'E-mail enviado com sucesso' });
  });
});

app.listen(4000, () => {
  console.log('Serviço de envio de e-mail rodando na porta 4000');
});
