const ContactMessage = require("../models/ContactMessage");
const {
  sendContactReceivedEmail,
  sendAdminContactNotification,
} = require("../utils/mailer");

async function submitContact(req, res) {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const record = await ContactMessage.create({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    subject: String(subject).trim(),
    message: String(message).trim(),
  });

  const adminEmail = process.env.ADMIN_EMAIL || "";
  try {
    await sendContactReceivedEmail({ to: record.email, name: record.name });
    await sendAdminContactNotification({
      to: adminEmail,
      name: record.name,
      email: record.email,
      subjectLine: record.subject,
      message: record.message,
    });
  } catch (err) {
    console.warn("Contact email failed:", err?.message || err);
  }

  return res.status(201).json({ success: true });
}

module.exports = { submitContact };
