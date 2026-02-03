const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
const SMTP_FROM = process.env.SMTP_FROM || "no-reply@example.com";
const SITE_NAME = process.env.SITE_NAME || "GART";
const SITE_URL = process.env.SITE_URL || "https://gart.org.in";
const SITE_LOGO_URL = process.env.SITE_LOGO_URL || "";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  if (!SMTP_HOST) {
    throw new Error("SMTP_HOST is not configured");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  return transporter;
}

async function safeSend(mail) {
  if (!SMTP_HOST) {
    console.warn("SMTP not configured; skipping email.");
    return;
  }
  const client = getTransporter();
  await client.sendMail(mail);
}

async function sendOtpEmail(to, code, ttlMinutes) {
  const subject = "Your OTP Code";
  const text = `Your OTP code is ${code}. It is valid for ${ttlMinutes} minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>OTP Verification</h2>
      <p>Your OTP code is <strong>${code}</strong>.</p>
      <p>This code is valid for <strong>${ttlMinutes} minutes</strong>.</p>
    </div>
  `;

  await safeSend({
    from: SMTP_FROM,
    to,
    subject,
    text,
    html,
  });
}

async function sendMembershipSubmissionEmail({ to, applicationId, membershipType, amount, currency }) {
  const subject = "Membership Application Submitted";
  const text = `Your membership application has been submitted. Application ID: ${applicationId}`;
  const logo = SITE_LOGO_URL
    ? `<a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" style="max-width:140px; margin-bottom:12px;"/></a>`
    : `<div style="font-weight:700;font-size:20px;color:#0f766e;margin-bottom:12px;">${SITE_NAME}</div>`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f7fb; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 24px 8px 24px;text-align:center;">
          ${logo}
          <h2 style="margin:0;color:#111827;font-size:22px;">Membership Application Submitted</h2>
          <p style="margin:8px 0 0;color:#6b7280;">We’ve received your application and payment details.</p>
        </div>
        <div style="padding:16px 24px;">
          <div style="background:#f8fafc;border-radius:12px;padding:16px;border:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#111827;"><strong>Application ID:</strong> ${applicationId}</p>
            <p style="margin:0 0 8px;color:#111827;"><strong>Membership Type:</strong> ${membershipType}</p>
            <p style="margin:0;color:#111827;"><strong>Payment:</strong> ${currency} ${amount}</p>
          </div>
          <p style="margin:16px 0 0;color:#374151;">
            Our team will verify your payment and update your membership status shortly.
          </p>
          <div style="margin-top:20px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 18px;background:#0f766e;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;">
              Visit ${SITE_NAME}
            </a>
          </div>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;text-align:center;font-size:12px;">
          You’re receiving this email because you submitted a membership request at ${SITE_NAME}.
        </div>
      </div>
    </div>
  `;
  await safeSend({ from: SMTP_FROM, to, subject, text, html });
}

async function sendSignupEmail({ to, name }) {
  const subject = `Welcome to ${SITE_NAME}`;
  const text = `Your ${SITE_NAME} account has been created successfully. You can now log in.`;
  const logo = SITE_LOGO_URL
    ? `<a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" style="max-width:140px; margin-bottom:12px;"/></a>`
    : `<div style="font-weight:700;font-size:20px;color:#0f766e;margin-bottom:12px;">${SITE_NAME}</div>`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f7fb; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 24px 8px 24px;text-align:center;">
          ${logo}
          <h2 style="margin:0;color:#111827;font-size:22px;">Welcome to ${SITE_NAME}</h2>
          <p style="margin:8px 0 0;color:#6b7280;">Your account is ready.</p>
        </div>
        <div style="padding:16px 24px;">
          <p style="margin:0 0 8px;color:#111827;">Hi ${name || "there"},</p>
          <p style="margin:0;color:#374151;">
            Thanks for joining ${SITE_NAME}. You can now log in and apply for membership.
          </p>
          <div style="margin-top:20px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 18px;background:#0f766e;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;">
              Login to ${SITE_NAME}
            </a>
          </div>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;text-align:center;font-size:12px;">
          ${SITE_NAME} | ${SITE_URL}
        </div>
      </div>
    </div>
  `;
  await safeSend({ from: SMTP_FROM, to, subject, text, html });
}

async function sendAdminMembershipNotification({ to, applicantEmail, applicationId, membershipType, amount, currency }) {
  if (!to) return;
  const subject = "New Membership Application Submitted";
  const text = `New application ${applicationId} from ${applicantEmail}.`;
  const logo = SITE_LOGO_URL
    ? `<a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" style="max-width:140px; margin-bottom:12px;"/></a>`
    : `<div style="font-weight:700;font-size:20px;color:#0f766e;margin-bottom:12px;">${SITE_NAME}</div>`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f7fb; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 24px 8px 24px;text-align:center;">
          ${logo}
          <h2 style="margin:0;color:#111827;font-size:22px;">New Membership Application</h2>
          <p style="margin:8px 0 0;color:#6b7280;">A new application needs review.</p>
        </div>
        <div style="padding:16px 24px;">
          <div style="background:#f8fafc;border-radius:12px;padding:16px;border:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#111827;"><strong>Application ID:</strong> ${applicationId}</p>
            <p style="margin:0 0 8px;color:#111827;"><strong>Applicant:</strong> ${applicantEmail}</p>
            <p style="margin:0 0 8px;color:#111827;"><strong>Membership Type:</strong> ${membershipType}</p>
            <p style="margin:0;color:#111827;"><strong>Payment:</strong> ${currency} ${amount}</p>
          </div>
          <div style="margin-top:20px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 18px;background:#0f766e;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;">
              Open Admin Dashboard
            </a>
          </div>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;text-align:center;font-size:12px;">
          ${SITE_NAME} automated notification.
        </div>
      </div>
    </div>
  `;
  await safeSend({ from: SMTP_FROM, to, subject, text, html });
}

async function sendContactReceivedEmail({ to, name }) {
  const subject = `${SITE_NAME} Contact Received`;
  const text = `Hi ${name || ""}, we have received your message and will respond soon.`;
  const logo = SITE_LOGO_URL
    ? `<a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" style="max-width:140px; margin-bottom:12px;"/></a>`
    : `<div style="font-weight:700;font-size:20px;color:#0f766e;margin-bottom:12px;">${SITE_NAME}</div>`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f7fb; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 24px 8px 24px;text-align:center;">
          ${logo}
          <h2 style="margin:0;color:#111827;font-size:22px;">We’ve received your message</h2>
          <p style="margin:8px 0 0;color:#6b7280;">Thanks for reaching out to ${SITE_NAME}.</p>
        </div>
        <div style="padding:16px 24px;">
          <p style="margin:0 0 8px;color:#111827;">Hi ${name || "there"},</p>
          <p style="margin:0;color:#374151;">
            Our team will review your message and get back to you shortly.
          </p>
          <div style="margin-top:20px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 18px;background:#0f766e;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;">
              Visit ${SITE_NAME}
            </a>
          </div>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;text-align:center;font-size:12px;">
          ${SITE_NAME} | ${SITE_URL}
        </div>
      </div>
    </div>
  `;
  await safeSend({ from: SMTP_FROM, to, subject, text, html });
}

async function sendAdminContactNotification({ to, name, email, subjectLine, message }) {
  if (!to) return;
  const subject = `${SITE_NAME} Contact Form Submission`;
  const text = `New contact form submission from ${name} (${email}). Subject: ${subjectLine}`;
  const logo = SITE_LOGO_URL
    ? `<a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" style="max-width:140px; margin-bottom:12px;"/></a>`
    : `<div style="font-weight:700;font-size:20px;color:#0f766e;margin-bottom:12px;">${SITE_NAME}</div>`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f7fb; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px 24px 8px 24px;text-align:center;">
          ${logo}
          <h2 style="margin:0;color:#111827;font-size:22px;">Contact Form Submission</h2>
          <p style="margin:8px 0 0;color:#6b7280;">New message received.</p>
        </div>
        <div style="padding:16px 24px;">
          <div style="background:#f8fafc;border-radius:12px;padding:16px;border:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#111827;"><strong>Name:</strong> ${name}</p>
            <p style="margin:0 0 8px;color:#111827;"><strong>Email:</strong> ${email}</p>
            <p style="margin:0 0 8px;color:#111827;"><strong>Subject:</strong> ${subjectLine}</p>
            <p style="margin:0;color:#111827;"><strong>Message:</strong></p>
            <p style="margin:8px 0 0;color:#374151;">${String(message).replace(/\n/g, "<br/>")}</p>
          </div>
          <div style="margin-top:20px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 18px;background:#0f766e;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;">
              Visit ${SITE_NAME}
            </a>
          </div>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;text-align:center;font-size:12px;">
          ${SITE_NAME} | ${SITE_URL}
        </div>
      </div>
    </div>
  `;
  await safeSend({ from: SMTP_FROM, to, subject, text, html });
}

module.exports = {
  sendOtpEmail,
  sendSignupEmail,
  sendMembershipSubmissionEmail,
  sendAdminMembershipNotification,
  sendContactReceivedEmail,
  sendAdminContactNotification,
};
