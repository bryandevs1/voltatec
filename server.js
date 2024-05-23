const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your frontend files)
app.use(express.static("public"));

// Route to handle form submission
app.post("/sendmail", (req, res) => {
  const { form_name, form_email, form_subject, form_phone, form_message } =
    req.body;

  // Create a transporter object using your SMTP service credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.voltatec-solar.ng", // Replace with your SMTP server
    port: 465, // Usually 587 or 465 for secure
    secure: true, // true for 465, false for other ports
    auth: {
      user: "contact@voltatec-solar.ng", // Your custom email address
      pass: "Mike@123", // Your email password
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  // Email options
  const mailOptions = {
    from: form_email,
    to: "contact@voltatec-solar.ng",
    subject: form_subject,
    text: `You have a new message from ${form_name} (${form_phone}):\n\n${form_message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send("Email sent successfully!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
