require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

// Route for form submission
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Log the received data to ensure it is being sent correctly
  console.log('Form Data Received:', req.body);

  // Check if the required fields are present
  if (!name || !email || !message) {
    return res.status(400).send('Please fill out all fields.');
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER,  // Your email (from .env)
      pass: process.env.EMAIL_PASS   // Your email password (from .env)
    },
    tls: {
      rejectUnauthorized: false  // Fix for self-signed certificate issue
    }
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,  // The same email to receive messages
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // return res.status(500).send('Error sending email: ' + error.message);
      return res.status(500).json({ error: 'Error sending email: ' + error.message });
    }
    // res.send('Email sent successfully!');
    res.json({ message: 'Email sent successfully!' });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
